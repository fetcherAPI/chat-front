import { Col, Row } from 'antd';
import { useEffect, useState } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { ServicesTable } from 'widgets/ServicesTable/ServicesTable';
import { io } from 'socket.io-client';
import { Socket } from 'socket.io-client';
import { CSSProperties } from 'react';
import { useSelector } from 'react-redux';
import { $currentUserId } from 'features/Auth/model/selectors';

const Services = () => {
    return (
        <Row>
            <Col>
                <ServicesTable />
            </Col>
            <Col>
                <Outlet />
            </Col>
        </Row>
    );
};

export const ChatComponent = () => {
    const [socket, setSocket] = useState<Socket | null>(null);
    const [messages, setMessages] = useState<any[]>([]);
    const [newMessage, setNewMessage] = useState('');
    const currentUserId = useSelector($currentUserId);
    const { receiverId } = useParams();

    useEffect(() => {
        const chatDto = {
            senderId: currentUserId,
            receiverId: receiverId,
        };
        const socketInstance = io('ws://localhost:3005', {
            extraHeaders: {
                authorization: `Bearer ${JSON.stringify(localStorage.getItem('token'))}`,
            },
        });
        socketInstance.emit('joinChat', { receiverId, senderId: currentUserId });

        setSocket(socketInstance);
        socketInstance.emit('createChat', chatDto);
        socketInstance.emit('fetchMessages', { receiverId, senderId: currentUserId });

        socketInstance.on('messagesHistory', (messages) => {
            setMessages(messages);
        });

        socketInstance.on('receiveMessage', (message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        });

        return () => {
            if (socketInstance.connected) {
                console.log('Закрытие соединения...');
                socketInstance.disconnect(); // Закрываем соединение
            }
        };
    }, [currentUserId, receiverId]);

    const sendMessage = () => {
        if (newMessage.trim() && socket) {
            socket.emit('sendMessage', { receiverId, text: newMessage, senderId: currentUserId });
            setNewMessage('');
        }
    };

    // useEffect(() => {

    // }, []);

    return (
        <div style={styles.chatContainer}>
            <h1>{}</h1>
            <div style={styles.messageList}>
                {messages.map((msg) => (
                    <div
                        key={msg.id}
                        style={{
                            ...styles.message,
                            alignSelf: msg.senderId === currentUserId ? 'flex-end' : 'flex-start',
                            backgroundColor: msg.senderId === currentUserId ? '#d1e7dd' : '#f8d7da',
                        }}
                    >
                        <p>{msg.text}</p>
                    </div>
                ))}
            </div>
            <div style={styles.inputContainer}>
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Напишите сообщение..."
                    style={styles.input}
                />
                <button onClick={sendMessage} style={styles.button}>
                    Отправить
                </button>
            </div>
        </div>
    );
};

const styles: { [key: string]: CSSProperties } = {
    chatContainer: {
        display: 'flex',
        flexDirection: 'column',
        height: '85vh',
        width: '400px',
        margin: '0 auto',
        border: '1px solid #ccc',
        borderRadius: '8px',
        overflow: 'hidden',
    },
    messageList: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        padding: '10px',
        overflowY: 'auto',
        backgroundColor: '#f1f1f1',
    },
    message: {
        maxWidth: '70%',
        padding: '10px',
        borderRadius: '8px',
        margin: '5px 0',
    },
    inputContainer: {
        display: 'flex',
        padding: '10px',
        borderTop: '1px solid #ccc',
    },
    input: {
        flex: 1,
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        marginRight: '10px',
    },
    button: {
        padding: '10px 20px',
        border: 'none',
        borderRadius: '8px',
        backgroundColor: '#007bff',
        color: 'white',
        cursor: 'pointer',
    },
};

export default Services;

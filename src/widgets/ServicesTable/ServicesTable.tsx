import { useEffect } from 'react';
import { getAllUsers } from 'entities/Service/model/service/getAllUsers';
import { useAppDispatch } from 'app/providers/StoreProvider';
import { useSelector } from 'react-redux';
import { $users } from 'entities/Service/model/selectors';
import { Avatar, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useNavigate } from 'react-router-dom';
import { getRouteChatId } from 'shared/config/routeConfig/routeConfig';
import { $currentUserId } from 'features/Auth/model/selectors';
import cls from './Service.module.scss';

function generateColor(username: string): string {
    const hash = username.split('').reduce((acc, char) => char.charCodeAt(0) + ((acc << 5) - acc), 0);

    const color = `hsl(${Math.abs(hash) % 360}, 70%, 60%)`;

    return color;
}

export const ServicesTable = () => {
    const dispatch = useAppDispatch();
    const users = useSelector($users);
    const currentUserId = useSelector($currentUserId);
    const navigate = useNavigate();
    const handleClickRow = (targetUserId: string) => {
        navigate(`${getRouteChatId(targetUserId)}`);
    };
    const columns: ColumnsType<any> = [
        {
            title: 'Action',
            key: 'action',
            sorter: true,
            render: (_, record) => (
                <Avatar style={{ backgroundColor: generateColor(record.fullName) }}>
                    {`${record.fullName[0]}${record.login[1]}`}
                </Avatar>
            ),
        },
        {
            title: 'Name',
            dataIndex: 'login',
            key: 'name',
        },
    ];
    useEffect(() => {
        dispatch(getAllUsers());
    }, []);

    return (
        <div className={cls.servicesWrapper}>
            <Table<any>
                columns={columns}
                showHeader={false}
                dataSource={users.filter((el) => el.id !== currentUserId)}
                pagination={false}
                onRow={(record) => {
                    return {
                        onClick: () => handleClickRow(record.id), // click row
                    };
                }}
            />
        </div>
    );
};

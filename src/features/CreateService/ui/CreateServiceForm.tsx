import { Input, Button, Form, message, Radio } from 'antd';
import { IService } from 'entities/Service/model/types/service';
import { useEffect } from 'react';
import { useNotif } from 'shared/lib';
import { BackButton } from 'shared/ui';
import { SelectServiceParent } from './SelectServiceParant';

interface IProps {
    isInModal?: boolean;
    defaultValue?: IService;
    callbackAfterSuccesCreate?: () => void;
}

export const CreateServiceForm = ({ defaultValue }: IProps) => {
    const [form] = Form.useForm();
    const notif = useNotif();

    const onFinishFailed = () => {
        message.error('Submit failed!');
    };

    useEffect(() => {
        if (defaultValue) {
            form.setFieldsValue(defaultValue);
        } else {
            form.resetFields();
        }
    }, [defaultValue, form]);

    return (
        <>
            {notif.context}
            <Form
                layout={'vertical'}
                form={form}
                initialValues={defaultValue}
                onFinishFailed={onFinishFailed}
                variant="filled"
            >
                <Form.Item
                    name="name"
                    label="Название услуги"
                    rules={[{ required: true }, { min: 3, message: 'Обязательно для заполнение' }]}
                >
                    <Input />
                </Form.Item>
                <SelectServiceParent />
                <Form.Item name="isService" rules={[{ required: true }]}>
                    <Radio.Group>
                        <Radio key={'service'} value={true}>
                            Услуга
                        </Radio>
                        <Radio key={'folder'} value={false}>
                            Папка
                        </Radio>
                    </Radio.Group>
                </Form.Item>
                <BackButton>
                    <Form.Item>
                        <Button htmlType="submit" type="primary">
                            Сохранить
                        </Button>
                    </Form.Item>
                </BackButton>
            </Form>
        </>
    );
};

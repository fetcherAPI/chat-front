import { Link, useParams } from 'react-router-dom';
import { routes } from 'shared/config';
import { RegistrationSteps } from 'features/Register';
import { SolutionOutlined } from '@ant-design/icons';
import cls from './RegistrationPage.module.scss';
import { RegisterUserFrom } from 'features/Register/ui/RegistrationForms/RegistrationCompanyForm';

const RegistrationPage = () => {
    const { type } = useParams();
    return (
        <div className={cls.wrapper}>
            {type === '1' ? (
                <RegistrationSteps className={cls.wrapper} />
            ) : type === '2' ? (
                <RegisterUserFrom />
            ) : (
                <div className={cls.inner}>
                    <Link to={routes.getRegisterType('1')} className={cls.type}>
                        Госорган
                        <SolutionOutlined style={{ color: '#83899f', fontSize: 40 }} />
                    </Link>
                    <Link to={routes.getRegisterType('2')} className={cls.type}>
                        Клиент
                    </Link>
                </div>
            )}
        </div>
    );
};

export default RegistrationPage;

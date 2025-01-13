import { Suspense, useCallback } from 'react';
import { Route, Routes } from 'react-router-dom';
import { AppRoutesProps, routeConfig } from 'shared/config/routeConfig/routeConfig';
import { PageLoader } from 'shared/ui/PageLoader/PageLoader';

const AppRouter = () => {
    const renderWithWrapper = useCallback((route: AppRoutesProps) => {
        const element = <Suspense fallback={<PageLoader />}>{route.element}</Suspense>;
        return (
            <Route key={route.path} path={route.path} element={element}>
                {route.child && Object.values(route.child).map((child) => renderWithWrapper(child))}
            </Route>
        );
    }, []);

    return <Routes>{Object.values(routeConfig).map(renderWithWrapper)}</Routes>;
};

interface RequireAuthProps {
    children: JSX.Element;
    roles?: string[];
    preQualification?: boolean;
}

export function RequireAuth({ children }: RequireAuthProps) {
    // const auth = useSelector($isAuth);
    // const location = useLocation();
    // const userRoles = useSelector($userRole);

    // const hasRequiredRoles = useMemo(() => {
    //     if (!roles) {
    //         return true;
    //     }
    //     return roles.some((requiredRole) => {
    //         return userRoles?.includes(requiredRole);
    //     });
    // }, [roles, userRoles]);

    // if (!auth) {
    //     return <Navigate to={'/'} state={{ from: location }} replace />;
    // }

    // if (!hasRequiredRoles) {
    //     return <h1>403 access denided</h1>;
    // }
    return children;
}

export default AppRouter;

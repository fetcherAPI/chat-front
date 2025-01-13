import { RootState } from 'app/providers/StoreProvider';

export const $userRole = (state: RootState) => state.login.userData?.role;

export const $isAuth = (s: RootState) => s.login.isAuth;

export const $currentUserId = (s: RootState) => s.login.userData?.user.id;

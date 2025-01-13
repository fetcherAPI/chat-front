import { AxiosResponse } from 'axios';
import api from 'shared/api/api';
import { ILogin, ILoginResponse } from '../types/LoginType';

export class AuthApi {
    static async getIsAuth(): Promise<AxiosResponse> {
        return api.get(`/api/auth/authenticate`);
    }
    static async Login(param: ILogin): Promise<AxiosResponse<ILoginResponse>> {
        return api.post<ILoginResponse>(`/auth/login`, param);
    }

    static async refreshToken(): Promise<AxiosResponse> {
        return api.get(`/auth/refresh-tokens`);
    }
}

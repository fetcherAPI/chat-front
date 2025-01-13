export interface ILogin {
    login: string;
    password: string;
}

export interface ILoginResponse {
    user: {
        id: string;
        createdAt: string;
        updatedAt: string;
        login: string;
        fullName: string;
    };
    role: 'merchant';
    accessToken: string;
    refreshToken: string;
}

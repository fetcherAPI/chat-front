export interface IUserRegister {
    login: string;
    passsword: string;
    fullName: string;
}

export interface IUser extends IUserRegister {
    id: number;
    status: string;
    datePasswordExpired: string;
    roleId: number;
    roleName: string;
    companyName: string;
}

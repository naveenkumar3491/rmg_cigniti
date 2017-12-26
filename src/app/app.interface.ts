export interface ILogin{
    userId:string;
    password:string;
}

export interface ILoginResponse{
    employeeId: string;
    employeeName: string;
    employeeRoleId: number;
    employeeRoleName: string;
    deliveryUnit: number;
    themeCol: number;
}

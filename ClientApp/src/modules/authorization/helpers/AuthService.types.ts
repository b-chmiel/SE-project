export interface UserSignUp { 
    username: string,
    password: string, 
    userType: string,
    name: string, 
    surname: string,
    phoneNumber: string
}
export interface UserSignIn {
    username: string,
    password: string, 
}

export var CLIENT_TYPE = "CLIENT"
export var WORKSHOP_EMPLOYEE = "WORKSHOP_EMPLOYEE"
import axios from 'axios';
import {AuthenticationRoot} from '../../routing/routes'
import { UserSignIn, UserSignUp } from './AuthService.types';
    
export async function authorize(): Promise<boolean> {
    console.log("authorization")
    const URL = "/api/0.1.1";
    const creds = localStorage.getItem("creds");
    console.log("creds not null")
    try{
        const res = await axios.post(URL + AuthenticationRoot.USER + AuthenticationRoot.SIGNIN, JSON.parse(creds || "{}"));
        console.log("got response : ")
        console.log(res)
        console.log("AUTHORIZED with " + res.data.guid)
        localStorage.setItem("client_uuid", res.data.guid)
        localStorage.setItem("authorized", "true")
        return true;
    } catch(error){
        localStorage.setItem("client_uuid", "")
        localStorage.setItem("authorized", "false")
        return false;
    }
    

};

export function saveCreds(username: string, password: string): void {
    var user: UserSignIn = {
        username: username, 
        password: password,
    }
    localStorage.setItem("creds", JSON.stringify(user))
}
    

export function getClientID(): string{
    let creds = localStorage.getItem("client_uuid")
    return creds?creds:""
}

export function logout(): void {
    localStorage.removeItem("client_uuid")
    localStorage.removeItem("creds")
    localStorage.setItem("authorized", "false")
}

export function createUser(username: string, password: string): void{ 
    console.log("create user")
    var user: UserSignUp = {
        username: username, 
        password: password,
        userType: "WORKSHOP_EMPLOYEE",
        name: username,
        surname: username,
        phoneNumber: "600000000"
    }
    saveCreds(username, password)
    axios.post(URL + "/user", user)
    .then((res)=>{
        console.log(res)
        console.log(res.status)      
        return res.status //400 exist, 200 success
    })
}
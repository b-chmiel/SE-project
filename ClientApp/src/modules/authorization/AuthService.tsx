import axios from 'axios';

interface UserSignUp { 
    username: string,
    password: string, 
    userType: string,
    name: string, 
    surname: string,
    phoneNumber: string
}
interface UserSignIn {
    username: string,
    password: string, 
}

class AuthService{
    
    static async authorize(): Promise<boolean> {
        console.log("authorization")
        const URL = "https://se-project-2020.herokuapp.com/api/0.1.1/user/signin";
        const creds = localStorage.getItem("creds");
        console.log("creds not null")
        try{
            const res = await axios.post(URL, JSON.parse(creds || "{}"));
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

    static saveCreds(username: string, password: string): void {
        var user: UserSignIn = {
            username: username, 
            password: password,
        }
        localStorage.setItem("creds", JSON.stringify(user))
    }
    

    static getClientID(): string{
        let creds = localStorage.getItem("client_uuid")
        return creds?creds:""
    }

    static logout(): void {
        localStorage.removeItem("client_uuid")
        localStorage.removeItem("creds")
        localStorage.setItem("authorized", "false")
    }

    static createUser(username: string, password: string): void{ 
        console.log("create user")
        var user: UserSignUp = {
            username: username, 
            password: password,
            userType: "WORKSHOP_EMPLOYEE",
            name: username,
            surname: username,
            phoneNumber: "600000000"
        }
        this.saveCreds(username, password)
        axios.post("https://se-project-2020.herokuapp.com/api/0.1.1/user/", user)
        .then((res)=>{
            console.log(res)
            console.log(res.status)      
            return res.status //400 exist, 200 success
        })
    }

}

export default AuthService;
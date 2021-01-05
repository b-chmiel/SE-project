//import axios from 'axios';

class AuthService{
    static authorize(): boolean {
        //TODO: remove when service will be working
        let numb = Math.floor(Math.random() * (10 - 0)) + 0;
        if(numb>5){
            return true
        }else{
            return false;
        }

        //TODO: uncomment when service will be working
        //const URL = "";
        //const creds = localStorage.getItem("creds");

        // axios.get(URL + creds).then((response) => {
        //         if(response.data.authorized===true){
        //             localStorage.setItem("client_uuid", response.data.client_uuid)
        //             return true
        //         }
        //     }
        // )
        // return false;
    };

    static saveCreds(username: string, password: string): void {
        let credentials = username + password //TODO change to match service request 
        localStorage.setItem("creds", credentials)
    }

    static getClientID(): string{
        let creds = localStorage.getItem("client_uuid")
        return creds?creds:""
    }

    static createUser(username: string, password: string): void{ 
        //
    }

}

export default AuthService;
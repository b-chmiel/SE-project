import { Button, Container, Input } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { Link, useHistory} from 'react-router-dom';
import AuthService from '../AuthService';
import { Heading } from "@chakra-ui/react"


const AuthorizationPage: React.FC<{}> = ({children}) => {
    const history = useHistory();

    const authorized = AuthService.authorize();
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    useEffect(() => {
        if(authorized===true){
            history.push("/")
        }}
    )

    function onChangeUsername(e: React.FormEvent<HTMLInputElement>){
        setUsername(e.currentTarget.value)
    }

    function onChangePassword(e: React.FormEvent<HTMLInputElement>){
        setPassword(e.currentTarget.value)
    }

    function submitLogin(username: string, password: string){
        AuthService.saveCreds(username, password)
        history.push("/cars")
    }


    return (
        <>
            <Container variant={'authorization'}>
                <Heading as="h3" size="xl">Sign in</Heading>
                <Input value={username} onChange={onChangeUsername} placeholder="username" style={{width: "60%", margin: "10px 0 0 20%"}} />
                <Input value={password} onChange={onChangePassword} type="password" placeholder="password" style={{width: "60%", margin: "10px 20% 0 20%"}} />
                <Button onClick={()=>submitLogin(username, password)} style={{margin: "10px 40% 0 40%"}}>Login</Button>
                <Link to="/signup" style={{margin: "10px 40% 0 40%"}}>
                    Or sign up
                </Link>
            </Container>
        </>

    );
};
export default AuthorizationPage;
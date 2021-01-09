import { Box, Button, Container, Input } from '@chakra-ui/react';
import React, { useState } from 'react';
import { Link, useHistory} from 'react-router-dom';
import AuthService from '../AuthService';
import { Heading } from "@chakra-ui/react"
import { button, errormsg, input } from './Authorization.styles';


const AuthorizationPage: React.FC<{}> = ({children}) => {
    const history = useHistory();

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(false);

    function onChangeUsername(e: React.FormEvent<HTMLInputElement>){
        setUsername(e.currentTarget.value)
    }

    function onChangePassword(e: React.FormEvent<HTMLInputElement>){
        setPassword(e.currentTarget.value)
    }
    function showError(){
        return error===false?<></>:<Box style={errormsg}>
            Wrong credentials or user doesn't exist
        </Box>
    }

    function submitLogin(username: string, password: string){
        AuthService.saveCreds(username, password)
        AuthService.authorize().then((res)=>{
            if(res===true){
                history.push("/cars")
            }else{
                setError(true);
            }
        });
    }

    return (
        <>
            <Container variant={'authorization'}>
                <Heading as="h3" size="xl">Sign in</Heading>
                <Input value={username} onChange={onChangeUsername} placeholder="username" style={input} />
                <Input value={password} onChange={onChangePassword} type="password" placeholder="password" style={input}/>
                <Button disabled={username===""||password===""} onClick={()=>submitLogin(username, password)} style={button}>Login</Button>
                {showError()}
                <Link to="/signup" style={button}>
                    Or sign up
                </Link>
            </Container>
        </>

    );
};
export default AuthorizationPage;
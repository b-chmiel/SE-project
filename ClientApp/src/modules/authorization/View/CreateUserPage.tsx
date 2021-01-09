import { Box, Button, Container, Input } from '@chakra-ui/react';
import React, { useState } from 'react';
import { Link, useHistory} from 'react-router-dom';
import { Heading } from "@chakra-ui/react"
import { button, errormsg, input } from './Authorization.styles';
import { ClientRoutes, AuthenticationRoot} from '../../../routing/routes'
import { createUser } from '../AuthService';

const CreateUserPage: React.FC<{}> = ({children}) => {
    const history = useHistory();
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [first, setFirst] = useState(false)
    const [confirmPassword, setConfirmPassword] = useState("")

    function onChangeUsername(e: React.FormEvent<HTMLInputElement>){
        setUsername(e.currentTarget.value)
        setFirst(true)
    }

    function onChangePassword(e: React.FormEvent<HTMLInputElement>){
        setPassword(e.currentTarget.value)
        setFirst(true)
    }

    function onChangeConfirmPassword(e: React.FormEvent<HTMLInputElement>){
        setConfirmPassword(e.currentTarget.value)
        setFirst(true)
    }

    function submitLogin(username: string, password: string){
        createUser(username, password)
        history.push(ClientRoutes.CARS)
    }
    function showErrorMatching(){
        return password===confirmPassword?<></>:<Box style={errormsg}>
            Password must match!
        </Box>
    }
    function showErrorNotNull(){
        return (password===""||username===""||confirmPassword==="")&&first?<Box style={errormsg}>
            Fields cannot be null
        </Box>:<></>
    }

    return (
        <>
            <Container variant={'authorization'}>
                <Heading as="h3" size="xl">Sign up</Heading>
                <Input value={username} onChange={onChangeUsername} placeholder="username" style={input} />
                <Input value={password} onChange={onChangePassword} type="password" placeholder="password" style={input} />
                <Input value={confirmPassword} onChange={onChangeConfirmPassword} type="password" placeholder="confirm password" style={input} />
                <Button disabled={password!==confirmPassword||(password===""||username===""||confirmPassword==="")}
                     onClick={()=>submitLogin(username, password)} style={button}>Sing up</Button>
                {showErrorMatching()}
                {showErrorNotNull()}
                <Link to={AuthenticationRoot.SIGNIN} style={button}>
                    Or sign in
                </Link>
            </Container>
        </>

    );
};
export default CreateUserPage;
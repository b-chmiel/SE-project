import {Box, Button, Center, Container, Heading, Input} from '@chakra-ui/react';
import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {AuthenticationRoutes, ClientRoutes} from '../../../../routing/routes';
import {createUser} from '../../helpers/AuthService';
import {button, errormsg, input} from '../AuthorizationView/AuthorizationView.styles';

const CreateUserView: React.FC = ({children}) => {
    const history = useHistory();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [first, setFirst] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState('');

    function onChangeUsername(e: React.FormEvent<HTMLInputElement>) {
        setUsername(e.currentTarget.value);
        setFirst(true);
    }

    function onChangePassword(e: React.FormEvent<HTMLInputElement>) {
        setPassword(e.currentTarget.value);
        setFirst(true);
    }

    function onChangeConfirmPassword(e: React.FormEvent<HTMLInputElement>) {
        setConfirmPassword(e.currentTarget.value);
        setFirst(true);
    }

    function submitLogin(username: string, password: string) {
        createUser(username, password);
        history.push(ClientRoutes.CARS);
    }
    function showErrorMatching() {
        return password === confirmPassword ? <></> : <Box style={errormsg}>Password must match!</Box>;
    }
    function showErrorNotNull() {
        return (password === '' || username === '' || confirmPassword === '') && first ? (
            <Box style={errormsg}>Fields cannot be null</Box>
        ) : (
            <></>
        );
    }
    return (
        <Center>
            <Container variant={'authorization'}>
                <Center>
                    <Heading as="h3" size="xl">
                        Sign up
                    </Heading>
                </Center>
                <Input value={username} onChange={onChangeUsername} placeholder="username" style={input} />
                <Input value={password} onChange={onChangePassword} type="password" placeholder="password" style={input} />
                <Input
                    value={confirmPassword}
                    onChange={onChangeConfirmPassword}
                    type="password"
                    placeholder="confirm password"
                    style={input}
                />
                <Center>
                    <Button
                        disabled={password !== confirmPassword || password === '' || username === '' || confirmPassword === ''}
                        onClick={() => submitLogin(username, password)}
                        style={button}
                    >
                        Sign up
                    </Button>
                </Center>
                {showErrorMatching()}
                {showErrorNotNull()}
                <Link to={AuthenticationRoutes.SIGNIN} style={button}>
                    Or sign in
                </Link>
            </Container>
        </Center>
    );
};
export default CreateUserView;

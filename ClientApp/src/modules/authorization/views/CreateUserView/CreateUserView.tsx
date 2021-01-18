import {Box, Button, Center, Container, Heading, Input, Switch} from '@chakra-ui/react';
import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {AuthenticationRoutes} from '../../../../routing/routes';
import {createUser} from '../../helpers/AuthService';
import {boxswt, button, errormsg, input, swt} from '../AuthorizationView/AuthorizationView.styles';
import {getUserType} from './CreateUserView.helpers';

const CreateUserView: React.FC = ({children}) => {
    const history = useHistory();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [first, setFirst] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState('');
    const [type, setType] = useState(false); // CLIENT = false
    const [telephone, setTelephone] = useState('');
    const [alreadyExists, setAlreadyExists] = useState(false);

    function onChangeUsername(e: React.FormEvent<HTMLInputElement>) {
        setUsername(e.currentTarget.value);
        setFirst(true);
    }

    function onChangeName(e: React.FormEvent<HTMLInputElement>) {
        setName(e.currentTarget.value);
        setFirst(true);
    }
    function onChangeSurname(e: React.FormEvent<HTMLInputElement>) {
        setSurname(e.currentTarget.value);
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
    function onChangeTelephone(e: React.FormEvent<HTMLInputElement>) {
        setTelephone(e.currentTarget.value);
        setFirst(true);
    }
    function toggleType() {
        setType(!type);
    }

    function submitLogin(username: string, password: string) {
        createUser(name, surname, username, password, getUserType(type), telephone).then((r) => {
            if (r === true) {
                history.push(AuthenticationRoutes.SIGNIN);
            } else {
                setAlreadyExists(true);
            }
        });
    }
    function showErrorMatching() {
        return password === confirmPassword ? <></> : <Box style={errormsg}>Password must match!</Box>;
    }
    function showTelphoneError() {
        return telephone.length !== 9 && first ? <Box style={errormsg}>Telphone number must be 9 digts!</Box> : <></>;
    }
    function showAlreadyExistsError() {
        return alreadyExists === true && first ? <Box style={errormsg}>User already exists</Box> : <></>;
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
                <Input value={name} onChange={onChangeName} placeholder="Jan" style={input} />
                <Input value={surname} onChange={onChangeSurname} placeholder="Kowalski" style={input} />
                <Input value={username} onChange={onChangeUsername} placeholder="username" style={input} />
                <Input value={password} onChange={onChangePassword} type="password" placeholder="password" style={input} />
                <Input
                    value={confirmPassword}
                    onChange={onChangeConfirmPassword}
                    type="password"
                    placeholder="confirm password"
                    style={input}
                />
                <Input value={telephone} onChange={onChangeTelephone} type="tel" placeholder="500500500" style={input} />

                <Box style={boxswt} mb="0">
                    <Switch onChange={toggleType} id="type" style={swt} />
                    Are you employee?
                </Box>

                <Center>
                    <Button
                        disabled={
                            password !== confirmPassword ||
                            password === '' ||
                            username === '' ||
                            confirmPassword === '' ||
                            telephone.length !== 9 ||
                            name === '' ||
                            surname === ''
                        }
                        onClick={() => submitLogin(username, password)}
                        style={button}
                    >
                        Sign up
                    </Button>
                </Center>
                {showErrorMatching()}
                {showErrorNotNull()}
                {showTelphoneError()}
                {showAlreadyExistsError()}
                <Link to={AuthenticationRoutes.SIGNIN} style={button}>
                    Or sign in
                </Link>
            </Container>
        </Center>
    );
};
export default CreateUserView;

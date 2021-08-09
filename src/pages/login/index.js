import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

import { useHistory } from 'react-router';

import ModalProcess from '../home/Modal';

import 'bootstrap/dist/css/bootstrap.min.css';

import firebase from '../../connection/firebase';

export default function Login() {

    const isLogged = localStorage.getItem("@zoly:user");

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [showAwaitLogin, setShowAwaitLogin] = useState(false);
    const [showFailedLogin, setShowFailedLogin] = useState(false);

    const [errorCauseLogin, setErrorCauseLogin] = useState('');

    const history = useHistory();

    async function signIn(event) {
        event.preventDefault();

        setShowAwaitLogin(true);

        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then(data => {
                localStorage.setItem("@zoly:user", JSON.stringify(data.user.email));

                setShowAwaitLogin(false);
                history.push("/home");
            }).catch(error => {
                setShowAwaitLogin(false);
                //alert('Email ou senha inválidos. Tente novamente.');

                setShowFailedLogin(true);
                setErrorCauseLogin(error.message);
            });
    }

    if (isLogged) {
        window.location.href = "/home";

        return (null);
    } else {
        return (
            <div className='d-flex flex-column justify-content-center align-items-center bg-light h-100'>
                <h2 className="text-underline"><i>SCRP - Zoly</i></h2>
                <Form onSubmit={signIn} style={{ width: "50vh" }}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Login</Form.Label>
                        <Form.Control
                            onChange={(e) => setEmail(e.target.value)}
                            type="email" placeholder="Insira seu Login"
                            value={email} />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Senha</Form.Label>
                        <Form.Control
                            onChange={(event) => setPassword(event.target.value)}
                            onKeyDown={(event) => {
                                if (event.keyCode === 13) {
                                    signIn(event);
                                }
                            }}
                            type="password"
                            placeholder="Insira sua senha"
                            value={password} />
                    </Form.Group>
                    <Button className="w-100" type="submit" variant="success">
                        ENTRAR
                    </Button>
                </Form>
                {showAwaitLogin && <ModalProcess title="Verificando os dados, por favor aguarde." />}
                {showFailedLogin && <ModalProcess title={errorCauseLogin} error={true} />}
            </div>
        );
    }
};

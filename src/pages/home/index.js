import React, { useState, useEffect } from 'react';

import { InputGroup, FormControl, Table, Card, Button, Tab, Tabs } from 'react-bootstrap';
import { FaSearch, FaTimesCircle } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';

import DataTable from './DataTable';
import ModalProcess from './Modal';

import axios from 'axios';

export default function Home() {

    const [keyword, setKeyword] = useState('');
    const [showScrap, setShowScrap] = useState(false);

    const [showFailedEmails, setShowFailedEmails] = useState(false);

    const [results, setResults] = useState([]);

    function getResults(keyword) {
        const BASE_URL = 'http://localhost:8080/' + keyword;

        return BASE_URL;
    }

    function clear() {
        setResults([]);
        setKeyword('');
    }

    function runScrap() {
        if (keyword) {
            setShowScrap(true);

            axios.get(getResults(keyword)).then((response) => {

                console.log(JSON.stringify(response));

                setResults(response.data);

                setShowScrap(false);

            }).catch((error) => {
                console.log("BUGOU: " + error);

                setShowScrap(false);
                setShowFailedEmails(true);
            });
        } 
    }

    useEffect(() => {
        if (results.length > 0) {
            console.log(JSON.stringify(results));
            //console.log(domains);
            //alert('entrou');
        }
    }, [results]);

    return (
        <div className='d-flex container-fluid flex-column justify-content-center align-items-center bg-light h-25 p-2  '>
            <Card className="w-75 h-100">
                <Card.Header className="d-flex flex-column justify-content-center align-items-center">
                    <h2 className="text-underline"><i>Buscar por palavra-chave</i></h2>
                    <hr></hr>
                    <div className="w-100">
                        <InputGroup className="mb-3 d-flex">
                            <div className="d-flex flex-row justify-content-center align-items-center col">
                                <FormControl
                                    className="w-75"
                                    placeholder="Palavra-chave"
                                    aria-label="Palavra-chave"
                                    aria-describedby="basic-addon1"
                                    value={keyword}
                                    onChange={(e) => setKeyword(e.target.value)}
                                    onKeyDown={(event) => {
                                        if (event.keyCode === 13) {
                                            runScrap();
                                        }
                                    }}
                                />

                                <Button
                                    className="ml-3 text-white"
                                    variant="success"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    title="Buscar resultados"
                                    onClick={() => runScrap()}>
                                    <FaSearch />
                                </Button>
                                <Button
                                    className="ml-3 text-white"
                                    variant="danger"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    title="Limpar campos"
                                    onClick={() => clear()}>
                                    <FaTimesCircle />
                                </Button>

                            </div>
                        </InputGroup>
                    </div>
                    {showScrap && <ModalProcess title="Buscando os domínios. Por favor, aguarde." />}
                    {showFailedEmails && <ModalProcess title="Houve uma falha no retorno dos emails. Reinicie tudo e tente novamente." error={true} />}
                </Card.Header>
                <Card.Body>
                    <Tabs
                        variant="tabs"
                        className="flex-nowrap overflow-auto"
                    >
                        {results ? results.map((item, index) =>
                        (
                            <Tab 
                                eventKey={index} 
                                title={item.domain}
                                className="flex-nowrap"
                            >
                                <Table className="text-center mt-3 pb-5" striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th>Nome</th>
                                            <th>E-mail</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {item && item.emails.map((e) => <DataTable first_name={`${e.first_name}`} last_name={`${e.last_name}`} email={e.value} />)}
                                    </tbody>

                                </Table>
                            </Tab>
                        )) : null}
                    </Tabs>
                </Card.Body>
            </Card>
        </div >
    );
};
/*
*/
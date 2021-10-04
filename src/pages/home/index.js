import React, { useState, useEffect } from 'react';

import { InputGroup, FormControl, Form, Table, Card, Button } from 'react-bootstrap';
import { FaSpinner } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';

import DataTable from './DataTable';
    
import axios from 'axios';

export default function Home() {

    const [valueSearch, setValueSearch] = useState('');
    const [results, setResults] = useState([]);
    const [resultsApresentation, setResultsApresentations] = useState([]);

    function moreUsers() {
        const limit = results.length + 50;
        axios.get('http://localhost:8080/users/' + limit, {
            headers: {
                'api-key': '202217'
            }
        }).then(data => {
            //alert(JSON.stringify(data))
            setResults(data.data.user_list);
            setResultsApresentations(data.data.user_list);

            document.querySelector("#All").click();
        }).catch(err => {
            alert(JSON.stringify(err));
        });
    }

    function apresentationByFilter(value) {
        setValueSearch(value);
        setResultsApresentations([]);

        if (value === '') {
            setResultsApresentations(results)
        } else {
            var array_aux = [];
            results.map((item) => {
                var genre = item.genre_user;
                var nationality = item.nationality_user;
                (JSON.stringify(genre).toLowerCase() === JSON.stringify(value).toLowerCase() || JSON.stringify(nationality).toLowerCase() === JSON.stringify(value).toLowerCase()) && array_aux.push(item)
                return true;
            })

            setResultsApresentations(array_aux);
        }
    }

    function apresentationByGenre(genre) {
        setResultsApresentations([]);

        if (genre === 'All') {
            setResultsApresentations(results)
        } else {
            var array_aux = [];
            results.map((item) => {
                item.genre_user === genre && array_aux.push(item);
                return true;
            })

            setResultsApresentations(array_aux);
        }
    }

    useEffect(() => {
        async function getData() {
            axios.get('http://localhost:8080/users', {
                headers: {
                    'api-key': '202217'
                }
            }).then(data => {
                //alert(JSON.stringify(data))
                setResults(data.data.user_list);
                setResultsApresentations(data.data.user_list);
            }).catch(err => {
                alert(JSON.stringify(err));
            });
        }

        getData();
    }, []);

    return (
        <div className='d-flex container-fluid flex-column justify-content-center align-items-center h-100'>
            <Card className="w-75 h-100 m-5">
                <Card.Header className="d-flex flex-column justify-content-center align-items-center">
                    <h2 className="text-underline"><i>Users registeders</i></h2>
                    <hr></hr>
                    <div className="w-100">
                        <InputGroup className="mb-3 d-flex">
                            <div className="d-flex flex-row justify-content-center align-items-center col">
                                <FormControl
                                    className="w-75"
                                    placeholder="Search by name/nationality"
                                    aria-label="Search by name/nationality"
                                    aria-describedby="basic-addon1"
                                    value={valueSearch}
                                    onChange={(event) => {
                                        apresentationByFilter(event.target.value);
                                    }}
                                />

                            </div>
                        </InputGroup>
                        <div className="container-fluid ml-5">
                            <Form.Check
                                inline
                                label="All"
                                name="genre_option"
                                type={"radio"}
                                defaultChecked={true}
                                onClick={(event) => apresentationByGenre(event.target.id)}
                                id={"All"}
                            />
                            <Form.Check
                                inline
                                label="Female"
                                name="genre_option"
                                type={"radio"}
                                onClick={(event) => apresentationByGenre(event.target.id)}
                                id={"female"}
                            />
                            <Form.Check
                                inline
                                label="Male"
                                name="genre_option"
                                type={"radio"}
                                onClick={(event) => apresentationByGenre(event.target.id)}
                                id={"male"}
                            />
                        </div>
                    </div>
                </Card.Header>

                <Table style={{ borderStyle: "none" }} className="text-center pb-5" striped bordered hover>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Gender</th>
                            <th>Birth</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {resultsApresentation ? resultsApresentation.map((item, index) =>
                        (
                            <DataTable
                                id_user={`${item.id}`}
                                image_user={`${item.path_image_user}`}
                                name={`${item.name_user}`}
                                email={`${item.email_user}`}
                                genre={item.genre_user}
                                birth={item.birth_user}
                                phone={item.phone_user}
                                nationality={item.nationality_user}
                                city_user_address={item.city_user_address}
                                street_user_address={item.street_user_address}
                                number_home_user_address={item.number_home_user_address}
                                state_user_address={item.state_user_address}
                            />
                        )) : null}
                    </tbody>
                </Table>
                <div className="d-flex justify-content-center w-50 align-self-center">
                    <Button
                        className="mb-5 text-white w-25"
                        variant="primary"
                        data-toggle="tooltip"
                        data-placement="top"
                        title="Carregar mais 50 usuários"
                        onClick={() => moreUsers()}
                    >
                        <FaSpinner className="mr-3" size={25} />
                        Mais
                    </Button>
                </div>

            </Card>
        </div >
    );
};
/*
*/
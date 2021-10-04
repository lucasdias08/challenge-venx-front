import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Button } from 'react-bootstrap';
import { FaEye } from 'react-icons/fa';

import ModalViewUser from '../ModalViewUser';

export default function DataTable(props) {

  const [showEditUser, setShowEditUser] = useState(false);

  return (
    <tr>
      <td>{props.name}</td>
      <td>{props.genre}</td>
      <td>{props.birth}</td>
      <td>
        <div className="d-flex flex-row justify-content-center w-100">
          <Button
            className="m-1 text-white w-150"
            variant="primary"
            data-toggle="tooltip"
            data-placement="top"
            title="Editar"
            onClick={() => setShowEditUser(true)}>
            <FaEye />
          </Button>

          {showEditUser && 
            <ModalViewUser
              setShowEditUser={setShowEditUser}
              {...props}
            />
          }
        </div>
      </td>
    </tr>
  );
};
/*
*/
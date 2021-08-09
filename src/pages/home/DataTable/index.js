import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function DataTable(props){
 
    const [first_name] = useState(props.first_name);
    const [last_name] = useState(props.last_name);

    const [color, setColor] = useState('text-dark');

    useEffect(() => {
      if(first_name === 'null' || last_name === 'null'){
        setColor('text-danger')
      }
    }, [])

    return(
        <tr>
          <td className={color} >{first_name === 'null' || last_name === 'null' ? 'Não retornado/existente' : first_name+ ' ' +last_name}</td>
          <td>{props.email}</td>
        </tr>
  );
};
/*
*/
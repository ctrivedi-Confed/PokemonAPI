import React from 'react'
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

const HeaderCard = (props) => {
  return (
    <Card>
        <Link className='navigationClass' to={props.link}>
            <Card.Body>
                <div>{props.title}</div>
            </Card.Body>
        </Link>
    </Card>
  )
}

export default HeaderCard
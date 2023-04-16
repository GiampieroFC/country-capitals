import { Card } from 'react-bootstrap';


function Titulo({ country }) {
    return (
        <Card.Title className='fs-4'>{country} ?</Card.Title>
    )
}

export default Titulo
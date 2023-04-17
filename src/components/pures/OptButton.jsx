import { Button } from 'react-bootstrap'

function OptButton({ city, fn }) {

    function fnHandle(e) {
        return fn(e)
    }

    return (
        <Button data-city={city} className='m-1' variant="outline-dark" onClick={fnHandle}>{city}</Button>
    )
}

export default OptButton
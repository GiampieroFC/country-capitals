import { Button } from 'react-bootstrap'

function OptButton({ id, city, fn, dis }) {

    function fnHandle(e) {
        return fn(e)
    }

    return (
        <Button disabled={dis} className='m-2' id={id} variant="outline-secondary" size='lg' onClick={fnHandle}>{city}</Button>
    )
}

export default OptButton
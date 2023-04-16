import { Button } from 'react-bootstrap'

function OptButton({ id, city, fn, dis }) {

    function fnHandle(e) {
        return fn(e)
    }

    return (
        <Button disabled={dis} className='m-1' id={id} variant="outline-dark" onClick={fnHandle}>{city}</Button>
    )
}

export default OptButton
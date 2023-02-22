import { useState } from 'react'
import { useEffect } from 'react'
import { Card } from 'react-bootstrap'
import getCC from '../../models/getCC'
import Options from '../../models/options.class'
import Flag from '../pures/Flag'
import OptButton from '../pures/OptButton'
import Titulo from '../pures/Titulo'
import uwu from '/wow-By-Tuna.mp3'
import Spinner from 'react-bootstrap/Spinner';
import Form from 'react-bootstrap/Form';

function GameContainer() {
    const [countries, setCountries] = useState([])
    const [correct, setCorrect] = useState({})
    const [bl, setBl] = useState(false)
    const [s, setS] = useState(false)
    const [dis, setDis] = useState(false)
    const [points, setPoints] = useState({
        point: 0,
        total: 0
    })

    function check(points) {
        if (points.total === 3) {
            setPoints({
                point: 0,
                total: 0
            })
        }
    }

    const uwup = new Audio(uwu)

    useEffect(() => {
        check(points)
        setDis(false)
        getCC()
            .then(d => {
                const Opts = new Options(d)
                return Opts
            })
            .then(Opts => {

                const correct = Opts.getCorrect()
                const countries = Opts.opts

                // correct = Opts.getCorrect()
                // countries = Opts.opts

                document.getElementsByTagName('link')[0].attributes.href.value = correct.flag;
                document.getElementsByTagName('title')[0].textContent = correct.country;

                setCorrect(correct)
                setCountries(countries)

            })
            .catch(() => setBl(prev => !prev))


        return () => {
            setCountries([]);
            setCorrect({});
        }
    }, [bl])


    function handlerSound(e) {
        setS(prev => e.target.checked)
    }

    function gol(e) {

        setDis(true)

        if (e.target.id === correct.capital) {
            e.target.className = 'm-2 btn btn-success btn-lg';
            s ? uwup.play() : '';
            setPoints({
                point: points.point + 1,
                total: points.total + 1,
            });
            return setTimeout(() => setBl(prev => !prev), 2000);
        } else {
            e.target.className = 'm-2 btn btn-danger btn-lg';
            setPoints({
                ...points,
                total: points.total + 1,
            });
            s ? window.navigator.vibrate(400) : '';
            return setTimeout(() => setBl(prev => !prev), 2000);
        }
    }




    return (
        <>

            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check id='sound' onChange={handlerSound} type="checkbox" label={s ? '🔊📳' : '🔇📴'} />
            </Form.Group>


            <Card className="text-center">
                <Card.Header className='fs-3'>What is the capital of

                </Card.Header>

                <Card.Body>

                    {Object.entries(correct).length === 0
                        ?
                        <><Spinner animation="border" variant="dark" />... 🤔💭 ...</>
                        :
                        <>
                            <Titulo country={correct.country} />
                            <br />
                            <Flag flag={correct.flag} />
                            <hr />
                            <div>
                                {
                                    countries.map((e, i) => < OptButton dis={dis} id={e.capital} fn={gol} key={e + i} city={e.capital} />)
                                }
                            </div>
                        </>

                    }


                </Card.Body>
                <Card.Footer>Points: {points.point}/{points.total} </Card.Footer>

            </Card>

        </>
    )
}

export default GameContainer
import { useState, useEffect } from 'react'
import { Card, Col, Row, Button, Stack, OverlayTrigger, Popover } from 'react-bootstrap'
import getCC from '../../models/getCC'
import Options from '../../models/options.class'
import Flag from '../pures/Flag'
import OptButton from '../pures/OptButton'
import Titulo from '../pures/Titulo'
import uwu from '/wow-By-Tuna.mp3'
import Spinner from 'react-bootstrap/Spinner';
import Form from 'react-bootstrap/Form';
import { Helmet } from "react-helmet";

function GameContainer() {
    const [countries, setCountries] = useState([])
    const [correct, setCorrect] = useState({})
    const [bl, setBl] = useState(false)
    const [s, setS] = useState(false)
    const [dis, setDis] = useState(false)
    const [points, setPoints] = useState(JSON.parse(window.localStorage.getItem('points')) || {
        streak: 0,
        point: 0,
        total: 1,
    })



    const save = () => {
        const stringyfied = JSON.stringify(points)
        window.localStorage.setItem('points', stringyfied)
    }

    save()

    const uwup = new Audio(uwu)

    useEffect(() => {

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

                setCorrect(correct)
                setCountries(countries)

            })
            .catch(() => setBl(prev => !prev))

        console.log('fetchee')

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

        if (e.target.dataset.city === correct.capital) {
            e.target.className = 'm-1 btn btn-success';
            s && uwup.play();
            setPoints({
                ...points,
                streak: points.streak + 1,
                point: points.point + 1,
            });
        } else {
            e.target.className = 'm-1 btn btn-danger';
            setPoints({
                ...points,
                streak: 0,
            });
            s && window.navigator.vibrate(400);
        }

    }



    return (
        <>

            <Helmet>
                <meta charset="UTF-8" />
                <link rel="icon" type="image/png" href={correct.flag} />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>{`Capitality | ${correct.country}`}</title>
            </Helmet>

            <Stack direction="horizontal" className=' d-flex justify-content-between align-items-start' gap={3}>

                <Form.Group controlId="formBasicCheckbox">
                    <Form.Check id='sound' onChange={handlerSound} type="checkbox" label={s ? '🔊' : '🔇'} />
                </Form.Group>

                <p className='bg-dark bg-opacity-75 px-3 py-1 font-monospace fw-bold rounded' style={{ color: 'white' }}>
                    Streak: {points.streak}{'  '}
                    Corrects: {points.point}{'  '}
                    Played: {points.total}
                </p>


                <Button variant="danger" size='sm' onClick={() => {
                    setPoints({
                        streak: 0,
                        point: 0,
                        total: 1,
                    })

                }}>
                    Reset points
                </Button>

            </Stack>


            <Row className='d-flex justify-content-center align-items-center flex-grow-1'>

                <Col xs={10} sm={10} md={7} lg={6} xl={5} xxl={4} >
                    <Card bg='light' className="text-center mb-5">
                        <Card.Header className='fs-5'>What is the capital of

                        </Card.Header>

                        <Card.Body>

                            {Object.entries(correct).length === 0
                                ?
                                <>
                                    🤔mmm...💭
                                    <hr />
                                    <Spinner animation="border" variant="dark" />
                                </>
                                :
                                <>
                                    <Titulo country={correct.country} />
                                    <Flag flag={correct.flag} />
                                    <hr />

                                    {
                                        countries.map((e, i) => <OptButton fn={dis ? () => { } : gol} key={i} city={e.capital} />)
                                    }

                                </>

                            }


                        </Card.Body>

                        <Card.Footer className="d-flex justify-content-between text-muted">

                            {dis
                                ?
                                <>
                                    <OverlayTrigger
                                        trigger="focus"
                                        placement="top"
                                        overlay={
                                            <Popover>
                                                <Popover.Header as="h4">👉 {correct.capital}</Popover.Header>
                                                <Popover.Body>
                                                    <a href={`https://en.wikipedia.org/wiki/${correct.capital}`} target="_blank" rel="noopener noreferrer">Check it!</a>
                                                </Popover.Body>
                                            </Popover>
                                        }
                                    >
                                        <Button size="sm" variant="outline-dark">See the correct answer!</Button>
                                    </OverlayTrigger>
                                </>
                                :
                                <>
                                    <OverlayTrigger
                                        trigger="focus"
                                        placement="right"
                                        overlay={
                                            <Popover>
                                                <Popover.Body>
                                                    First your answer...
                                                </Popover.Body>
                                            </Popover>
                                        }
                                    >
                                        <Button size="sm" variant="outline-dark">See the correct answer!</Button>
                                    </OverlayTrigger>
                                </>
                            }

                            <Button variant="outline-success" onClick={() => {
                                setPoints({
                                    ...points,
                                    total: points.total + 1,
                                });


                                setBl(prev => prev = !prev)

                            }} size="sm">Next &gt;</Button>
                        </Card.Footer>

                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default GameContainer
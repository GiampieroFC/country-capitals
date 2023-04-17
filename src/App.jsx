import GameContainer from './components/containers/GameContainer'
import { Container } from 'react-bootstrap';
import './style.css'

function App() {
  return (
    <div className='animateme'>

      <ul className="bg-bubbles">
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>

      <Container
        className='d-flex min-vh-100 flex-column'
        fluid
      >

        <GameContainer />

      </Container>

    </div>
  )
}

export default App

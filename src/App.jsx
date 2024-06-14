import { useState } from 'react'
import './App.css'
import Decrypt from './Decrypt'
import Encrypt from './Encrypt'
import { Button, ButtonGroup, Card, Col, Container } from 'react-bootstrap'

function App() {

  const [mode, setMode] = useState("Decrypt")

  return (
    <div id='container'>
      <Container fluid className='mt-3'>
        <Col>
          <Card body id="decrypt-container" style={{ backgroundColor: '#EDEDED' }}>
            <div id='options'>
              <ButtonGroup className='mb-3'>
                <Button
                  disabled={mode === 'Encrypt'} onClick={() => setMode("Encrypt")}
                  variant='dark'>
                  Encrypt
                </Button>
                <Button
                  disabled={mode === 'Decrypt'} onClick={() => setMode("Decrypt")}
                  variant='dark'>
                  Decrypt
                </Button>
              </ButtonGroup>
            </div>
            {
              mode === "Decrypt" ?
                <Decrypt /> : <Encrypt />
            }
          </Card>
        </Col>

      </Container>


    </div>
  )
}

export default App

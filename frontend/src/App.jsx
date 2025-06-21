// src/App.jsx
import { useState } from 'react'
import { Container, Navbar, Nav, Button, Card } from 'react-bootstrap';

export default function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar bg="success" variant="dark">
        <Container>
          <Navbar.Brand href="#">SportMind</Navbar.Brand>
          <Nav>
            <Nav.Link href="#dashboard">Dashboard</Nav.Link>
            <Nav.Link href="#instituicoes">Instituições</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Container className="py-5 text-center">
        <h1 className="mb-4">Bootstrap carregado com sucesso!</h1>

        <Card className="p-3 mb-4 mx-auto" style={{ maxWidth: '400px' }}>
          <Card.Body>
            <Card.Title>Contador de Teste</Card.Title>
            <Button onClick={() => setCount((c) => c + 1)} variant="primary">
              count is {count}
            </Button>
          </Card.Body>
        </Card>

        <Button variant="outline-secondary" href="https://vite.dev" className="me-2">
          Vite Docs
        </Button>
        <Button variant="outline-secondary" href="https://react.dev">
          React Docs
        </Button>
      </Container>
    </>
  )
}
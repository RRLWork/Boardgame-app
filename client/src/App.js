import { Switch, Route } from "react-router-dom";
import { Container, Col, Row } from "react-bootstrap";
import Account from "./components/Account/Account";
import FreeComponent from "./components/FreeComponent/FreeComponent";
import AuthComponent from "./components/AuthComponent/AuthComponent";
import ProtectedRoutes from "./components/ProtectedRoute/ProtectedRoute";


function App() {
  return (
    <Container>
      <Row>
        <Col className="text-center">
          <h1>Boardgame Library App</h1>

          <section id="navigation">
            <a href="/">Home</a>
            <a href="/free">About</a>
            <a href="/auth">My Boardgames Library</a>
          </section>
        </Col>
      </Row>

      {/* create routes here */}
      <Switch>
        <Route exact path="/" component={Account} />
        <Route exact path="/free" component={FreeComponent} />
        <ProtectedRoutes path="/auth" component={AuthComponent} />
      </Switch>
    </Container>
  );
}

export default App;
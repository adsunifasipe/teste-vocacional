import React from "react";
// reactstrap components
import { Button, Container, Row, Col } from "reactstrap";

class Hero extends React.Component {
  render() {
    return (
      <>
        <Container className="shape-container d-flex align-items-center py-md" style={{ paddingTop: 20 }}>
          <div className="col px-0">
            <Row className="align-items-center justify-content-center">
              <Col className="text-center" lg="12" style={{ color: "#272727", fontSize: "25pt"}}>
                <b>BEM VINDO AO</b>
              </Col>
              <Col className="text-center" lg="12">
                <b style={{ color: "#272727", fontSize: "70pt"}}>Teste vocacional</b>
              </Col>
              <Col className="text-center" lg="12" style={{ color: "#272727", fontSize: "21pt"}}>
                Descubra de forma divertida com qual área de atuação você tem amis afinidadade!!
              </Col>
              <Col className="text-center" lg="12" style={{ marginTop: 10 }}>
                <Button
                  className="text-center"
                  href="/Teste"
                  size="lg"
                  style={{ width:"100%", backgroundColor: "#3AA357", color: "#fff", border: "none", borderRadius: 15, height: 180, fontSize: 100 }}
                > INICIAR </Button>

                <img
                  alt="..."
                  className="img-fluid"
                  src={require("assets/unifasipe.png")}
                  style={{ width: "40%", marginTop: 30 }}
                />
              </Col>
            </Row>
          </div>
        </Container>
      </>
    );
  }
}

export default Hero;

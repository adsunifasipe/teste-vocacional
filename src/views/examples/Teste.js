import React, { useEffect, useState } from "react";
// reactstrap components
import {
  Button,
  Card,
  CardBody,
  Container,
  Row,
  Col
} from "reactstrap";
import { Box } from "@material-ui/core";
import aPerguntas from "../../assets/data.json";

export default function Teste() {
  const [ListaPerguntas, setListaPerguntas] = useState([]);
  const [ListaRespostas, setListaRespostas] = useState([]);

  const [Perguntas, setPerguntas] = useState([]);
  const [Atual, setAtual] = useState(1);

  useEffect(() => {
    setPerguntas(aPerguntas.atividades);
    if(ListaPerguntas.length === 0) { getPerguntas(); }
  }, [ListaPerguntas, Atual ]);

  function getPerguntas(){
      const maxNumbers = 12;
      let n = 0;
      let list = [];

      while (list.length < maxNumbers) {
        n =  randomIntFromInterval(1, maxNumbers);
        let found = list.find(element => element == n);

        if(found === undefined) {
          list[list.length] = n;
        }
      }
      
      setListaPerguntas(list);
    }
  

    function SalvaResposta(curso) {
      let respostas = ListaRespostas;
      respostas[respostas.length] = curso;

      setListaRespostas(respostas);

      let perguntas = ListaPerguntas;

      perguntas.shift();
      perguntas.shift();

      setListaPerguntas(perguntas);
      setAtual(Atual+1);

      if(perguntas.length === 0 ){
        localStorage.setItem("@Respostas", respostas)
        window.location.href = "/Finalizar";
      }
    }

    function randomIntFromInterval(min, max) { // min and max included 
      return Math.floor(Math.random() * (max - min + 1) + min)
    }

    return (
      <>
        <main>
          <section className="section section-shaped section-sm" style={{ paddingTop: "1em" }}>
            <Container className="py-md">
              <Row className="justify-content-start">
                <Col lg="12" style={{ fontSize: 21 }}><b>Teste vocacional</b></Col>
                <Col lg="10" style={{ fontSize: 28 }}>ESCOLHA UMA OPÇÃO / { Atual + " de 6"}</Col>
                <Col lg="2">
                  <img
                    alt="..."
                    src={require("assets/unifasipe.png")}
                    style={{ width: "100%"}}
                  />
                </Col>
                { ListaPerguntas.length > 0 ?(
                  <>
                    <Col lg="6" className="text-center" style={{ marginBottom: 10 }}>
                      <Card className="bg-secondary shadow border-0">
                        <CardBody className="px-lg-1 py-lg-1">
                          <img
                            alt="..."
                            className="img-fluid"
                            src={require("assets/img/" + Perguntas[ListaPerguntas[0]-1].id + ".jpg")}
                            style={{ height: "30%", cursor:"pointer" }}
                            onClick={(e) => SalvaResposta(Perguntas[ListaPerguntas[0]-1].curso)}
                          />
                        </CardBody>
                      </Card>
                      <Box style={{ padding: 2 }}><h5><b>{ Perguntas[ListaPerguntas[0]-1].atividade } </b></h5></Box>
                    </Col>

                    <Col lg="6" className="text-center" style={{ marginBottom: 10 }}>
                      <Card className="bg-secondary shadow border-0">
                        <CardBody className="px-lg-1 py-lg-1">
                          <img
                            alt="..."
                            className="img-fluid"
                            src={require("assets/img/" + Perguntas[ListaPerguntas[1]-1].id + ".jpg")}
                            style={{ height: "30%", cursor:"pointer" }}
                            onClick={(e) => SalvaResposta(Perguntas[ListaPerguntas[1]-1].curso)}
                          />
                        </CardBody>
                      </Card>
                      <Box style={{ padding: 2 }}><h5><b>{ Perguntas[ListaPerguntas[1]-1].atividade } </b></h5></Box>
                    </Col>
                  </>
                ) : null }
              </Row>

              <Row className="align-items-center justify-content-center" style={{ padding: 0 }}>
                <Button
                  className="btn-icon mb-3 mb-sm-0"
                  color="danger"
                  href="/"
                  style={{ padding: 10, textAling: "center", verticalAling: "middle" }}
                >
                  <span className="btn-inner--icon mr-1">
                    <i className="fa fa-circle-o-notch fa-spin fa-2x fa-fw" />
                  </span>
                  <span className="btn-inner--text" style={{ fontSize: 20 }}>Reiniciar</span>
                </Button>
              </Row>
            </Container>
          </section>
        </main>
      </>
    );
}


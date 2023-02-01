import React, { useEffect, useState } from "react";

// reactstrap components
import { Container, Row, Col, Card, CardBody, CardHeader } from "reactstrap";
import { Button, Box } from "@material-ui/core";
import QRCode from "react-qr-code";

import gabarito from "../../assets/data.json";

export default function Finalizar() {
  const [Cursos, setCursos] = useState([]);
  const [Rank, setRank] = useState([]);
  const [Rank2, setRank2] = useState([]);
  const [Lista, setLista] = useState([]);

  useEffect(() => {
    if(Cursos.length === 0 ){
      if(localStorage.getItem("@Respostas")) { getRespostas(); }else{ window.location.href = "/"; }
    }
  }, [ Cursos ]);

  function getRespostas(){
    let lc = gabarito.cursos;
    let totalizador = countDuplicates(localStorage.getItem("@Respostas").split(","));
    setCursos(totalizador);

    let teste = rank(totalizador, "curso");

    let c = 0;
    let listaZ = [];
    let lista = [];

    teste.sort(function(a,b) {
      return parseInt(a.total) < parseInt(b.total);
    }).forEach(value => {
      lista[c] = lc[value.value].descricao;
      listaZ[c] = {
        fone: lc[value.value].fone,
        curso: lc[value.value].descricao
      };
      c++;
    });

    setRank(lista);
    setLista(listaZ);
    setRank2(listaZ.slice(2));


    setTimeout(() => {
      Reset()
    }, 60000);
  }

  var rank = function(items, prop) {
    var results = {}
  
    for(var i=0;i<items.length;i++) {
      var value = items[i][prop];
  
      var count = (results[value] || 0) + 1;
      results[value] = count;
    }
  
    var ranked = []
  
    for(var key in results) {
      if(results.hasOwnProperty(key)) {
        ranked.push({value:key, count:results[key]}); 
      }
    }

    return ranked.sort(function(a, b) { return b.count - a.count; });
  }

  function countDuplicates(arr) {
    let lista = [];
    let i = 0;

    const map = Object.create(null);
    for (const str of arr) {
      if (map[str]) {
        // Se já tiver contabilizado, some `1` ao contador:
        map[str] += 1;
      } else {
        // Caso contrário, iniciamos o contador como `1`:
        map[str] = 1;
      }

      lista[i] = {
        "curso": str,
        "total": map[str]
      }

      i++
    }

    return lista;
  }

  function Reset() {
    localStorage.clear();
    document.location.href = "/"
  }

  return (
    <main>
      <Container className="shape-container d-flex align-items-start py-md" style={{ paddingTop: 20, maxWidth: 1200 }}>
        <div className="col px-0">
          <Row className="align-items-start justify-content-start">
            <Col lg="6">
              <Row className="align-items-start justify-content-start">
                <Col className="text-left" lg="12" style={{ color: "#272727", fontSize: "21pt"}}>
                  VOCÊ TEM AFINIDADE COM:
                </Col>
                <Col className="text-left" lg="12" style={{ color: "#272727", fontSize: "50pt"}}>
                  <i><b>{ Rank[0] }</b></i>
                </Col>
                <Col className="text-left" lg="12" style={{ color: "#272727", fontSize: "30pt"}}>
                  <i><b>{ Rank[1] }</b></i>
                </Col>
                { Rank2.length > 0 ? (
                  <>
                    <Col className="text-left" lg="12" style={{ color: "#272727", fontSize: "21pt"}}>
                      VOCÊ TAMBÉM PODE GOSTAR DE:
                    </Col>
                    { Rank2.map( (rk) => 
                      <Col key={rk.curso} className="text-left" lg="12" style={{ color: "#272727", fontSize: "25pt"}}><i><b>{ rk.curso }</b></i></Col>
                    )}
                    
                  </>
                ) : (null) }
              </Row>

              <Row className="align-items-center justify-content-center">
                <Col className="text-center" lg="12" style={{ marginTop: 10 }}>
                  <Button
                    className="text-center"
                    size="large"
                    onClick={(e) => Reset() }
                    style={{ width:"55%", backgroundColor: "#177CA8", color: "#fff", border: "none", borderRadius: 15, height: 75, fontSize: 31 }}
                  > <i>Início</i> </Button>
                </Col>
                <Col className="text-center" lg="12" style={{ marginTop: 10 }}>
                  <img
                    alt="..."
                    className="img-fluid"
                    src={require("assets/unifasipe.png")}
                    style={{ width: "55%", marginTop: 30 }}
                  />
                </Col>
              </Row>
            </Col>
            <Col lg="6">
              <Row className="align-items-start justify-content-start">
                <Col className="text-center" lg="12" style={{ color: "#272727", fontSize: "21pt"}}>Não perca tempo, fale conosco!</Col>
                <Col lg="12" className="text-center">
                  <Row className="align-items-start justify-content-start">
                    { Lista.map((rk) => 
                      <Col lg="6" className="text-center px-lg-2 py-lg-2" key={rk.curso}>
                        <Card className="bg-secondary shadow border-0">
                          <CardBody className="px-lg-1 py-lg-1">
                            <Box style={{ color: "#272727", fontSize: "14pt"}}><b>{ rk.curso }</b></Box>
                            <QRCode 
                              style={{ height: "auto", maxWidth: "100%", width: "80%" }}
                              value={"https://wa.me/55" + rk.Fone + "?text=Olá! Eu vim pelo teste vocacional UNIFASIPE e tenho interesse em saber mais sobre o curso de " + rk.curso}
                            />
                          </CardBody>
                        </Card>
                      </Col>
                    )}
                  </Row>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      </Container>
    </main>
  );
}


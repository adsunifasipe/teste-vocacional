import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "assets/vendor/nucleo/css/nucleo.css";
import "assets/vendor/font-awesome/css/font-awesome.min.css";
import "assets/scss/argon-design-system-react.scss?v1.1.0";

import Index from "views/Index.js";
import Teste from "views/examples/Teste.js";
import Finalizar from "views/examples/Finalizar.js";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" exact element={<Index  />} />
      <Route path="/Teste" exact element={ <Teste  />} />
      <Route path="/Finalizar" exact element={ <Finalizar  />} />
      <Route path='*' element={<Index />}/>
    </Routes>
  </BrowserRouter>
);

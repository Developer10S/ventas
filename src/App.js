import React from "react";
import "bulma/css/bulma.css";
import "@fortawesome/fontawesome-free/js/all";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Clientes from "./pages/Clientes";
import Home from "./pages/Home";
import Axios from "axios";

Axios.interceptors.request.use(function (config) {
  config.url = `${process.env.REACT_APP_API_BASE_URL}${config.url}`;
  return  config;}
);

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/clientes" element={<Clientes />} />
      </Routes>
    </Router>
  );
};

export default App;

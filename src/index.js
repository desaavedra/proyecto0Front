import React from 'react';
import ReactDOM from 'react-dom';
import Login from './components/login';
import Events from './components/events'
import CrearEvento from './components/crearEvento'
import EditarEvento from './components/editarEvento'
import DetailEvento from './components/detailEvento'
import CrearUsuario from './components/crearUsuario'
import './styles/index.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

ReactDOM.render(
  <Router>
    <Switch>
      <Route exact path="/">
        <Login />
      </Route>
      <Route exact path="/crearusuario">
        <CrearUsuario/>
      </Route>
      <Route exact path="/eventos">
        <Events />
      </Route>
      <Route exact path="/creareventos">
        <CrearEvento />
      </Route>
      <Route exact path="/editareventos"
        render={
          (props) => <EditarEvento estado={props}/>
        }
      />
      <Route exact path="/detailevento"
        render={
          (props) => <DetailEvento estado={props} />
        }
      />
    </Switch>
  </Router>
  ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

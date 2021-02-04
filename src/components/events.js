import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import Button from '@material-ui/core/Button';
import { Redirect } from "react-router-dom";
class Events extends React.Component {
    state = {
        respuesta: [],
        esPresencial: false,
        selected: 0
    }
    componentDidMount() {
        const requestOptions = {
            method: 'GET',
            credentials: 'include'
        };
        fetch('http://localhost:5000/events', requestOptions)
            .then(res => {
                if(res.status === 200){
                    return res.json() 
                }
                else{
                    return "hola"
                } 
                
            })
            .then(res => {
                if(res==="hola")
                {
                    this.setState({
                        redirect: "/"
                    });
                }
                else{
                    console.log(res)
                    this.setState({
                        respuesta: res
                    })
                }
                
            })

    }
    useStyles = makeStyles({
        table: {
            minWidth: 650,
        },
    });

    createData = (name, calories, fat, carbs, protein) => {
        return { name, calories, fat, carbs, protein };
    }
    handleClick = (event, index, id) => {
        this.setState({
            selected: index,
            id: id,
            redirect: "/detailevento"
        });

    }
    buttonClickCerrar = (event) => {
        const requestOptions = {
            method: 'POST',
            credentials: 'include',
        }
        fetch("http://localhost:5000/logout", requestOptions)
            .then(res => {
                console.log(res)
                console.log(res.status)
                if (res.status === 200) {
                    this.setState({ redirect: "/" });
                }
            })
    }
    buttonClick = (event) => {
        this.setState({
            redirect: "/creareventos"
        });
        console.log(event)
    }
    render() {
        if (this.state.redirect) {
            var id = this.state.selected
            console.log(id)
            if (this.state.redirect === "/creareventos") {
                return <Redirect to={this.state.redirect} />
            }
            else if (this.state.redirect === "/detailevento") {
                return <Redirect
                    to={{
                        pathname: this.state.redirect,
                        state: {
                            nombre: this.state.respuesta[id].nombre,
                            direccion: this.state.respuesta[id].direccion,
                            lugar: this.state.respuesta[id].lugar,
                            fechaIncio: this.state.respuesta[id].fechaInicio,
                            fechaFin: this.state.respuesta[id].fechaFin,
                            ispresencial: this.state.respuesta[id].isPresencial,
                            categoria: ["Conferencia", "Seminario", "Congreso", "Curso"],
                            currency: this.state.respuesta[id].categoria,
                            id: this.state.id,
                            redirect: ''
                        }
                    }} />
            }
            else if (this.state.redirect === "/") {
                return <Redirect to={this.state.redirect} />
            }

        }
        return (
            <div className="table">
                <div className="right">
                    <Button variant="contained" color="secondary" onClick={this.buttonClickCerrar}>
                        Cerrar sesión
                </Button>
                </div>
                <h1>Hola, estos son sus Eventos</h1>
                <TableContainer component={Paper}>
                    <Table aria-label="customized table">
                        <TableHead>
                            <TableRow >
                                <TableCell>Nombre</TableCell>
                                <TableCell align="right">Direccion</TableCell>
                                <TableCell align="right">Categoria</TableCell>
                                <TableCell align="right">Fecha de Inicio</TableCell>
                                <TableCell align="right">Fecha de Fin</TableCell>
                                <TableCell align="right">Lugar</TableCell>
                                <TableCell align="right">isPresencial</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.respuesta.reverse().map((row, index) => (
                                <TableRow key={index} onClick={(event) => this.handleClick(event, index, row.id)}>
                                    <TableCell align="right">
                                        {row.nombre}
                                    </TableCell>
                                    <TableCell align="right">{row.direccion}</TableCell>
                                    <TableCell align="right">{row.categoria}</TableCell>
                                    <TableCell align="right">{(row.fechaInicio).substring(0, 10)}</TableCell>
                                    <TableCell align="right">{(row.fechaFin).substring(0, 10)}</TableCell>
                                    <TableCell align="right">{row.lugar}</TableCell>
                                    <TableCell align="right">{row.isPresencial.toString()}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <div className="right">
                    <Button variant="contained" color="primary" onClick={this.buttonClick}>
                        Crear Evento
                </Button>
                </div>
            </div>
        )
    }
}
export default Events;
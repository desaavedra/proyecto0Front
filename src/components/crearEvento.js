import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { Redirect } from "react-router-dom";

class CrearEvento extends React.Component {
    state = {
        categoria: ["Conferencia", "Seminario", "Congreso", "Curso"],
        nombre: '',
        nombreErrorText: '',
        nombreErrorTextBoolean: false,
        direccion: '',
        direccionErrorText: '',
        direccionErrorTextBoolean: false,
        lugar: '',
        currency: '',
        date1: new Date(),
        fechaIncio: '',
        fechaFin: '',
        esPresencial: false,
        redirect:''

    }
    componentDidMount() {
        const requestOptions = {
            method: 'GET',
            credentials: 'include'
        };
        fetch('http://localhost:5000/events', requestOptions)
            .then(res => {
                if(res.status === 401){
                    this.setState({ redirect: "/" });
                }
            })
    }
    handleChange2 = (event) => {
        this.setState({
            esPresencial: !this.state.remember
        })
    }
    fecha = () => {
        let anio = this.state.date1.getFullYear()
        let mes = this.state.date1.getMonth() + 1
        let dia = this.state.date1.getDay()
        return anio + "-" + mes + "-" + dia
    }
    cancelarButtonClick= (event) => {
        this.setState({ redirect: "/eventos" });
    }
    buttonClick = (event) => {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json')
        const requestOptions = {
            method: 'POST',
            headers: headers,
            credentials: 'include',
            body: JSON.stringify({
                "nombre": this.state.nombre,
                "categoria": this.state.currency,
                "lugar": this.state.lugar,
                "direccion": this.state.direccion,
                "fechaInicio": this.state.fechaInicio,
                "fechaFin": this.state.fechaFin,
                "ispresencial": this.state.esPresencial
            }),
        };
        fetch('http://localhost:5000/events', requestOptions)
            .then(res => {
                console.log(res)
                console.log(res.status)
                if(res.status ===200){
                    console.log("aqui redirigía")
                    this.setState({ redirect: "/eventos" });
                }
        })
    }
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }
        return (
            <div className="createEvent">
                <h1>Crear Evento    </h1>
                <form>
                    <TextField
                        className="ancho"
                        id="standard-basic"
                        name="nombre"
                        error={this.state.error}
                        errortext={this.state.errorText}
                        helperText={this.state.errorText}
                        onChange={this.handleChange}
                        label="Nombre del evento" />
                    <TextField
                        name="direccion"
                        className="ancho"
                        id="standard-basic"
                        error={this.state.error}
                        errortext={this.state.errorText}
                        helperText={this.state.errorText}
                        onChange={this.handleChange}
                        label="Direccion del evento" />
                    <TextField
                        name="lugar"
                        className="ancho"
                        id="standard-basic"
                        onChange={this.handleChange}
                        label="Lugar del evento" />
                    <TextField
                        name="currency"
                        className="ancho"
                        id="standard-select-currency"
                        select
                        label="Select"
                        value={this.state.currency}
                        onChange={this.handleChange}
                        helperText="Please select your currency"
                    >
                        {this.state.categoria.map((option) => (
                            <MenuItem key={option} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        className="ancho"
                        id="date"
                        name="fechaInicio"
                        onChange={this.handleChange}
                        label="Fecha de inicio"
                        type="date"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField
                        className="ancho"
                        id="date"
                        name="fechaFin"
                        label="Fecha de fin del evento"
                        onChange={this.handleChange}
                        type="date"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <FormControlLabel
                        onChange={this.handleChange2}
                        control={<Checkbox value="remember" color="primary" />}
                        label="Es presencial"
                    />
                </form>
                <Button variant="contained" color="primary" onClick={this.buttonClick}>
                    Crear Evento
                </Button>
                <Button variant="contained" color="secundary" onClick={this.cancelarButtonClick}>
                    Cancelar
                </Button>
            </div>
        )
    }

}
export default CrearEvento;
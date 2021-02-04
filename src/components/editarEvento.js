import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { Redirect } from "react-router-dom";

class EditarEvento extends React.Component {
    state = this.props.estado.location.state;

    constructor(props) {
        super(props);
        console.log(this.props.estado.location.state.id)
    }
    buttonCancelar = (event) => {
        this.setState({
            redirect: "/eventos"
        });
        console.log(event)
    }
    handleChange2 = (event) => {
        this.setState({
            ispresencial: !this.state.ispresencial
        })
    }
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    handleChange3 = (event) => {
        this.setState({
            [event.target.name]: event.target.value+"T00:00:00"
        })
    }
    buttonEditar = (event) => {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json')
        console.log(this.state)
        const requestOptions = {
            method: 'PUT',
            headers: headers,
            credentials: 'include',
            body: JSON.stringify({
                "nombre": this.state.nombre,
                "categoria": this.state.currency,
                "lugar": this.state.lugar,
                "direccion": this.state.direccion,
                "fechaFin": this.state.fechaFin ,
                "fechaInicio": this.state.fechaIncio,
                "ispresencial": this.state.ispresencial
            }),
        };
        console.log(requestOptions)
        fetch("http://localhost:5000/events/"+this.state.id, requestOptions)
            .then(res => {
                console.log(res)
                console.log(res.status)
                if(res.status ===200){
                    console.log("aqui redirigía")
                    this.setState({ redirect: "/eventos" });
                }
        })
    }
    render() {
        if (this.state.redirect) {
            console.log(this.state.redirect)
            if (this.state.redirect ==="/eventos")
            {
                return <Redirect
                to={{
                    pathname: this.state.redirect,
                    state: this.state
                }} />
            }
        }
        return(
            <div className="createEvent">
                <h1>Editar evento</h1>
                <form>
                    <TextField
                        className="ancho"
                        id="standard-basic"
                        name="nombre"
                        error={this.state.error}
                        errortext={this.state.errorText}
                        helperText={this.state.errorText}
                        onChange={this.handleChange}
                        defaultValue={this.state.nombre}
                        label="Nombre del evento" />
                    <TextField
                        name="direccion"
                        className="ancho"
                        id="standard-basic"
                        error={this.state.error}
                        errortext={this.state.errorText}
                        helperText={this.state.errorText}
                        onChange={this.handleChange}
                        defaultValue={this.state.direccion}
                        label="Direccion del evento" />
                    <TextField
                        name="lugar"
                        className="ancho"
                        id="standard-basic"
                        onChange={this.handleChange}
                        defaultValue={this.state.lugar}
                        label="Lugar del evento" />
                    <TextField
                        name="currency"
                        className="ancho"
                        id="standard-select-currency"
                        select
                        label="Select"
                        defaultValue={this.state.currency}
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
                        name="fechaIncio"
                        onChange={this.handleChange3}
                        label="Fecha de inicio"
                        type="date"
                        defaultValue={(this.state.fechaIncio).substring(0,10)}
                        InputLabelProps={{
                            shrink: true,
                            required: true
                        }}
                    />
                    <TextField
                        className="ancho"
                        id="date"
                        name="fechaFin"
                        label="Fecha de fin del evento"
                        onChange={this.handleChange3}
                        type="date"
                        defaultValue={(this.state.fechaFin).substring(0,10)}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <FormControlLabel
                        onChange={this.handleChange2}
                        control={<Checkbox value="remember" defaultChecked={this.state.ispresencial}color="primary" />}
                        label="Es presencial"
                    />
                </form>
                <Button variant="contained" color="primary" className="button1" onClick={this.buttonEditar}>
                    Guardar
                </Button>
                
                <Button variant="contained" color="secondary" className="button1" onClick={this.buttonCancelar}>
                    Cancelar
                </Button>
            </div>
        )
    }
}
export default EditarEvento;
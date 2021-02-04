import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { Redirect } from "react-router-dom";
class CrearUsuario extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleClicke = this.handleClick.bind(this);
    }
    state = {
        email: '',
        password: '',
        redirect:''
    };
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    handleClick = (event) => {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json')
        const requestOptions = {
            method: 'POST',
            headers: headers,
            credentials: 'include',
            body: JSON.stringify({
                "correo": this.state.email,
                "password":this.state.password,
            }),
        };
        fetch('http://localhost:5000/registrar', requestOptions)
            .then(res => {
                console.log(res)
                console.log(res.status)
                if(res.status ===200){
                    this.setState({ redirect: "/" });
                }
            })
    }
    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }
        return (
            <div className="center">
                <Typography component="h1" variant="h5" align="center">
                    Registro de Usuario
                </Typography>
                <form noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        onChange={this.handleChange}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={this.handleChange}
                    />
                    <Button
                        onClick={this.handleClick}
                        fullWidth
                        variant="contained"
                        color="primary">
                        Registrarme
                    </Button>
                </form>

            </div>

        )
    }
}
export default CrearUsuario
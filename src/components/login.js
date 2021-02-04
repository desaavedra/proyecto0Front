import React from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import { Redirect } from "react-router-dom";
class Loging extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleChange2 = this.handleChange2.bind(this);
        this.handleClicke = this.handleClick.bind(this);
    }
    state = {
        email: '',
        password: '',
        remember:false,
        redirect:''
    };
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    handleChange2(event) {
        this.setState({
            remember: !this.state.remember
        })
    }
    handleClick = (event) => {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json')
        headers.append('Access-Control-Allow-Credentials', true)
        const requestOptions = {
            method: 'POST',
            headers: headers,
            credentials: 'include',
            body: JSON.stringify({
                "correo": this.state.email,
                "password":this.state.password,
                "remember":this.state.remember
            }),
        };
        fetch('http://localhost:5000/login', requestOptions)
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
            return <Redirect to={this.state.redirect} />
        }
        return (
            <div className="center">
                <Typography component="h1" variant="h5" align="center">
                    Sign in
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
                    <FormControlLabel
                        onChange={this.handleChange2}
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    />
                    <Button
                        onClick={this.handleClick}
                        fullWidth
                        variant="contained"
                        color="primary">
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item>
                            <Link href="/crearusuario" variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>

            </div>

        )
    }
}
export default Loging
import { Redirect } from "react-router-dom";
import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
class DetailEvento extends React.Component {
    constructor(props) {
        super(props);
        
        if(this.props.estado.location.state === undefined){
            console.log("Soy indefinido")
            this.state = { redirect:"/eventos" };
        }
        else{
            this.State = this.props.estado.location.state;
        }
    }
    state = this.props.estado.location.state;
    editButtonClick = (event) => {
        this.setState({
            redirect: "/editareventos"
        });
        console.log(event)
    }
    delteButtonClick = (event) => {
        const requestOptions = {
            method: 'DELETE',
            credentials: 'include',
        }
        fetch("http://localhost:5000/events/" + this.state.id, requestOptions)
            .then(res => {
                console.log(res)
                console.log(res.status)
                if (res.status === 204) {
                    this.setState({ redirect: "/eventos" });
                }
            })
    }
    buttonClickVolver = (event) => {
        this.setState({ redirect: "/eventos" });
    }
    render() {
        if (this.state.redirect) {
            console.log(this.state.redirect)
            if(this.state.redirect==="/")
            {
                return <Redirect to={this.state.redirect}/>
            }
            else if(this.state.redirect==="/editareventos"){
                return <Redirect
                to={{
                    pathname: this.state.redirect,
                    state: this.state
                }} />
            }else if(this.state.redirect==="/eventos"){
                return <Redirect to={this.state.redirect} />
            }
        }
        return (
            <div className="divCard" >
                <div className="right">
                    <Button variant="contained" color="primary" onClick={this.buttonClickVolver}>
                        Volver
                </Button>
                </div>
                <h1>Detalle del evento</h1>
                <Card className="card" >
                    <CardContent>
                        <Typography color="textSecondary">
                            Nombre del Evento
                         </Typography>
                        <Typography variant="h5" component="h2">
                            {this.state.nombre}
                        </Typography>
                        <br />
                        <Typography color="textSecondary">
                            Lugar y dirección del evento
                         </Typography>
                        <Typography variant="h6" component="h2">
                            {this.state.lugar}, {this.state.direccion}
                        </Typography>
                        <Typography color="textSecondary">
                            Categoría
                         </Typography>
                        <Typography variant="h6" component="h2">
                            {this.state.currency}
                        </Typography>
                        <br />
                        <Typography color="textSecondary">
                            Fecha de inicio
                         </Typography>
                        <Typography variant="h6" component="h2">
                            {(this.state.fechaIncio).substring(0, 10)}
                        </Typography>
                        <Typography color="textSecondary">
                            Fecha Final
                         </Typography>
                        <Typography variant="h6" component="h2">
                            {(this.state.fechaFin).substring(0, 10)}
                        </Typography>
                        <br />
                        <Typography color="textSecondary">
                            Modalidad
                         </Typography>
                        <Typography variant="h6" component="h2">
                            {
                                this.state.ispresencial ?
                                    ("Presencial") :
                                    ("Virtual")
                            }
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small" color="secondary" onClick={this.delteButtonClick}>Delete</Button>
                        <Button size="small" color="primary" onClick={this.editButtonClick}>Edit</Button>
                    </CardActions>
                </Card>
            </div>
        )
    }
}
export default DetailEvento;
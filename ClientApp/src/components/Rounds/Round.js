import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';



export class Round extends Component {
    static displayName = Round.name;

    constructor(props) {
        super(props);
        this.state = { currentRound: 1, user1: this.props.location.state.user1, user2: this.props.location.state.user2, turn: 0, };
        this.incrementRound = this.incrementRound.bind(this);
        this.selectMove = this.selectMove.bind(this);

    }

    incrementRound() {
        this.setState({
            currentRound: this.state.currentRound + 1
        });
    }

    async selectMove() {
        if (this.state.turn == 0) {
            this.setState({ turn: this.state.turn + 1 });
            this.setState({ jugadaPlayer1: this.refs.moveSelected.value });
        }
        else if (this.state.turn == 1) {
            this.setState({ turn: this.state.turn + 1 });
            //this.setState({ jugadaPleyer2: this.refs.moveSelected.value });

            //Armar objeto jugada y mandarlo a guardar
            const result = await this.SaveData();
            this.setState({ juego: result.juego });
            //Actualizar Tabla de Score
            if (this.state.currentRound == 1) {
                let res = "Tie"
                if (result.resultado == "H")
                    res = this.state.user1;
                else if (result.resultado == "C")
                    res = this.state.user2;
                this.setState({ Round1Winner: res });
            }

            else if (this.state.currentRound == 2) {
                let res = "Tie"
                if (result.resultado == "H")
                    res = this.state.user1;
                else if (result.resultado == "C")
                    res = this.state.user2;
                this.setState({ Round2Winner: res });
            }

            //redirect to result
            else if (this.state.currentRound == 3) {
                let path = `/result`;

                let res = "Tie"
                if (result.resultado == "H")
                    res = this.state.user1;
                else if (result.resultado == "C")
                    res = this.state.user2;

                const resolveResponse = await this.resolveGameWinner(res);
                this.props.history.push(path, { Resultado: resolveResponse });
            }

            this.incrementRound();
            //Reiniciar Valores
            this.setState({ turn: 0 });
        }

    }
    async resolveGameWinner(Round3Winner) {
        var firstUser = 0;
        var secondUser = 0;
        var tier = 0;
        if (this.state.Round1Winner == this.state.user1)
            firstUser++;
        else if (this.state.Round1Winner == this.state.user2)
            secondUser++;
        else
            tier++;

        if (this.state.Round2Winner == this.state.user1)
            firstUser++;
        else if (this.state.Round2Winner == this.state.user2)
            secondUser++;
        else
            tier++;

        if (Round3Winner == this.state.user1)
            firstUser++;
        else if (Round3Winner == this.state.user2)
            secondUser++;
        else
            tier++;

        if (firstUser != secondUser) {
            const jugador = {
                Jgnusr: firstUser > secondUser ? this.state.user1 : this.state.user2,
            };

            const response = await fetch("Game/PlayerWinner", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(jugador)
            });
            const data = await response.json();

            return firstUser > secondUser ? this.state.user1 : this.state.user2;
        }
        return "Tie"
    }

    currentUser() {
        return this.state.turn == 0 ? this.state.user1 : this.state.user2
    }


    async SaveData() {
        const jugada = {
            jugadaPlayer1: this.state.jugadaPlayer1,
            jugadaPlayer2: this.refs.moveSelected.value,
            user1: this.state.user1,
            user2: this.state.user2,
            juego: this.state.juego ? this.state.juego : undefined
        };

        const response = await fetch("Game/PlayGame", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(jugada)
        });
        const data = await response.json();
        return data;
    }

    render() {
        return (
            <Container>
                <Row>
                    <Col xs="12" sm="6">
                        <h1>Round {this.state.currentRound}</h1>
                        <h3>{this.currentUser()}</h3>
                        <Form>
                            <Form.Group as={Row} controlId="miid">
                                <Form.Label column xs="4">
                                    Select Move:
                                </Form.Label>
                                <Col xs="8">

                                    <select id="dropdown-item-button" className="dropdown-toggle btn btn-light" ref="moveSelected" >
                                        <option as="button" value="Piedra">Rock</option>
                                        <option as="button" value="Papel">Paper</option>
                                        <option as="button" value="Tijera">Sissor</option>
                                    </select>
                                </Col>
                            </Form.Group>
                        </Form>
                        <Row>
                            <Col sm="1"></Col>
                            <Col sm="3"><Button variant="primary" block onClick={this.selectMove} >Ok</Button></Col>
                            <Col sm="8"></Col>
                        </Row>
                    </Col>
                    <Col xs="12" sm="6">
                        <h2>Score</h2>
                        <Table striped bordered hover size="sm">
                            <thead>
                                <tr>
                                    <th>Round</th>
                                    <th>Winner</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className={this.state.currentRound == 1 ? 'hidden' : ''}>
                                    <td>1</td>
                                    <td>{this.state.Round1Winner}</td>
                                </tr>
                                <tr className={this.state.currentRound < 3 ? 'hidden' : ''}>
                                    <td>2</td>
                                    <td>{this.state.Round2Winner}</td>
                                </tr>

                            </tbody>
                        </Table>
                    </Col>

                </Row>
            </Container>
            
        );
    }
}

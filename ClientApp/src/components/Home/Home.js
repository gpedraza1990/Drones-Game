import React, { Component } from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export class Home extends Component {
    static displayName = Home.name;

    constructor(props) {
        super(props);
        this.state = { user1: '', user2: "" }
        this.routeChange = this.routeChange.bind(this);

        this.handleChangeUser1 = this.handleChangeUser1.bind(this);
        this.handleChangeUser2 = this.handleChangeUser2.bind(this);
    }

    routeChange() {
        if (this.state.user1 == "" || this.state.user2 == "") {
            alert("Must enter two users!!")
            return;
        }
        let path = `/round`;
        this.props.history.push(path, { user1: this.state.user1, user2: this.state.user2 });
    }

    handleChangeUser1(event) {
        this.setState({ user1: event.target.value });
    }

    handleChangeUser2(event) {
        this.setState({ user2: event.target.value });
    }
    render() {
        return (
            <Container>
                <Row>
                    <Col md={{offset:4}} md="4">
                        <Row>
                            <Col> <h4>Enter Player's Names</h4></Col>
                        </Row>
                        <Row>
                            <Form>
                                <Form.Group as={Row} controlId="formPlaintextPlayer1">
                                    <Form.Label column sm="4">
                                        Player 1
                                </Form.Label>
                                    <Col sm="8">
                                        <Form.Control placeholder="Player1" maxLength="10" value={this.state.user1} onChange={this.handleChangeUser1} />
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} controlId="formPlaintextPlayer2">
                                    <Form.Label column sm="4">
                                        Player 2
                                </Form.Label>
                                    <Col sm="8">
                                        <Form.Control placeholder="Player2" maxLength="10" value={this.state.user2} onChange={this.handleChangeUser2} />
                                    </Col>
                                </Form.Group>

                                <Button variant="primary" size="lg" onClick={this.routeChange} block>Start</Button>

                            </Form>
                        </Row>
                    </Col>
                    
                </Row>
            </Container>
        );
    }
}

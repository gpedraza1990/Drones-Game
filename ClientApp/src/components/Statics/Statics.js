import React, { Component } from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export class Statics extends Component {
    static displayName = Statics.name;

    constructor(props) {
        super(props);
        this.state = { user1: '',showLabel: false}
        this.searchWinsGames = this.searchWinsGames.bind(this);

        this.handleChangeUser1 = this.handleChangeUser1.bind(this);
        this.goBack = this.goBack.bind(this);

       
    }

   async  searchWinsGames() {
        if (this.state.user1 == "") {
            alert("Must enter two users!!")
            return;
        }
        const response = await fetch("Game/PlayerStatics?user=" + this.state.user1, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        });
       const data = await response.json();
       this.setState({ wins: data });
       this.setState({ showLabel: true });
    }

    handleChangeUser1(event) {
        this.setState({ user1: event.target.value });
    }

    goBack() {
        let path = `/`;
        this.props.history.push(path);
    }

    render() {
        return (
            <Container>
                <Row>
                    <Col md={{offset:4}} md="4">
                        <Row>
                            <Col> <h4>Find Statics of Player</h4></Col>
                        </Row>
                        <Row>
                            <Form>
                                <Form.Group as={Row} controlId="formPlaintextPlayer">
                                    <Form.Label column sm="4">
                                        Player 
                                </Form.Label>
                                    <Col sm="8">
                                        <Form.Control placeholder="Player1" maxLength="10" value={this.state.user1} onChange={this.handleChangeUser1} />
                                    </Col>
                                </Form.Group>

                            </Form>
                            
                            <Button variant="primary" size="lg" onClick={this.searchWinsGames} block>Search</Button>
                        </Row>
                        
                    </Col>
                    <Col md="3">
                        <label className={this.state.showLabel ? '' : 'hidden'}>Player won {this.state.wins} times</label>
                        
                    </Col>
                    <Col md="2">
                        <Button variant="primary" size="md" className={this.state.showLabel ? '' : 'hidden'} onClick={this.goBack} >Play Game</Button>
                    </Col>
                 
                    
                </Row>
                <Row>
                    <Col >
                        
                    </Col>
                    
                </Row>
            </Container>
        );
    }
}

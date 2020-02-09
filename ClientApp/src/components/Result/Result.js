import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';



export class Result extends Component {
  static displayName = Result.name;

  constructor(props) {
    super(props);
      this.state = { Resultado: this.props.location.state.Resultado, turn: 0, };
      this.resultMessage = this.resultMessage.bind(this);
      this.resultMessage1 = this.resultMessage1.bind(this);
      this.Reset = this.Reset.bind(this);
    }


    resultMessage() {
        if (this.state.Resultado != "Tie")
            return "We have a Winner!!!"
        else
            return "We have a Tie!!!!"
    }

    resultMessage1() {
        if (this.state.Resultado != "Tie")
            return this.state.Resultado + " is the new EMPEROR!!!";
        else
            return "Play again for a different result";
    }

    Reset() {
        let path = `/`;
        this.props.history.push(path);
    }

  render() {
      return (
          <Container>
              <Row>
                  <Col>
                      <h1>{this.resultMessage()}</h1>
                      <h3>{this.resultMessage1()}</h3>
                     
                  </Col>                  
              </Row>
              <Row>
                  <Col>
                      <Button variant="primary"  onClick={this.Reset}> Play Again</Button>
                  </Col>
              </Row>
          </Container>
    );
  }
}

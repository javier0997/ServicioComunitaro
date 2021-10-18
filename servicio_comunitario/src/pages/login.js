import React, { Component } from "react";
import { Form, Button, Card } from "react-bootstrap";
import Background from "../assets/back.jpg";

var sectionStyle = {
  backgroundSize: "cover",
  height: "89.3vh",
  backgroundImage: `url(${Background})`,
};

class Login extends Component {
  render() {
    return (
      <section style={sectionStyle}>
        <div
          style={{
            paddingTop: 100,
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
          }}
        >
          <Card className="bg-dark" style={{ width: "40rem" }}>
            <Card.Body>
              <Card.Title className="text-muted " style={{ fontSize: 40 }}>
                Login
              </Card.Title>
              <br />
              <br />
              <Card.Text>
                <Form>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label className="text-muted">
                      Email address
                    </Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
                    <Form.Text className="text-muted">
                      We'll never share your email with anyone else.
                    </Form.Text>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label className="text-muted">Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                  </Form.Group>

                  <Button variant="secondary" type="submit">
                    Submit
                  </Button>
                </Form>
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
      </section>
    );
  }
}

export default Login;

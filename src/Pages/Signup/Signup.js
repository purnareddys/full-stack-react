import React, { Component } from "react";
import "./Signup.css";
import { Form, Button, Jumbotron } from "react-bootstrap";
import firebase from "../../Services/firebase";

import LoginString from "../Login/LoginStrings";
export default class SignUp extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      name: "",
      error: null,
    };
  }
  handlechange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
    console.log(this.state.name);
  };
  handleSubmit = async (event) => {
    console.log("inside");
    const { name, password, email } = this.state;
    event.preventDefault();
    this.setState({ error: "" });
    try {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(async (result) => {
          firebase
            .firestore()
            .collection("users")
            .add({
              name,
              id: result.user.uid,
              email,
              password,
              URL: "",
              description: "",
              messages: [{ notificationId: "", number: 0 }],
            })
            .then((docRef) => {
              localStorage.setItem(LoginString.ID, result.user.uid);
              localStorage.setItem(LoginString.Name, name);
              localStorage.setItem(LoginString.Email, email);
              localStorage.setItem(LoginString.Password, password);
              localStorage.setItem(LoginString.PhotoURL, "");
              localStorage.setItem(LoginString.UPLOAD_CHANGED, "state_changed");
              localStorage.setItem(LoginString.Description, "");
              localStorage.setItem(LoginString.FirebaseDocumentId, docRef.id);
              localStorage.setItem(LoginString.Description, "");
              this.setState({
                name: "",
                password: "",
                url: "",
              });
              this.props.history.push("/chat");
            })
            .catch((error) => {
              console.error("Error adding document", error);
            });
        });
    } catch (error) {
      document.getElementById("1").innerHTML =
        "Error in signing up please try again";
    }
  };
  render() {
    return (
      <div>
        <Jumbotron className="container">
          <h1>Register</h1>

          <p>
            {/*  */}
            <Form onSubmit={this.handleSubmit}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  name="name"
                  onChange={this.handlechange}
                  type="text"
                  placeholder="Enter Name"
                />
              </Form.Group>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  name="email"
                  type="email"
                  onChange={this.handlechange}
                  placeholder="Enter email"
                />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  name="password"
                  onChange={this.handlechange}
                  type="password"
                  placeholder="Password"
                />
              </Form.Group>

              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </p>
        </Jumbotron>
      </div>
    );
  }
}

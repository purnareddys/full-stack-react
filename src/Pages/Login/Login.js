import React from "react";
import firebase from "../../Services/firebase";
import LoginString from "../Login/LoginStrings";
import "./Login.css";
import { Jumbotron, Form, Button } from "react-bootstrap";

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      email: "",
      password: "",
    };
  }
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
    console.log(this.state.email);
  };
  componentDidMount() {
    if (localStorage.getItem(LoginString.ID)) {
      console.log("users exists");
      this.setState({ isLoading: false }, () => {
        this.setState({ isLoading: false });
        this.props.showToast(1, "Login succes");
        this.props.history.push("./chat");
      });
    } else {
      this.setState({ isLoading: false });
    }
  }

  handleSubmit = async (event) => {
    event.preventDefault();

    await firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(async (result) => {
        let user = result.user;
        if (user) {
          await firebase
            .firestore()
            .collection("users")
            .where("id", "==", user.uid)
            .get()
            .then(function (querySnapshot) {
              querySnapshot.forEach(function (doc) {
                //setting the data into local Storage
                const currentdata = doc.data();
                localStorage.setItem(LoginString.FirebaseDocumentId, doc.id);
                localStorage.setItem(LoginString.ID, currentdata.id);
                localStorage.setItem(LoginString.Name, currentdata.name);
                localStorage.setItem(LoginString.Email, currentdata.email);
                localStorage.setItem(
                  LoginString.Password,
                  currentdata.password
                );
                localStorage.setItem(LoginString.PhotoURL, currentdata.URL);
                localStorage.setItem(
                  LoginString.Description,
                  currentdata.description
                );
              });
            });
        }
        this.props.history.push("/chat");
      })
      .catch(function (error) {
        document.getElementById("1").innerHTML =
          "incorrect email/password or poor internet";
      });
  };
  render() {
    return (
      <div className="container">
        <Jumbotron>
          <h1>Login</h1>

          <p>
            {/*  */}
            <Form onSubmit={this.handleSubmit}>
              <Form.Group controlId="formEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  name="email"
                  type="email"
                  onChange={this.handleChange}
                  placeholder="Enter email"
                />
              </Form.Group>

              <Form.Group controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  name="password"
                  onChange={this.handleChange}
                  type="password"
                  placeholder="Password"
                />
              </Form.Group>

              <Button variant="primary" type="submit">
                Login
              </Button>
            </Form>
          </p>
          <div id="1">
            <p></p>
          </div>
        </Jumbotron>
      </div>
    );
  }
}

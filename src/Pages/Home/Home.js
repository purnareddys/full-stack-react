import React, { useState } from "react";
import Signup from "../Signup/Signup";
import Login from "../Login/Login";

import "./Home.css";
import { Link } from "react-router-dom";
import { Tabs, Tab } from "react-bootstrap";

const Home = () => {
  const [key, setKey] = useState("signup");

  return (
    <>
      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
      >
        <Tab eventKey="login" title="Login">
          <Link to="/login">
            <Login />
          </Link>
        </Tab>
        <Tab eventKey="signup" title="Signup">
          <Link to="/signup">
            <Signup />
          </Link>
        </Tab>
      </Tabs>
    </>
  );
};

export default Home;

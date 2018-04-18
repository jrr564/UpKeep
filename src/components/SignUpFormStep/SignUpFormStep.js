import React, { Component } from "react";
import { Icon, Step, Image, Container } from "semantic-ui-react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

export default class SignUpFormStep extends Component {
  state = {};

  handleClick = (e, { title }) => this.setState({
    active: title,
  });
  
  render() {
    const { active } = this.state;
    const { form } = this.state;
    return (
      <Container>
        <Step.Group  fluid attached="top" >
          <Link to="/SignUpCustomer/SignUpForm1"><Step
            active={active === "Email"}
            icon="mail outline"
            form="Form"
            onClick={this.handleClick}
            title="Email"
            description="Email Address and Password"
          /> </Link>
          <Link to="/SignUpCustomer/SignUpForm2"><Step
            active={active === "Home Address"}
            icon="home"
            link
            onClick={this.handleClick}
            title="Home Address"
            description="Enter Your Home Address"
          /></Link>
          <Link to="/SignUpCustomer/SignUpForm3Customer"><Step
            active={active === "Billing"}
            icon="credit card"
            link
            onClick={this.handleClick}
            title="Billing"
            description="Enter billing information"
          /></Link>  
        </Step.Group>

      </Container>
    );
  }
}

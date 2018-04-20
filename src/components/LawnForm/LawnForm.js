import React, { Component } from "react";
import "./LawnForm.css";
import {
  Button,
  Form,
  Container,
  Grid,
  Input,
  Segment,
  Header
} from "semantic-ui-react";
import TimeSlotSelection from "../TimeSlotSelection/TimeSlotSelection";
import MonthDropdown from "../MonthDropdown/MonthDropdown";
import DayDropdown from "../DayDropdown/DayDropdown";
import LawnAddOns from "../LawnAddOns/LawnAddOns";
import AddressForm from "../AddressForm/AddressForm";
import { BrowserRouter as Link } from "react-router-dom";
import axios from "axios";

class LawnForm extends React.Component {
  state = {
    month: "",
    date: [],
    treeTrimming: true,
    fertilizer: true,
    hedging: true,
    lotsize: "",
    address: "",
    city: "",
    state: "",
  };


  handleCheckbox = e => {
    const name = e.target.name;

    this.setState({
      [name]: !this.state[name]
    });
    console.log("NAME: " + name + "  ||  VALUE: " + this.state[name]);
  }


  callAPI = () => {
    const config = {
      headers: {  //move to gitignore
          'Accept': 'application/json',
          'apikey': '9d078487e223b1c4d54c3f3a3f628803'
      }
    };
    const addressURI = encodeURI(this.state.address);
    const url = "https://search.onboard-apis.com/propertyapi/v1.0.0/property/detail?" + "address1=" + addressURI + "&address2=" + this.state.city + "%2C%20" + this.state.state;

    axios.get(url, config)
      .then(response => {
        this.setState({ lotsize: response.data.property[0].lot.lotsize1})
        console.log(this.state.lotsize);
        this.getPricing();
        // allows the API to finish before routing. 
        this.props.history.push(`/SuccessBooking`);
      })
  }

  getPricing = () => {
    console.log(this.state.lotsize);
  }


  hanleAddressInput = e => {
    const name = e.target.name;
    let value = e.target.value;
    this.setState({ [name]: value })
  }


  goToSignup = event => {
    event.preventDefault();
    this.callAPI();
    // this.props.history.push(`/SuccessBooking`);
  };

  render() {
    // if (this.state.allowNextRoute === true) {
    //   return <Redirect to='/SuccessBooking' />
    // }
    return (
      <div>
        <Container style={{ width: "80%", margin: "30px" }}>
          <Form size="huge">
            <Header textAlign="center" inverted color="green">
              Lawn Service
            </Header>
            <Form.Group grouped>
              <Form.Field>
                <label>Month</label>
                <MonthDropdown />
              </Form.Field>
              <Form.Field>
                <label>Date</label>
                <DayDropdown />
              </Form.Field>
              <Form.Field>
                <label>Enter Address</label>
                <AddressForm 
                  address={this.state.address}
                  city={this.state.city}
                  state={this.state.state}
                  handleAddress={this.handleAddress}
                  hanleAddressInput={this.hanleAddressInput}
                />
              </Form.Field>
              <Form.Field>
                <label>Select Time Slot</label>
                <TimeSlotSelection size="huge" />
              </Form.Field>
            </Form.Group>
            <Form.Group grouped>
              <Form.Field inline>
                <label>Add Ons (Extra Charges Apply)</label>
                <LawnAddOns 
                  size="huge" 
                  treeTrimming={this.state.treeTrimming}
                  fertilizer={this.state.fertilizer}
                  hedging={this.state.hedging}
                  handleCheckbox={this.handleCheckbox}
                />
              </Form.Field>
            </Form.Group>

            <Grid columns="equal">
              <Grid.Column />
              <Grid.Column>
                  <Button 
                    onClick={this.goToSignup} 
                      color="green" 
                      size="huge" 
                      type="submit"
                    >
                    Schedule Booking
                  </Button>
              </Grid.Column>
              <Grid.Column />
            </Grid>
          </Form>
        </Container>
      </div>
    );
  }
}

export default LawnForm;

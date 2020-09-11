import React, { Component } from "react";
import axios from "axios";
import { SERVER_ADDRESS } from "../CONFIG";
import { validate } from "./functions";

import Visual from "../visual/index";

class Index extends Component {
  constructor(props) {
    super(props);
    this._mounted = false;
  }

  state = {
    leftInvalid: false,
    rightInvalid: false,
    leftButton: "EUR",
    rightButton: "USD",
    leftValue: "",
    rightValue: "",
    currencies: "",
    names: "",
    error: ""
  };

  componentDidMount = () => {
    this._mounted = true;
    this.getCurrentFxRates();
    this.getNames();
  };

  componentWillUnmount() {
    this._mounted = false;
  }

  getCurrentFxRates = () => {
    axios
      .get(SERVER_ADDRESS + "currencies")
      .then((response) => {
        this.setState({ currencies: response.data, error: ""});
      })
      .catch((error) => {
        if(error.toString().match(/Network Error/)) {
          this.setState({error: "Network Error"})
        }
        console.log(error);
      });
  };

  getNames = () => {
    axios
      .get(SERVER_ADDRESS + "names")
      .then((response) => {
        this.setState({ names: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  postAction = (data) => {
    axios
      .post(SERVER_ADDRESS + "logs", data)
      .catch((error) => {
        console.log(error);
      });
  };

  countRightSide = (leftTicker, rightTicker, leftInput) => {
    let leftRate = this.getRate(leftTicker);
    let rightRate = this.getRate(rightTicker);
    if (!this.state.leftInvalid) {
      const convertInput = Number(Number(leftInput).toFixed(2));
      let result = Number(((convertInput / leftRate) * rightRate).toFixed(2));
      this.setState({ rightValue: result });
    }
  };

  countLeftSide = (leftTicker, rightTicker, rightInput) => {
    let leftRate = this.getRate(leftTicker);
    let rightRate = this.getRate(rightTicker);
    if (!this.state.leftInvalid) {
      const convertInput = Number(Number(rightInput).toFixed(2));
      let result = Number(((convertInput * leftRate) / rightRate).toFixed(2));
      this.setState({ leftValue: result });
    }
  };

  leftHendler = (e) => {
    if (this._mounted) {
      let valid = validate(e.target.value);
      this.postAction({ leftInput: e.target.value });
      this.setState({ leftValue: e.target.value, leftInvalid: valid });
      if (!valid) {
        this.countRightSide(
          this.state.leftButton,
          this.state.rightButton,
          e.target.value
        );
      }
    }
  };

  getRate = (ticker) => {
    if (ticker === "EUR") return 1;
    const state = [...this.state.currencies];
    const object = state.filter((value) => value.ticker === ticker);
    if (object[0] !== undefined) return object[0].rate;
  };

  getName = (ticker) => {
    const state = [...this.state.names];
    const object = state.filter((value) => value.ticker === ticker);
    if (object[0] !== undefined) return object[0].EU;
  };

  rightHendler = (e) => {
    if (this._mounted) {
      let valid = validate(e.target.value);
      this.postAction({ rightInput: e.target.value })
      this.setState({ rightValue: e.target.value, rightInvalid: valid });
      if (!valid) {
        this.countLeftSide(
          this.state.leftButton,
          this.state.rightButton,
          e.target.value
        );
      }
    }
  };

  leftDropdownHandler = (e) => {
    if (this._mounted) {
      this.setState({ leftButton: e.target.value });
      this.postAction({ leftDropdown: e.target.value });
      if (!this.state.leftInvalid && this.state.leftValue !== "") {
        this.countRightSide(
          e.target.value,
          this.state.rightButton,
          this.state.leftValue
        );
      }
    }
  };

  rightDropdownHandler = (e) => {
    if (this._mounted) {
      this.setState({ rightButton: e.target.value });
      this.postAction({rightDropdown: e.target.value});
      if (!this.state.leftInvalid && this.state.leftValue !== "") {
        this.countLeftSide(
          e.target.value,
          this.state.rightButton,
          this.state.leftValue
        );
      }
    }
  };

  render() {
    const {
      leftInvalid,
      rightInvalid,
      leftButton,
      rightButton,
      leftValue,
      rightValue,
      currencies,
      error
    } = this.state;
    return (
      <React.Fragment>
        <Visual
          leftInvalid={leftInvalid}
          rightInvalid={rightInvalid}
          leftButton={leftButton}
          rightButton={rightButton}
          leftValue={leftValue}
          rightValue={rightValue}
          leftHendler={this.leftHendler}
          rightHendler={this.rightHendler}
          leftDropdownHandler={this.leftDropdownHandler}
          rightDropdownHandler={this.rightDropdownHandler}
          leftButtonName={this.getName(leftButton)}
          rightButtonName={this.getName(rightButton)}
          currencies={currencies}
          error={error}
        />
      </React.Fragment>
    );
  }
}

export default Index;

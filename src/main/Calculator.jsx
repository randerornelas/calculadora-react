import "./Calculator.css";

import Display from "../components/Display";
import Button from "../components/Button";
import React from "react";

const initialState = {
  displayValue: "0",
  operation: null,
  clearDisplay: false,
  currentValue: 0,
  values: [0, 0]
};

class Calculator extends React.Component {
  constructor(props) {
    super(props);

    this.clearMemory = this.clearMemory.bind(this);
    this.addDigit = this.addDigit.bind(this);
    this.setOperation = this.setOperation.bind(this);
  }

  state = {...initialState};

  clearMemory() {
    this.setState({...initialState});
  }

  addDigit(n) {
    let displayValue = this.state.displayValue;
    const currentOperation = this.state.operation;
    let clearDisplay = this.state.clearDisplay;
    const values = [...this.state.values];

    const i = this.state.currentValue;

    if(displayValue === "0") {
      if(n === ",") {
        displayValue += n;
      } else if(n === "+/-") {
        return;
      } else {
        displayValue = "";
      }

      this.setState({displayValue});
    }

    if(n === "," && displayValue.indexOf(",") > -1) {
      return;
    }

    if(clearDisplay) {
      displayValue = "";
      displayValue = n;

      clearDisplay = false;
    } else {
      displayValue += n;
    }

    if(n === "+/-") {
      displayValue = displayValue.replace("+/-", "");

      if(currentOperation === "=") {
        displayValue = "-" + values[0];

        displayValue = displayValue.indexOf("-") > -1 ? displayValue.replace("-", "") : "-" + displayValue;
      }

      displayValue = displayValue.indexOf("-") > -1 ? displayValue.replace("-", "") : "-" + displayValue;
    }

    values[i] = parseFloat(displayValue.replace(",", "."));

    this.setState({
      displayValue,
      clearDisplay,
      values
    });
  }

  setOperation(op) {
    let displayValue = this.state.displayValue;
    const values = [...this.state.values];
    const currentOperation = this.state.operation;

    const equal = op === "=";
    const backspace = op === "←"

    if(op === "√") {
      const sqrt = Math.sqrt(values[0]);
      values[0] = sqrt;
    }

    if(op === "←") {
      values[0] = values[0].toString().slice(0, -1);

      if(!values[0].length) {
        this.clearMemory();
        values[0] = 0;
      }

      values[0] = parseFloat(values[0]);
    }

    if(currentOperation === "÷") {
      if(values[1] === 0) {
        values[0] = "Erro"
      } else {
        values[0] /= values[1];
      }
    }

    switch(currentOperation) {
      case "x":
        values[0] *= values[1];
        break;
      case "-":
        values[0] -= values[1];
        break;
      case "+":
        values[0] += values[1];
        break;
    }

    displayValue = values[0].toString().replace(".", ",");

    if(!op) {
      return;
    }

    this.setState({
      displayValue,
      operation: op,
      clearDisplay: true,
      currentValue: equal || backspace ? 0 : 1,
      values
    });
  }

  render() {
    return (
      <div className="calculator">
        <Display value={this.state.displayValue}/>
        <Button label="C" click={this.clearMemory} operation />
        <Button label="&radic;" click={this.setOperation} operation />
        <Button label="&larr;" click={this.setOperation} operation />
        <Button label="&divide;" click={this.setOperation} operation />
        <Button label="7" click={this.addDigit} />
        <Button label="8" click={this.addDigit} />
        <Button label="9" click={this.addDigit} />
        <Button label="x" click={this.setOperation} operation />
        <Button label="4" click={this.addDigit} />
        <Button label="5" click={this.addDigit} />
        <Button label="6" click={this.addDigit} />
        <Button label="-" click={this.setOperation} operation />
        <Button label="1" click={this.addDigit} />
        <Button label="2" click={this.addDigit} />
        <Button label="3" click={this.addDigit} />
        <Button label="+" click={this.setOperation} operation />
        <Button label="+/-" click={this.addDigit} />
        <Button label="0" click={this.addDigit} />
        <Button label="," click={this.addDigit} />
        <Button label="=" click={this.setOperation} equal />
      </div>
    );
  }
}

export default Calculator;

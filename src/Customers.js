import React from "react";
import { getCustomers } from "./assets/CustomerList.js";

import "./assets/Customers.css";

class Customers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      customerList: getCustomers()
    };
    this.handleClick = this.handleClick.bind(this);
    console.log("CUSTOMERS--------------------", this.state.customerList);
  }

  handleClick = (e) => {
    console.log("Clicked Object: ", e);
  };

  renderTableData() {
    return this.state.customerList.map((customer, index) => {
      const { id, name, phoneNumber } = customer; //destructuring
      return (
        <tr key={phoneNumber}>
          <td>{id}</td>
          <td>{name}</td>
          <td>{phoneNumber}</td>
          <td>
            <button onClick={() => this.handleClick(phoneNumber)}>
              Create Conversation
            </button>
          </td>
        </tr>
      );
    });
  }

  renderTableHeader() {
    let header = Object.keys(this.state.customerList[0]);
    header.push("Action");
    return header.map((key, index) => {
      return <th key={index}>{key.toUpperCase()}</th>;
    });
  }

  render() {
    return (
      <div>
        <h1 id="title">Recruit Table</h1>
        <table id="customers">
          <tbody>
            <tr>{this.renderTableHeader()} </tr>
            {this.renderTableData()}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Customers;

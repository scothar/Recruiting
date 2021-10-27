import React from "react";
import fetch from 'node-fetch';

import { customerData, serverUrl } from './assets/ProjectData';

import "./assets/Customers.css";

class Recruits extends React.Component {
  constructor(props) {
    super(props);
    const { identity, data } = props;
   
    this.state = {
      customerList: data,
      identity: identity,
      data: '',
      customerData: customerData,
      url: serverUrl

    };

    this.handleClick = this.handleClick.bind(this);
    console.log("CUSTOMERS--------------------", this.state.customerList);
  }

  handleClick = (e) => {
    console.log(`Number to text: ${e}`);
    
    this.state.data = {
      sms: e,
      chat: this.state.identity, 
      conversationName: customerData.find( c => c.phoneNumber == e).name
    }

    
    fetch(this.state.url + '/conversations/create/', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state.data)
    })
    
  };

  renderTableData() {
    return this.state.customerList.map((customer, index) => {
      const { address, name, phoneNumber, recruiter, coordinator } = customer; //destructuring
      return (
        <tr key={phoneNumber}>
          <td>{address}</td>
          <td>{name}</td>
          <td>{phoneNumber}</td>
          <td>{recruiter}</td>
          <td>{coordinator}</td>
          <td>
            <button onClick={ () => this.handleClick(phoneNumber) }>
              Create Conversation
            </button>
          </td>
        </tr>
      );
    });
  }

  renderTableHeader() {

    let header = ["Address", "Name", "Phone Number", "Agent", "Coordinator", "Action"];

    return header.map((key, index) => {
      return <th key={index}>{key.toUpperCase()}</th>;
    });
  }

  render() {
    return (
      <div>        
        <table id="customers">
          <tbody>
            <tr>{this.renderTableHeader()}</tr>
            {this.renderTableData()}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Recruits;

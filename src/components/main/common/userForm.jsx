import React, { Component } from 'react';
import PropTypes from 'proptypes';

class UserForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      email: '',
      reportIntent: '',
    };
  }

  handleChange = (e) => {
    e.preventDefault();
    const { target: { name, value } } = e;
    this.setState({
      [name]: value,
    });
  }

  render() {
    const { email, username, reportIntent } = this.state;
    return (
      <div
        className="container"
        style={{
          display: 'flex',
          flexDirection:
      'column',
          width: '70%',
        }}
      >
        <div className="field">
          <p className="label" htmlFor="username">Full Name</p>
          <input className="input" name="username" type="text" value={username} onChange={(e) => this.handleChange(e)} />
        </div>
        <div className="field">
          <p className="label" htmlFor="name">Email</p>
          <input className="input" name="email" type="email" value={email} onChange={(e) => this.handleChange(e)} />
        </div>
        <div className="field">
          <p className="label" htmlFor="name">How you plan to use the report?</p>
          <textarea className="textarea" name="reportIntent" type="text" value={reportIntent} onChange={(e) => this.handleChange(e)} />
        </div>
      </div>
    );
  }
}

export default UserForm;

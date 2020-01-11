import React from 'react';
import PropTypes from 'prop-types';

const UserForm = ({
  username, email, reportIntent, handleInputChange,
}) => (
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
      <input className="input" name="username" type="text" value={username} onChange={handleInputChange} />
    </div>
    <div className="field">
      <p className="label" htmlFor="name">Email</p>
      <input className="input" name="email" type="email" value={email} onChange={handleInputChange} />
    </div>
    <div className="field">
      <p className="label" htmlFor="name">How you plan to use the report?</p>
      <textarea className="textarea" name="reportIntent" type="text" value={reportIntent} onChange={handleInputChange} />
    </div>
  </div>
);

UserForm.propTypes = {
  username: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  reportIntent: PropTypes.string.isRequired,
  handleInputChange: PropTypes.func.isRequired,
};

export default UserForm;

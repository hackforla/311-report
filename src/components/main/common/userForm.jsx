import React from 'react';
import PropTypes from 'prop-types';
import clx from 'classnames';

const UserForm = ({
  username,
  email,
  reportIntent,
  handleInputChange,
  errors: {
    missingUsername,
    missingEmail,
    invalidEmail,
    missingReportIntent,
  },
}) => {
  const asteriskStyle = {
    color: '#FF0000',
  };

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
        <p className="label" htmlFor="username">
          Full Name&nbsp;
          <span className="required-field" style={asteriskStyle}>*</span>
        </p>
        <input
          className={clx('input', { 'is-danger': missingUsername })}
          name="username"
          type="text"
          value={username}
          onChange={handleInputChange}
        />
      </div>
      <div className="field">
        <p className="label" htmlFor="name">
          Email&nbsp;
          <span className="required-field" style={asteriskStyle}>*</span>
        </p>
        <input
          className={clx('input', { 'is-danger': missingEmail || invalidEmail })}
          name="email"
          type="email"
          value={email}
          onChange={handleInputChange}
        />
      </div>
      <div className="field">
        <p className="label" htmlFor="name">
          How you plan to use the report?&nbsp;
          <span className="required-field" style={asteriskStyle}>*</span>
        </p>
        <textarea
          className={clx('textarea', { 'is-danger': missingReportIntent })}
          name="reportIntent"
          type="text"
          value={reportIntent}
          onChange={handleInputChange}
        />
      </div>
    </div>
  );
};

UserForm.propTypes = {
  username: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  reportIntent: PropTypes.string.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  errors: PropTypes.shape({
    missingUsername: PropTypes.bool.isRequired,
    missingEmail: PropTypes.bool.isRequired,
    invalidEmail: PropTypes.bool.isRequired,
    missingReportIntent: PropTypes.bool.isRequired,
  }).isRequired,
};

export default UserForm;

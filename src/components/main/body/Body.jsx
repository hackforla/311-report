import React, { useState } from 'react';
import NCFilter from '../common/NCFilter';
import DataPicker from '../common/dataPicker';
import UserForm from '../common/userForm';

// import PinMap from '../../PinMap/PinMap';
// import Legend from '../common/Legend';

const Body = ({
  // data,
  link,
  buildUrl,
  logForm,
  onChange,
  downloadAs,
  updateState,
  startMonth,
  endMonth,
  year,
  username,
  email,
  reportIntent,
  handleInputChange,
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [missingUsername, setUsernameError] = useState(false);
  const [missingEmail, setEmailError] = useState(false);
  const [invalidEmail, setInvalidEmailError] = useState(false);
  const [missingReportIntent, setReportIntentError] = useState(false);

  const errorStyle = {
    color: '#FF0000',
    marginBottom: '10px',
  };

  const validateEmail = (userEmail) => {
    // eslint-disable-next-line
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail)) {
      return true;
    }
    return false;
  };

  const validateForm = () => {
    const noName = username.trim().length === 0;
    const noEmail = email.trim().length === 0;
    const noReportIntent = reportIntent.trim().length === 0;
    const incompleteEmail = !validateEmail(email);
    setUsernameError(noName);
    setEmailError(noEmail);
    setReportIntentError(noReportIntent);
    if (!noEmail) {
      setInvalidEmailError(incompleteEmail);
    }
    if (!noName && !noEmail && !noReportIntent && !incompleteEmail) {
      return true;
    }
    return false;
  };

  const handleOnGenerateClick = () => {
    if (validateForm()) {
      setIsGenerating(true);
      setTimeout(() => {
        setIsGenerating(false);
      }, 1000);
      buildUrl();
      logForm();
    }
  };

  return (
    <>
      <div className="level">
        <div className="level-item" style={{ marginTop: '1.5em' }}>
          Welcome to the alpha version of our Los Angeles neighborhood 311 report generator.
          <br />
          This 1st report will give you a list of the addresses with the highest incidence of
          the 311 issue that you select.
          <br />
          Hack for LA is a group of volunteers helping our community one software project at a time.
          <br />
          Please feel free to contact us with any feedback you have in order to improve this tool.
          <br />
          Thank you!
        </div>
      </div>
      <div className="container" style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
        <div
          className="column"
          style={{ display: 'flex', flexDirection: 'column', maxWidth: '50%' }}
        >
          <div className="field">
            <label className="label">
              Neighborhood Council
            </label>

            <div className="control">
              <div className="select">
                <NCFilter onChange={onChange} />
              </div>
            </div>
          </div>

          <div className="field">
            <div className="control">
              <DataPicker
                onDropdownSelect={updateState}
                startMonth={startMonth}
                endMonth={endMonth}
                year={year}
              />
            </div>
          </div>
        </div>

        <div
          className="column"
          style={{ display: 'flex', flexDirection: 'column', maxWidth: '50%' }}
        >
          <UserForm
            username={username}
            email={email}
            reportIntent={reportIntent}
            handleInputChange={handleInputChange}
            errors={{
              missingUsername,
              missingEmail,
              invalidEmail,
              missingReportIntent,
            }}
          />
        </div>
      </div>
      <div className="has-text-centered" style={errorStyle}>
        {(missingUsername || missingEmail || missingReportIntent)
          && 'Please complete all required fields.'}
        <br />
        {invalidEmail && 'Please provide a valid email address.'}
      </div>
      <div className="level">
        <div className="level-item">
          <button
            className={`button is-link${isGenerating ? ' is-loading' : ''}`}
            type="button"
            onClick={handleOnGenerateClick}
          >
            Generate Report
          </button>
        </div>
      </div>
      <div className="level">
        <div className="level-item">
          {link && !isGenerating && (
            <a onClick={downloadAs}>
              Click Here to Download Report
            </a>
          )}
        </div>
      </div>
      {/* <div className="columns">
        <div className="column is-2">
          <Legend />
        </div>
        <div className="column">
          <PinMap
            showMarkers={showMarkers}
            data={data}
            onDropdownSelect={updateState}
            toggleShowMarker={toggleShowMarkers}
          />
        </div>
      </div> */}
    </>
  );
};

export default Body;

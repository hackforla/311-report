import React, { Component } from 'react';
import axios from 'axios';

import { getDataResources } from './Util/DataService';
import { REQUESTS, COUNCILS, YEARS } from './components/common/CONSTANTS';

import Header from './components/main/header/Header';
import Body from './components/main/body/Body';
import Footer from './components/main/footer/Footer';

class App extends Component {
  constructor() {
    super();

    this.state = {
      data: [],
      year: YEARS[0],
      startMonth: '1',
      endMonth: '12',
      timePeriod: '1 Month',
      request: REQUESTS[0],
      council: COUNCILS[0],
      showMarkers: false,
      showMarkersDropdown: true,
      link: undefined,
      username: '',
      email: '',
      reportIntent: '',
    };
  }

  componentDidMount() {
    // this.fetchData();
  }

  updateState = (key, value, cb = () => null) => {
    this.setState({ [key]: value }, () => {
      // this.fetchData(); // This is only for the dropdown component to fetch data on change
      cb();
    });
  }

  // Seperate func to update inputs. Can possibly reuse updateState above?
  handleInputChange = (e) => {
    e.preventDefault();
    const { target: { name, value } } = e;
    this.setState({ [name]: value });
  }

  onChange = (e) => {
    this.setState({ council: e.target.value });
  }

  toggleShowMarkers = () => {
    const { showMarkers } = this.state;
    this.setState({ showMarkers: !showMarkers });
  }

  fetchData = () => {
    const dataUrl = this.buildDataUrl();

    axios.get(dataUrl)
      .then(({ data }) => {
        this.setState({ data });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  buildDataUrl = () => {
    const {
      startMonth, year, request, council, endMonth,
    } = this.state;

    const dataResources = getDataResources();
    const link = `https://data.lacity.org/resource/${dataResources[year]}.csv?$select=Address,count(*)+AS+CallVolume&$where=date_extract_m(CreatedDate)+between+${startMonth}+and+${endMonth}+and+RequestType='${request}'+and+NCName='${council}'&$group=Address&$order=CallVolume DESC&$limit=50000000`;
    this.setState({ link });
    // return `https://data.lacity.org/resource/${dataResources[year]}.json?$select=location,zipcode,address,requesttype,status,ncname,streetname,housenumber&$where=date_extract_m(CreatedDate)+between+${startMonth}+and+${endMonth}+and+requesttype='${request}'`;
  }

  downloadAs = () => {
    const {
      startMonth, year, request, council, endMonth,
    } = this.state;
    axios.get(this.state.link, {
      headers: {
        'Content-Type': 'application/octet-stream',
      },
      responseType: 'blob',
    })
      .then((response) => {
        const a = document.createElement('a');
        const url = window.URL.createObjectURL(response.data);
        const now = new Date();
        a.href = url;
        a.download = `${request} - ${year} ${startMonth} to ${endMonth} - ${council} Pulled ${now.toLocaleDateString('en-US')}.csv`;
        a.click();
      })
      .catch((err) => {
        console.log('error', err);
      });
  };

  render() {
    const {
      data,
      startMonth,
      endMonth,
      link,
      year,
      username,
      email,
      reportIntent,
    } = this.state;

    return (
      <div className="main">
        <Header />
        <Body
          data={data}
          startMonth={startMonth}
          endMonth={endMonth}
          year={year}
          link={link}
          buildUrl={this.buildDataUrl}
          updateState={this.updateState}
          onChange={this.onChange}
          downloadAs={this.downloadAs}
          username={username}
          email={email}
          reportIntent={reportIntent}
          handleInputChange={this.handleInputChange}
        />
        <Footer />
      </div>
    );
  }
}

export default App;

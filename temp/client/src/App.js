import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';

const url = 'https://temperature-logger.herokuapp.com';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {temperature: 0.0};
    this.count = 0;
  }


  componentDidMount() {
    this.getTemp();
    this.timer = setInterval(
      () => this.getTemp(), 1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  getTemp() {
    this.count = this.count + 1;
    if (this.count > 600) {
      clearInterval(this.timer);
      this.count = 0;
    } else {
      fetch(url + '/temp')
      .then(body => body.json())
      .then(res => this.setState({temperature: parseFloat(res.temp)}))
      .catch(err => console.error('error: ' + err));
    }
  }

  render() {
    return (
      <div className='container text-center'>
        <p className='display-4'>
          temperature
        </p>
        <p className='display-3'>
          {this.state.temperature.toFixed(2)}{'\u00b0c'}
        </p>
      </div>
    );
  }
}

export default App;

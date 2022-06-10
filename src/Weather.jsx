import React, { Component } from 'react';

class Weather extends Component {
    state = {
        // Your required states here
        zipcode: '',
        currentTemp: '',
        highTemp: '',
        lowTemp: '',
        weatherDesc: '',
        cityName: ''
    }

    handleChange = (event) => {
        this.setState({ zipcode: event.target.value }, () => {
            // console.log('Your zip code is', this.state.zipcode);
        });
    }

    handleSubmit = (event) => {
        event.preventDefault()
        // Your fetch call here
        fetch(`http://api.openweathermap.org/data/2.5/weather?zip=${this.state.zipcode},us&appid=${process.env.REACT_APP_API_KEY}&units=imperial`)
            .then(res => res.json())
            .then(jsonData => {
                // console.log(jsonData)
                this.setState({
                    currentTemp: jsonData.main.temp,
                    highTemp: jsonData.main.temp_max,
                    lowTemp: jsonData.main.temp_min,
                    weatherDesc: jsonData.weather[0].description,
                    cityName: jsonData.name,
                    icon: jsonData.weather[0].icon
                })
            })
        // Your state updates go under function(json)
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="zipcode">Please enter your zip code for the weather:</label>
                    <input
                        id="zipcode"
                        type="text"
                        onChange={this.handleChange}
                    />
                    <input type="submit" value="Get my forecast!" />
                </form>
                <div>
                    { /* Display weather information here */}
                    <h1>{this.state.cityName}</h1>
                    <h2>{this.state.currentTemp}</h2>
                    <h3>Max: {this.state.highTemp} Min: {this.state.lowTemp}</h3>
                    <p>{this.state.weatherDesc}</p>
                    <img src={`http://openweathermap.org/img/w/${this.state.icon}.png`} />
                </div>
            </div>
        )
    }
}


export default Weather;
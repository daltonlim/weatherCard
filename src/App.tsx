import './App.css';
import * as React from 'react';
import Button from "@material-ui/core/Button";
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Card from "@material-ui/core/Card/Card";
import CardContent from "@material-ui/core/CardContent/CardContent";
import Typography from "@material-ui/core/Typography/Typography";
// @ts-ignore
import WeatherIcon from 'react-icons-weather';

const API = 'https://api.openweathermap.org/data/2.5/weather?q=';
const APPIDPREFIX = '&appid=';
const APPID = 'ece0d8b1e9f26bc9f8b45549d4585e47';

interface IState {
    jsonData: any,
    value: string
}

const divStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
};


export default class App extends React.Component<{}, IState> {
    constructor(props: any) {
        super(props);
        this.state = {value: 'Auckland', jsonData: ''};//TODO remove auckland

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.updateApi();
    }

    handleChange(event: any) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event: any) {
        event.preventDefault();
        this.updateApi();
    }

    updateApi() {
        fetch(API + this.state.value + APPIDPREFIX + APPID)
            .then(response => response.json())
            .then(data => this.setState({jsonData: data}));
    }

    WeatherCard() {
        const data = this.state.jsonData;
        if (typeof data.main != 'undefined') {
            var celcius = Math.round((data.main.temp - 273.15) * 10) / 10;// Round to 2 dp.
            return (
                <div >
                    <Card className="Card" style={{minWidth: 275,}} >
                        <CardContent>
                            <Typography className="Title" color="textSecondary" style={{fontSize: 16}} >
                                {data.name},{' ' + data.sys.country} <br />

                                <Typography className="weather" color="inherit" style={{fontSize: 14}}  >
                                    <WeatherIcon name="owm" iconId={data.weather[0].id} />
                                    {' ' + data.weather[0].description}
                                </Typography>

                            </Typography>
                            <Typography variant="headline" component="h2" style={{fontSize: 24}}>
                                {celcius}°C
                            </Typography>

                        </CardContent>
                    </Card>
                </div>
            )
        } else {
            return (
                <p>Invalid city specified</p>
            )
        }
    }

    render() {
        return (
            <div style={divStyle}>
                <div>
                    <br/>
                    <form onSubmit={this.handleSubmit} style={divStyle}>
                        <FormControl className="formControl">
                            <InputLabel htmlFor="name-simple"  style={{fontSize: 14}}>City</InputLabel>
                            <Input id="name-simple" type="text" value={this.state.value} onChange={this.handleChange} style={{fontSize: 14}}/>
                        </FormControl>
                        <Button variant="outlined" type="submit" value="Submit"  size="medium" style={{fontSize: 12}}>
                            Submit
                        </Button>
                    </form>
                    <br/>
                    {this.WeatherCard()}
                </div>
            </div>
        );
    }
}

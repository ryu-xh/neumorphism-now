import React from 'react';
import './App.css';

class App extends React.Component {
    constructor(props) {
    super(props);
    this.state = {x: 0.5, y: 0.5, year: '', month: '', day: '', hour: '', minutes: '', seconds: '', style: {textShadow: ['0.7vmin 0.7vmin 1vmin #d0d0d0', '-0.7vmin -0.7vmin 1vmin #ffffff']}};    
  }

  componentDidMount() {
    this.ticking = setInterval(
      () => this.tick(), 10
    );
  }

  componentWillUnmount() {
    clearInterval(this.ticking);
  }

  _onMouseMove(e) {
    this.setState({x: ((window.innerWidth - e.nativeEvent.offsetX) / window.innerWidth) - 0.5,
                  y: ((window.innerHeight - e.nativeEvent.offsetY) / window.innerHeight) - 0.5});
    this.makeShadow();
  }

  tick() {
    const digit = ['0', '', '', '', '', '', ''];
  
    this.setState({
      year: new Date().getFullYear().toString().substring(2, 4),
      month: digit[parseInt(new Date().getMonth() + 1 / 10)] + (new Date().getMonth() + 1).toString(),
      day: digit[parseInt(new Date().getDate() / 10)] + new Date().getDate().toString(),
      hour: digit[parseInt(new Date().getHours() / 10)] + new Date().getHours().toString(),
      minutes: digit[parseInt(new Date().getMinutes() / 10)] + new Date().getMinutes().toString(),
      seconds: digit[parseInt(new Date().getSeconds() / 10)] + new Date().getSeconds().toString(),
    })
  }

  makeShadow() {
    let shadow, x, y;
    const val = 1.4;
    shadow = [];

    x = val * this.state.x;
    y = val * this.state.y;

    shadow.push(`${x}vmin ${y}vmin 1vmin #d0d0d0`);
    shadow.push(`${-x}vmin ${-y}vmin 1vmin #ffffff`);
    
    return this.setState({
      style: {
        textShadow: shadow
      }
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header" onMouseMove={this._onMouseMove.bind(this)} style={this.state.style}>
          {this.state.year} {this.state.month} {this.state.day}<br/>
          {this.state.hour} {this.state.minutes} {this.state.seconds}
        </header>
      </div>
    );
  }
}

export default App;

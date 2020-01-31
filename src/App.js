import React from 'react';
import './App.css';

class App extends React.Component {
    constructor(props) {
    super(props);
    this.state = {x: 0.5, y: 0.5, year: '', month: '', day: '', hour: '', minutes: '', seconds: '', md: '',
                  yy: false, m0: false, d: false, h: false, m1: false, s: 'animations',
                  style: {textShadow: ['0.7vmin 0.7vmin 1vmin #d0d0d0', '-0.7vmin -0.7vmin 1vmin #ffffff']}};    
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
    this.setState({x: ((window.innerWidth - window.event.clientX) / window.innerWidth) - 0.5,
                  y: ((window.innerHeight - window.event.clientY) / window.innerHeight) - 0.5});
    this.makeShadow();
  }

  tick() {
    const digit = ['0', '', '', '', '', '', ''];
    let yy, mo, dd, hh, mi, ss;

    yy = new Date().getFullYear().toString().substring(0, 4);
    mo = digit[parseInt((new Date().getMonth() + 1) / 10)] + (new Date().getMonth() + 1).toString();
    dd = digit[parseInt(new Date().getDate() / 10)] + new Date().getDate().toString();
    hh = digit[parseInt(new Date().getHours() / 10)] + new Date().getHours().toString();
    mi = digit[parseInt(new Date().getMinutes() / 10)] + new Date().getMinutes().toString();
    ss = digit[parseInt(new Date().getSeconds() / 10)] + new Date().getSeconds().toString();

    
    if (ss !== this.state.seconds && this.state.seconds !== '')
      this.setState({
        s: "seconds"
      });
    
    if (ss === "59" || ss === "00") {
      this.setState({
        m1: "animations"
      });
    } else {
      this.setState({
        m1: ""
      });
    }

    if ((mi === "59" || mi === "00") && this.state.m1 === "animations") {
      this.setState({
        h: "animations"
      });
    } else {
      this.setState({
        h: ""
      });
    }

    if ((hh === "23" || hh === "00") && this.state.h === "animations") {
      this.setState({
        d: "animations"
      });
    } else {
      this.setState({
        d: ""
      });
    }

    if ((dd === new Date(yy, mo, 0).getDate().toString() || dd === "01") && this.state.d === "animations") {
      this.setState({
        m0: "animations"
      });
    } else {
      this.setState({
        m0: ""
      });
    }

    if ((mo === "12" || mo === "01") && this.state.m0 === "animations") {
      this.setState({
        yy: "animations"
      });
    } else {
      this.setState({
        yy: ""
      });
    }

    this.setState({
      year: yy,
      month: mo,
      day: dd,
      hour: hh,
      minutes: mi,
      seconds: ss,
    })
  }

  getMax

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
      <div className="App" onMouseMove={this._onMouseMove.bind(this)} style={this.state.style}>
        <header className="App-header">
          <div>
            <span class={this.state.yy}>{this.state.year}</span>
            <span></span>
            <span class={this.state.m0}>{this.state.month}</span>
            <span></span>
            <span class={this.state.d}>{this.state.day}</span>
          </div>
          <div>
            <span class={this.state.h}>{this.state.hour}</span>
            <span class="separator">:</span>
            <span class={this.state.m1}>{this.state.minutes}</span>
            <span class="separator">:</span>
            <span class={this.state.s}>{this.state.seconds}</span>
          </div>
        </header>
        <div class="footer">
          <a href="https://github.com/ryuuseikang/neumorphism-now">
            <i class="fab fa-github fa-3x"></i>
          </a>
        </div>
      </div>
    );
  }
}

export default App;

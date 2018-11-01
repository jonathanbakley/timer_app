import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";
import ReactCountdownClock from "react-countdown-clock/build/react-countdown-clock";
import Card from "@material-ui/core/Card";
import KatherineClassMusic from "./katherineClassMusic.mp3";

let firstCallFlag = true;
class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      paused: true,
      time: 0,
      timeInput: "",
      timeBreak: "",
      intervals: "",
      wheelColor: "black",
      playMusic: false,
      pause: true
    };
    //this.url = "http://streaming.tdiradio.com:8000/house.mp3";
    this.url = KatherineClassMusic;
    this.audio = new Audio(this.url);
    this.togglePlay = this.togglePlay.bind(this);
    this.pauseButton = this.pauseButton.bind(this);
    this.startButton = this.startButton.bind(this);
    this.restart = this.restart.bind(this);
    this.reset = this.reset.bind(this);
  }

  togglePlay() {
    this.setState({ playMusic: !this.state.playMusic });
    this.state.playMusic ? this.audio.playAudio() : this.audio.pauseAudio();
  }

  playAudio() {
    this.setState({
      playMusic: true,
      pause: false
    });
    this.audio.playAudio();
  }

  pauseAudio() {
    this.setState({ playMusic: false, pause: true });
    this.audio.pauseAudio();
  }

  pauseButton() {
    this.setState({
      paused: !this.state.paused
    });
    this.pause();
  }

  startButton() {
    this.setState({
      time: this.state.timeInput * 60,
      wheelColor: "green"
    });
    setTimeout(() => {
      this.pauseButton();
    }, 10);
  }

  reset() {
    this.setState({
      paused: true,
      time: 0,
      timeInput: "",
      timeBreak: "",
      intervals: "",
      wheelColor: "black",
      playMusic: false,
      pause: true
    });
    this.pause();
    firstCallFlag = true;
  }

  restart() {
    this.playAudio();
    setTimeout(() => {
      this.pause();
    }, 60000);
    if (firstCallFlag) {
      this.intervalCountdown = this.state.intervals;
      firstCallFlag = false;
      this.breakOrInterval = 0;
    }
    if (this.intervalCountdown > 0) {
      if (this.breakOrInterval === 0) {
        this.setState({
          time: this.state.timeBreak * 60,
          wheelColor: "red"
        });
        this.breakOrInterval = 1;
      } else if (this.intervalCountdown > 1) {
        this.setState({
          time: this.state.timeInput * 60,
          wheelColor: "green"
        });
        this.intervalCountdown--;
        this.breakOrInterval = 0;
      }
    }
  }

  updateTimeInput = event => {
    this.setState({
      timeInput: event.target.value
    });
  };

  updateTimeBreak = event => {
    this.setState({
      timeBreak: event.target.value
    });
  };

  updateIntervals = event => {
    this.setState({
      intervals: event.target.value
    });
  };

  render() {
    return (
      <Card>
        <Input
          placeholder="Center Time (min)"
          type="number"
          value={this.state.timeInput}
          onChange={event => this.updateTimeInput(event)}
        />
        <Input
          placeholder="Transition Time (min)"
          type="number"
          value={this.state.timeBreak}
          onChange={event => this.updateTimeBreak(event)}
        />
        <Input
          placeholder="# of Intervals"
          type="number"
          value={this.state.intervals}
          onChange={event => this.updateIntervals(event)}
        />
        <Button type="button" onClick={this.pauseButton}>
          Pause
        </Button>
        <Button type="button" onClick={this.startButton}>
          Start
        </Button>
        <Button type="button" onClick={this.reset}>
          Reset
        </Button>
        <ReactCountdownClock
          seconds={this.state.time}
          color={this.state.wheelColor}
          alpha={0.9}
          size={300}
          timeFormat="hms"
          showMilliseconds={true}
          paused={this.state.paused}
          onComplete={this.restart}
        />
      </Card>
    );
  }
}

export default Timer;

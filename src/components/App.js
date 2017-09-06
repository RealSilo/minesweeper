import React, { Component } from 'react';
import './App.css';
import Counter from './Counter';
import Header from './Header';
import Table from './Table';

const DEFAULT_SIZE = 10;
const DEFAULT_BOMB_NUMBER = 20;

class App extends Component {
  constructor (props) {
    super(props);

    this.state = {
      sizeX: DEFAULT_SIZE,
      sizeY: DEFAULT_SIZE,
      maxBombNumber: DEFAULT_BOMB_NUMBER,
      bombNumber: DEFAULT_BOMB_NUMBER,
      lastTime: 0,
      bestTime: 0,
      wins: 0
    }
  }

  calculateMaxBombNumber () {
    return Math.floor(this.state.sizeX * this.state.sizeY / 5);
  }

  updateBombNumber (val) {
    this.setState({bombNumber: val}, function () {

    });
  }

  updateSizeX (val) {
    this.updateSize(val, 'sizeX');
  }

  updateSizeY (val) {
    this.updateSize(val, 'sizeY');
  }

  updateSize (val, side) {
    this.setState({[side]: val}, function () {
      this.setState({maxBombNumber: this.calculateMaxBombNumber()}, function () {
        if (this.state.maxBombNumber < this.state.bombNumber) {
          this.setState({bombNumber: this.state.maxBombNumber}, function (){
            console.log(this.state);
          });
        }
      });
    });
  }

  incrementWins () {
    const wins = this.state.wins + 1;
    this.setState({wins});
  }

  render() {
    return (
        <div className="container">
          <div className="row row-section">
            <div className="col-md-6 col-md-offset-3">
              <Counter
                lastTime={this.state.lastTime}
                bestTime={this.state.bestTime}
                wins={this.state.wins}
              />
            </div>
          </div>
          <div className="row row-section">
            <div className="col-md-6 col-md-offset-3">
              <Header
                sizeX={this.state.sizeX}
                sizeY={this.state.sizeY}
                maxBombNumber={this.state.maxBombNumber}
                bombNumber={this.state.bombNumber}
                onBombNumberChange={selected => this.updateBombNumber(selected)}
                onSizeXChange={selected => this.updateSizeX(selected)}
                onSizeYChange={selected => this.updateSizeY(selected)}
              />
            </div> 
          </div>
          <div className="row row-section">
            <div className="col-md-6 col-md-offset-3">
              <Table 
                sizeX={this.state.sizeX}
                sizeY={this.state.sizeY}
                bombNumber={this.state.bombNumber}
                incrementWins={() => this.incrementWins()}
              />
            </div>
          </div>
        </div>
    );
  }
}

export default App;

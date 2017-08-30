import React, { Component } from 'react';
import Row from './Row';

class Table extends Component {
  constructor (props) {
    super(props);

    this.state = {
      table: this.createTable()
    }

    window.table = this.state.table;
  }

  componentWillReceiveProps(nextProps) {
    this.setState({table: this.createTable()});
  }

  createTable() {
    const createMap = () => {
      let arr = []
      for (var i = 0; i < this.props.sizeY; i++) {
        arr[i] = [];
        for (var j = 0; j < this.props.sizeX; j++) {
          arr[i][j] = 0;
        }
      }
      return arr;
    }
    
    const addBombs = (map) => {
      let bombFields = [];
      
      while (bombFields.length < this.props.bombNumber) {
        const randomNumber = Math.floor(Math.random() * (this.props.sizeY * this.props.sizeX - 1))
        if (!bombFields.includes(randomNumber)) {
          bombFields.push(randomNumber);
        }
      }

      bombFields.forEach((number) => {
        const i = Math.floor(number / this.props.sizeX);
        let j = (number % this.props.sizeX);
        if (j === -1) {
          j = this.props.sizeX - 1;
        }
        map[i][j] = 'b';
      });
    }

    const calculateFieldValues = (map) => {
      map.forEach((row, i) => {
        map.forEach((field, j) => {
          for (let x = -1; x <= 1; x++) {
            for (let y = -1; y <= 1; y++ ) {
              if (map[i + x] && map[i + x][j + y] === 'b' && map[i][j] !== 'b') {
                map[i][j]++;
              }
            }
          }
        });
      });
    }

    let map = createMap(); 
    addBombs(map);
    calculateFieldValues(map);
    return map;
  }

  revealField (i, j) {
    let table = this.state.table;
    table[i][j] = 'A';
    this.setState(table: table);
  }

  render() {
    const rows = this.state.table.map((row, index) => {
      return (
        <div className="row" key={index}>
          <div className="col-md-12">
            <Row 
              row={row}
              key={index}
              revealField={(j) => this.revealField(index, j)}
            />
          </div>
        </div>
      );
    });

    return (
      <div className="Table">
        <div className="row">
          {rows}
        </div>
      </div>
    );
  }
}

export default Table;
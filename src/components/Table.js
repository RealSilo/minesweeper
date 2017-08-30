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
          arr[i][j] = { value: 0, state: 'closed' }
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
        map[i][j]['value'] = 'b';
      });
    }

    const calculateFieldValues = (map) => {
      map.forEach((row, i) => {
        map.forEach((field, j) => {
          for (let x = -1; x <= 1; x++) {
            for (let y = -1; y <= 1; y++ ) {
              if (map[i + x] && map[i + x][j + y] && map[i + x][j + y]['value'] === 'b' && map[i][j]['value'] !== 'b') {
                map[i][j]['value']++;
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
    if (table[i][j]['value'] === 'b') {
      alert('You lost!');
    }

    this.openFields(i, j);
  }

  openFields(i, j) {
    table = this.state.table;
    let queue = [[i, j]];

    if (table[i][j]['value'] > 0) {
      table[i][j]['state'] = 'revealed';
      this.checkWin(table);
      this.setState(table: table);
      return;
    }

    while (queue.length > 0) {
      const coords = queue.shift();
      const k = coords[0];
      const l = coords[1];

      if (table[k][l]['state'] === 'revealed') {
        continue;
      }
      table[k][l]['state'] = 'revealed';

      for (let x = -1; x <= 1; x++) {
        for (let y = -1; y <= 1; y++) {
          if (table[k + x] && table[k + x][l + y] && table[k + x][l + y]['value'] !== 'b') {
            if (table[k + x][l + y]['value'] === 0) {
              if (x === 0 || y === 0) {
                queue.push([k + x, l + y]);
              }
            } else {
              table[k + x][l + y]['state'] = 'revealed';
            }
          }
        }
      }
    }


    this.checkWin(table);
    this.setState(table: table);
  }

  checkWin(table) {
    for (let i = 0; i < this.props.sizeX; i++) {
      for (let j = 0; j < this.props.sizeY; j++) {
        if (table[i][j]['value'] !== 'b' && table[i][j]['state'] !== 'revealed') {
          return;
        }
      }
    }
    alert('You won');
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
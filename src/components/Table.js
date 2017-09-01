import React, { Component } from 'react';
import Row from './Row';

class Table extends Component {
  constructor (props) {
    super(props);

    this.state = {
      table: this.createTable(props)
    }

  }

  componentWillReceiveProps(nextProps) {
    this.setState({table: this.createTable(nextProps)});
  }

  createTable(props) {
    const sizeX = props.sizeX;
    const sizeY = props.sizeY;
    const bombNumber = props.bombNumber;

    const createMap = () => {
      let arr = []
      for (var i = 0; i < sizeY; i++) {
        arr[i] = [];
        for (var j = 0; j < sizeX; j++) {
          arr[i][j] = { value: 0, state: 'closed' }
        }
      }
      return arr;
    }

    const addBombs = (map) => {
      let bombFields = [];
      
      while (bombFields.length < bombNumber) {
        const randomNumber = Math.floor(Math.random() * (sizeY * sizeX - 1))
        if (!bombFields.includes(randomNumber)) {
          bombFields.push(randomNumber);
        }
      }

      bombFields.forEach((number) => {
        const i = Math.floor(number / sizeX);
        let j = (number % sizeX);
        if (j === -1) {
          j = sizeX - 1;
        }
        map[i][j]['value'] = 'b';
      });
    }

    const calculateFieldValues = (map) => {
      map.forEach((row, i) => {
        map.forEach((field, j) => {
          for (let x = -1; x <= 1; x++) {
            for (let y = -1; y <= 1; y++ ) {
              if (map[i][j] && map[i + x] && map[i + x][j + y] && map[i + x][j + y]['value'] === 'b' && map[i][j]['value'] !== 'b') {
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
    if (this.state.table[i][j]['value'] === 'b') {
      alert('You lost!');
    }

    this.openFields(i, j);
  }

  markBomb (i, j) {
    let table = this.state.table;
    if (table[i][j]['state'] === 'closed'){
      table[i][j]['state'] = 'marked';
    } else if (table[i][j]['state'] === 'marked') {
      table[i][j]['state'] = 'closed';
    }
    this.setState(table: table);
  }

  openFields(i, j) {
    let table = this.state.table;
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
              queue.push([k + x, l + y]);
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
        if (table[i][j] && table[i][j]['value'] !== 'b' && table[i][j]['state'] !== 'revealed') {
          return;
        }
      }
    }
    alert('You won');
  }

  render() {
    const rows = this.state.table.map((row, index) => {
      return (
        <div key={index}>
          <Row 
            row={row}
            key={index}
            revealField={(j) => this.revealField(index, j)}
            markBomb={(j) => this.markBomb(index, j)}
          />
        </div>
      );
    });

    return (
      <div className="grid-row">
        {rows}
      </div>
    );
  }
}

export default Table;
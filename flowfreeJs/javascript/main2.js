/*
 * -------------------------Const-------------------------------
 */

let Const = {
   FILL_COLOR: 1432,
   CREATE_FLOW: 1234,
   RANDOM_DIRECTS: ["1230", "2301", "3012", "0123", "1032", "2103", "3021", "0213", "1320"],
   DIRECT_X: [0, -1, 0, 1],
   DIRECT_Y: [1, 0, -1, 0],
   FILLED_FLOW: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
}
/*
 * -------------------------Random-------------------------------
 */

let Random = {
   nextInt(_value) {
      //get an integer in [0,_value)
      return _value <= 0 ? 0 : Math.floor(_value * Math.random());
   },

   getInt(_first, _second) {
      // get an integer in [_first,_second)      
      return _first >= _second ? 0 : _first + Math.floor((_second - _first) * Math.random());
   }
}
/*
 * -------------------------Pair-------------------------------
 */
function Pair(_first, _second) {
   this.first = _first;
   this.second = _second;

   this.equals = (other) => (this.first === other.first && this.second === other.second);

}
/*
 * -------------------------Grid-------------------------------
 */

function Grid(_size) {
   this.size = _size;
   this.grid = [];

   for (let line = 0; line < _size; line++) {
      let _line = [];
      for (let col = 0; col < _size; col++) {
         _line.push(-1);
      }
      this.grid.push(_line);
   }

}
/*
 * -----------------------FlowManager-------------------------------
 */

let FlowManager = {
   split(_flow, _position) {
      return (_position == 0 || _position == _flow.length) ?
         null : [firstFlow = _flow.slice(0, _position),
            secondFlow = _flow.slice(_position)
         ];


   },

   getLongest(_flows) {

      let longestIndex = 0,
         longestValue = _flows[0].length;
      _flows.forEach((flow, index) => {
         if (flow.length > longestValue) {
            longestValue = flow.length;
            longestIndex = index;
         }
      });
      return {
         index: longestIndex,
         value: longestValue
      }
   },

   divideFlows(_flows, _target) {

      let output = [],
         temp = [],
         current = _flows.length;
      Array.prototype.push.apply(output, _flows);

      while (current < _target) {
         temp.length = 0;
         Array.prototype.push.apply(temp, output);
         output.length = 0;

         let index = this.getLongest(temp).index,
            flow = temp[index],
            length = flow.length;


         Array.prototype.push.apply(output, temp.slice(0, index));
         Array.prototype.push.apply(output, temp.slice(index + 1));

         if (length > 5) {
            let divisivePosition = Random.nextInt(length - 6);
            Array.prototype.push.apply(output, this.split(flow, divisivePosition + 3));
            current++;
         } else {
            output.push(flow);
            break;
         }
      }
      _flows.length = 0;
      Array.prototype.push.apply(_flows, output);
      return output;
   }
}


/*
 * ------------------------Level-------------------------------------------
 */

function Level(_size) {
   let size = _size,
      flows = [],
      specialPosition = null;

   let _isInside = (_x, _y) => (0 <= _x && _x < size && 0 <= _y && _y < size);

   let _fillDominos = function () {
      let _findSpecialPosition = function (_grid) {
         for (let line = 0; line < size; line++) {
            for (let col = 0; col < size; col++) {
               if (_grid[line][col] == -1) {
                  return (new Pair(line, col));
               }
            }
         }
         return null;
      };

      let grid = (new Grid(size)).grid,
         domino = 0;

      for (let line = 0; line < size; line++) {
         for (let col = 0; col < size; col++) {
            if (grid[line][col] == -1) {
               if (line == size - 1 && col > 1 && grid[line][col - 1] == -1) {
                  grid[line][col] = grid[line][col - 1] = domino++;

               } else if (col == size - 1 && line > 1 && grid[line - 1][col] == -1) {
                  grid[line][col] = grid[line - 1][col] = domino++;
               } else {
                  let orderDirects = Const.RANDOM_DIRECTS[Random.nextInt(Const.RANDOM_DIRECTS.length)];

                  Array.from(orderDirects).every(element => {
                     let dir = parseInt(element);

                     let x = line + Const.DIRECT_X[dir],
                        y = col + Const.DIRECT_Y[dir];
                     if (_isInside(x, y) && grid[x][y] == -1) {
                        grid[line][col] = grid[x][y] = domino++;
                        return false;
                     }
                     return true;
                  });
               }
            }

         }

      }
      specialPosition = _findSpecialPosition(grid);
      return grid;

   };



   let _fillColors = function () {
      let positionInFlow = 0,
         flowCode = -2;
      let _fillColor = function (_grid, _x, _y, isDomino) {
         if (isDomino) {
            for (let dir = 0; dir < 4; dir++) {
               let x = _x + Const.DIRECT_X[dir],
                  y = _y + Const.DIRECT_Y[dir];

               if (_isInside(x, y) && _grid[x][y] >= 0 && _grid[x][y] == _grid[_x][_y]) {
                  _grid[_x][_y] = flowCode * 100 - positionInFlow++;
                  _grid[x][y] = flowCode * 100 - positionInFlow++;
                  _fillColor(_grid, x, y, false);
                  return;
               }
            }
         } else {
            let orderDirects = Const.RANDOM_DIRECTS[Random.nextInt(Const.RANDOM_DIRECTS.length)];

            Array.from(orderDirects).every(element => {
               let dir = parseInt(element);

               let x = _x + Const.DIRECT_X[dir],
                  y = _y + Const.DIRECT_Y[dir];
               if (_isInside(x, y) && grid[x][y] >= 0) {
                  _fillColor(_grid, x, y, true);
                  return false;
               }
               return true;
            });
         }
      };

      let _fillColorSpecialPoint = function (_grid) {
         if (specialPosition == null) return;

         let first = specialPosition.first,
            second = specialPosition.second,
            orderDirects = Const.RANDOM_DIRECTS[Random.nextInt(Const.RANDOM_DIRECTS.length)];

         flowCode = -2;
         positionInFlow = 0;

         Array.from(orderDirects).every(element => {
            let dir = parseInt(element);
            let x = first + Const.DIRECT_X[dir],
               y = second + Const.DIRECT_Y[dir];
            if (_isInside(x, y) && grid[x][y] >= 0) {
               _grid[first][second] = flowCode * 100 - positionInFlow++;
               _fillColor(_grid, x, y, true);
               return false;
            }
            return true;
         });
         flowCode--;
      }


      let grid = _fillDominos();
      _fillColorSpecialPoint(grid);

      for (let line = 0; line < size; line++) {
         for (let col = 0; col < size; col++) {
            if (grid[line][col] > -2) {
               positionInFlow = 0;
               _fillColor(grid, line, col, true);
               flowCode--;
            }
         }
      }
      return grid;
   };

   let _fillFlows = function () {
      let _createFlow = function (_grid, _x, _y) {
         let x = _x,
            y = _y,
            isEndOfFlow = false;

         flow = [];
         while (!isEndOfFlow) {
            let positionInFlow = _grid[x][y];
            _grid[x][y] = Const.FILLED_FLOW[Math.floor(-positionInFlow / 100)];
            flow.push(x * size + y);
            isEndOfFlow = true;
            for (let dir = 0; dir < 4; dir++) {
               let nextX = x + Const.DIRECT_X[dir],
                  nextY = y + Const.DIRECT_Y[dir];
               if (_isInside(nextX, nextY)) {
                  if (_grid[nextX][nextY] == positionInFlow - 1) {
                     x = nextX;
                     y = nextY;
                     isEndOfFlow = false;
                     break;
                  }
               }
            }

         }
         return flow;
      };

      let _createFlowFromSpecialPosition = function (_grid) {
         if(specialPosition == null) return; 
         let flow = _createFlow(_grid, specialPosition.first, specialPosition.second);
         if (flow != null && flow.length > 0) {
            flows.push(flow);
         }
      };

      let grid = _fillColors();
      _createFlowFromSpecialPosition(grid);
      for (let line = 0; line < size; line++) {
         for (let col = 0; col < size; col++) {
            if (grid[line][col] < 0) {
               let flow = _createFlow(grid, line, col);
               if (flow != null && flow.length > 0) {
                  flows.push(flow);
               }
            }

         }
      }

      return flows;
   };

   let _getFlows = function () {

      let _caculateNumberFlows = function (_min, _max) {
         if (_min > _max) return _min;
         let numberFlows = Random.getInt(_min < size - 1 ? size - 1 : _min, _max > size + 1 ? size + 2 : _max);
         return Math.random() > 0.5 ? size : numberFlows;
      };

      _fillFlows();

      let min = flows.length,
         max = min + Math.floor(FlowManager.getLongest(flows).value / 3),
         target = _caculateNumberFlows(min, max > 26 ? 26 : max);

      //  FlowManager.divideFlows(flows, target);
      FlowManager.divideFlows(flows, size);
      return flows;

   }

   this.getLevel = function () {
      size = _size;
      _getFlows();
      let array = [],
         level = "",
         count = 0;
      for (let index = 0; index < size ** 2; index++) array.push(0);
      flows.forEach((flow, index) => {
         array[flow[0]] = array[flow[flow.length - 1]] =
            String.fromCharCode(97 + index);
      });

      array.forEach((element, index) => {
         if (element == 0 ) {
            count++;
         } else {
            level += (count > 0 ? String(count) : "");
            count = 0;
            level += element;
         }
      });
      level += (count > 0 ? String(count) : "");
      return level ;

   }

   var _loadLevel = function (_s) {

      var data = [], s = _s;
      
      while (s.length) {
          s = s.replace(/^\d+|[a-z]/i, function (x) {
              if (parseInt(x)) {
                  while (x--) {
                      data.push(0);
                  }
              } else {
                  data.push(parseInt(x, 36) - 9);
              }

              return '';
          });
      }   
      return data.length == size**2; 
   }


};



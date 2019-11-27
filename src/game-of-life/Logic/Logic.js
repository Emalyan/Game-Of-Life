export const nextGeneration = props => {
  const newBoard = [];
  for (let y = 0; y < props.rowCount; y++) {
    newBoard[y] = [];
    for (let x = 0; x < props.columnCount; x++) {
      let livingNeighbors = 0;
      const neighborsCell = getNeighborsCell(
        x,
        y,
        props.columnCount,
        props.rowCount
      );

      neighborsCell.forEach(cord => {
        if (props.universe[cord.y] && props.universe[cord.y][cord.x]) {
          livingNeighbors += 1;
        }
      });

      if (livingNeighbors < 2 || livingNeighbors > 3) {
        newBoard[y][x] = false;
      } else if (livingNeighbors === 3) {
        newBoard[y][x] = true;
      } else if (livingNeighbors === 2) {
        newBoard[y][x] = props.universe[y][x];
      }
    }
  }
  props.setUniverse(newBoard);
};

const getNeighborsCell = (x, y, maxX, maxY) => {
  let xMinusOne = x - 1;
  let xPlusOne = x + 1;
  let yMinusOne = y - 1;
  let yPlusOne = y + 1;

  if (xMinusOne == -1) {
    xMinusOne = maxX - 1;
  }

  if (xPlusOne == maxX) {
    xPlusOne = 0;
  }

  if (yMinusOne == -1) {
    yMinusOne = maxY - 1;
  }

  if (yPlusOne == maxY) {
    yPlusOne = 0;
  }

  return [
    { x, y: yMinusOne },
    { x: xPlusOne, y: yMinusOne },
    { x: xPlusOne, y },
    { x: xPlusOne, y: yPlusOne },
    { x, y: yPlusOne },
    { x: xMinusOne, y: yPlusOne },
    { x: xMinusOne, y },
    { x: xMinusOne, y: yMinusOne }
  ];
};

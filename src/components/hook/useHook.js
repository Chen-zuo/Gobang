import { useState } from 'react';

export default () => {
 
  const [palyArr, setpalyArr] = useState([])
  const [chess, setChess] = useState(null)

  const [chessArr, setChessArr] = useState(() => {
    let arr = Array(20).fill("")
    arr.map((item, index) => {
      arr[index] = Array(20).fill("");
    })
    return arr
  })



  function play(row, col){
    let newChess = chess === 1 ? 2 : 1;
    let newPalyArr = [...palyArr, { row, col, chess:newChess }]
    setChess(newChess)
    setpalyArr(newPalyArr)
    getWinner(newPalyArr, newChess, chessArr, row, col)
  }

  function getWinner(palyArr, chess, chessArr, row, col) {
    palyArr.map((item) => {
      chessArr[item.row][item.col] = { ...item };
    });
    // 分别对 上下，左右，左斜，右斜 方向进行判断是否产生winner
    let colCount = 0
    // 上下
    for (let i = col + 1; i < 20; i++) {
      if (chessArr[row][i].chess !== chess) break;
      colCount++; 
    }
    for (let i = col - 1; i >= 0; i--) {
      if (chessArr[row][i].chess !== chess) break;
      colCount++;
    }
    if (colCount >= 4) {
      setTimeout(() =>{
        let r = window.confirm("Winner:  " + `${chess == 1 ? "黑棋" : "白棋"}` + "\n" + "是否再来一把？")
        if(r) window.location.reload();
      },0)
      colCount = 0;
      return;
    }
    // 左右
    let rowCount = 0
    for (let i = row + 1; i < 20; i++) {
      if (chessArr[i][col].chess !== chess) break;
      rowCount++;
    }
    for (let i = row - 1; i >= 0; i--) {
      if (chessArr[i][col].chess !== chess) break;
      rowCount++; 
    }
    if (rowCount >= 4) {
      setTimeout(() =>{
        let r = window.confirm("Winner:  " + `${chess == 1 ? "黑棋" : "白棋"}` + "\n" + "是否再来一把？")
        if(r) window.location.reload();
      },0)
      rowCount = 0;
      return;
    }
    // 左斜
    let leftObliqueCount = 0
    for (let i = row + 1, j = col - 1; i < 20 && j >= 0; i++, j--) {
      if (chessArr[i][j].chess !== chess) break;
      leftObliqueCount++;
    }
    for (let i = row - 1, j = col + 1; i >=0 && j < 20; i--, j++) {
      if (chessArr[i][j].chess !== chess) break;
      leftObliqueCount++;
    }
    if (leftObliqueCount >= 4) {
      setTimeout(() =>{
        let r = window.confirm("Winner:  " + `${chess == 1 ? "黑棋" : "白棋"}` + "\n" + "是否再来一把？")
        if(r) window.location.reload();
      },0)
      leftObliqueCount = 0;
      return;
    }
    // 右斜
    let rightObliqueCount = 0
    for (let i = row + 1, j = col + 1; i < 20 && j < 20; i++, j++) {
      if (chessArr[i][j].chess !== chess) break;
      rightObliqueCount++;
    }
    for (let i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--) {
      if (chessArr[i][j].chess !== chess) break;
      rightObliqueCount++;
    }
    if (rightObliqueCount >= 4) {
      setTimeout(() =>{
        let r = window.confirm("Winner:  " + `${chess == 1 ? "黑棋" : "白棋"}` + "\n" + "是否再来一把？")
        if(r) window.location.reload();
      },0)
      rightObliqueCount = 0;
      return;
    }
  }

  return {
    palyArr,
    play
  }
}
import React, { Component } from "react";
import "./index.css";
export class Gobang extends Component {
  constructor(props) {
    super(props);
    this.state = {
      border: Array(20).fill(null), //渲染棋盘
      chessArr: null, //棋盘落子情况
      palyArr: [
        /*  { row: 0, col: 0, chess: 1, } */
      ], //已落子的位置
      chess: null, //当前棋子颜色1:黑 2:白,
      row: 0, //当前点击的横坐标
      col: 0, //当前点击的纵坐标
      hasWinner: null, //是否决出胜利者
    };
  }

  componentDidMount() {
    //生命周期初始化棋盘数组
    let { chessArr } = this.state;
    chessArr = Array(20).fill("");
    chessArr.map((item, index) => {
      chessArr[index] = Array(20).fill("");
    });
    this.setState({
      chessArr,
    });
  }

  play = (row, col) => {
    let { palyArr, chess, hasWinner } = this.state;
    if (hasWinner) {
      setTimeout(() =>{
        let r = window.confirm("Winner:  " + `${hasWinner == 1 ? "黑棋" : "白棋"}` + "\n" + "是否再来一把？")
        if(r) window.location.reload()
      },0)
      return;
    }
    chess = chess === 1 ? 2 : 1;
    this.setState(
      {
        row,
        col,
        chess,
        palyArr: [...palyArr, { row, col, chess }],
      },
      () => {
        let { palyArr, chess, chessArr } = this.state;
        palyArr.map((item) => {
          chessArr[item.row][item.col] = { ...item };
        });
        // 分别对 上下，左右，左斜，右斜 方向进行判断是否产生winner
        let colCount = 0,
          rowCount = 0,
          leftObliqueCount = 0,
          rightObliqueCount = 0;
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
          this.setState({
            hasWinner: chess
          })
          return;
        }
        // 左右
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
          this.setState({
            hasWinner: chess
          })
          return;
        }
        // 左斜
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
          this.setState({
            hasWinner: chess
          })
          return;
        }
        // 右斜
        for (let i = row + 1, j = col + 1; i < 20 && j < 20; i++, j++) {
          if (chessArr[i][j].chess !== chess) break;
          rightObliqueCount++;
        }
        for (let i = row - 1, j = col - 1; i <= 0 && j <= 0; i--, j--) {
          if (chessArr[i][j].chess !== chess) break;
          rightObliqueCount++;
        }
        if (rightObliqueCount >= 4) {
          setTimeout(() =>{
            let r = window.confirm("Winner:  " + `${chess == 1 ? "黑棋" : "白棋"}` + "\n" + "是否再来一把？")
            if(r) window.location.reload();
          },0)
          rightObliqueCount = 0;
          this.setState({
            hasWinner: chess
          })
          return;
        }

      }
    );
  };

  render() {
    const { border, palyArr } = this.state;
    return (
      <div className="chessboard-wrapper">
        <div className="chessboard">
          {border.map((row, rowIndex) => (
            <div className="chessboard-row" key={`row + ${rowIndex}`}>
              {border.map((col, colIndex) => (
                <div className="chessboard-col" key={`col + ${colIndex}`}>
                  <div className="chessboard-cell">
                    {/* 这里三选一去渲染 */}
                    {palyArr.find(
                      (item) => item.row === rowIndex && item.col === colIndex
                    ) ? (
                      palyArr.find(
                        (item) => item.row === rowIndex && item.col === colIndex
                      ).chess === 1 ? (
                        <div className="chessboard-cell-black"></div>
                      ) : (
                        <div className="chessboard-cell-white"></div>
                      )
                    ) : (
                      <div
                        className="chessboard-cell-click"
                        onClick={() => this.play(rowIndex, colIndex)}
                      ></div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Gobang;

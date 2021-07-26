import React from "react";
import useHook from "./useHook";

const GobangHook = () => {
  const border = Array(20).fill(null)
  let { play, palyArr } = useHook()

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
                      onClick={() => play(rowIndex, colIndex)}
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

export default GobangHook
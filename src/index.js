import React from "react"
import ReactDOM from "react-dom"
import "./index.css"

function Square(props) {
    return (
        <button
            className="square"
            onClick={() => props.onClick()}>
            {props.value}
        </button>
    )

}

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            squares: Array(9).fill(null),
            xIsNext: true,
            gameEnd:false,
            winner:null
        }
    }

    resetGame(){
        this.setState({
            squares:Array(9).fill(null),
            xIsNext:true,
            gameEnd:false,
            winner:null
        })
    }

    handleClick(i) {
        if (this.state.gameEnd){
            return
        }

        const squares = this.state.squares.slice()
        if (squares[i]){
            return
        }
        squares[i] = this.state.xIsNext ? "X" : "O"
        this.setState({
            squares: squares,
            xIsNext: !this.state.xIsNext
        })
        this.calculateWinner(squares)
    }

    renderSquare(i) {
        return (<Square
                value={this.state.squares[i]}
                onClick={() => this.handleClick(i)}
            />
        );
    }


    calculateWinner(squares) {
        if (this.state.gameEnd){
            return
        }
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ]
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i]
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                this.setState({winner:squares[a],gameEnd:true})
            }
        }
    }

    render() {
        // チュートリアルとだとif文でやってたけど三項演算子で一文にまとめてconstにした
        const status = this.state.winner ? "Winner　" + this.state.winner+" !" : "NextPlayer" + (this.state.xIsNext ? "X" : "O");

        return (
            <div>
                <div className="status">{status}</div>
                <div className="status">{this.state.gameEnd}</div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
                <div>
                    <button onClick={()=>this.resetGame()}>Reset</button>
                </div>
            </div>
        )
    }
}


class Game extends React.Component {

    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board/>
                </div>
            </div>
        )
    }
}

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(<Game/>)
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let cvW = 400
let cvH = 800
let bW = 40

// saved board
let saveBoard = [
    // 0,40,80
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [9, 9, 9, 9, 9, 9, 9, 9, 9, 9], // row # 21
    [9, 9, 9, 9, 9, 9, 9, 9, 9, 9]  // prevent drawing on this row
    
]
// the tetris board
let visualBoard = [
    // 0,40,80
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [9, 9, 9, 9, 9, 9, 9, 9, 9, 9], // row # 21
    [9, 9, 9, 9, 9, 9, 9, 9, 9, 9] //  prevent drawing on this two rows
    
]
function visualizeBoard(board) {
    for (let y = 0; y < board.length-1; y++) {
        for (let x = 0; x < board[y].length; x++) {
            if (board[y][x] === 0) {
                ctx.strokeStyle = 'rgba(70, 90, 20, 0.09)'
                ctx.strokeRect(x * bW, y * bW, bW, bW)
            } else {
                ctx.fillStyle = ['blue','orange','mediumorchid', 'lime', 'red'][board[y][x] -1]
                ctx.fillRect(x * bW, y * bW, bW, bW)
                ctx.strokeStyle = 'rgba(70, 90, 20, 1)'
                ctx.strokeRect(x * bW, y * bW, bW, bW)
            }

        }
    }
}

visualizeBoard(saveBoard);
class tetris {
    constructor(y, x, pos, color) {
        this.y = y
        this.x = x
        this.pos = pos
        this.color = color
        
        
    }
    draw(board) {
        board[this.y][this.x] = this.color
        board[this.y -1][this.x -1] = this.pos[0] || board[this.y -1][this.x -1]
        board[this.y -1][this.x]    = this.pos[1] || board[this.y -1][this.x]
        board[this.y -1][this.x +1] = this.pos[2] || board[this.y -1][this.x +1]
        board[this.y][this.x + 1]   = this.pos[3] || board[this.y][this.x + 1]
        if (board[this.y+1]) {
            board[this.y +1][this.x + 1]= this.pos[4] || board[this.y +1][this.x + 1]
            board[this.y + 1][this.x]   = this.pos[5] || board[this.y + 1][this.x]
            board[this.y +1][this.x -1] = this.pos[6] || board[this.y +1][this.x -1]
        }
        board[this.y][this.x -1]    = this.pos[7] || board[this.y][this.x -1] 
    }
    surroundCheck(array, board) { // for roatating the tetramino
        //record surroundings
        let surroundArr = [
            board[this.y -1][this.x -1],
            board[this.y -1][this.x],
            board[this.y -1][this.x +1],
            board[this.y][this.x + 1],
            board[this.y +1][this.x + 1],
            board[this.y + 1][this.x],
            board[this.y +1][this.x -1],
            board[this.y][this.x -1]
        ]
        //compare every positive number in this.pos with surroundings
        let ans = true
        for (let i = 0; i < array.length; i++) {
            if (array[i] > 0) {
                if (surroundArr[i] !== 0) {
                    ans = false
                }
            }
        }
        return ans
    }
    rotate(direction) {
        let arr1 = this.pos.slice()
        let k
        if (direction === 'right') {
            k = arr1.concat(arr1.splice(0,6))
            
        }
        if (direction === 'left') {
            k = arr1.concat(arr1.splice(0,2))
        }
        if (this.surroundCheck(k, saveBoard)) {
            this.pos = k
        }
    }
    updateDown(board) {
        if  (
                (this.pos[0] && board[this.y][this.x-1] !== 0) ||
                (this.pos[2] && board[this.y][this.x + 1] !== 0) ||
                (this.pos[3] && board[this.y+1][this.x+1] !== 0) ||
                (this.pos[4] && board[this.y+2][this.x+1] !== 0) ||
                (this.pos[5] && board[this.y+2][this.x] !== 0) ||
                (this.pos[6] && board[this.y+2][this.x-1] !== 0) ||
                (this.pos[7] && board[this.y+1][this.x-1] !== 0) ||
                (board[this.y+1][this.x] !== 0) 
        ) {
            
            activePiece.draw(saveBoard)
            activePiece = pickOne()
            return
        }
        this.y++
        
    }
    
    updateLeft(board) {
        if (this.pos[0] && board[this.y-1][this.x-2] !== 0) {
            return
        }
        if (this.pos[1] && board[this.y-1][this.x-1] !== 0) {
            return
        }
        if (this.pos[2] && board[this.y-1][this.x] !== 0) {
            return
        }
        if (this.pos[4] && board[this.y+1][this.x] !== 0) {
            return
        }
        if (this.pos[5] && board[this.y+1][this.x-1] !== 0) {
            return
        }
        if (this.pos[6] && board[this.y+1][this.x-2] !== 0) {
            return
        }
        if (this.pos[7] && board[this.y][this.x-2] !== 0) {
            return
        }
        if (board[this.y][this.x-1] !== 0) {
            return
        }
        this.x--
    }
    updateRight(board) {
        if (this.pos[0] && board[this.y-1][this.x] !== 0) {
            return
        }
        if (this.pos[1] && board[this.y-1][this.x+1] !== 0) {
            return
        }
        if (this.pos[2] && board[this.y-1][this.x+2] !== 0) {
            return
        }
        if (this.pos[3] && board[this.y][this.x+2] !== 0) {
            return
        }
        if (this.pos[4] && board[this.y+1][this.x+2] !== 0) {
            return
        }
        if (this.pos[5] && board[this.y+1][this.x+1] !== 0) {
            return
        }
        if (this.pos[6] && board[this.y+1][this.x] !== 0) {
            return
        }
        if (board[this.y][this.x+1] !== 0) {
            return
        }
        this.x++
    }
}
class tetrisJ extends tetris {
    constructor() {
        super(1,4, [1,0,0,1,0,0,0,1], 1)
    }
}
class tetrisL extends tetris {
    constructor() {
        super(1,4, [0,0,2,2,0,0,0,2], 2)
    }
}
class tetrisT extends tetris{
    constructor() {
        super(1, 4, [0,3,0,3,0,0,0,3], 3)
    }
}
class tetrisS extends tetris {
    constructor() {
        super(1,4, [0,4,4,0,0,0,0,4], 4)
    }
}
class tetrisZ extends tetris {
    constructor() {
        super(1 ,4, [5,5,0,5,0,0,0,0], 5)
    }
}
function pickOne () {
    if (tetrisPocket.length === 0) {
        tetrisPocket = [new tetrisJ(), new tetrisL(), new tetrisT(), new tetrisS(), new tetrisZ()]
    }
    let num = Math.floor(Math.random() * tetrisPocket.length)
    return tetrisPocket.splice(num, 1)[0]
  }
let tetrisPocket = []
let activePiece = pickOne()

let start = new Date().getTime();

function animate() {
    requestAnimationFrame(animate)
    let end = new Date().getTime()
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    
    visualBoard = saveBoard.slice().map(row => row.slice())
    
    activePiece.draw(visualBoard)
    visualizeBoard(visualBoard)
    // test.draw()
    if (end - start > 1000) {
        start = end
        activePiece.updateDown(saveBoard)
    }

}
animate()

document.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft') {
       activePiece.updateLeft(saveBoard)
    }
    if (e.key === 'ArrowRight') {
        activePiece.updateRight(saveBoard)
    }
    if (e.key === 'z') {
        activePiece.rotate('right')
    }
    if (e.key === 'x') {
        activePiece.rotate('left')
    }
    if (e.key === 'ArrowDown') {
        activePiece.updateDown(saveBoard)
    }
    if (e.key === ' ') {
        for(let i = 0; i < 20; i++) {
        
            activePiece.updateDown(saveBoard)
        }
    }
})

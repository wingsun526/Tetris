let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let cvW = 400
let cvH = 800
let bW = 40
let inCaculation = false
// saved board
let saveBoard = [
    // 0,40,80
    [8, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 8], // 9 and 8 paddings are for avoding undefined when rotating tetris
    [8, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 8], 
    [8, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 8], 
    [8, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 8], 
    [8, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 8], 
    [8, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 8], 
    [8, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 8], 
    [8, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 8], 
    [8, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 8], 
    [8, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 8], 
    [8, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 8], 
    [8, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 8], 
    [8, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 8], 
    [8, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 8], 
    [8, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 8], 
    [8, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 8], 
    [8, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 8], 
    [8, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 8], 
    [8, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 8], 
    [8, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 8], 
    [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9], // row # 21
    [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9]  // prevent drawing on this row
    
]
// the tetris board
let visualBoard = [
    // 0,40,80
    [8, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 8], // 9 and 8 paddings are for avoding undefined when rotating tetris
    [8, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 8], 
    [8, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 8], 
    [8, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 8], 
    [8, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 8], 
    [8, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 8], 
    [8, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 8], 
    [8, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 8], 
    [8, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 8], 
    [8, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 8], 
    [8, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 8], 
    [8, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 8], 
    [8, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 8], 
    [8, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 8], 
    [8, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 8], 
    [8, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 8], 
    [8, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 8], 
    [8, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 8], 
    [8, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 8], 
    [8, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 8], 
    [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9], // row # 21
    [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9] 
]
function visualizeBoard(board) {
    for (let y = 0; y < board.length-2; y++) {
        for (let x = 2; x < board[y].length -2; x++) {
            if (board[y][x] === 0) {
                ctx.strokeStyle = 'rgba(70, 90, 20, 0.09)'
                ctx.strokeRect((x-2) * bW, y * bW, bW, bW)
            } else {
                ctx.fillStyle = ['blue','orange','mediumorchid', 'lime', 'red', 'yellow', 'aqua'][board[y][x] -1]
                ctx.fillRect((x-2) * bW, y * bW, bW, bW)
                ctx.strokeStyle = 'rgba(70, 90, 20, 1)'
                ctx.strokeRect((x-2) * bW, y * bW, bW, bW)
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
            inCaculation = true
            activePiece.draw(saveBoard)
            // check and clear full row
            this.checkAndClear()

            // new piece
            activePiece = pickOne()
            
            return
        }
        this.y++
        
    }
    checkAndClear() {
        for (let i = -1; i < 2; i++) {
            if (saveBoard[this.y + i].every(x => (x > 0 && x < 9))) {
                saveBoard.splice(this.y + i, 1)
                saveBoard.unshift([8,8,0,0,0,0,0,0,0,0,0,0,8,8])
            }
            
        }
       
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
        super(1,6, [1,0,0,1,0,0,0,1], 1)
    }
}
class tetrisL extends tetris {
    constructor() {
        super(1,6, [0,0,2,2,0,0,0,2], 2)
    }
}
class tetrisT extends tetris{
    constructor() {
        super(1, 6, [0,3,0,3,0,0,0,3], 3)
    }
}
class tetrisS extends tetris {
    constructor() {
        super(1,6, [0,4,4,0,0,0,0,4], 4)
    }
}
class tetrisZ extends tetris {
    constructor() {
        super(1 ,6, [5,5,0,5,0,0,0,0], 5)
    }
}
class tetrisO {
    constructor() {
        this.y = 0
        this.x = 6
        this.color = 6
    }
    draw(board) {
        board[this.y][this.x] = this.color
        board[this.y][this.x +1 ] = this.color
        board[this.y + 1][this.x] = this.color
        board[this.y + 1][this.x + 1] = this.color
    }
    rotate(direction) {
        return
    }
    updateDown(board) {
        if  (
            (board[this.y + 1][this.x] !== 0) ||
            (board[this.y + 1][this.x + 1] !== 0) ||
            (board[this.y + 2][this.x] !== 0) ||
            (board[this.y + 2][this.x + 1] !== 0) 
        ) {
            inCaculation = true
            activePiece.draw(saveBoard)
            // check and clear full row
            this.checkAndClear()

            // new piece
            activePiece = pickOne()
            
            return
        }
        this.y++
    }
    checkAndClear() {
        for (let i = 0; i < 2; i++) {
            if (saveBoard[this.y + i].every(x => (x > 0 && x < 9))) {
                saveBoard.splice(this.y + i, 1)
                saveBoard.unshift([8,8,0,0,0,0,0,0,0,0,0,0,8,8])
            }
            
        }
       
    }
    updateLeft(board){
        if (board[this.y][this.x - 1] !== 0) {
            return
        }
        if (board[this.y + 1][this.x - 1] !== 0) {
            return
        }
        this.x--
    }
    updateRight(board){
        if (board[this.y][this.x + 2] !== 0) {
            return
        }
        if (board[this.y + 1][this.x + 2] !== 0) {
            return
        }
        this.x++
    }
}
class tetrisI {
    constructor() {
        this.y = 0
        this.x = 6
        this.color = 7
        this.state = 1
    }
    draw(board) {
        if (this.state === 1) {
            board[this.y][this.x - 1] = this.color
            board[this.y][this.x] = this.color
            board[this.y][this.x + 1] = this.color
            board[this.y][this.x + 2] = this.color
        }
        if (this.state === 2) {
            board[this.y - 1][this.x + 1] = this.color
            board[this.y][this.x + 1] = this.color
            board[this.y + 1][this.x + 1] = this.color
            board[this.y + 2][this.x + 1] = this.color
        }
        if (this.state === 3) {
            board[this.y + 1][this.x - 1] = this.color
            board[this.y + 1][this.x] = this.color
            board[this.y + 1][this.x + 1] = this.color
            board[this.y + 1][this.x + 2] = this.color
        }
        if (this.state === 4) {
            board[this.y - 1][this.x] = this.color
            board[this.y][this.x] = this.color
            board[this.y + 1][this.x] = this.color
            board[this.y + 2][this.x] = this.color
        }
        
    }
    rotate(direction) {
        
        if ((direction === 'right' && this.state === 1) || (direction === 'left' && this.state === 3)) {
            if (saveBoard[this.y - 1][this.x + 1] === 0 &&
                saveBoard[this.y][this.x + 1] === 0 &&
                saveBoard[this.y + 1][this.x + 1] === 0 &&
                saveBoard[this.y + 2][this.x + 1] === 0) {
                    this.state = 2
                    return
                }
        }
        if ((direction === 'right' && this.state === 2) || (direction === 'left' && this.state === 4)) {
            if (saveBoard[this.y + 1][this.x - 1] === 0 &&
                saveBoard[this.y + 1][this.x] === 0 &&
                saveBoard[this.y + 1][this.x + 1] === 0 &&
                saveBoard[this.y + 1][this.x + 2] === 0) {
                    this.state = 3
                    return
                }
        }
        if ((direction === 'right' && this.state === 3) || (direction === 'left' && this.state === 1)) {
            if (saveBoard[this.y - 1][this.x] === 0 &&
                saveBoard[this.y][this.x] === 0 &&
                saveBoard[this.y + 1][this.x] === 0 &&
                saveBoard[this.y + 2][this.x] === 0) {
                    this.state = 4
                    return
                }
        }
        if ((direction === 'right' && this.state === 4) || (direction === 'left' && this.state === 2)) {
            if (saveBoard[this.y][this.x - 1] === 0 &&
                saveBoard[this.y][this.x] === 0 &&
                saveBoard[this.y][this.x + 1] === 0 &&
                saveBoard[this.y][this.x + 2] === 0) {
                    this.state = 1
                    return
                }
        }
    }
    updateDown(board) {
        if ((this.state === 1 && 
            board[this.y + 1][this.x -1] === 0 && 
            board[this.y + 1][this.x] === 0 &&
            board[this.y + 1][this.x + 1] === 0 &&
            board[this.y + 1][this.x + 2] === 0) ||
        
            (this.state === 2 && board[this.y + 3][this.x + 1] === 0) ||
            
            (this.state === 3 &&
            board[this.y + 2][this.x - 1] === 0 &&
            board[this.y + 2][this.x] === 0 &&
            board[this.y + 2][this.x + 1] === 0 &&
            board[this.y + 2][this.x + 2] === 0) ||

            (this.state === 4 && board[this.y + 3][this.x] === 0)) {
            this.y++
        } else {
            inCaculation = true
            activePiece.draw(saveBoard)
            // check and clear full row
            this.checkAndClear()

            // new piece
            activePiece = pickOne()
            
            return
        }
    }
    checkAndClear() {
        for (let i = -1; i < 3; i++) {
            if (saveBoard[this.y + i].every(x => (x > 0 && x < 9))) {
                saveBoard.splice(this.y + i, 1)
                saveBoard.unshift([8,8,0,0,0,0,0,0,0,0,0,0,8,8])
            }  
        }
    }
    updateLeft(board) {
        if (this.state === 1 && board[this.y][this.x-2] === 0) {
                this.x--
            }
        if (this.state === 2 &&
            board[this.y -1][this.x] === 0 &&
            board[this.y][this.x] === 0 &&
            board[this.y + 1][this.x] === 0 &&
            board[this.y + 2][this.x] === 0) {
                this.x--
            }
        if (this.state === 3 && board[this.y + 1][this.x - 2] === 0) {
            this.x--
        }
        if (this.state === 4 &&
            board[this.y -1][this.x -1] === 0 &&
            board[this.y][this.x -1] === 0 &&
            board[this.y + 1][this.x-1] === 0 &&
            board[this.y + 2][this.x-1] === 0) {
                this.x--
            }
        
    }
    updateRight(board) {
        if (this.state === 1 && board[this.y][this.x+3] === 0) {
            this.x++
            }
        if (this.state === 2 &&
        board[this.y -1][this.x + 2] === 0 &&
        board[this.y][this.x + 2] === 0 &&
        board[this.y + 1][this.x + 2] === 0 &&
        board[this.y + 2][this.x + 2] === 0) {
            this.x++
            }
        if (this.state === 3 && board[this.y + 1][this.x + 3] === 0) {
        this.x++
            }
        if (this.state === 4 &&
        board[this.y -1][this.x + 1] === 0 &&
        board[this.y][this.x  + 1] === 0 &&
        board[this.y + 1][this.x + 1] === 0 &&
        board[this.y + 2][this.x + 1] === 0) {
            this.x++
            }
    }

}
function pickOne () {
    if (tetrisPocket.length === 0) {
        tetrisPocket = [new tetrisJ(), new tetrisL(), new tetrisT(), new tetrisS(), new tetrisZ(), new tetrisO(), new tetrisI()]
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
    inCaculation = false
    
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
    if (e.key === 'x') {
        activePiece.rotate('right')
    }
    if (e.key === 'z') {
        activePiece.rotate('left')
    }
    if (e.key === 'ArrowDown') {
        activePiece.updateDown(saveBoard)
    }
    if (e.key === ' ') {
        for(let i = 0; i < 20; i++) {
            if (inCaculation) {
                break
            }
            activePiece.updateDown(saveBoard)
        }
    }
})

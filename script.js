let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let cvW = 400
let cvH = 800
let bW = 40

// the tetris brardd
function drawBoard(){
    ctx.strokeStyle = "rgba(70, 90, 20, 0.3)";
    for (let x = 0; x <= cvW; x += 40) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, cvH);
    }

    for (var x = 0; x <= cvH; x += 40) {
        ctx.moveTo(0, x);
        ctx.lineTo(cvW, x);
    }
    
    ctx.stroke();
}

// the little squrare of each tetris
function drawSquare (x, y, color,) {
    ctx.fillStyle = color
    ctx.strokeStyle = 'black'
    ctx.strokeRect(x, y, bW, bW)
    ctx.fillRect(x, y, bW, bW)
}
// function tetrisO (x, y) {
//     drawSquare(x , y, 'yellow')
//     drawSquare(x + bW, y, 'yellow')
//     drawSquare(x , y + bW, 'yellow')
//     drawSquare(x + bW, y + bW, 'yellow')
// }

class tetrisO {
    constructor(x, y) {
        this.x = x
        this.y = y
    }
    draw() {
        drawSquare(this.x , this.y, 'yellow')
        drawSquare(this.x + bW, this.y, 'yellow')
        drawSquare(this.x , this.y + bW, 'yellow')
        drawSquare(this.x + bW, this.y + bW, 'yellow') 
    }
}

let test = new tetrisO(40, 40)
drawBoard();
let start = new Date().getTime();
function animate () {
    requestAnimationFrame(animate)
    let end = new Date().getTime()
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    drawBoard()
    test.draw()
    if (end - start > 1000) {
        start = end
        test.y += 40
    }
    
}
animate()

//tetrisO(40, 40)
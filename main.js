function Minesweeper(size, mines) {
    this.size = size;
    this.mines = mines;
    this.map = MineMap(size,mines);
}



var userMap = [];
let minesweeper = new Minesweeper(16,40);

function mapInit(size) {
    let map = [];

    for (let i = 0; i < size; i++) {
        let row = [];
        for (let j = 0; j < size; j++) {
            row.push('_');
        }
        map.push(row);
    }
    return map;
}

function addNums(map) {
    //adds numbers to the board based on surrounding mines
    let size = map.length;
    let count;

    for (let x = 0; x < size; x++) {
        for (let y = 0; y < size; y++) {
            count = 0;
            if (map[x][y] !== 'M') {


                if (y > 0 && map[x][y - 1] === 'M') {
                    count++;
                }
                if (y < size - 1 && map[x][y + 1] === 'M') {
                    count++;
                }
                if (x > 0 && map[x - 1][y] === 'M') {
                    count++;
                }
                if (x < size - 1 && map[x + 1][y] === 'M') {
                    count++;
                }


                if (y > 0 && x > 0 && map[x - 1][y - 1] === 'M') {
                    count++;
                }
                if (y < size - 1 && x > 0  && map[x - 1][y + 1] === 'M') {
                    count++;
                }
                if (y > 0 && x < size - 1 &&  map[x + 1][y - 1] === 'M') {
                    count++;
                }
                if (y < size - 1 && x < size - 1 && map[x + 1][y + 1] === 'M') {
                    count++;
                }







                if (count !== 0) {
                    map[x][y] = count.toString();
                }

            }


        }
    }
    return map
}

function MineMap(size, mines) {
    //builds minesweeper map based on the size and number of mines
    let mineLocations = new Set([]);
    let trueSize = size ** 2;

    //randomly assign positions to mines
    while (mineLocations.size < mines) {
        mineLocations.add(Math.floor((Math.random() * trueSize)))
    }

    let map = mapInit(size);
    //console.log(map);

    mineLocations = Array.from(mineLocations);

    for (let i = 0; i < mineLocations.length; i++) {
        let x = Math.floor(mineLocations[i] / size);
        let y = mineLocations[i] % size;
        map[x][y] = 'M';
    }


    return addNums(map);
}

function initialise() {
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");
    ctx.fillStyle = "#ff9634";
    ctx.fillRect(0, 0, 495, 495);
    let yCoord;
    let xCoord;


    let boxSize = 30;
    yCoord = 0;
    for (let y = 0; y < 16; y++) {
        xCoord = 0;
        for (let x = 0; x < 16; x++) {
            fillGradient(ctx, xCoord, yCoord, boxSize);

            xCoord += boxSize + 1;

        }

        yCoord += boxSize + 1;
    }

    minesweeper.map = MineMap(minesweeper.size, minesweeper.mines)
    userMap = mapInit(minesweeper.size);

}

function fillGradient(ctx, x, y, boxSize) {
    var grd;
    grd = ctx.createLinearGradient(0, 0, 500, 500);
    grd.addColorStop(0, "#40fffd");
    grd.addColorStop(1, "#3A60e8");

    ctx.fillStyle = grd;
    ctx.fillRect(x, y, boxSize, boxSize);
}





function leftClick() {
    let x = event.pageX - document.getElementById('myCanvas').offsetLeft;
    let y = event.pageY - document.getElementById('myCanvas').offsetTop;
    let position = pixelToBox(x, y);
    if (userMap[position[1]][position[0]] === '_') {
        userMap[position[1]][position[0]] = 'U';
        uncover(position);
    }
}

function rightClick() {
    event.preventDefault();
    let x = event.pageX - document.getElementById('myCanvas').offsetLeft;
    let y = event.pageY - document.getElementById('myCanvas').offsetTop;
    let position = pixelToBox(x, y);

    let test = userMap[position[1]][position[0]];
    if (test === '_') {
        userMap[position[1]][position[0]] = 'F';
        flag(position);
    }
    if (test === 'F') {
        userMap[position[1]][position[0]] = '_';
        deflag(position);
    }


}
function flag(position) {
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");
    ctx.font = "30px Arial";
    ctx.fillStyle = "#000000";
    ctx.fillText("F", (position[0] * 31) + 5, ((position[1] + 1) * 31) - 4);

}
function deflag(position) {
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");
    fillGradient(ctx, position[0]*(31), position[1]*31, 30);
}



function pixelToBox(x, y) {
    let boxSize = 30;
    let boxX = Math.floor(x / (boxSize+1));
    let boxY = Math.floor(y / (boxSize+1));
    return [boxX, boxY];
}

function uncover(position) {

    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(position[0] * 31, position[1] * 31, 30, 30);
    ctx.font = "30px Arial";
    let boxStatus = minesweeper.map[position[0]][position[1]];



    if (boxStatus !== '_') {
        if (boxStatus === 'M') {
            ctx.strokeText(boxStatus, (position[0] * 31) + 1, ((position[1] + 1) * 31) - 4);
            alert("You lose!");
        } else {
            ctx.strokeText(boxStatus, (position[0] * 31) + 5, ((position[1] + 1) * 31) - 4);
        }
    }


}



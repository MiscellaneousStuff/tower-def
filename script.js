const $ = id => { return document.getElementById(id) }

let canvas, ctx, game;

const rect = (x, y, w, h) => {
    ctx.fillStyle = "black";
    ctx.fillRect(x, y, w, h);
}

const drawGrid = () => {
    // Fill grid - vertical
    ctx.beginPath();
    ctx.strokeStyle = "rgba(200, 200, 200, 0.3)";
    for (let i=0; i<canvas.width / 20; i++) {
        let x = i * 20;
        let y = 0;
        let s = canvas.height;
        ctx.moveTo(x, y);
        ctx.lineTo(x, y + s);
    }
    ctx.stroke();

    // Fill grid - horizontal
    ctx.beginPath();
    ctx.strokeStyle = "rgba(200, 200, 200, 0.3)";
    for (let i=0; i<(canvas.height / 20) + 1; i++) {
        let x = 0;
        let y = (i * 20) - 10;
        let s = canvas.width;
        ctx.moveTo(x, y);
        ctx.lineTo(x + s, y);
    }
    ctx.stroke();
}

const drawPathways = pathways => {
    // Fill pathways (NPC path)
    pathways.forEach(pathway => {
        ctx.beginPath();
        ctx.strokeStyle = "red";
        for (let i=0; i<pathway.length-1; i++) {
            let a = pathway[i];
            let b = pathway[i+1];
            console.log(a, b)
            ctx.moveTo(a[0], a[1]);
            ctx.lineTo(b[0], b[1]);
        }
        ctx.stroke();
    });
}

class Game {
    constructor(pathways) {
        this.pathways = pathways;
    }
    draw = () =>  {
        // Fill background
        rect(0, 0, canvas.width, canvas.height);

        drawPathways(this.pathways);        
        drawGrid();
    }
    update = () => {

    };
    loop = () => {
        // Render update
        this.draw();
        
        // Game update
        this.update();
    }
}

window.onload = () => {
    // Init game variables
    game = new Game(
        [
            [
                [0, 240 - 10],
                [640, 240 - 10]
            ],
            [
                [0, 240 + 10],
                [640, 240 + 10]
            ]
        ]
    );

    // Init canvas variables
    canvas = $("canvas");
    ctx = canvas.getContext("2d");

    // Init game loop
    window.requestAnimationFrame(() => {
        // Execute game loop
        game.loop();

        // Wait until next animation frame
        window.requestAnimationFrame(game.loop);
    });
}
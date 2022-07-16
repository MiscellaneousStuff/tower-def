const $ = id => { return document.getElementById(id) }

let canvas, ctx, game;

const rect = (x, y, w, h) => {
    ctx.fillStyle = "black";
    ctx.fillRect(x, y, w, h);
}

class Game {
    constructor(pathway) {
        this.pathway = pathway;
    }
    draw = () =>  {
        // Fill background
        rect(0, 0, canvas.width, canvas.height);

        // Fill grid - vertical
        ctx.beginPath();
        ctx.strokeStyle = "rgba(255, 255, 255, 0.5)";
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
        ctx.strokeStyle = "rgba(255, 255, 255, 0.5)";
        for (let i=0; i<canvas.height / 20; i++) {
            let x = 0;
            let y = i * 20;
            let s = canvas.width;
            ctx.moveTo(x, y);
            ctx.lineTo(x + s, y);
        }
        ctx.stroke();

        // Fill path
        ctx.beginPath();
        ctx.strokeStyle = "white";
        for (let i=0; i<this.pathway.length-1; i++) {
            let a = this.pathway[i];
            let b = this.pathway[i+1];
            ctx.moveTo(a[0], a[1]);
            ctx.lineTo(b[0], b[1]);
        }
        ctx.stroke();
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
    game = new Game([
        [0, 240],
        [150, 240],
        [150, 360],
        [300, 360],
        [300, 240],
        [640, 240]
    ]);

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
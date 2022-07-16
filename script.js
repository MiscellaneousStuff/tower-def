const $ = id => { return document.getElementById(id) }

let canvas, ctx;

const draw = () => {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
};

const update = () => {

}

const loop = () => {
    // Render update
    draw();
    
    // Game update
    update();

    // Wait until next animation frame
    window.requestAnimationFrame(loop);
};

window.onload = () => {
    // Init canvas variables
    canvas = $("canvas");
    ctx = canvas.getContext("2d");

    // Init game loop
    window.requestAnimationFrame(loop);
}
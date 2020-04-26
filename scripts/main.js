var canvas, ctx, w, h;
var user, wall, size;
var rot = 0.03;
var shapes = [];

const { sin, cos, random, floor, PI, pow } = Math;

//event listeners for onload & resize
window.addEventListener('resize', init);
window.addEventListener('load', init);

// window.addEventListener('mousemove', (e) => {
//     shapes[0].x = e.clientX;
//     shapes[0].y = e.clientY;
//     // draw();
// });
//initial function,
function init() {
    //setting things up
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
    size = (h > w) ? floor(w / 10) : (h / 10);

    shapes = [];
    while (shapes.length < 10) {
        shapes.push(add_shape());
    }
    // console.log(shapes);

    //drawing function
    draw();
}

function draw() {
    //clearing canvas
    ctx.fillStyle = '#262626';
    ctx.fillRect(0, 0, w, h);

    for (let i = 0; i < shapes.length; i++) {
        let temp = 0;
        shapes[i].anim();
        shapes[i].rotate(rot);
        shapes[i].generate_point();
        for (let j = 0; j < shapes.length; j++) {

            if (j != i && shapes[i].collide(shapes[j])) {
                shapes[i].col = 'red';
                break;
            }
            temp++;
        };
        if (temp > shapes.length - 1) {
            shapes[i].col = 'white';
        }

        shapes[i].draw();
    }

    //animation loop
    requestAnimationFrame(draw);
}

function add_shape(s = 0) {
    let mag = 3;

    let temp = new Shape();
    temp.x = s.x || rand(0 + size, w - size);
    temp.y = s.y || rand(0 + size, h - size);
    temp.n = s.n || floor(rand(2, 14));
    temp.r = s.r || size;
    temp.bg = s.bg || null;
    temp.col = s.col || 'white';
    temp.lw = s.lw || 1;
    temp.vx = s.vw || rand(-1, 1) * mag;
    temp.vy = s.vw || rand(-1, 1) * mag;
    temp.generate_point();
    return temp;
}

const rand = (min = 0, max = 1) => {
    return random() * (max - min) + min;
}
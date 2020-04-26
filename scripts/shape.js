class Shape {
    constructor(x, y, n = 4, r = 10, bg = null, col = 'white', lw = 1) {
        this.x = x, this.y = y;
        this.n = n, this.r = r;
        this.bg = bg, this.col = col, this.lw = lw;
        this.points = null;
        this.polar = null;

    }

    //to generate the vertex of the shape
    generate_point() {
        let angle, pi = PI;
        if (this.polar == null) {
            this.polar = [];
            this.points = [];
            angle = (2 * pi) / this.n;
            for (let i = 0; i < this.n; i++) {

                //generating polar co-ordinates
                let pol = [0, 0];
                pol[0] = this.r;
                pol[1] = i * angle;
                this.polar.push(pol);

                //generating cartesian co-ordinates
                let cart = [0, 0];
                cart[0] = floor(this.x + pol[0] * cos(pol[1]));
                cart[1] = floor(this.y + pol[0] * sin(pol[1]));
                this.points.push(cart);
            }
        } else {
            this.points = [];
            for (let i = 0; i < this.polar.length; i++) {

                //generating new cartesian co-ordinates
                let cart = [0, 0];
                cart[0] = floor(this.x + this.polar[i][0] * cos(this.polar[i][1]));
                cart[1] = floor(this.y + this.polar[i][0] * sin(this.polar[i][1]));
                this.points.push(cart);
            }

        }
    }

    //to rotate the shape by certain angle
    rotate(ang = 0) {
        this.points = [];
        for (let i = 0; i < this.polar.length; i++) {

            //generating new polar co-ordinates
            this.polar[i][1] = (this.polar[i][1] + ang) % (2 * PI);

            //generating new cartesian co-ordinates
            let cart = [0, 0];
            cart[0] = this.x + this.polar[i][0] * cos(this.polar[i][1]);
            cart[1] = this.y + this.polar[i][0] * sin(this.polar[i][1]);
            this.points.push(cart);
        }
    }

    //check if it collides with other shapes
    collide(s) {
        let temp_collide = 0;

        //for every point in this shape
        for (let i = 0; i < this.points.length; i++) {
            //create a line with the next adjacent point
            let l1 = {
                p1: this.points[i],
                p2: this.points[i + 1]
            };
            //if the last point comes across join it with start point
            if (i + 1 == this.points.length) {
                l1.p2 = this.points[0];
            }

            //for every point in the comparing shape
            for (let j = 0; j < s.points.length; j++) {
                //create a line with its next point
                let l2 = {
                    p1: s.points[j],
                    p2: s.points[j + 1]
                };
                //if the last point comes across join it with start point
                if (j + 1 == s.points.length) {
                    l2.p2 = s.points[0];
                }

                //check if these two lines intersect if they do -
                if (line_intersect(l1, l2)) {
                    return true;
                }

            }
            temp_collide++;
        }
        return false;
    }

    anim() {
        if (this.x - size < 0 || this.x + size > w) {
            this.vx *= -1;
        } this.x += this.vx;

        if (this.y - size < 0 || this.y + size > h) {
            this.vy *= -1;
        } this.y += this.vy;

        this.generate_point();
    }
    //draw the required shape point by point
    draw() {
        ctx.beginPath();
        ctx.strokeStyle = this.col;
        ctx.fillStyle = this.bg;
        ctx.lineWith = this.lw;
        for (let i = 0; i < this.points.length; i++) {
            ctx.moveTo(this.points[i][0], this.points[i][1]);
            if (i + 1 == this.points.length) {
                ctx.lineTo(this.points[0][0], this.points[0][1]);
            } else {
                ctx.lineTo(this.points[i + 1][0], this.points[i + 1][1]);
            }
        }
        ctx.stroke();
        ctx.fill();
        ctx.closePath();
    }
};

// function to check if two lines are intersecting
function line_intersect(l1, l2) {
    // all four points 
    let x1 = l1.p1[0], x2 = l1.p2[0];
    let y1 = l1.p1[1], y2 = l1.p2[1];
    let x3 = l2.p1[0], x4 = l2.p2[0];
    let y3 = l2.p1[1], y4 = l2.p2[1];

    let den = ((x1 - x2) * (y3 - y4)) - ((y1 - y2) * (x3 - x4));
    // console.log(den);
    if (den === 0) {
        return false;
    };

    let t = ((x1 - x3) * (y3 - y4)) - ((y1 - y3) * (x3 - x4));
    t = t / den;
    // console.log(t);

    let u = ((x1 - x2) * (y1 - y3)) - ((y1 - y2) * (x1 - x3));
    u = -1 * (u / den);
    // console.log(u);

    if ((t <= 1 && t >= 0) && (u <= 1 && u >= 0)) {
        return true;
    } else {
        return false;
    }
}

//find distance between two points
function dist(p1, p2) {
    let x1 = p1[0], x2 = p2[0];
    let y1 = p1[1], y2 = p2[1];
    let d = pow(x2 - x1, 2) - pow(y2 - y1, 2)
    return pow(d, 0.5);
}
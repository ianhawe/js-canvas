console.log("This is pretty cool!");
var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
console.log(canvas);

//always stands for context
//Creating a super object i.e. magic paintbox
var c = canvas.getContext('2d');

// //x = left y = top
// //c.fillRect(x, y, width, height);
// c.fillStyle = 'rgba(255, 0, 0, 0.5 )';
// c.fillRect(100, 100, 100, 100);
// //change colour
// c.fillStyle = 'rgba(255, 255, 0, 0.5 )';
// c.fillRect(300, 300, 100, 100);
// //This is how to change different square colours
// c.fillStyle = 'rgba(0, 0, 255, 0.5 )';
// c.fillRect(600, 600, 100, 100);


//Line
// c.beginPath();
// c.moveTo(50, 300);
// c.lineTo(300, 100);
// c.lineTo(400, 300);
// c.strokeStyle = "black";
// c.stroke();

//How to creat an arc/circle

//x and y = placement, a radius(size), start angle/end angle which take gradient
//how long do you want the arc to go on for?

// c.beginPath();
// //this makes a circle 
// //position of item, angle, anticlockwise
// c.arc(100, 200, 50, 0, Math.PI * 2, false);
// c.strokeStyle = "red";
// c.stroke();




// for (var i = 0; 0 < 3; i++) {
//     var x = Math.random() * window.innerWidth;
//     var y = Math.random() * window.innerHeight;
//     c.beginPath();
//     c.arc(x, y, 10, 0, Math.PI * 2, false);
//     c.strokeStyle = "red";
//     c.stroke();
// }

var mouse = {
    x: undefined,
    y: undefined
}

var maxRadius = 200;
//var minRadius = 2;
var colorArray = [
    '#F0F7EE',
    '#C4D7F2',
    '#AFDEDC',
    '#91A8A4',
    '#000000'
];

window.addEventListener('mousemove', function (event) {

    console.log(event);
    mouse.x = event.x;
    mouse.y = event.y;
});
window.addEventListener('resize', function (event) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
});



function Circle(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minRadius = radius;
    this.color = colorArray[Math.floor(Math.random() * colorArray.length)];;

    this.draw = function () {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        //c.strokeStyle = "red";
        c.fillStyle = this.color;
        c.fill();

    } // close draw function
    this.update = function () {
        if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
            this.dx = -this.dx;

        }
        //Collision fun Y
        if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }
        this.x += this.dx;
        this.y += this.dy;
        this.draw();

        //interactivity This is how big ur mouse is.
        if (mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50 && this.radius < maxRadius) {
            this.radius += 1;
        }
        //if (this.radius < 40) {
        //this.radius += 1; // 
        // } // This broke I found a fix though
        else if (this.radius > this.minRadius) {
            this.radius -= 1;
        }

    } // Close update function
} // Close Class
var circleArray = []

function init() {
    circleArray = [];
    for (var i = 0; i < 800; i++) {
        var radius = Math.random() * 40 + 1; // Get a random 0-3 then add 1
        var x = Math.random() * (innerWidth - radius * 8) + radius;
        var y = Math.random() * (innerHeight - radius * 8) + radius;
        var dx = Math.random() - 0.5 * 1; // Velocity which is the amount of pixels per movement
        var dy = Math.random() - 0.5 * 1;
        circleArray.push(new Circle(x, y, dx, dy, radius));

    }

}


function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);

    for (var i = 0; i < circleArray.length; i++) {
        circleArray[i].update();
    }

}
animate();
init();

//draw circle
// c.beginPath();
// c.arc(x, y, 10, 0, Math.PI * 2, false);
// c.strokeStyle = "red";
// c.stroke();
// console.log('asdnsa');
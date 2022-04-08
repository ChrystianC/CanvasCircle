const canvas = document.querySelector(".canvas");
const context = canvas.getContext("2d");

//function seting window Size
function windowSize() {
	canvas.width = window.innerWidth * 2;
	canvas.height = window.innerHeight * 2;
	canvas.style.height = window.innerHeight + "px";
	canvas.style.width = window.innerWidth + "px";
	context.scale(2, 2);
	// console.log("windowSize");
}

var CordsUpdate = {
	x: undefined,
	y: undefined,
	Drawing: false,
};

// makes object witch can be acces in other functions

function Part() {
	//seting variables like spawn size and speed
	// this.x = CordsUpdate.x;
	// this.y = CordsUpdate.y;
	this.x = Math.random() * canvas.width * 2.8;
	this.y = Math.random() * canvas.height * 2.8;
	this.radius = Math.random() * 15 + 1;
	this.motionX = Math.random() * 3 - 1.5;
	this.motionY = Math.random() * 3 - 1.5;
}
Part.prototype.motion = function () {
	//direction when circle going
	this.x += this.motionX;
	this.y += this.motionY;
};
Part.prototype.draw = function () {
	//creating a circle
	var colors = ["#780000", "#c1121f", "#fdf0d5", "#003049", "#669bbc"];
	// context.fillStyle = colors[Math.round(Math.random() * colors.length - 1)];
	context.fillStyle = "whitesmoke";
	context.beginPath();
	context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
	context.fill();
};

PartArray = [];
//make particles
let numberOfCircles = 1500;
function start() {
	for (let i = 0; i < numberOfCircles; i++) {
		PartArray.push(new Part());
	}
}
start();
console.log(PartArray);
//trigger motion and draw
function makeThemBe() {
	for (let i = 0; i < PartArray.length; i++) {
		PartArray[i].motion();
		PartArray[i].draw();
	}
}
//display
function animate() {
	context.clearRect(0, 0, canvas.width, canvas.height);
	makeThemBe();
	requestAnimationFrame(animate);
}
animate();

//mouse follow spray the circles
canvas.addEventListener("mousedown", function () {
	CordsUpdate.Drawing = true;
});

canvas.addEventListener("mousemove", function (e) {
	if (CordsUpdate.Drawing === true) {
		// Circle.sprayCircle();
		// Circle.DontTryToShrinkGypsy();
		CordsUpdate.x = e.offsetX;
		CordsUpdate.y = e.offsetY;
	}
});
window.addEventListener("mouseup", function () {
	if (CordsUpdate.Drawing === true) {
		CordsUpdate.Drawing = false;
	}
});
//end

windowSize();
window.addEventListener("resize", windowSize, false);

// var Circle = {
// 	numberOfCircles: 5,
// 	//table of colors  filling cricles
// 	colors: ["#780000", "#c1121f", "#fdf0d5", "#003049", "#669bbc"],
// 	//create circle
// 	draw(x, y, radius) {
// 		context.beginPath();
// 		radius = Math.random() * 10 + 1;
// 		fill = this.colors[Math.round(Math.random() * this.colors.length - 1)];
// 		context.arc(x, y, radius, 0, 2 * Math.PI, false);

// 		if (fill) {
// 			context.fillStyle = fill;
// 			context.fill();
// 		}
// 	},
// // 	//pattern circle addin numbers cords client click
// // 	sprayCircle() {
// // 		for (let i = 0; i < this.numberOfCircles; i++) {
// // 			let los = Math.round(Math.random() * 3);
// // 			switch (los) {
// // 				case 0:
// // 					this.draw(CordsUpdate.x + Math.random() * 30 + 10, CordsUpdate.y + Math.random() * 50);

// // 					break;
// // 				case 1:
// // 					this.draw(CordsUpdate.x + Math.random() * 30 + 10, CordsUpdate.y - Math.random() * 50);
// // 					break;
// // 				case 2:
// // 					this.draw(CordsUpdate.x, CordsUpdate.y);
// // 					break;
// // 			}
// // 		}
// // 	},
// // 	DontTryToShrinkGypsy() {
// // 		if (this.radius > 0.2) this.radius -= 1;
// // 	},
// // };

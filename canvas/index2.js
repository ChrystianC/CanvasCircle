canvas = document.querySelector(".canvas");
context = canvas.getContext("2d");

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
PartArray = [];
colors = ["#780000", "#c1121f", "#fdf0d5", "#003049", "#669bbc"];
numberOfCircle = 5;
// consturcotr adds new Particles
function Part() {
	//seting variables like spawn size and speed
	this.x = CordsUpdate.x;
	this.y = CordsUpdate.y;
	// this.x = Math.random() * canvas.width * 2.8;
	// this.y = Math.random() * canvas.height * 2.8;
	this.radius = Math.random() * 15 + 1;
	//direction of circles
	this.motionX = Math.random() * 4 - 2;
	this.motionY = Math.random() * 4 - 2;
	this.color = colors[Math.round(Math.random() * colors.length - 1)];
}
//aniation moving and shrink circles
Part.prototype.motion = function () {
	this.x += this.motionX;
	this.y += this.motionY;
	if (this.radius > 0.1) this.radius -= 0.1;
};
//creating a circle
Part.prototype.draw = function () {
	context.fillStyle = this.color;
	context.beginPath();
	context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
	context.fill();
};
//array contain in each element a PART()

console.log(PartArray);
//trigger motion and draw
function makeThemBe() {
	for (i = 0; i < PartArray.length; i++) {
		PartArray[i].motion();
		PartArray[i].draw();
		if (PartArray[i].radius <= 0.3) {
			PartArray.splice(i, 1);
			i--;
		}
	}
}
//display
function animate() {
	context.clearRect(0, 0, canvas.width, canvas.height);
	makeThemBe();
	requestAnimationFrame(animate);
}

//mouse follow spray the circles
canvas.addEventListener("mousedown", function () {
	CordsUpdate.Drawing = true;
});

canvas.addEventListener("mousemove", function (e) {
	if (CordsUpdate.Drawing === true) {
		for (i = 0; i < numberOfCircle; i++) {
			PartArray.push(new Part());
		}
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

animate();
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

//make particles
// let numberOfCircles = 1500;
// function start() {
// 	for (let i = 0; i < numberOfCircles; i++) {PartArray.push(new Part());}
// }
// start();

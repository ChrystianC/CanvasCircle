const fireworks = document.querySelector(".fireworks");
const context = fireworks.getContext("2d");

//function seting window Size
function windowSize() {
	fireworks.width = window.innerWidth * 2;
	fireworks.height = window.innerHeight * 2;
	fireworks.style.height = window.innerHeight + "px";
	fireworks.style.width = window.innerWidth + "px";
	context.scale(2, 2);
	// console.log("windowSize");
}

var CordsUpdate = {
	x: undefined,
	y: undefined,
	Drawing: false,
};

var Circle = {
	numberOfCircles: 5,
	//table of colors  filling cricles
	colors: ["#780000", "#c1121f", "#fdf0d5", "#003049", "#669bbc"],
	//create circle
	draw(x, y) {
		context.beginPath();
		radius = Math.random() * 10 + 1;
		fill = this.colors[Math.round(Math.random() * this.colors.length - 1)];
		context.arc(x, y, radius, 0, 2 * Math.PI, false);

		if (fill) {
			context.fillStyle = fill;
			context.fill();
		}
	},
	//pattern circle addin numbers cords client click
	sprayCircle() {
		for (let i = 0; i < this.numberOfCircles; i++) {
			let los = Math.round(Math.random() * 3);
			switch (los) {
				case 0:
					this.draw(CordsUpdate.x + Math.random() * 30 + 10, CordsUpdate.y + Math.random() * 50);
					break;
				case 1:
					this.draw(CordsUpdate.x + Math.random() * 30 + 10, CordsUpdate.y - Math.random() * 50);
					break;
				case 2:
					this.draw(CordsUpdate.x, CordsUpdate.y);
					break;
			}
		}
	},
	disapearCircle() {},
};

//mouse follow spray the circles
fireworks.addEventListener("mousedown", function () {
	CordsUpdate.Drawing = true;
});

fireworks.addEventListener("mousemove", function (e) {
	if (CordsUpdate.Drawing === true) {
		Circle.sprayCircle();
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

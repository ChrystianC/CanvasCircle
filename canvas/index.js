console.log((title = "inspiration was taken from 'juliangarnier'"));
window.human = false;

const canvasEl = document.querySelector(".fireworks");
const ctx = canvasEl.getContext("2d");
let numberOfParticules = 60;
let pointerX = 0;
let pointerY = 0;
let tap = "ontouchstart" in window || navigator.msMaxTouchPoints ? "touchstart" : "mousedown";
const colors = ["#FF1461", "#18FF92", "#5A87FF", "#FBF38C"];

function setCanvasSize() {
	canvasEl.width = window.innerWidth * 2;
	canvasEl.height = window.innerHeight * 2;
	canvasEl.style.width = window.innerWidth + "px";
	canvasEl.style.height = window.innerHeight + "px";
	ctx.scale(2, 2);
	console.log("setCanvasSize");
}

function updateCoords(e) {
	pointerX = e.clientX || e.touches[0].clientX;
	pointerY = e.clientY || e.touches[0].clientY;
	console.log("updateCoords");
}

function setParticuleDirection(p) {
	var angle = (anime.random(0, 360) * Math.PI) / 180;
	var value = anime.random(50, 180);
	var radius = [-1, 1][anime.random(0, 1)] * value;
	return {
		x: p.x + radius * Math.cos(angle),
		y: p.y + radius * Math.sin(angle),
	};
}

function createParticule(x, y) {
	let p = {};
	p.x = x;
	p.y = y;
	p.color = colors[anime.random(0, colors.length - 1)];
	p.radius = anime.random(16, 34);
	p.endPos = setParticuleDirection(p);
	p.draw = function () {
		ctx.beginPath();
		ctx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI, true);
		ctx.fillStyle = p.color;
		ctx.fill();
	};
	console.log("createParticule");
	return p;
}

function renderParticule(anim) {
	for (let i = 0; i < 10; i++) {
		anim.animatables[i].target.draw();
	}
	console.log(" renderParticule");
}

function animateParticules(x, y) {
	let particules = [];
	for (let i = 0; i < numberOfParticules; i++) {
		particules.push(createParticule(x, y));
	}
	anime.timeline().add({
		targets: particules,
		x: function (p) {
			return p.endPos.x;
		},
		y: function (p) {
			return p.endPos.y;
		},
		radius: 0.1,
		duration: anime.random(1200, 1800),
		easing: "easeOutExpo",
		update: renderParticule,
	});
	console.log("animateParticules");
}

let render = anime({
	duration: Infinity,
	update: function () {
		ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);
	},
});

document.addEventListener(
	tap,
	function (e) {
		window.human = true;
		render.play();
		updateCoords(e);
		animateParticules(pointerX, pointerY);
		console.log("tap");
	},
	false
);

let centerX = window.innerWidth / 2;
let centerY = window.innerHeight / 2;

setCanvasSize();
window.addEventListener("resize", setCanvasSize, false);

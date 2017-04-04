// for the play again button, reloads the page
function replay() {
    location.reload();
}
// width of the top and bottom "towers"
var lW = 60;
// randomize where the "towers" will be located
function random(min, max) {
    var w = window.innerWidth;
    var lava = lW / w * 100;
    var num1 = Math.random() * (max - min) + min;
    // sets the width and left values for the 3 divs
    var num2 = 100 - (num1 + lava);
    function style(a,b,c) {
    	document.querySelector('#' + a).style.width = num1 + "%";
    	document.querySelector('#' + a).style.left = 0 + "%";
   		document.querySelector('#' + b).style.width = lava + "%";
    	document.querySelector('#' + b).style.left = num1 + "%";
    	document.querySelector('#' + c).style.width = num2 + "%";
    	document.querySelector('#' + c).style.left = num1 + lava + "%";
    }
    // runs function twice for top and bottom. Can reduce to only have it run once using css
    style('div1', 'lava', 'div2');
    style('div3', 'lava2', 'div4');
}
// sets the wins and losses if stored in local storage
if (localStorage.getItem("wi") == '' || localStorage.getItem("lo") == '') {
	document.getElementById("win").innerHTML = 0;
	document.getElementById("loss").innerHTML = 0;
}
// supposed to grab the 0's from the html and set them as the wins and loss values
else {
	var dW = localStorage.getItem("wi");
	var dL = localStorage.getItem("lo");
	document.getElementById("win").innerHTML = dW;
	document.getElementById("loss").innerHTML = dL;
}
// gravity, controls how the player moves
function gravity() {
	var gravity = true;
	var player = document.querySelector(".player");
	var tH = document.querySelector(".tunnel").offsetHeight;
	var tW = document.querySelector(".tunnel").offsetWidth;
	// show win or loss page function
	function score(a) {
		document.querySelector(".score").style.display = 'block';
		gravity = false;
		document.querySelector("#message").innerHTML = a;
	}
	window.setInterval(function() { 
		if (gravity) {
			// values of where player is: left and top
			var g = player.offsetTop;
			var l = player.offsetLeft;
			//detection for the bottom tower
			var bL = document.querySelector("#lava").getBoundingClientRect().left;
			var bT = document.querySelector("#lava").getBoundingClientRect().top;
			//detection for the top tower
			var tL = document.querySelector("#lava2").getBoundingClientRect().left;
			var tT = document.querySelector("#lava2").getBoundingClientRect().top;
			var h = document.querySelector("#lava2").getBoundingClientRect().height;
			var hei = tT + h;
			//detection for the player
			var pL = document.querySelector(".player").getBoundingClientRect().left;
			var pT = document.querySelector(".player").getBoundingClientRect().top;
			// move down and left
			newLocation = g + 5; // down 5px
			newLocation2 = l + 5; // left 5px
			player.style.top = newLocation + 'px';
			player.style.left = newLocation2 + 'px';
			// move up
			document.onkeypress = function(e) {
				if (e.keyCode == '119') { // key "w"
					nl = newLocation - 20;
					player.style.top = nl + 'px';
				}
			};

			// grabs current values of wins and losses
			var wC = document.getElementById("win").innerHTML;
			var wL = document.getElementById("loss").innerHTML;
			// adds wins
			function win() {
				wC = parseInt(wC) + 1;
				document.querySelector("#win").innerHTML = wC;
			}
			// adds losses
			function loss() {
				wL = parseInt(wL) + 1;
				document.querySelector("#loss").innerHTML = wL;
			}
			// gets the width of the tunnel
			var sc = document.querySelector("#div1").offsetWidth + lW;
			// game ends, gravity turns off and win or loss message displays
			if (l >= (sc + 10)) {
				score('You Win!');
				win(); // win, made it in between the two towers without hitting a border
			}
			if (pL >= (bL - 20) && pT >= (bT - 20)) {
				score('You Lose... Bottom Tower :(');
				loss(); // loss, hit the bottom tower
			}
			if (pL >= (tL - 20) && pT <= (hei - 20)) {
				score('You Lose... Top Tower :(');
				loss(); // loss, hit the top tower
			}
			if (g <= 10) {
				score('You Lose... Ceiling :(');
				loss(); // loss, hit the ceiling
			}
			if (g >= (tH - 21)) {
				score('You Lose... Floor :(');
				loss(); // loss, hit the floor
			}
			if (l >= (tW - 21)) {
				score('You Lose... :(');
				loss(); // loss, hit the end of the tunnel. This should never be able to happen
			}
			// sets the win and loss values to local storage
			var wi = document.getElementById("win").innerHTML;
			var lo = document.getElementById("loss").innerHTML;
			localStorage.setItem("wi", wi);
			localStorage.setItem("lo", lo);
		}
	}, 60); // sets gravity speed
}

random(15,85); // runs random function
gravity(); // runs gravity function

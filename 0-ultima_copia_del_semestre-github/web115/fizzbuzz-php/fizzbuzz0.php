	<link href="styles/buzz1.css" rel="stylesheet" >
	
<div class="fizz">
	<div class="rectangle">

		<h2 id="fullnameIN">Welcome to VictoriaRodriguez&reg;</h2>
		<p id="message"></p>
		<h5>    Fizz Buzz 0 -First Part		</h5>
		<script>
			function namebutton() {
				var one = document.getElementById("firstName").value;
				var two = document.getElementById("middleInitial").value;
				var three = document.getElementById("lastName").value;
				document.getElementById("fullnameIN").innerHTML += "<br>" + one + " " + two + " " + three + " !!<br>";
				document.getElementById("message").innerHTML += "You are now a prime member";
			}
			function copyloop() {
				var print = "";
				var i;
				for (i = 1; i < 101; i++) {
					print += i + ") Victoria Rodriguez&reg; <br>";
				}
				document.getElementById("copies").innerHTML = print;
			}
		</script>

		<br>
		<p>
			<input id="firstName" type="text" name="firstName" placeholder="Enter First Name (Juan)" required>
			<br>
			<input id="middleInitial" type="text" name="middleInitial" placeholder="Enter Middle Initial (P)" required>
			<br>
			<input id="lastName" type="text" name="lastName" placeholder="Enter Last Name (Diaz)" required>
			<br>
		<!--	<input class="button" type="button" value="submit" onclick="namebutton(), copyloop()">		-->
		</p>
		<p>
			<button onclick="namebutton(), copyloop()" class="button" title="Get crazy & Click Me">Display 100 copies</button>
		</p>
		<p id="copies"></p>
	</div>
</div>
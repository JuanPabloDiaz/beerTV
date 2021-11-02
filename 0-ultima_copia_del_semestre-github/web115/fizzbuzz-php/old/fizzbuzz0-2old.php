	<link href="styles/buzz1.css" rel="stylesheet" >

<div class="fizz">
	<div class="rectangle">
		<h2 id="fullnameIN"></h2>
			<h5>    Fizz Buzz 0 - Second Part		</h5>

		<script>
				function namebutton() {
					var first = document.getElementById("firstname").value;
					document.getElementById("fullnameIN").innerHTML = "Welcome to VictoriaRodriguez&reg; " + first + "!<br> You are now a prime member";
				}
	  		function namebutton2() {
					document.getElementById("products").innerHTML = "We can count for you " + first + ". How many products do you wanna buy " + first + "?";
				}
				function howhighbutton() {
					var height = document.getElementById("howhigh").value;
					document.getElementById("how_high").innerHTML = "We will count " + height + " times.";
				}
				function valentinehosting() {
					var i;
					var height = document.getElementById("howhigh").value;
					for (i = 1; i <= height; i++) {
						if (i % 2 === 0) {
							document.getElementById("evenoddlist").innerHTML += i + ". Valentine Hosting - EVEN <br>";
						} 

						else {
							document.getElementById("evenoddlist").innerHTML += i + ". Valentine Hosting - ODD <br>";
						}
					}
				}
			</script>

			<h4 id="first_name" style="text-align: center;">Type your full name</h4>

				<p>
					<input type="text" name="firstname" id="firstname" placeholder="Enter fullName...">
					<br>
					<input type="button" value="submit" onclick="namebutton(),namebutton2()">
				</p>
				<p id="products">We can count for you. How many products do you wanna buy?</p>
				<p>
					<input type="text" name="howhigh" id="howhigh" placeholder="Insert Number...">
					<br>
					<input type="button" value="submit" onclick="howhighbutton()">
				</p>
				<p id="how_high">We will count 0 times.</p>
				<p><button onclick="valentinehosting()">Show me the lines!</button></p>
				<p id="evenoddlist"></p>

				<script>
				function namebutton() {
					var one = document.getElementById("firstName").value;
					var two = document.getElementById("middleInitial").value;
					var three = document.getElementById("lastName").value;
					document.getElementById("fullnameIN").innerHTML = "Welcome to VictoriaRodriguez&reg; " + first + " " + two + " " + three + "!<br> You are now a prime member";
				}
				function valentinehosting() {
					var print = "";
					var i;
					for (i = 1; i < 101; i++) {
						print += i + ") Victoria Rodriguez&reg; <br>";
					}
					document.getElementById("vhlist").innerHTML = print;
				}
			</script>
<hr>
				<label>Full Name*</label><br>
				<p>
					<input id="firstName" type="text" name="firstName" placeholder="Enter First Name">
					<br>
					<input id="middleInitial" type="text" name="middleInitial" placeholder="Enter Middle Initial">
					<br>
					<input id="lastName" type="text" name="lastName" placeholder="Enter Last Name">
					<br>
					<input class="button" type="button" value="submit" onclick="namebutton()">
				</p>
				<p>
					<button onclick="valentinehosting()" class="button">Get crazy: Display 100 copies</button>
				</p>
				<p id="vhlist"></p>
	</div>
</div>
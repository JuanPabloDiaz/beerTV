	<link href="styles/buzz1.css" rel="stylesheet" >

<div class="fizz">
	<div class="rectangle">
		<h2 id="fullnameIN"></h2>
			<h5>    Fizz Buzz 0 - Second Part		</h5>

			<h4 id="first_name" style="text-align: center;">Type your full name</h4>

				<p>
					<input type="text" name="firstname" id="firstname" placeholder="Enter Name...">
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
					var one = document.getElementById("Name").value;
					document.getElementById("fullnameIN").innerHTML = "Welcome to VictoriaRodriguez&reg; " + one + "!<br> You are now a prime member";
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
				Full Name*<br>
				<p>
					<input id="Name" type="text" name="firstName" placeholder="Enter First Name">
					<br>
					<input class="button" type="button" value="submit" onclick="namebutton()">
				</p>
				<p>
					<button onclick="valentinehosting()" class="button">Get crazy: Display 100 copies</button>
				</p>
				<p id="vhlist"></p>
	</div>
</div>
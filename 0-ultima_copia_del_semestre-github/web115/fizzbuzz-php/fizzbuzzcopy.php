<link href="styles/buzz1.css" rel="stylesheet" >

<div class="fizz">
	<div class="rectangle">

		<script>
		function chickName() {
			var completename = document.getElementById("fullName").value;
				document.getElementById("greeting").innerHTML = "Hello, " + completename + "! <br> Welcome to Victoria Rodriguez!!";
				document.getElementById("ngLoop2").innerHTML = "Hey " + completename + "! Enter a number and we find you the answer as even or odd.";
			}

		function generateNum() {
			var whatNum = document.getElementById("userEnterNum").value;
			var whatNum = parseInt(whatNum);
			for (var i = 1; i <= whatNum; i++) {
				if (i % 2 === 0) {
					document.getElementById("evenOddList").innerHTML += i + ". Victoria RodriguezEEEE <br>";
				} 

				else {
					document.getElementById("evenOddList").innerHTML += i + ". Victoria RodriguezOOO <br>";
				}
			}
		}
		</script>


	<div id="wrapper">	

		<br>
		<br>
		<header>
				<h2 id="greeting">Hi there, <br>
			Please enter your Full Name below:</h2>
		</header>	
			<br>

			<h3>Assignment: Fizz Buzz 0 - Part 2</h3>

		<br>

			<form>
				<label for="fullName">Full Name:</label>
				<br>
				<input type="text" id="fullName" placeholder="Enter Full Name...">
				<br>
							<input type="button" class="button" value="Submit" onclick="chickName()">
			</form>

				<br><hr>
				<!-- second part-->
			<form>
				<label id="ngLoop2"></label>
				<br>
				<br>
				<input type="text" id="userEnterNum" placeholder="Type any number...">
				<br>
				<br>
				<input type="button" class="button" value="Submit" onclick="generateNum()">
			</form>	
		</div>
	</div>
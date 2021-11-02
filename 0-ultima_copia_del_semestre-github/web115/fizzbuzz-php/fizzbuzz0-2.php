	<link href="styles/buzz1.css" rel="stylesheet" >

<div class="fizz">
	<div class="rectangle">
		<h2 id="fullnameEnter"> </h2>
			<h5>    Fizz Buzz 0 - Second Part</h5>
			<script>
	function one() {
		var typename = document.getElementById("fullName").value;
			document.getElementById("greeting").innerHTML = "Welcome to VictoriaRodriguez&reg; " + typename + "!<br> You are now a prime member";
			document.getElementById("ngLoop2").innerHTML = "Hey " + typename + ",<br> lets place an order and find out binary values!<br> (enter a number)";
		}

	function two() {
		var whatNum = document.getElementById("userEnterNum").value;
		var whatNum = parseInt(whatNum);
		for (var i = 1; i <= whatNum; i++) {
			if (i % 2 === 0) {
				document.getElementById("binary").innerHTML += "(" + i + ") VictoriaRodriguez&reg; - 0 <br>";
			} 
    
			else {
				document.getElementById("binary").innerHTML += "(" + i + ") VictoriaRodriguez&reg; - 1 <br>";
			}
		}
	}
		</script>

	    <h2 id="greeting">Welcome to Victoria Rodriguez&reg; <br><br>Complete and submit the form</h2>
		<br><br>
		<form>
			<label for="fullName">Full Name:</label>
			<br>
			<input type="text" id="fullName" placeholder="Juan Pablo Diaz" required>
			<br>
			<br>
			<input type="button" class="button" value="Submit" onclick="one()">
		</form>
			
			<br>
		<form>
			<label id="ngLoop2"></label>
			<br>
			<br>
			<input type="text" id="userEnterNum" placeholder="Type any number..." required>
			<br>
			<br>
			<input type="button" class="button" value="Lets play" onclick="two()">
		</form>		
		<br>
		<div id="binary"></div>
			<br>		
	</div>
</div>
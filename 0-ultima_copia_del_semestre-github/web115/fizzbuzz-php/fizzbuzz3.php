	<link href="styles/buzz1.css" rel="stylesheet" >
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>

  
<div class="fizz">
	<div class="rectangle">

			<!-- Greeting h2 -->
				<h2 id="greeting">
					Hi there, <br>
					Please enter your Full Name below:
				</h2>
						<h5>Task: Fizz Buzz Bang 3</h5>

<div class="column" style="background-color:#505050;" >


</div>

<br>
<form>
  First name:<br>
  <input  type="text" id="first_name" placeholder="Juan" required>
  <br><br>
  Middle name:<br>
  <input  type="text" id="middle_name" placeholder="P." required>
  <br><br>
  Last name:<br>
  <input  type="text" id="last_name" placeholder="Diaz" required>
  <br><br><br>
  
  <input id= "submit" type="button" value="submit">
  <br>
</form>
<p id = "list">

</p>

<script>

	//variables

		var text = "";
		var word1 = "Watches";
		var word2 = "Glasses";
		var word3 = "Jewelry";
		var otherWord = "EyeGlasses";
		var divisor1 = 3;
		var divisor2 = 5;
		var divisor3 = 7;


	//after submit
	$('#submit').on('click', function() {

	//changes greeting
		document.getElementById("greeting").innerHTML = document.getElementById("first_name").value
		+ ",Welcome to Victoria Rodriguez site!!";

		//gets firstname / prompt
		var name = document.getElementById("first_name").value;
		var iCounter = prompt( name + ", let us count until...? (enter number)");
		var text = "";



		for (var i = 1; i <= iCounter; i++) {

			//3,5,7
			if (i % divisor1 === 0 && i % divisor2 === 0 && i % divisor3 === 0) {

			document.getElementById("list").innerHTML = text += i + "). " + word1 + word2 + word3 + "<br>";
			}

			//3,5
			else if (i % divisor1 === 0 && i % divisor2 === 0){
			document.getElementById("list").innerHTML = text += i + "). " + word1 + word2 + "<br>";
			}

			//3,7
			else if (i % divisor1 === 0 && i % divisor3 === 0) {
			document.getElementById("list").innerHTML = text += i + "). " + word1 + word3 + "<br>";
			}

		//5,7
		 else if (i % divisor2 === 0 && i % divisor3 === 0) {
			document.getElementById("list").innerHTML = text += i + "). " + word2 + word3 + "<br>";
			}

			//3
			else if (i % divisor1 === 0) {
			document.getElementById("list").innerHTML = text += i + "). " + word1 + "<br>";
			}
			//
			 else if (i % divisor2 === 0) {
			document.getElementById("list").innerHTML = text += i + "). " + word2 + "<br>";
			}
			//7
			 else if (i % divisor3 === 0) {
			document.getElementById("list").innerHTML = text += i + "). " + word3 + "<br>";
			}
			//n.a
			else {
			 document.getElementById("list").innerHTML = text += i + "). <br>"; 
			 }


	}	
	}
	);

	</script>
	
	</div>
</div>
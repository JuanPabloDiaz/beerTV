	<link href="styles/buzz1.css" rel="stylesheet" >
  
<div class="fizz">
	<div class="rectangle">

			<!-- Greeting h2 -->
				
				<h1>Victoria Rodriguez&reg;</h1><br>
				<h2 id="changeGreeting">
					Hi there, <br>
					Please enter your Full Name below:
				</h2>
						<h5>Task: Fizz Buzz 1</h5>
			<!-- Form -->
				<form id="fullNameForm">
						<input name="name" type="text" placeholder="Juan Pablo Diaz..." size="25" required>
				</form>
					<button onclick="outputfullname(), numLoop()" class="button" title="Click Me"> Display 140 copies</button>
				<!-- Function to change the title -->
				<script>

						function outputfullname() {

							var getfn,usefn,name;    /* Declar variables */
							getfn=document.getElementById("fullNameForm") ;             /* save input in variable */
							usefn = getfn.elements["name"].value;                       /* get input from the variable to use by saving in another variable */
							document.getElementById("changeGreeting").innerHTML = "Hello "+ usefn + ", <br>Welcome to Victoria Rodriguez!!<br>";    /* change title */

							document.getElementById("looptitle").innerHTML = "Hey " + usefn + ", Lets get crazy and check our great brands. Hurry up...we have amazing deals!";

						}

				</script>
						<!-- part 2 -->
				<br><hr>
				<!-- section -->
				<script>

				 function numLoop() {
							 var i;
							 for (i = 1; i <= 141; i++) {
						if (i % 3 === 0 && i % 5 === 0) {
							document.getElementById("Juan(one)List").innerHTML += "(" + i + ") Swatch. <br>";
						} else if (i % 5 === 0) {
							document.getElementById("Juan(one)List").innerHTML += "(" + i + ") RayBan. <br>";
						} else if (i % 3 === 0){
							document.getElementById("Juan(one)List").innerHTML += "(" + i + ") Victoria Rodriguez! <br>";
						} else {
							document.getElementById("Juan(one)List").innerHTML += "(" + i + ") MichaelKors. <br>";
						}
					}
				}

		</script>
					<p id="looptitle"></p><br>
<!--				<button onclick="numLoop()" class="button">Get crazy: Display 140 copies</button>
-->
				<div id="Juan(one)List"><br></div>
	</div>	
</div>
	<link href="styles/buzz1.css" rel="stylesheet" >
  
<div class="fizz">
	<div class="rectangle">

			<!-- Greeting h2 -->
				<h2 id="changeGreeting">
					Hi there, <br>
					Please enter your Full Name below:
				</h2>
						<h5>Task: Fizz Buzz 2</h5>
			<!-- Form -->
				<form id="fullNameForm">
					Full Name...<br>        <!--doesnt need to be in <label>-->
						<input name="name" type="text" placeholder="Juan Pablo Diaz" size="25">
				</form>
			<!--		<button onclick="firstAction()" class="button">Submit</button>		-->
				<!-- Function to change the title -->
				<script>

						function firstAction() {

							var getfn,usefn,name;    /* Declar variables */
							getfn=document.getElementById("fullNameForm") ;       /* save input in variable */
							usefn = getfn.elements["name"].value;                 /* get input from the variable to use by saving in another variable */
							document.getElementById("changeGreeting").innerHTML = "Hello "+ usefn + ", <br>Welcome to Victoria Rodriguez!!<br>";    /* change title */

							document.getElementById("looptitle").innerHTML = "Hey " + usefn + " dont freak out. Victoria is here to help you...We decide for you!";
						}

				</script>
						<!-- part 2 -->
				<br><hr>
				<!-- section -->
				<script>

				 function second() {

  function checkDivision(counter, divisor) {

    return (counter % divisor === 0);
  };

  var firstDivisor = 3,
    secondDivisor = 5;

  for (var iplus = 1; iplus <= 140; iplus++) {
    
    if (checkDivision(iplus, firstDivisor) && checkDivision(iplus, secondDivisor)) {
      document.getElementById("Juan(one)List").innerHTML +=
        iplus + "/. True [" + firstDivisor + " & " + secondDivisor + "] . <br>";
    }

    else if (checkDivision(iplus, firstDivisor)) {
      document.getElementById("Juan(one)List").innerHTML +=
        iplus + "/. True [" + firstDivisor + "] . <br>";
    }

    else if (checkDivision(iplus, secondDivisor)) {
      document.getElementById("Juan(one)List").innerHTML +=
        iplus + "/. True [" + secondDivisor + "] . <br>";
    }

    else {
      document.getElementById("Juan(one)List").innerHTML +=
        iplus + "/. False . <br>";
    }
  }
}

		</script>
					<p id="looptitle">Have fun with VR...</p><br>
				<button onclick="firstAction(), second()" class="button" title="Click me and find out">True or false?</button>

				<div id="Juan(one)List"><br></div>
	</div>	
</div>
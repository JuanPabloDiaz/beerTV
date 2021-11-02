<script>
				function getResults() {
			var name1 = document.getElementById("firstName").value;
			var name2 = document.getElementById("middleInitial").value;
			var name3 = document.getElementById("lastName").value;
			var fullNameIn = name1 + " " + name2 + " " + name3;
			document.getElementById("greeting").innerHTML ="Hello " + fullNameIn + ", Welcome to Victoria Rodriguez&reg;" ;

			function verifyDivition(iCount, iDivide){
					return(iCount % iDivide ===0);
			}

			var divisorOne= document.getElementById("divisor1").value; 
			var divisorTwo= document.getElementById("divisor2").value;
			var divisorThree= document.getElementById("divisor3").value;

			var wordOne= document.getElementById("word1").value;
			var wordTwo= document.getElementById("word2").value;
			var wordThree= document.getElementById("word3").value;

			var countUntil= document.getElementById("endCount").value;

			for (var icount = 1; icount <= countUntil; icount++) {
					if (verifyDivition(icount,divisorOne) && verifyDivition(icount,divisorTwo) && verifyDivition(icount,divisorThree) ) {
							document.getElementById("getData").innerHTML +=icount + ". " + wordOne + wordTwo + wordThree +".<br>"; 
					} 
					else if (verifyDivition(icount,divisorOne) && verifyDivition(icount,divisorTwo) ) {
							document.getElementById("getData").innerHTML +=icount + ". " + wordOne + wordTwo + ".<br>"; 
					} 
					else if (verifyDivition(icount,divisorOne) && verifyDivition(icount,divisorThree) ) {
							document.getElementById("getData").innerHTML +=icount + ". "  + wordOne + wordThree +".<br>"; 
					}
					else if (verifyDivition(icount,divisorTwo) && verifyDivition(icount,divisorThree) ) {
							document.getElementById("getData").innerHTML +=icount + ". " + wordTwo + wordThree + ".<br>"; 
					}        
					else if (verifyDivition(icount,divisorOne)) {
							document.getElementById("getData").innerHTML += icount + ". " + wordOne + ".<br>"; 
					} 
					else if (verifyDivition(icount,divisorTwo)) {
							document.getElementById("getData").innerHTML += icount + ". " + wordTwo + ".<br>"; 
					}
					else if (verifyDivition(icount,divisorThree)) {
							document.getElementById("getData").innerHTML += icount + ". " + wordThree + ".<br>"; 
					}  
					else { document.getElementById("getData").innerHTML += icount + ".False. <br>"; 
					}
			}
	}
		</script>
<link href="styles/buzz1.css" rel="stylesheet" >

<div class="fizz">
	<div class="rectangle">
		<h3>FizzBuzz 4</h3>					
		<h4 id="greeting">
			Hi there! <br> Type your name and chose a number to counto...<br>
			Enter 3 numbers to use as divisors and 3 words to display later:
		</h4>
		 <form id="myForm" action="#" method="post">
		 	 <p>Enter your name:</p>
				 <input id="firstName" type="text" placeholder="First Name" required><br>
				 <input id="middleInitial" type="text" placeholder="Middle Initial"  required><br>
				 <input id="lastName" type="text" placeholder="Last Name" required><br>
			 <p>Enter 3 numbers:</p>
				 <input id="divisor1" type="text" placeholder ="divisor1" value="3"  required><br>
				 <input id="divisor2" type="text" placeholder ="divisor2" value="5"  required><br>
				 <input id="divisor3" type="text" placeholder ="divisor3" value="7"  required><br>
			 <p>Enter 3 words:</p>
				 <input id="word1" type="text" placeholder ="word1" value="Victoria"  required><br>
				 <input id="word2" type="text" placeholder ="word2" value="Rodriguez&reg;"  required><br>
				 <input id="word3" type="text" placeholder ="word3" value="Colombia"  required><br>
			 <p>Count till...?</p>
				 <input id="endCount" type="text" placeholder="endCount" value="125" required><br>
			<button class="button" type="button" name="button" onclick="getResults()">Get Results</button>
		</form>
    <p id="getData"></p>
  </div>
</div>

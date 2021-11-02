
	<link href="styles/buzz1.css" rel="stylesheet" >

	<div class="fizz">

			<h5>Task: Fizz Buzz_0</h5>

	<h3>Welcome to Victoria Rodriguez!</h3>
			<p id="description">Please fill out the next form to become a prime member :</p>
			
		<form id="allName">
		<div id="div_first_name">
			<label>First Name...</label><br>
					<input name="firstName" type="text" placeholder="Enter first name *" size="10"><br>
</div>
		<div id="div_middle_name">
			<label>Middle Initial...</label><br>
					<input name="middleName" type="text" placeholder="Enter first name *" size="10"><br>
</div>
		<div >
			<label>Last Name...</label><br>
					<input name="lastName" type="text" placeholder="Enter first name *" size="10"><br>
</div>

		</form>
		
				<button onclick="outputfullname()">Submit</button>
			
		<script>
			function outputfullname() {

								/*	middle Initial	*/
				var getfn, usefn, firstName;

				getfn = document.getElementById("div_first_name");
				usefn = getfn.elements["firstName"].value;

				//alert("Hello " + usefn);
				///////////////////////////////////////////////////////////
								/*	middle Initial	*/
				var getmi, usemi, middleName;

				getmi = document.getElementById("div_middle_name");
				usemi = getmi.elements["middleName"].value;

				//alert("Hello " + usemi);
				///////////////////////////////////////////////////////////
								/*	Last Name	*/

				var getln, useln, lastName;

				getln = document.getElementById("div_last_name");
				useln = getln.elements["lastName"].value;

				//alert("Hello " + useln);
				///////////////////////////////////////////////////////////
				
				var fullName = usefn + " " + usemi + ". " + useln;
				alert(fullName);
			}
		
		</script>
		<p>the form works with a single item  but I am not able to make it work with middle name, last name...it looks like I will need to do 3 separate forms or call the values and save them in another variable called fullname</p>
		<p>Check this video <a href="https://www.youtube.com/watch?v=a0qDV0Nivfw">tutorial here</a>.</p>
		
		<hr>	<!--  another webform -->
		
			<h2 id="greeting">Welcome to Victoria Rodriguez!</h2>
			
	<form id="fullName_form" action="/action_page.php">
		First Name: <input type="text" placeholder="Juan" name="firstName"><br><br>
 	Mid Initial: <input type="text" placeholder="P." name="middleInitial"><br><br>
	Last Name: <input type="text" placeholder="Diaz" name="LastName"><br>
</form>
	
<button onclick="displayFunction(); loopFunction();">Submit</button>
	
<script>
function displayFunction() {
    var newName = document.getElementById("fullName_form");
    var welcome = "Welcome to Victoria Rodriguez! <br>";
    var i;
    for (i = 0; i < newName.length ; i++;) {
        welcome += newName.elements[i].value + " ";
    }
    document.getElementById("greeting").innerHTML = welcome;
	
}
		<hr>
		<!-------------------------------------- loop section ------------------------------------->
		<script>
			function brandLoopexercise() {
			var dr = "";
			var i;
			for (i = 1; i < whatNum; i++){
					dr += i + "follow us on facebook at...";
			}
		</script>
		
		<h2>Part 2</h2>
		
			<ul>
				<li>
					<button class="button2" onclick="brandLoopexercise()"> Brand Loop...</button>
				</li>
			</ul>
			
			<br>
			
			<p id="ngLoop"></p>
			
</div>
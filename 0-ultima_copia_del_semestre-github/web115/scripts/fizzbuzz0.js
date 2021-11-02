function doThis () {
	var greeting = document.getElementById("greeting"), 
	firstName = document.getElementById("firstName"),
	lastName = document.getElementById("lastName"),
	middleInitial = document.getElementById("middleInitial"),
	message = "Welcome to VictoriaRodriguez&reg; ";
	
	greeting.innerHTML = message + firstName.value + " " + middleInitial.value + " " + lastName.value + "!";
	
	let hours = prompt("give me a number? Max 125");
	var fizzBuzz = document.getElementById("fizzBuzz");
     
	fizzBuzz.innerHTML = "";
	
	for (var i = 1; i <= hours; i++) {
		let loopMsg = "Let's try something else "
		if(i % 2 === 0){
			
		fizzBuzz.innerHTML += i + '. ' + loopMsg +  'Even number <br>';
		}
		else {
		fizzBuzz.innerHTML += i + '. ' + loopMsg +  'Odd number <br>';
		}
	}                                                       
	
}
document.getElementById("button").addEventListener("click", doThis, false);






function evenlyGoesInto(currentNumber, divisor) 
{
	var isEvenlyDivisible = false;
	if(currentNumber % divisor === 0) 
	{
		isEvenlyDivisible = true;
	}
	return isEvenlyDivisible;
}

		
function getContents () 
{
	var firstName = document.getElementById("firstName").value;
	var	middleInitial = document.getElementById("middleInitial").value;
	var	lastName = document.getElementById("lastName").value;
	var	endCount = document.getElementById("endCount").value;
	var	endCount = parseInt(endCount);
	var	message = "Come learn with me ";
	var divisor1 = parseInt(document.getElementById("divisor1").value);
	var divisor2 = parseInt(document.getElementById("divisor2").value);
	var divisor3 = parseInt(document.getElementById("divisor3").value);
	var word1 = document.getElementById("word1").value;
	var word2 = document.getElementById("word2").value;
	var word3 = document.getElementById("word3").value;
	var beginning = 1; 
	document.getElementById("greeting").innerHTML = message + firstName + " " + middleInitial + " " + lastName;
	
	
	var sOutput = ""; 
	
	for (var i = beginning; i <= endCount; i++) 
	{
		if (evenlyGoesInto(i, divisor1) && evenlyGoesInto(i, divisor2) && evenlyGoesInto(i , divisor3))
		{ //first and second and third
			sOutput += word1 + word2 + word3;
		}
		else if (evenlyGoesInto(i, divisor1) && evenlyGoesInto(i, divisor2))
		{ //first and second
			sOutput += word1 + word2;
		}
		else if (evenlyGoesInto(i, divisor1) && evenlyGoesInto(i, divisor3))
		{ //first and third
			sOutput += word1 + word3;
		}
		else if (evenlyGoesInto(i, divisor2) && evenlyGoesInto(i, divisor3))
		{ //second and third
			sOutput += word2 + word3;
		}
		else if (evenlyGoesInto(i, divisor1))
		{ //first
			sOutput += word1;
		}
		else if (evenlyGoesInto(i, divisor2))
		{ //second
			sOutput += word2;
		}
		else if (evenlyGoesInto(i, divisor3))
		{ //third
			sOutput += word3;
		}
		else
		{
			sOutput += i+ '. '; 
		}
		sOutput += '<br>'; //adding to the end of the line
	}
	
	var outputArea = document.getElementById("fizzBuzz");

	outputArea.innerHTML = sOutput;
}

var contentsButton = document.getElementById("getData");
contentsButton.addEventListener("click", getContents);
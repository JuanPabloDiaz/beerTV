
<!DOCTYPE html>
<html lang ="en">
<head>
	<link href="https://fonts.googleapis.com/css?family=Shadows+Into+Light" rel="stylesheet">
	<link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet">
	<link href="styles/brand.css" rel="stylesheet">
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
	
	<meta charset="UTF-8">
<title> Fizz Buzz Bang - Iway</title>
</head>
<style>
@font-face {
font-family :times new roman ;
font-style : normal;
font-weight : 400;
src : local('Shadows Into Light'), local('ShadowsIntoLight'), url(https://fonts.gstatic.com/s/shadowsintolight/v7/UqyNK9UOIntux_czAvDQx_ZcHqZXBNQzdcD8.ttf) format('truetype');
}
@font-face {
{
font-family : "'Open Sans'";
font-style : normal;
font-weight : 400;
src : local('Open Sans Regular'), local('OpenSans-Regular'), url(https://fonts.gstatic.com/s/opensans/v15/mem8YaGs126MiZpBA-UFVZ0e.ttf) format('truetype');
}
}
body {
margin : 20px;
background-color : blue;
color : #ff4d01;
font-family : 'Open Sans';
}
#logo {
text-align : center;
}
#customink {
float : right;
margin-left : 15px;
}
#wholepage {
padding : 10px;
font-size : 14px;
overflow : hidden;
}
hr {
height : 5px;
border : none;
background-color : red;
}
h1 {
color : red;
font-family : 'Shadows Into Light';
margin : 0;
padding : 0;
font-size : 60px;
}
h2 {
font-family : 'Shadows Into Light';
margin : 0;
font-style : italic;
}
#navlinks {
color : lime;
font-weight : bold;
margin-top : 0;
}
footer {
text-align : center;
margin : 10px;
}
a {
color : #ff4d01;
text-decoration : none;
}
</style>
<body>
<div class="column" style="background-color:#505050;" >


<div id = "logo">
<h1>Iway</h1>
<br>
<h2>Making the impossible happen</h2>


	<h3>Fizz Buzz Bang 3</h3>
</div>

<br>
<div id = "wholepage">
<h3 id = "greeting" > Welcome to Iway! </h3>
<form>
  First name:<br>
  <input  type="text" id="first_name" required>
  <p>
  
  Middle name:<br>
  <input  type="text" id="middle_name" required>
  <p> 
  
  Last name:<br>
  <input  type="text" id="last_name" required>
  <p>
  
  
  <input id= "submit" type="button" value="submit">
</form>
<p id = "list">

</p>

<script>

//variables
	
	var text = "";
	var firstWord = "Iphone";
	var secondWord = "Youtube";
	var thirdWord = "In";
	var otherWord = "One";
    var firstDivisor = 3;
	var secondDivisor = 5;
	var thirdDivisor = 7;


//after submit
$('#submit').on('click', function() {

//changes greeting
	document.getElementById("greeting").innerHTML = document.getElementById("first_name").value
	+ ",Welcome to Sabby's Custom Ink!!!!";
	
	//gets firstname / prompt
  var name = document.getElementById("first_name").value;
  var iCounter = prompt("How high do you want to count, " + name + "?");
  var text = "";
  
  
  
	for (var i = 1; i <= iCounter; i++) {
  
    //3,5,7
    if (i % firstDivisor === 0 && i % secondDivisor === 0 && i % thirdDivisor === 0) {

    document.getElementById("list").innerHTML = text += i + ". " + firstWord + secondWord + thirdWord + "<br>";
    }
    
    //3,5
    else if (i % firstDivisor === 0 && i % secondDivisor === 0){
    document.getElementById("list").innerHTML = text += i + ". " + firstWord + secondWord + "<br>";
    }
    
    //3,7
    else if (i % firstDivisor === 0 && i % thirdDivisor === 0) {
    document.getElementById("list").innerHTML = text += i + ". " + firstWord + thirdWord + "<br>";
    }
	
	//5,7
	 else if (i % secondDivisor === 0 && i % thirdDivisor === 0) {
    document.getElementById("list").innerHTML = text += i + ". " + secondWord + thirdWord + "<br>";
    }
    
    //3
    else if (i % firstDivisor === 0) {
    document.getElementById("list").innerHTML = text += i + ". " + firstWord + "<br>";
    }
    //
     else if (i % secondDivisor === 0) {
    document.getElementById("list").innerHTML = text += i + ". " + secondWord + "<br>";
    }
    //7
     else if (i % thirdDivisor === 0) {
    document.getElementById("list").innerHTML = text += i + ". " + thirdWord + "<br>";
    }
    //n.a
    else {
     document.getElementById("list").innerHTML = text += i + ". <br>"; 
     }
    

}	
}
);
   
 


</script>


</div>
<hr>

<footer> 
Copyright : 2018; <br> Site designed by: Damien Fairs 

<a class="validation" href="http://validator.w3.org/check?uri=referer">
	<img src="http://students.cpcc.edu/~tfarrer0/web110/images/valid_html5.gif" alt="Valid HTML 5" 
		height="31" width="88" style="border:0px;" />
	</a>
<a class="validation" href="http://jigsaw.w3.org/css-validator/check/referer">	
	<img src="http://students.cpcc.edu/~tfarrer0/web110/images/vcss-yellow.gif" alt="Valid CSS" height="31" width="88" style="border:0px;" />
	</a>
</footer>
</main>
</html>
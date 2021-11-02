function nameInput() {
		var txt;
    var person = prompt("Please enter your name:", "Juan Diaz");
    if (person == null || person == "") {
        txt = "Hi!";
    } else {
        txt = "Hi " + person + "!";
    }
    document.getElementById("askName").innerHTML = txt;
}
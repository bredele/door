require(["Door"], function(Door){
	var text = document.querySelector(".text"),
		password = document.querySelector(".password"),
		submit = document.querySelector(".submit"),
		door = new Door(["text", "password"]);

	door.watch("open", function(){
		alert("door open!");
	});

	text.addEventListener("input", function(){
		door.unlock("text", text.value);
	});

	password.addEventListener("input", function(){
		door.unlock("password", password.value);
	});

	submit.addEventListener("click", function(){
		if(!door.open()) {
			console.log("door still closed");
		}
	});
});
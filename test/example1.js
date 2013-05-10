require(["Door"], function(Door){

	var door = new Door(["lock1", "lock2", "lock3"]),
		open = document.querySelector(".door");

	door.watch("open", function(){
		open.classList.add("open");
	});

	document.querySelector(".locks").addEventListener("click", function(event){
		var target = event.target,
			attr = target.getAttribute("data-lock");

		if(attr){
			target.classList.toggle("unlock");
			door.unlock(attr, target.classList.contains("unlock"));
			if(!door.open()){
				open.classList.remove("open");
			}
		}
	});


});
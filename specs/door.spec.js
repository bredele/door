require(["Door"], function(Door){

	describe("Function constructor", function(){

		it("should have a constructor method", function(){
			expect(Door).toBeInstanceOf(Function);
		});

		describe("Initialization", function(){

			it("should have a function to get door locks", function(){
				var door = new Door();
				expect(door.getLocks).toBeInstanceOf(Function);
			});

			it("should initialize locks with an empty array", function(){
				var door = new Door();
				expect(door.getLocks()).toEqual([]);
			});

			it("should initialize door with array of locks", function(){
				var array = ["lock1", "lock2"],
					door = new Door(array);
				expect(door.getLocks()).toEqual(array);
			});

			// should we allows to set locks?
			it("should get an empty array if initialize with something else than an array", function(){
				var door = new Door("olivier");
				expect(door.getLocks()).toEqual([]);

				door = new Door(true);
				expect(door.getLocks()).toEqual([]);

				door = new Door(2);
				expect(door.getLocks()).toEqual([]);

			});

		});

	});

	describe("Unlock", function(){

		var door = null,
			array = null;

		beforeEach(function(){
			array = ["lock1", "lock2", "lock3"];
			door = new Door(array)
		});

		it("should have an unlock function", function(){
			expect(door.unlock).toBeInstanceOf(Function);
		});


		describe("Unlock condition/key", function(){

			it("shouldn't unlock if second argument is falsy", function(){
				door.unlock("lock1", "");

				door.unlock("lock2", false);

				door.unlock("lock3", undefined);

				expect(door.getLocks()).toEqual(["lock1" ,"lock2", "lock3"]);
			});

			//truthy is important for input and form for example
			it("should unlock if second argument is truthy", function(){
				door.unlock("lock1", "input value");
				expect(door.getLocks()).toEqual(["lock2", "lock3"]);

				door.unlock("lock2", true);
				expect(door.getLocks()).toEqual(["lock3"]);

				door.unlock("lock3", 3);
				expect(door.getLocks()).toEqual([]);
			});
		});

		//should we return an array o items removed or boolean?
		it("should return true if unlock a defined lock, false otherwise", function(){
			expect(door.unlock("lock1", true)).toEqual(true);
			expect(door.unlock("lock4", true)).toEqual(false);
			expect(door.unlock("lock5", false)).toEqual(false);
		});

		//undefined is falsy, that's why we test with true as second argument
		//should we consider undefined as a special value to just have door.unlock("lock1")?
		it("should remove the unlocked lock from the list of locks", function(){
			door.unlock("lock1", true);
			expect(door.getLocks()).toEqual(["lock2", "lock3"]);

			door.unlock("lock3", true);
			expect(door.getLocks()).toEqual(["lock2"]);


			door.unlock("lock2", true);
			expect(door.getLocks()).toEqual([]);
		});

		it("should add a locked lock to the list of locks if previously unlocked", function(){
			door.unlock("lock1", true);
			expect(door.getLocks().indexOf("lock1")).toEqual(-1);

			door.unlock("lock1", false);
			expect(door.getLocks().indexOf("lock1") > -1).toEqual(true);

			//doublon?
		});

		it("should not add a locked lock to the list if not defined", function(){
			door.unlock("lock5", false);
			expect(door.getLocks().indexOf("lock5")).toEqual(-1);
		});


	});

	//action to open
	describe("Open door", function(){

		var door = null;
		beforeEach(function(){
			door = new Door(["lock1", "lock2"]);

		});
		it("should have an open function", function(){
			expect(door.open).toBeInstanceOf(Function);
		});

		it("should return true if every door has been unlocked, false otherwise", function(){
			expect(door.open()).toEqual(false);
			door.unlock("lock1", true);
			expect(door.open()).toEqual(false);
			door.unlock("lock2", true);
			expect(door.open()).toEqual(true);
		});
	});

	describe("Watch open action", function() {
		var door = null;
		beforeEach(function(){
			door = new Door(["lock1"]);

		});

		it("should have a watch function", function(){
			expect(door.watch).toBeInstanceOf(Function);
		});

		//evolved with other events
		it("should execute function when the door is openned", function(){
			var spy = jasmine.createSpy('action');
			door.watch("open", spy);

			expect(spy).not.toHaveBeenCalled();
			door.unlock("lock1", true);
			door.open();
			expect(spy).toHaveBeenCalled();
		});
	});



});
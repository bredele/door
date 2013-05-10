define("Door", ["Observable"],

	function(Observable){

		return function DoorConstructor($locks){


			var locks = ($locks instanceof Array) ? $locks : [], //should we have a setLocks method?
				clone = locks.slice(0),
				observable = new Observable();

			/**
			* Get locks.
			* @return {Array} list of locks
			*/
			this.getLocks = function(){
				return locks;
			};

			this.open = function(){
				if(locks.length > 0) {
					return false;
				}
				observable.notify("open");
				return true;
			};

			//may be it's better to have lock, unlock and toggleLock

			/**
			*
			*/
			this.unlock = function(lock, key){
				var index = locks.indexOf(lock);
				if(index > -1) {
					if(key) {
						locks.splice(index, 1); //the 1 is the number of item to remove, doublon?
					}
					return true;
				} else {
					//means it's not in the list of locks (it has been unlocked)
					if(!key && clone.indexOf(lock) > -1) {
						locks.push(lock);
					}
				}
				return false;
			};

			/**
			*
			*/
			this.watch = function(event, callback){
				//think to test callback etc
				observable.watch(event, callback);
			};

		};
	}
);
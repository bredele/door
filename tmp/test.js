var Door = require('./door-underscore');

var door = new Door(['lock1', 'lock2', 'lock3']);



door.on('open', function(){
	console.log('door unlocked');
});

door.unlock('lock1');
console.log('unlock lock1');
door.open();


door.unlock('lock2');
console.log('unlock lock2');
door.open();


door.unlock('lock3', true);
console.log('unlock lock3');
door.open();



var door2 = new Door(['lock4', 'lock5', 'lock6']);

door2.on('open', function(){
	console.log('door2 unlocked');
});


door2.pass(['lock4', 'lock5', 'lock6']);
door2.open();



var door3 = new Door(['lock7', 'lock8'], {
	automatic : true
});

door3.on('open', function(){
	console.log('door3 unlocked');
});

door3.unlock('lock7');
door3.unlock('lock8');



var Door = require('./door-underscore'),

	door = new Door(['lock1', 'lock2', 'lock3']);


door.on('open', function(){
	console.log('door unlocked');
});

door.unlock('lock1', true);
console.log('unlock lock1');
door.open();


door.unlock('lock2', true);
console.log('unlock lock2');
door.open();


door.unlock('lock3', true);
console.log('unlock lock3');
door.open();
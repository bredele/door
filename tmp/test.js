var Door = require('./door-underscore');

var door = new Door(['lock1', 'lock2', 'lock3']);

var door2 = new Door(['lock4', 'lock5', 'lock6']);


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




console.log(door.getLocks());
console.log(door2.getLocks());


door2.on('open', function(){
	console.log('door2 unlocked');
});

console.log(door.getLocks());
console.log(door2.getLocks());

door2.unlock('lock1', true);
console.log('unlock lock1');
door2.open();


door2.unlock('lock4', true);
console.log('unlock lock4');
door2.open();


door2.unlock('lock5', true);
console.log('unlock lock5');
door2.open();

door2.unlock('lock6', true);
console.log('unlock lock6');
door2.open();
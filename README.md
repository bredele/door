door
====

> If you're pissed of by if statements, this is for you!

## Some thoughts

I would like to start by saying that . 

It probably exists somewhere and if it doesn't so 

If is not maintainable...


## What the heck is this?

Design patterns are very trendy.
There is two design patterns that I think really interesting:
 * **State Machine**
Basically, it allows you to change your application from one state to another (this is called transition) when initiated by a triggering an event or **condition**. You can define an action to execute asynchronously for each transition. You will find a great State machine at this [link](https://github.com/flams/emily/blob/master/src/StateMachine.js).

 * **Promises**
To use the words of Wikipedia : it represents the value returned from the single completion of an operation. To make it simple, that's a state machine with two and immutable transitions : unfulfilled to fulfilled (or unresolve to resolve) and unfulfiled to failed. You will find a great Promises implementation at this [link](https://github.com/flams/emily/blob/master/src/Promise.js)



Both have something missing. A transition occured when **one** condition is triggered. Things are not so simple in real life. You will probably have more than one condition to do something but one condition is sufficient to not do it. Think about a door with multiple locks : **you can't open the door until every locks are unlocked.**

Additionnally, things can change and are not necessarily immutable. A door which is unlocked is not open until I actually open it and a door which is openned can be closed.


## if statements

I introduced this project by saying that it's for you if you are pissed of by ```if``` (or ```switch case```) statements. What I wanted to say is : Do you think this is really 

```js
if(state1){
	//do something
	if(state2){
		//do something
		if(state3){
			//do something
			if(...){
				//do something
			}
		}
	}
}
```
Most importantly, this is not maintainable (or scalable) because each statement are in the same object. 



## Usage examples

```js
require(["Door"], function(Door){
  var door = new Door(["lock1", "lock2", "lock3"]);

  //open is trigerred when the open function is called and when door is no longer locked 
  door.on("open", function(){
    //do something
  });

  //unlock with condition (truthy of falsy)
  door.unlock("lock1", true);
});

```
You'll find some [examples](https://github.com/bredele/door/tree/master/test) and one in particular, with a form which I think show how useful **door.js** is. 

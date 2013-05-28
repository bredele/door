var events = require('events');


function Door( $locks, options ){

    var locks = ($locks instanceof Array) ? $locks : [],
        clone = locks.slice(0),
        options = options || {},
        observer = null,
        _lock = function(lock){
            if(clone.indexOf(lock) > -1) {
                //push lock in array
                locks.push(lock);
                return true;
            }
            return false;
        },
         _unlock = function(lock){
             var index = locks.indexOf(lock);
            if ( index > -1) {
                 locks.splice(index, 1);
                return true;
            }
             return false;
        };

    this.getLocks = function(){
        return locks;
    };

        //toggleLock
    this.unlock = function(lock, bool){
         //and if somethinh else than bool?
         var key = bool ? bool : true;
        if ( key ) {
            _unlock(lock);
        } else {
            _lock(lock);
        }
        //it has to be a boolean
        if(options.automatic === true) {
            this.open();
        }
    };

        //call pass in lock ter;inology
    this.pass = function( array, bool ){
        for(var l = array.length; l--;) {
            this.unlock(array[l], bool);
        }
    };

    this.open = function(){
        if(locks.length > 0) {
            return false;
        }
        this.emit("open");
        return true;
    };

    //pipe with an observer
    this.pipe = function(observable){
        //check if observable?
        observer = observable;
    };

    this.async = function(topic, lock, callback, scope){
        var that = this;
        observer.on(topic, function(){
            //check if boolean or set to false
            var bool = true;
            if(typeof callback === 'function'){
                bool = callback.call();
            } else if (typeof callback === 'boolean') {
                bool = callback;
            }
            that.unlock(lock, bool);
        }, scope);
    };

}


module.exports = function($param, $options){
    Door.prototype = new events.EventEmitter();
    return new Door($param, $options);
};
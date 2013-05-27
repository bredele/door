var Observable = require('./underscore-observable');


    function Door( $locks ){

        var locks = ($locks instanceof Array) ? $locks : [],
            clone = locks.slice(0);

        this.getLocks = function(){
            return locks;
        };

        this.unlock = function( lock, key ){
            var index = locks.indexOf(lock);
            if(index > -1) {
                if(key) {
                        locks.splice(index, 1); //the 1 is the number of item to remove, doublon?
                    }
                    return true;
                } else {
                    //means it's not in the list of locks (it has been unlocked)
                    if(!key && this.clone.indexOf(lock) > -1) {
                        locks.push(lock);
                    }
                }
                return false;
            };

        this.open = function(){
            if(locks.length > 0) {
                return false;
            }
            this.emit("open");
            return true;
        };
    }



module.exports = function($param){
    Door.prototype = new Observable();
    return new Door($param);
};
var observable = require('./underscore-observable'),

    /**
     * [ description]
     * @return {Object} Door object
     */
    Door = (function () {

        var locks = null,
            clone = null;

        function Door( $locks ) {
            locks = ($locks instanceof Array) ? $locks : [];
            clone = locks.slice(0);
        }

        Door.prototype.getLocks = function () {
            return locks;
        };

        Door.prototype.unlock = function ( lock, key ) {
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

        Door.prototype.open = function () {
            if(locks.length > 0) {
                return false;
            }
            observable.emit("open");
            return true;
        };

        Door.prototype.on = observable.on;

        return Door;

    })();

module.exports = Door;
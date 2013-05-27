var _ = require('underscore');

var Observable = (function () {

  var topics = null;

  function Observable() {
    //constructor
    topics = {};
  }

  Observable.prototype.on = function ( topic, callback, scope ) {
    //do that with underscore??
    if ( typeof callback === 'function' ) {
      var observers = topics[topic] = topics[topic] || [],
      observer = [callback, scope];

      observers.push(observer);
      return [ topic, observers.indexOf(observer) ];
    } else {
      return false;
    }
  };

  Observable.prototype.emit = function ( topic ) {
    var observers = topics[topic],
    args = _.toArray(arguments).slice(1);

    if (observers) {
      _.each(observers, function (value) {
        try {
          if (value) {
            //use underscore?
            value[0].apply(value[1] || null, args);
          }
        } catch (err) { }
      });
      return true;
    } else {
      return false;
    }
  };

  Observable.prototype.off = function ( handle ) {
    var topic = handle[0], idx = handle[1];
    if (topics[topic] && topics[topic][idx]) {
        // delete value so the indexes don't move
        delete topics[topic][idx];
        // If the topic is only set with falsy values, delete it;
        if (!topics[topic].some(function (value) {
          return !!value;
        })) {
          delete topics[topic];
        }
        return true;
      } else {
        return false;
      }
    };

  return Observable;

})();
// Expose the date utils
module.exports = new Observable();
exports.plus = function(x,y){ return x+y}
exports.minus = function(x,y){ return x-y}
exports.helloname = function(name) {
    console.log("hello " + name);
  };
  exports.messages = function(sender, message, subject) {
    console.log(subject + " You got a message from " + sender + ": " + message);
  };
      
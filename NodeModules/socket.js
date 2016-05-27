var io, users, ot;
var text = "";

// Export initializer function for Socket Module
exports.init = function(_io, _users) {
      io = _io;
      users = _users;
}

// Exports socket modules
exports.listen = function() {
      io.on('connection', function(socket) {

              function updateData() = io.emit('data:update', users);

              socket.on('data:init', function () {
                    updateData();
              }

      };
}

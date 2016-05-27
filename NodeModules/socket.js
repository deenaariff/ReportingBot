// Export initializer function for Socket Module
exports.init = function(_io, _users) {
      io = _io;
      users = _users;
}

// Exports socket modules
exports.listen = function() {
      io.on('connection', function(socket) {

              console.log("Socket IO initialized");

              socket.emit('data:update', users);

              socket.on('data:init', function () {
                    console.log('Updated Data');
                    socket.emit('data:update', users);
              });

      });;
}

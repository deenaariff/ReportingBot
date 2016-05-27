var services = angular.module('Services', [])

services.service('SocketIO', function($rootScope) {

    // Initialize socket
    var socket = io.connect();

    return {

        // Template for on Receive Socket Functino
        on: function(eventName, callback) {
            socket.on(eventName, function() {
                var args = arguments;
                $rootScope.$apply(function() {
                    callback.apply(socket, args);
                });
            });
        },

        // Template for Emitter Socket Function
        emit: function(eventName, data, callback) {
            socket.emit(eventName, data, function() {
                var args = arguments;
                $rootScope.$apply(function() {
                    if (callback) {
                        callback.apply(socket, args);
                    }
                });
            })
        }

    };

})

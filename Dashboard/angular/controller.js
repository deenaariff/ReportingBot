var controllers = angular.module('Controllers', ['Services'])

controllers.controller("MainCtrl", function($rootScope, $scope, SocketIO) {

    // Controller Variables
    var socket = SocketIO;
    $scope.users;
    var updateServer = 1;

    // Test Controller Functionality
    console.log("Controller Intialized");

    socket.emit('data:init', {});

    // Receive all data
    socket.on('data:update', function(_data) {
        console.log('Received Data')
        console.log(_data.length);
        $scope.users = _data;
    });

    // Format Data in Milliseconds that Was Sent to Function
    $scope.timeFormat = function(time_M) {
        var totalSec = time_M;
        var hours = parseInt(totalSec / 3600) % 24;
        var minutes = parseInt(totalSec / 60) % 60;
        var seconds = totalSec % 60;
        return result = (hours < 10 ? "0" + hours : hours) + ":" + (minutes < 10 ? "0" + minutes : minutes);
    }

});

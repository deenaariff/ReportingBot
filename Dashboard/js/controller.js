var controllers = angular.module('Controllers', ['Services'])

controllers.controller("MainCtrl", function($rootScope, $scope, SocketIO) {

    // Controller Variables
    var socket = SocketIO;
    $scope.users;
    var updateServer = 1;


    function clientChange(ot_operation) {
        socket.emit('data:init', {
        })
    }

    // Receive all data
    socket.on('data:update', function(_data) {
        $scope.users = _data;
    });

});

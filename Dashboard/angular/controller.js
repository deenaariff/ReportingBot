var controllers = angular.module('Controllers', ['Services'])

controllers.controller("MainCtrl", function($rootScope, $scope, SocketIO) {

    // Controller Variables
    var socket = SocketIO;
    $scope.users;
    var updateServer = 1;

    console.log("init");


    socket.emit('data:init', {});

    // Receive all data
    socket.on('data:update', function(_data) {
        console.log('Received Data')
        console.log(_data.length);
        $scope.users = _data;
    });

});

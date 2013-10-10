'use strict';

/* Controllers */

angular.module('PoneyLand.controllers').
        controller('playCtrl', function() {
        $("#rainbowtop").slideUp("slow", function() {
            $('body').css("background-image","url('img/back.png')");
        });
        
});
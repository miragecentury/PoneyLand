'use strict';

/* Controllers */

angular.module('PoneyLand.controllers').
        controller('playCtrl', ["$scope", function(scope) {
        $("#rainbowtop").slideUp("slow", function() {
            $('body').css("background-image", "url('img/back.png')");
        });
        $(".rainbowcutiemark").animate({
        }, {
            step: function(now,fx){
                
            }
        });

    }]);
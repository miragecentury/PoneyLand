'use strict';

/* Controllers */

angular.module('PoneyLand.controllers').
        controller('playCtrl',["$scope","$timeout", function(scope, timeout) {
        $("#rainbowtop").slideUp("slow",function() {
            $('body').css("background-image","url('img/back.png')");
        });
        scope.cloud = 0;
        scope.cloudPerSecond = 1;
        //Cloud Générator
        scope._generateCloud = function(){
            scope.cloud+=scope.cloudPerSecond;
            console.log(scope.cloud);
            timeout(function(){
                scope._generateCloud();
            }, 1000, true);
        };
        //Initialisation of it
        scope._generateCloud();
        
        //Action for modfication cloud Rate (-/+ capable)
        scope.modulRateCloudPerSecond = function(modulation){
            scope.cloudPerSecond+=parseInt(modulation);
        }
        
        //Colors declarations
        
        
}]);
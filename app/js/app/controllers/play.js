'use strict';

/* Controllers */

angular.module('PoneyLand.controllers').
        controller('playCtrl',["$scope","$timeout", function(scope, timeout) {
        $("#rainbowtop").slideUp("slow",function() {
            $('body').css("background-image","url('img/back.png')");
        });
        scope.cloud = 0;
        scope.rawCloudPerSecond = 1;
        scope.consoCloudPerSecond = 0;
        //Colors declarations
        scope.colors = [{color:'red', workers:0, factory:0, modificateur:1, quantity:0},
            {color:'orange', workers:0, factory:0, modificateur:1, quantity:0},
            {color:'green', workers:0, factory:0, modificateur:1, quantity:0},
            {color:'yellow', workers:0, factory:0, modificateur:1, quantity:0},
            {color:'blue', workers:0, factory:0, modificateur:1, quantity:0},
            {color:'darkBlue', workers:0, factory:0, modificateur:1, quantity:0},
            {color:'violet', workers:0, factory:0, modificateur:1, quantity:0}];
        
        //Cloud Générator
        scope._generateCloud = function(){
            //Definition de la genration de nuage seche
            var cloudPerSecond = scope.rawCloudPerSecond - scope.consoCloudPerSecond;
            console.log('CloudPerSecond : '+cloudPerSecond);
            for (var index in scope.colors){
                var color = scope.colors[index];
                color.quantity += parseInt(color.workers*color.factory*color.modificateur);
                console.log('Color : '+ color.color);
                console.log(color);
            }   
            //Calcul final du nombre de cloud
            scope.cloud+=parseInt(cloudPerSecond);
            console.log('nbrCloud :'+scope.cloud);
            var that = this;
            timeout(function(){
                scope._generateCloud();
            }, 1000, true);
        };
        //Initialisation of it
        scope._generateCloud();
        
        //Action for modfication cloud Rate (-/+ capable)
        var _modulRateCloudPerSecond = function(modulation){
            scope.rawCloudPerSecond+=parseInt(modulation);
        }; 
        
        scope.pegazeMeteo = 0;
        scope.modificateurMeteo = 1;
       
        //Action Meteo
        scope.addMeteoPegaze = function(){
            scope.pegazeMeteo++;
            _modulRateCloudPerSecond(10*scope.modificateurMeteo);
        };
        
        //Color Actions
        scope.addFactory = function(colorName){
            var color = _getColor(colorName);
            var additionalConso = 100*color.workers;
            if (scope.rawCloudPerSecond <= additionalConso){
                return false;
            } else {
                color.factory++;
                scope.consoCloudPerSecond = additionalConso;
                return true;
            }
        };
        
        scope.addWorker = function(colorName){
            var color = _getColor(colorName);
            var additionalConso = 100*color.factory;
            if (scope.rawCloudPerSecond <= additionalConso){
                return false;
            } else {
                color.worker++;
                scope.consoCloudPerSecond = additionalConso;
                return true;
            }
        };  
        
        var _getColor = function(color){
            switch(color){
                case 'red': 
                    return 0;
                    break;
                case 'orange':
                    return 1;
                    break;
                case 'green':
                    return 2;
                    break;
                case 'yellow':
                    return 3;
                    break;
                case 'blue':
                    return 4;
                    break;
                case 'darkBlue':
                    return 5;
                    break;
                case 'violet':
                    return 6;
                    break;
                default:
                    return -1;    
            }
        };
       
}]);
'use strict';
/* Controllers */

angular.module('PoneyLand.controllers').
        controller('playCtrl', ["$scope", "$timeout", function(scope, timeout) {
        $("#rainbowtop").slideUp("slow", function() {
            $('body').css("background-image", "url('img/back.png')");
        });
        var animate_cutie = function() {
            $(".rainbowcutiemark").animate({
                transform: "rotate(5deg)",
            }, {
                duration: 360,
                step: function(now, fx) {
                    //console.log(fx.elem);
                    //console.log(fx);
                    var it = $(fx.elem).attr('itera');
                    var x = $(fx.elem).attr('x');
                    var y = $(fx.elem).attr('y');
                    var speed = $(fx.elem).attr('speed');
                    var sens = $(fx.elem).attr('sens');
                    var r = Math.random();
                    var width = $(".container").width();
                    if(speed == undefined){
                        speed = ((Math.random()+1)*10)/(Math.random()*10);
                        console.log(speed);
                    }else{
                        speed = parseInt(speed);
                    };  
                    if (x == undefined) {
                        x = 0;
                    } else {
                        x = parseInt(x);
                    }
                    if (sens != "false") {
                        sens = true;
                    } else {
                        sens = false;
                    }
                    if (x > width)
                    {
                        sens = false;
                    }
                    if(x<0){
                        sens = true;
                        x = 0;
                    }
                    if (sens) {
                        x = x + speed;
                    }else{
                        x = x - speed;
                    }
                    y = Math.cos(x / 30) * 30;
                    it = 10;
                    $(fx.elem).attr('speed',speed);
                    $(fx.elem).attr('itera', it);
                    $(fx.elem).attr('x', x);
                    $(fx.elem).attr('y', y);
                    $(fx.elem).attr('sens',sens);
                    $(fx.elem).css("transform", "rotate(" + it + "deg) translate(" + x + "px," + y + "px)");
                    $(fx.elem).css("-webkit-transform", "rotate(" + it + "deg) translate(" + x + "px," + y + "px)");
                    $(fx.elem).css("-moz-transform", "rotate(" + it + "deg) translate(" + x + "px," + y + "px)");
                }
            });
            timeout(function() {
                animate_cutie();
            }, 360, true);
        };
        animate_cutie();
        scope.cloud = 0;
        scope.cloudPerSecond = 1;
        //Cloud Générator
        scope._generateCloud = function() {
            scope.cloud += scope.cloudPerSecond;
            //console.log(scope.cloud);
            timeout(function() {
                scope._generateCloud();
            }, 1000, true);
        };
        //Initialisation of it
        scope._generateCloud();
        //Action for modfication cloud Rate (-/+ capable)
        scope.modulRateCloudPerSecond = function(modulation) {
            scope.cloudPerSecond += parseInt(modulation);
        }

//Colors declarations


    }]);

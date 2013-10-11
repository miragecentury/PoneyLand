'use strict';
/* Controllers */

angular.module('PoneyLand.controllers').
        controller('playCtrl', ["$scope", "$timeout", function(scope, timeout) {
        $("#rainbowtop").slideUp("slow", function() {
            $('body').css("background-image", "url('img/back.png')");
        });

        var MAX_CLOUD_UI = 20;

        scope.cpt_lstcloud = 0;
        scope.lstcloud = [];

        scope.timer = 0;
        scope.eventActive = false;
        scope.event = {
            tickSeconde: function() {
                scope.event.tickSeconde();
                timeout(function() {
                    scope.event.tickSeconde();
                }, 1000, true);

            },
            lauchAnEvent: function() {
                var random_indice = Math.random() * (eventList.length - 0) + 0;
                console.log();
            },
            launchEvent: function(event) {

            }
        };

        scope.events = {
            blank: {
                title: "",
                img: "",
                duree: 60,
                cloudPopMultipicateur: 1,
                cloudPopAddition: 1,
                pegazeMultiplicateur: 1,
                pegazeAddition: 0,
                factoryWorkerMultiplicateur: 1,
                factoryWorkerAddition: 0,
                factoryMultiplicateur: 1,
                factoryAddition: 0,
                red: {
                    workerMultiplicateur: 1,
                    workerAddition: 0,
                },
                orange: {
                    workerMultiplicateur: 1,
                    workerAddition: 0,
                },
                yellow: {
                    workerMultiplicateur: 1,
                    workerAddition: 0,
                },
                green: {
                    workerMultiplicateur: 1,
                    workerAddition: 0,
                },
                blue: {
                    workerMultiplicateur: 1,
                    workerAddition: 0,
                },
                darlblue: {
                    workerMultiplicateur: 1,
                    workerAddition: 0,
                },
                violet: {
                    workerMultiplicateur: 1,
                    workerAddition: 0,
                }
            }
        };

        var eventList = [];

        var eventmanager = function() {

        };

        scope.arc = 0;

        scope.cloudRaw = 0;
        scope.cloudRecolte = 0;
        scope.cloudPopMultiplicateur = 1;
        scope.cloudPopAddition = 0;
        scope.cloudPopBySec = function() {
            return (scope.pegazeCloudBySec() + 1) * scope.cloudPopMultiplicateur + scope.cloudPopAddition;
        };
        scope.pegaze = 0;
        scope.pegazeMultiplicateur = 1;
        scope.pegazeAddition = 0;
        scope.pegazeCloudBySec = function() {
            return (scope.pegaze * 2) * scope.pegazeMultiplicateur + scope.pegazeAddition;
        };
        scope.nextPegazeCost = function() {
            return Math.round(Math.exp((scope.pegaze + 1)) / (scope.pegaze + 1)) + 30 - 4;
        };
        scope.buyPegaze = function() {
            if (scope.cloudRecolte > scope.nextPegazeCost()) {
                scope.cloudRecolte = scope.cloudRecolte - scope.nextPegazeCost();
                scope.pegaze++;
            }
        };
        scope.factory = {
            nbworker: 0,
            nbfactory: 1,
            factoryWorker: 5,
            factoryWorkerMultiplicateur: 1,
            factoryWorkerAddition: 0,
            factoryMultiplicateur: 1,
            factoryAddition: 0,
            red: {
                nbworker: 0,
                workerAdd: 2000,
                workerMultiplicateur: 1,
                workerAddition: 0,
                initPrice: 50000
            },
            orange: {
                nbworker: 0,
                workerAdd: 1000,
                workerMultiplicateur: 1,
                workerAddition: 0,
                initPrice: 20000
            },
            yellow: {
                nbworker: 0,
                workerAdd: 500,
                workerMultiplicateur: 1,
                workerAddition: 0,
                initPrice: 8000
            },
            green: {
                nbworker: 0,
                workerAdd: 250,
                workerMultiplicateur: 1,
                workerAddition: 0,
                initPrice: 3600
            },
            blue: {
                nbworker: 0,
                workerAdd: 100,
                workerMultiplicateur: 1,
                workerAddition: 0,
                initPrice: 1200
            },
            darkblue: {
                nbworker: 0,
                workerAdd: 50,
                workerMultiplicateur: 1,
                workerAddition: 0,
                initPrice: 300
            },
            violet: {
                nbworker: 0,
                workerAdd: 20,
                workerMultiplicateur: 1,
                workerAddition: 0,
                initPrice: 100
            },
            nextPriceWorker: function(factoryColor) {
                return Math.round(Math.exp((factoryColor.nbworker) + 1) / (factoryColor.nbworker + 1)) * 10 + factoryColor.initPrice - 30;
            },
            nextPriceFactory: function() {
                return Math.round(Math.exp(((scope.factory.nbfactory - 1) * 20)) / (scope.factory.nbfactory + 1)) + 5000 - 1;
            },
            nbFactoryNumberPlace: function() {
                return (scope.factory.nbfactory * (scope.factory.factoryWorkerMultiplicateur * scope.factory.factoryWorker + scope.factory.factoryWorkerAddition));
            },
            buyFactory: function() {
                if (scope.cloudRecolte >= scope.factory.nextPriceFactory()) {
                    scope.cloudRecolte = scope.cloudRecolte - scope.factory.nextPriceFactory();
                    scope.factory.nbfactory++;
                }
            },
            buyWorker: function(factoryColor) {
                if (scope.cloudRecolte >= scope.factory.nextPriceWorker(factoryColor) && scope.factory.nbworker < scope.factory.nbFactoryNumberPlace()) {
                    scope.cloudRecolte = scope.cloudRecolte - scope.factory.nextPriceWorker(factoryColor);
                    factoryColor.nbworker++;
                    scope.factory.nbworker++;
                }
            },
            arcCreateByColorBySeconde: function(factoryColor) {
                for (var i = 0; i < factoryColor.nbworker; i++) {
                    if (scope.cloudRecolte > 0) {
                        scope.cloudRecolte--;
                        scope.arc += factoryColor.workerAdd;
                    }
                }
            },
            arcCreate: function() {
                scope.factory.arcCreateByColorBySeconde(scope.factory.red);
                scope.factory.arcCreateByColorBySeconde(scope.factory.orange);
                scope.factory.arcCreateByColorBySeconde(scope.factory.yellow);
                scope.factory.arcCreateByColorBySeconde(scope.factory.green);
                scope.factory.arcCreateByColorBySeconde(scope.factory.blue);
                scope.factory.arcCreateByColorBySeconde(scope.factory.darkblue);
                scope.factory.arcCreateByColorBySeconde(scope.factory.violet);
            },
            tickSeconde: function() {
                scope.factory.arcCreate();
                timeout(function() {
                    scope.factory.tickSeconde();
                }, 1000, true);

            }
        };

        var generateCutie = function() {
            var cpt_addCloud = scope.cloudPopBySec();

            if (cpt_addCloud >= 0) {

                for (var i = 0; i < cpt_addCloud; i++) {
                    if (scope.lstcloud.length < MAX_CLOUD_UI) {
                        scope.lstcloud.push(scope.cpt_lstcloud++);
                    }
                    scope.cloudRaw++;
                }
            } else {
                for (var i = cpt_addCloud; i < 0; i++) {
                    if (scope.cloudRaw > 0) {
                        if (scope.cloudRaw <= 20) {
                            scope.lstcloud.pop();
                        }
                        scope.cloudRaw--;
                    }
                }
            }

            var cpt_peg_cloud = scope.pegazeCloudBySec();
            if (cpt_peg_cloud > 0) {
                for (var i = 0; i < cpt_peg_cloud; i++) {
                    if (scope.lstcloud.length > 0) {
                        scope.addCloudRecolter();
                    }
                }
            }


            timeout(function() {
                generateCutie();
            }, 1000, true);
        };

        var animate_cutie = function() {
            $(".rainbowcutiemark").animate({
                transform: "rotate(5deg)",
            }, {
                duration: 360,
                step: function(now, fx) {
                    var it = $(fx.elem).attr('itera');
                    var x = $(fx.elem).attr('x');
                    var y = $(fx.elem).attr('y');
                    var speed = $(fx.elem).attr('speed');
                    var sens = $(fx.elem).attr('sens');
                    var r = Math.random();
                    var width = $('#garbageCloud').width();
                    var min_x = $(fx.elem).attr('min_x');
                    var max_x = $(fx.elem).attr('max_x');
                    var delta_x = $(fx.elem).attr('delta_x');
                    //Init & Fix Speed
                    if (speed == undefined) {
                        delta_x = Math.random() * 20;
                        speed = ((Math.random() + 1) * 9) / 7;
                        //console.log(speed);
                    } else {
                        delta_x = parseInt(delta_x);
                        speed = parseInt(speed);
                    }
                    ;

                    //Init & Fix x
                    if (x == undefined) {
                        x = 0;
                    } else {
                        x = parseInt(x);
                    }
                    //Init & Fix sens
                    if (sens != "false") {
                        sens = true;
                    } else {
                        sens = false;
                    }

                    //Changement de ses
                    if (x > width)
                    {
                        sens = false;
                    }
                    if (x < 0) {
                        sens = true;
                        x = 0;
                    }

                    //Déplacement sur X
                    if (sens) {
                        x = x + speed;
                    } else {
                        x = x - speed;
                    }
                    //Déplacement sur Y
                    y = Math.cos((x + delta_x) / 30) * 50;

                    it = 0;
                    $(fx.elem).attr('delta_x', delta_x)
                    $(fx.elem).attr('speed', speed);
                    $(fx.elem).attr('itera', it);
                    $(fx.elem).attr('x', x);
                    $(fx.elem).attr('y', y);
                    $(fx.elem).attr('sens', sens);
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

        scope.addCloudRecolter = function(cl) {
            if (cl == undefined) {
                scope.lstcloud.pop();
            } else {
                scope.lstcloud.splice(scope.lstcloud.indexOf(cl), 1);
            }
            scope.cloudRaw--;
            scope.cloudRecolte++;
            var diff = 0;
            if (scope.lstcloud.length < MAX_CLOUD_UI) {
                diff = scope.cloudRaw - scope.lstcloud.length;
                for (var i = 0; i < diff; i++) {
                    if (scope.lstcloud.length < MAX_CLOUD_UI) {
                        scope.lstcloud.push(scope.cpt_lstcloud++);
                    }
                }
            }
            ;

        };

        generateCutie();
        scope.factory.tickSeconde();
        toastr.info('Attention des événements peuvent apparaître!!!')
    }]);

(function () {
    'use strict';
    angular.module('almundo', ['lumx', 'ngRoute'])
        .config(function ($routeProvider) {
            $routeProvider
                .when("/", {
                    controller: "MainController as vm",
                    templateUrl: "templates/home.html"
                })
                .when("/hotel/:id", {
                    controller: "HotelController as vm",
                    templateUrl: "templates/hotel.html"
                });
        })
        .directive('accordion', function () {
            return {
                restrict: 'E',
                transclude: true,
                scope: {},
                template: '<div ng-transclude></div>',
                link: function postLink(scope, element) {
                    var blOpen = false;
                    element.children().find('div').css('display', 'none');
                    element.find('h2').on('click', function (event) {
                        if (!blOpen) {
                            blOpen = true;
                            element.children().find('div').css('display', 'block');
                        } else {
                            blOpen = false;
                            element.children().find('div').css('display', 'none');
                        }

                    });
                }
            };
        })
        .controller('MainController', controladorHoteles)
        .controller("HotelController", hotelController);
    controladorHoteles.$inject = ['$http', '$location'];
    hotelController.$inject = ['$http', '$routeParams', '$location'];

    function controladorHoteles($http, $location) {
        const vm = this;
        $http.get("/Hotels").then(function (res) {
            vm.hotels = res.data.map(hotel => {
                hotel.starts = new Array(hotel.stars);
                return hotel;
            });
        });
        vm.filter = {
            stars: [5, 4, 3, 2, 1]
        };
        vm.filter.stars = vm.filter.stars.map(BuilStarsdArray);
        vm.filtro = fblHotels;
        vm.fGoto = goTo;

        function BuilStarsdArray(obStar) {
            return {
                number: new Array(obStar),
                is: false
            };
        }
        function fblHotels(obHotel) {
            var blFilter = true,
                blStars = true,
                sbTextAutocomplete = vm.filter.autocomplete;
            if (typeof sbTextAutocomplete != 'undefined' && sbTextAutocomplete.toString().trim().length > 0) {
                blFilter = obHotel.name.toLowerCase().includes(sbTextAutocomplete.toLowerCase());
            }
            if (!vm.filter.allStar) {
                var obStars = vm.filter.stars.filter(fblStar).map(fnuLengthStar);
                if (obStars.length > 0) {
                    blStars = obStars.includes(obHotel.starts.length);
                }
            }
            return blFilter && blStars;
        }
        function fblStar(iobStar) {
            return iobStar.is;
        }
        function fnuLengthStar(iobStar) {
            return iobStar.number.length;
        }
        function goTo(hotelId) {
            $location.path("/hotel/" + hotelId);
        }
    }
    function hotelController($http, $routeParams, $location) {
        let vm = this;
        $http.get("/hotel/" + $routeParams.id).then(function (res) {
            vm.hotel = res.data;
        });
        vm.fGoto = goTo;
        function goTo() {
            $location.path("/");
        }
    }
})();
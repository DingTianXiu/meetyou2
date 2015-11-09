/**
 * Created by meetyou on 2015/10/22.
 */
angular.module('myApp.ContactUs',[])

    .controller('ContactUsCtrl',function($rootScope,$scope,$anchorScroll){

        $scope.initIndex = function(){

            $anchorScroll();
        }
    })
/**
 * Created by meetyou on 2015/10/14.
 */


angular.module('myApp.Exceptions',[])

    .controller('ExceptionsCtrl',function($rootScope,$scope,$anchorScroll){
        $scope.initIndex = function(){
            $anchorScroll();
        }
    })
/**
 * Created by meetyou on 2015/10/23.
 */
angular.module('myApp.AboutUs',[])

    .controller('AboutUsCtrl',function($rootScope,$scope,$anchorScroll){
        $scope.initIndex = function(){
            $anchorScroll();
        }
    })
/**
 * Created by meetyou on 2015/10/14.
 */

angular.module('myApp.JoinUs',[])

    .controller('JoinUsCtrl',function($rootScope,$scope){
        $scope.jobs = ['技术','设计','运营','职能'];
        $scope.selectedIndex = 0;
        $scope.slide =1;
        $scope.ChangeSlide = function(job,$index) {
            $scope.slide = $index+1;
            $scope.selectedIndex = $index;
        };
        if($rootScope.selectedjob)
        {
            $scope.selectedIndex = $rootScope.selectedjob;
        }
    })
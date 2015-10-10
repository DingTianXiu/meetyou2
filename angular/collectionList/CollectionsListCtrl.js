/**
 * Created by goodo on 2015-08-12.
 */


'use strict';

//Leancloud配置
AV.initialize("xheu55juaeye1u1e412588pyz37d3luqba7hhjd30btx9mid", "8h1dv6vtcxyh1hmtesqguubhzntl73n1nbjan4dfxd8f09s0");
var Article = AV.Object.extend('Article'),
    RecommendArticle = AV.Object.extend('RecommendArticle'),
    RecommendCollection = AV.Object.extend('RecommendCollection'),
    Collection = AV.Object.extend('Collection');

angular.module('myApp.CollectionsList', [])



    .controller('CollectionsListCtrl', function($scope,$location) {

        $scope.categories=['全部','家庭','亲子','蜜月','情侣','基友','闺蜜','独行','偶遇'];
        var query = new AV.Query(Collection);

        $scope.CollectionClicked = function (collection){

            $location.path('/collections/'+collection.getObjectId());
        };
        $scope.initIndex = function () {

            query.count()
                .then(function(count){
                    $scope.count = count;

                    $scope.page =0;
                    $scope.limit= 6;
                    query.skip($scope.page*$scope.limit);
                    query.limit($scope.limit);
                    query.descending("updatedAt");
                    return query.find();
                })
                .then(function (results) {

                    var colOneArray=[];
                    var colTwoArray=[];
                    for(var i = 0;i<results.length;i++){



                        if(i%2==0){

                            console.log(colOneArray.push(results[i]));

                        }
                        else{
                            colTwoArray.push(results[i]);
                        }
                    }

                    $scope.$apply(function(){
                        if($scope.count<=($scope.page+1)*$scope.limit)
                        {
                            $scope.showLoadMore = false;
                            $scope.showEnd = true;
                        }
                        else
                        {
                            $scope.showEnd = false;
                            $scope.showLoadMore = true;
                        }

                        $scope.rcollectionsOneCol = colOneArray;
                        $scope.rcollectionsTwoCol = colTwoArray;
                    });

                });
        };

        $scope.loadMore = function () {
            $scope.page ++;
            query.skip($scope.page*$scope.limit);
            query.limit($scope.limit);

            query.find(function (results) {

                var colOneArray=[];
                var colTwoArray=[];
                for(var i = 0;i<results.length;i++){



                    if(i%2==0){

                        $scope.rcollectionsOneCol.push(results[i]);

                    }
                    else{
                        $scope.rcollectionsTwoCol .push(results[i]);
                    }
                }

                if($scope.count<=($scope.page+1)*$scope.limit)
                {
                    $scope.showLoadMore = false;
                    $scope.showEnd = true;
                }
                else
                {
                    $scope.showEnd = false;
                    $scope.showLoadMore = true;
                }

                $scope.$apply();

            });
        }

    });
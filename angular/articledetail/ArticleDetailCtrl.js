/**
 * Created by goodo on 2015-08-12.
 */

'use strict';

//Leancloud配置
AV.initialize("xheu55juaeye1u1e412588pyz37d3luqba7hhjd30btx9mid", "8h1dv6vtcxyh1hmtesqguubhzntl73n1nbjan4dfxd8f09s0");
var Article = AV.Object.extend('Article'),
    RecommendArticle = AV.Object.extend('RecommendArticle'),
    RecommendCollection = AV.Object.extend('RecommendCollection'),
    Tour = AV.Object.extend('Tour'),
    RecommendedTour = AV.Object.extend('RecommendTour');



angular.module('myApp.ArticleDetail', [])



    .controller('ArticleDetailCtrl', function($scope, $routeParams) {
        $scope.initIndex = function () {

            var query = new AV.Query(Article);
            query.include("relationship");
            query.include("authorinformation");


            var id = $routeParams.id;
            query.get(id, {
                success: function (result) {
                    if( result.get("startedAt")){
                        result.startDate = result.get("startedAt").toLocaleDateString().replace(/\//gm, ".");
                    }

                    //判断该不该显示头像
                    result.hasAvatar=false;
                    if(result.get('authorinformation'))
                    {
                        if(result.get('authorinformation').get('headImage')) {
                            result.hasAvatar = true;
                        }
                    }
                    else
                    {
                        result.hasAvatar=false;
                    }


                    var days = result.get("days");



                    $scope.article = result;

                    $scope.$apply();
                },
                error: function (error) {
                    alert("Error: " + error.code + " " + error.message);
                }
            });
        }
    })
    .filter(
    'to_trusted', ['$sce', function ($sce) {
        return function (text) {
            return $sce.trustAsHtml(text);
        }
    }]
)  ;

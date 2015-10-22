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



    .controller('ArticleDetailCtrl', function($scope, $routeParams,$location) {

        var intObj = {
            template: 3,
            parent: '#articleDetailId' // this option will insert bar HTML into this parent Element
        };
        var indeterminateProgress = new Mprogress(intObj);


        $scope.initIndex = function () {

            indeterminateProgress.start();

            var query = new AV.Query(Article);
            query.include("relationship");
            query.include("authorinformation");

            $scope.mekeClicked = function(article){
                $location.path('/personalPage/'+article.get('authorinformation').getObjectId());
            }
            $scope.sourceMekeClicked =function(rarticle){
                $location.path('/personalPage/'+rarticle.authorinformation.id);
            }
            $scope.ArticleClicked = function (rarticle){
                $location.path('/articles/'+rarticle.objectId);
            };

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


                    $scope.relation = $scope.article.get("relationshipstring");
                    AV.Cloud.run('search', {'query':$scope.relation}, {
                        success: function (result) {

                            var articlesSource = []
                            for(var i=1;i<=5;i++){
                                articlesSource.push(result[i]);
                            }
                            for(var i=0;i<=4;i++){
                                if(articlesSource[i].authorHead){
                                    articlesSource[i].hasAvatar = true;
                                }
                                else{
                                    articlesSource[i].hasAvatar = false;
                                }
                            }

                            $scope.rArticlesSource = articlesSource;
                            console.log($scope.rArticlesSource);
                            $scope.$apply();
                        }
                    })

                    $scope.$apply();

                    indeterminateProgress.end();
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

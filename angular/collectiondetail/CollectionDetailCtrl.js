/**
 * Created by goodo on 2015-08-12.
 */
'use strict';

//Leancloud配置
AV.initialize("xheu55juaeye1u1e412588pyz37d3luqba7hhjd30btx9mid", "8h1dv6vtcxyh1hmtesqguubhzntl73n1nbjan4dfxd8f09s0");
var Article = AV.Object.extend('Article'),
    RecommendArticle = AV.Object.extend('RecommendArticle'),
    RecommendCollection = AV.Object.extend('RecommendCollection'),
    Collection = AV.Object.extend('Collection'),
    RecommendedTour = AV.Object.extend('RecommendTour');

angular.module('myApp.CollectionDetail', [])



    .controller('CollectionDetailCtrl', function($scope,$routeParams,$location) {



        $scope.ArticleClicked = function (rarticle){

            $location.path('/articles/'+rarticle.getObjectId());
        };


        $scope.initIndex = function () {
            var query = new AV.Query(Collection);
            var id = $routeParams.id;
            query.get(id)
                .then(function (result) {
                    $scope.collection = result;
                    var relation = result.relation("articles");
                    var query = new AV.Query(Article);

                    query.containedIn("objectId",result.get("items"));
                    query.include("relationship");
                    query.include("authorinformation");
                    query.find({
                        success: function(articles) {
                            //articles in current collection
                            $scope.articles = articles;

                            var colOneArray=[];
                            var colTwoArray=[];
                            for(var i = 0;i<articles.length;i++){



                                if(i%2==0){

                                    console.log(colOneArray.push(articles[i]));

                                }
                                else{
                                    colTwoArray.push(articles[i]);
                                }
                            }

                            $scope.rarticlesOneCol = colOneArray;
                            $scope.rarticlesTwoCol = colTwoArray;
                            $scope.$apply();
                        }
                    });

                });


        }
    });
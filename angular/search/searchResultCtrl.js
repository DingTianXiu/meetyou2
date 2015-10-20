/**
 * Created by meetyou on 2015/10/14.
 */
AV.initialize("xheu55juaeye1u1e412588pyz37d3luqba7hhjd30btx9mid", "8h1dv6vtcxyh1hmtesqguubhzntl73n1nbjan4dfxd8f09s0");
var Article = AV.Object.extend('Article'),
    RecommendArticle = AV.Object.extend('RecommendArticle'),
    RecommendCollection = AV.Object.extend('RecommendCollection'),
    Tour = AV.Object.extend('Tour'),
    RecommendedTour = AV.Object.extend('RecommendTour');


angular.module('myApp.SearchResult', [])



    .controller('SearchResultCtrl', function($scope,$rootScope,$filter) {


        var intObj = {
            template: 3,
            parent: '#searchResultId' // this option will insert bar HTML into this parent Element
        };
        var indeterminateProgress = new Mprogress(intObj);

        $scope.categories = ['全部', '家庭', '亲子', '蜜月', '情侣', '基友', '闺蜜', '独行', '偶遇'];

        $scope.selectedIndex = 0;
        if ($rootScope.selectedCategory) {
            $scope.selectedIndex = $rootScope.selectedCategory;
        }


        //页面初始化
        $scope.initIndex = function(){



            indeterminateProgress.start();

            avsearch($rootScope.searchName);


        }



        //点击搜索键搜索内容
        $scope.goSearch = function(){


            indeterminateProgress.start();

            avsearch($scope.searchName);
        }

        //回车键搜索内容
        $scope.enter = function($event){

            indeterminateProgress.start();
            //console.log($scope.goSearch);
            if($event.keyCode == 13){
                avsearch($scope.searchName);
            }
        }

        //调用云端搜索接口
        function avsearch(searchname) {
            AV.Cloud.run('search', {'query': searchname}, {
                success: function (result) {

                    $scope.changeArticles = result;
                    //$scope.page = 1;
                    //$scope.count = 15;
                    //console.log(result[1].createdAt);
                    var articles = result;
                    articles.shift();
                    //console.log(articles);
                    //console.log(articles[1].createdAt)
                    var colOneArray = [];
                    var colTwoArray = [];
                    var colThreeArray = [];
                    for (var i = 0; i < articles.length; i++) {

                        if (articles[i].startedAt) {
                            articles[i].startDate = articles[i].startedAt.toLocaleDateString().replace(/\//gm, ".");
                            //console.log(articles[i].startedAt);
                        }
                        else {
                            articles[i].startDate = "";
                        }
                        if (articles[i].authorinformation) {
                            if (articles[i].authorHead) {
                                articles[i].hasAvatar = true;
                            }
                        }
                        else {
                            articles[i].hasAvatar = false;
                        }

                        if (articles[i].authorinformation) {
                            if (articles[i].authorinformation.nickname) {
                                articles[i].hasNickName = true;
                            }
                        }
                        else {
                            articles[i].hasNickName = false;
                        }

                        if (i % 3 == 0) {

                            colOneArray.push(articles[i]);
                            //console.log(colOneArray)
                        }
                        else if (i % 3 == 1) {
                            colTwoArray.push(articles[i]);
                        }
                        else {
                            colThreeArray.push(articles[i]);
                        }
                        $scope.rcolOneArray = colOneArray;
                        $scope.rcolTwoArray = colTwoArray;
                        $scope.rcolThreeArray = colThreeArray;
                        $scope.$apply();

                        indeterminateProgress.end();


                    }
                }
            })
        }


        //分类显示
        $scope.changeCategory = function(category,$index) {

            $scope.selectedIndex = $index;
            if(category!='全部'){
                AV.Cloud.run('search', {'query': $scope.searchName}, {
                    success: function (result) {
                        var colOneArray = [];
                        var colTwoArray = [];
                        var colThreeArray = [];
                        $scope.repeatArticles =[];
                        var articles = result;
                        articles.shift();
                        //console.log(articles);
                        //console.log(articles[0].relationshipname);
                        for(var i=0;i<=articles.length-1;i++){
                            if(articles[i].relationshipname==category){
                                $scope.repeatArticles.push(articles[i]);
                                //console.log(rarticles);

                            }
                        }
                        console.log($scope.repeatArticles);
                        if($scope.repeatArticles!=[]){
                            for(var i=0;i<=$scope.repeatArticles.length;i++){
                                //if ($scope.repeatArticles[i].startedAt) {
                                //    $scope.repeatArticles[i].startDate = $scope.repeatArticles[i].startedAt.toLocaleDateString().replace(/\//gm, ".");
                                //    //console.log(articles[i].startedAt);
                                //}
                                //else {
                                //    $scope.repeatArticles[i].startDate = "";
                                //}
                                if ($scope.repeatArticles[i].authorinformation) {
                                    if ($scope.repeatArticles[i].authorHead) {
                                        $scope.repeatArticles[i].hasAvatar = true;
                                    }
                                }
                                else {
                                    $scope.repeatArticles[i].hasAvatar = false;
                                }


                                if (i % 3 == 0) {

                                    colOneArray.push($scope.repeatArticles[i]);
                                    //console.log(colOneArray)
                                }
                                else if (i % 3 == 1) {
                                    colTwoArray.push($scope.repeatArticles[i]);
                                }
                                else {
                                    colThreeArray.push($scope.repeatArticles[i]);
                                }
                                $scope.rcolOneArray = colOneArray;
                                $scope.rcolTwoArray = colTwoArray;
                                $scope.rcolThreeArray = colThreeArray;
                                $scope.$apply();
                            }
                        }
                        else{
                            $scope.rcolOneArray = [];
                            $scope.rcolTwoArray = [];
                            $scope.rcolThreeArray = [];
                            $scope.$apply();
                        }

                    }

                })
            }
            else{
                avsearch($scope.searchName);
            }


        }



    })
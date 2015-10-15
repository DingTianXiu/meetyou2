'use strict';

//Leancloud配置
AV.initialize("xheu55juaeye1u1e412588pyz37d3luqba7hhjd30btx9mid", "8h1dv6vtcxyh1hmtesqguubhzntl73n1nbjan4dfxd8f09s0");
var Article = AV.Object.extend('Article'),
    RecommendArticle = AV.Object.extend('RecommendArticle'),
    RecommendCollection = AV.Object.extend('RecommendCollection'),
    Tour = AV.Object.extend('Tour'),
    RecommendedTour = AV.Object.extend('RecommendTour');


angular.module('myApp.home', [])



    .controller('HomeCtrl', function($scope,$rootScope,$location) {



        var intObj = {
            template: 3,
            parent: '#bodysectionid' // this option will insert bar HTML into this parent Element
        };
        var indeterminateProgress = new Mprogress(intObj);

        $scope.categories=['全部','家庭','亲子','蜜月','情侣','基友','闺蜜','独行','偶遇'];
        $scope.selectedIndex=0;
        $scope.slide = 1;
        $scope.points = ['','',''];
        if($rootScope.selectedCategory)
        {
            $scope.selectedIndex = $rootScope.selectedCategory;
        }
        $scope.ChangeSlide = function($index) {
            $scope.slide = $index+1;
        };
        var currentArticles={};
        currentArticles.oneCol =[];
        currentArticles.twoCol=[];
        currentArticles.threeCol=[];

        var query = new AV.Query(Article);

        $scope.ArticleClicked = function (rarticle){

            $location.path('/articles/'+rarticle.getObjectId());
        };
        $scope.mekeClicked = function(mekepage){
            $location.path('/personalPage/'+mekepage.getobjectId());
        }
        $scope.loadingMore = function(){
            $location.path('/articles/')
        }

        $scope.initIndex = function () {


            //开始进度条
            indeterminateProgress.start();

            $scope.showEnd = false;
            $scope.showLoadMore = true;



            query.count()
                .then(function(count){


                    $scope.count = count;
                    $scope.page = 0;
                    $scope.limit=9;
                    query.skip($scope.page*$scope.limit);
                    query.limit($scope.limit);

                    query.include('authorinformation');
                    query.include('relationship')
                    if($scope.categories[$scope.selectedIndex] !="全部"){
                        query.equalTo("relationshipstring",$scope.categories[$scope.selectedIndex]);
                    }

                    query.descending("createdAt");
                    query.descending("updatedAt");
                    return query.find();
                })
                .then(function (articles) {
                    var colOneArray=[];
                    var colTwoArray=[];
                    var colThreeArray=[];
                    for(var i = 0;i<articles.length;i++){

//                        console.log(articles[i].get('article').get('startedAt'));
                        if(articles[i].get('startedAt'))
                        {
                            articles[i].startDate=articles[i].get('startedAt').toLocaleDateString().replace(/\//gm, ".");
                        }
                        else{
                            articles[i].startDate ="";
                        }
                        if(articles[i].get('authorinformation'))
                        {
                            if(articles[i].get('authorinformation').get('headImage')) {
                                articles[i].hasAvatar = true;
                            }
                        }
                        else
                        {
                            articles[i].hasAvatar=false;
                        }

                        if(articles[i].get('authorinformation'))
                        {
                            if(articles[i].get('authorinformation').get('nickname')) {
                                articles[i].hasNickName = true;
                            }
                        }
                        else
                        {
                            articles[i].hasNickName=false;
                        }

                        if(i%3==0){

                            colOneArray.push(articles[i]);

                        }
                        else if(i%3==1){
                            colTwoArray.push(articles[i]);
                        }
                        else{
                            colThreeArray.push(articles[i]);
                        }
                    }



                    currentArticles.oneCol = colOneArray;
                    currentArticles.twoCol = colTwoArray;
                    currentArticles.threeCol= colThreeArray;
                    $scope.currentArticles = currentArticles;
                    $scope.$apply();
                    //end进度条
                    indeterminateProgress.end();
                });

        };



        $scope.changeCategory = function(category,$index){

            //开始进度条
            indeterminateProgress.start();

            $scope.page = 0;
            $scope.selectedIndex = $index;
            query = new AV.Query(Article);
            query.skip($scope.page*$scope.limit);
            query.limit($scope.limit);

            query.include('authorinformation');
            query.include('relationship')

            query.descending("createdAt");
            query.descending("updatedAt");
            if(category !="全部"){
                query.equalTo("relationshipstring",category);
            }

            query.count()
                .then(function(count){
                    $scope.count = count;
                    return query.find();
                })
                .then(function(articles){
                    var colOneArray=[];
                    var colTwoArray=[];
                    var colThreeArray=[];
                    for(var i = 0;i<articles.length;i++){

//                        console.log(articles[i].get('article').get('startedAt'));
                        if(articles[i].get('startedAt'))
                        {
                            articles[i].startDate=articles[i].get('startedAt').toLocaleDateString().replace(/\//gm, ".");
                        }
                        else{
                            articles[i].startDate ="";
                        }
                        if(articles[i].get('authorinformation'))
                        {
                            if(articles[i].get('authorinformation').get('headImage')) {
                                articles[i].hasAvatar = true;
                            }
                        }
                        else
                        {
                            articles[i].hasAvatar=false;
                        }

                        if(articles[i].get('authorinformation'))
                        {
                            if(articles[i].get('authorinformation').get('nickname')) {
                                articles[i].hasNickName = true;
                            }
                        }
                        else
                        {
                            articles[i].hasNickName=false;
                        }


                        if(i%3==0){

                            colOneArray.push(articles[i]);

                        }
                        else if(i%3==1){
                            colTwoArray.push(articles[i]);
                        }
                        else{
                            colThreeArray.push(articles[i]);
                        }
                    }

                    currentArticles.oneCol = colOneArray;
                    currentArticles.twoCol = colTwoArray;
                    currentArticles.threeCol= colThreeArray;
                    $scope.currentArticles = currentArticles;
                    $scope.$apply();
                    //停止进度条
                    indeterminateProgress.end();
                });
        };






    });
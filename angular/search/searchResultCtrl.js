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



    .controller('SearchResultCtrl', function($scope,$rootScope,$location) {


        var intObj = {
            template: 3,
            parent: '#bodysectionid' // this option will insert bar HTML into this parent Element
        };
        var indeterminateProgress = new Mprogress(intObj);

        $scope.categories = ['全部', '家庭', '亲子', '蜜月', '情侣', '基友', '闺蜜', '独行', '偶遇'];
        $scope.selectedIndex = 0;
        if ($rootScope.selectedCategory) {
            $scope.selectedIndex = $rootScope.selectedCategory;
        }

        $scope.$on('homeEnter',function(e,newSearchName){
            $scope.newSearchName = newSearchName;
            console.log($scope.name);
            AV.Cloud.run('search', {'query':$scope.newSearchName}, {
                success: function (result) {

                    console.log(result);
                    var articles = result;
                    articles.shift();
                    console.log(articles);
                    console.log(articles[1].createdAt)
                    var colOneArray=[];
                    var colTwoArray=[];
                    var colThreeArray=[];
                    for(var i = 0;i<articles.length;i++){

                        if(articles[i].createdAt)
                        {
                            articles[i].startDate=articles[i].startedAt.toLocaleDateString().replace(/\//gm, ".");
                            console.log(articles[i].startedAt);
                        }
                        else{
                            articles[i].startDate ="";
                        }
                        if(articles[i].authorinformation)
                        {
                            if(articles[i].authorHead) {
                                articles[i].hasAvatar = true;
                            }
                        }
                        else
                        {
                            articles[i].hasAvatar=false;
                        }

                        if(articles[i].authorinformation)
                        {
                            if(articles[i].authorinformation.nickname) {
                                articles[i].hasNickName = true;
                            }
                        }
                        else
                        {
                            articles[i].hasNickName=false;
                        }

                        if(i%3==0){

                            colOneArray.push(articles[i]);
                            console.log(colOneArray)
                        }
                        else if(i%3==1){
                            colTwoArray.push(articles[i]);
                        }
                        else{
                            colThreeArray.push(articles[i]);
                        }
                        $scope.rcolOneArray = colOneArray;
                        $scope.rcolTwoArray = colTwoArray;
                        $scope.rcolThreeArray = colThreeArray;
                        $scope.$apply();
                    }
                }
            })
            });
        $scope.goSearch = function(){
            AV.Cloud.run('search', {'query':$scope.searchName}, {
                success: function (result) {

                    console.log(result);
                    var articles = result;
                    articles.shift();
                    console.log(articles);
                    console.log(articles[1].createdAt)
                    var colOneArray=[];
                    var colTwoArray=[];
                    var colThreeArray=[];
                    for(var i = 0;i<articles.length;i++){

                        if(articles[i].createdAt)
                        {
                            articles[i].startDate=articles[i].startedAt.toLocaleDateString().replace(/\//gm, ".");
                            console.log(articles[i].startedAt);
                        }
                        else{
                            articles[i].startDate ="";
                        }
                        if(articles[i].authorinformation)
                        {
                            if(articles[i].authorHead) {
                                articles[i].hasAvatar = true;
                            }
                        }
                        else
                        {
                            articles[i].hasAvatar=false;
                        }

                        if(articles[i].authorinformation)
                        {
                            if(articles[i].authorinformation.nickname) {
                                articles[i].hasNickName = true;
                            }
                        }
                        else
                        {
                            articles[i].hasNickName=false;
                        }

                        if(i%3==0){

                            colOneArray.push(articles[i]);
                            console.log(colOneArray)
                        }
                        else if(i%3==1){
                            colTwoArray.push(articles[i]);
                        }
                        else{
                            colThreeArray.push(articles[i]);
                        }
                        $scope.rcolOneArray = colOneArray;
                        $scope.rcolTwoArray = colTwoArray;
                        $scope.rcolThreeArray = colThreeArray;
                        $scope.$apply();
                    }
                }
            })
        }
        $scope.enter = function($event){
            console.log($scope.goSearch);
            if($event.keyCode == 13){
                AV.Cloud.run('search', {'query':$scope.searchName}, {
                    success: function (result) {


                        $scope.page = 1;
                        $scope.count = 15;
                        console.log(result[1].createdAt);
                        var articles = result;
                        articles.shift();
                        console.log(articles);
                        console.log(articles[1].createdAt)
                        var colOneArray=[];
                        var colTwoArray=[];
                        var colThreeArray=[];
                        for(var i = 0;i<articles.length;i++){

                            if(articles[i].createdAt)
                            {
                                articles[i].startDate=articles[i].startedAt.toLocaleDateString().replace(/\//gm, ".");
                                console.log(articles[i].startedAt);
                            }
                            else{
                                articles[i].startDate ="";
                            }
                            if(articles[i].authorinformation)
                            {
                                if(articles[i].authorHead) {
                                    articles[i].hasAvatar = true;
                                }
                            }
                            else
                            {
                                articles[i].hasAvatar=false;
                            }

                            if(articles[i].authorinformation)
                            {
                                if(articles[i].authorinformation.nickname) {
                                    articles[i].hasNickName = true;
                                }
                            }
                            else
                            {
                                articles[i].hasNickName=false;
                            }

                            if(i%3==0){

                                colOneArray.push(articles[i]);
                                console.log(colOneArray)
                            }
                            else if(i%3==1){
                                colTwoArray.push(articles[i]);
                            }
                            else{
                                colThreeArray.push(articles[i]);
                            }
                            $scope.rcolOneArray = colOneArray;
                            $scope.rcolTwoArray = colTwoArray;
                            $scope.rcolThreeArray = colThreeArray;
                            $scope.$apply();
                        }
                    }
                })
            }
        }
    })
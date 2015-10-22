'use strict';


//Leancloud配置
AV.initialize("xheu55juaeye1u1e412588pyz37d3luqba7hhjd30btx9mid", "8h1dv6vtcxyh1hmtesqguubhzntl73n1nbjan4dfxd8f09s0");
var Article = AV.Object.extend('Article'),
    RecommendArticle = AV.Object.extend('RecommendArticle'),
    RecommendCollection = AV.Object.extend('RecommendCollection'),
    Collection = AV.Object.extend('Collection');
// Declare app level module which depends on views, and components
angular
    .module('myApp', [
  'ngRoute',
  'myApp.view1',
  'myApp.view2',
  'myApp.version',
  'myApp.home',
  'myApp.ArticleDetail',
  'myApp.CollectionDetail',
  'myApp.CollectionsList',
  'myApp.ArticlesList',
  'myApp.SearchResult',
  'myApp.PersonalPage',
        'myApp.JoinUs'
])
    .config(['$routeProvider','$locationProvider', function($routeProvider,$locationProvider,$location) {
//  $routeProvider.otherwise({redirectTo: '/view1'});
        $routeProvider
            .when('/', {
                templateUrl: 'home/home.html',
                controller: 'HomeCtrl',
                title:'觅游旅行-精品旅游游记攻略分享网站',
                keywords:'自由行攻略 旅游攻略网 自助游攻略',
                description:'觅游旅行,旅游达人分享的最新亲子,家庭,蜜月,情侣,闺蜜,基友,独行,偶遇等自助旅自由行游攻略路线行程,给您带来前所未有的旅行体验.觅游旅行,与对的人去对的地方.'
            })
            //.when('/meke', {
            //    controller: 'MekeArticlesListctrl',
            //    templateUrl: 'mekeArticlesList/mekearticleslistpage.html',
            //    publicAccess: true,
            //    title:'觅客推荐-觅游旅行',
            //    keywords:'自由行攻略 旅游攻略网 自助游攻略',
            //    description:'旅游达人分享最新的自助游旅行攻略行程路线等详细旅行信息,带您体验不一样的世界.觅游旅行,与对的人去对的地方.'
            //})
            .when('/articles', {
                controller: 'ArticlesListCtrl',
                templateUrl: 'articlesList/articlesList.html',
                publicAccess: true,
                title:'觅客推荐-觅游旅行',
                keywords:'自由行攻略 旅游攻略网 自助游攻略',
                description:'旅游达人分享最新的自助游旅行攻略行程路线等详细旅行信息,带您体验不一样的世界.觅游旅行,与对的人去对的地方.'
            })
            .when('/articles/:id', {
                controller: 'ArticleDetailCtrl',
                templateUrl: 'articledetail/articledetail.html',
                publicAccess: true,
                title:'觅客推荐-觅游旅行',
                keywords:'自由行攻略 旅游攻略网 自助游攻略',
                description:'旅游达人分享最新的自助游旅行攻略行程路线等详细旅行信息,带您体验不一样的世界.觅游旅行,与对的人去对的地方.'
            })
            .when('/search', {
                controller: 'SearchResultCtrl',
                templateUrl: 'search/searchResult.html',
                publicAccess: true,
                title:'觅客推荐-觅游旅行',
                keywords:'自由行攻略 旅游攻略网 自助游攻略',
                description:'旅游达人分享最新的自助游旅行攻略行程路线等详细旅行信息,带您体验不一样的世界.觅游旅行,与对的人去对的地方.'
            })
            .when('/collections', {
                controller: 'CollectionsListCtrl',
                templateUrl: 'collectionList/collectionlistpage.html',
                title:'精选专题-觅游旅行',
                keywords:'自由行攻略 旅游攻略网 自助游攻略',
                description:'觅客最新精彩自助游旅游记游攻略行程路程等详细信息分享,觅游旅行,与对的人去对的地方.'
            })
            .when('/collections/:id', {
                controller: 'CollectionDetailCtrl',
                templateUrl: 'collectiondetail/collectionarticlespage.html',
                title:'精选专题-觅游旅行',
                keywords:'自由行攻略 旅游攻略网 自助游攻略',
                description:'觅客最新精彩自助游旅游记游攻略行程路程等详细信息分享,觅游旅行,与对的人去对的地方.'
            })
            .when('/personalPage/:id',{
                controller: 'PersonalPageCtrl',
                templateUrl: 'personalPage/personalPage.html'
            })
            .when('/about', {
                templateUrl: 'about/aboutUs.html',
                publicAccess: true
            })
            .when('/contact',{
                templateUrl: 'contact/contactUs.html'
            })
            .when('/exceptions',{
                templateUrl: 'exceptions/exceptions.html'
            })
            .when('/view1', {
                templateUrl: 'view1/view1.html',
                controller: 'View1Ctrl'
            })
            .when('/joinUs',{
                templateUrl:'joinUs/joinUs.html',
                controller: 'JoinUsCtrl'
            })

            .otherwise({redirectTo: '/'});

        // use the HTML5 History API
        $locationProvider.html5Mode(true);
}])
    .run(function($rootScope,$route){
        $rootScope.$on("$routeChangeSuccess", function(currentRoute, previousRoute){
            //Change page title, based on Route information
            $rootScope.title = $route.current.title;
            $rootScope.keywords = $route.current.keywords;
            $rootScope.description = $route.current.description;
        });
        $rootScope.searchName ="";
        $rootScope.slide = "";
    })



    .directive('originalHtml', function() {
        return {
            restrict : 'EA',
            replace : true,
            transclude : true,
            scope : {
                content : '@content'
            },
            template : '<div></div>',
            link : function(scope, element, attrs) {
                element.html(scope.content.toString());
            }
        }
    })
    .controller('headCtrl',function($scope,$location,$rootScope){
        $scope.$on("$routeChangeSuccess", function(currentRoute, previousRoute){
            $scope.url = $location.url();
            if($scope.url == '/'){
                $scope.home = 1;
            }else{
                $scope.home = 0;
            }
        });

        $scope.collectionList = function(){
            $location.path('/collections/')
        }
        $scope.meetkeCommunity = function(){
            $location.path('/meke')
        }
        $scope.homePage = function(){
            $location.path('/')
        }


        $scope.homeEnter = function($event){
            if($event.keyCode == 13){
                $rootScope.searchName=$scope.searchName;
                $location.path('/search');
            }
        }



})
    .controller('footCtrl',function($scope){
        $scope.hasWeixin = false;
        $scope.weixinShow = function(){
            $scope.hasWeixin = true;
        }
        $scope.weixinHid = function(){
            $scope.hasWeixin = false;
        }
    })



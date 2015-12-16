'use strict';


//Leancloud配置
AV.initialize("xheu55juaeye1u1e412588pyz37d3luqba7hhjd30btx9mid", "8h1dv6vtcxyh1hmtesqguubhzntl73n1nbjan4dfxd8f09s0");
var Article = AV.Object.extend('Article'),
    RecommendArticle = AV.Object.extend('RecommendArticle'),
    RecommendCollection = AV.Object.extend('RecommendCollection'),
    Collection = AV.Object.extend('Collection'),
    UserInfomation = AV.Object.extend('userInfomation'),
    User = AV.Object.extend('_User');
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
        'myApp.JoinUs',
        'myApp.Exceptions',
        'myApp.ContactUs',
        'myApp.AboutUs',
        'myApp.Edit'
])
    .config(['$routeProvider','$locationProvider', function($routeProvider,$locationProvider,$location,prerender) {
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
            .when('/edit',{
                controller:'EditCtrl',
                templateUrl: 'edit/edit.html'
            })
            .when('/about', {
                templateUrl: 'about/aboutUs.html',
                controller: 'AboutUsCtrl'
            })
            .when('/about/', {
                templateUrl: 'about/aboutUs.html',
                controller: 'AboutUsCtrl'
            })
            .when('/contact',{
                templateUrl: 'contact/contactUs.html',
                controller: 'ContactUsCtrl'
            })
            .when('/exceptions',{
                templateUrl: 'exceptions/exceptions.html',
                controller: 'ExceptionsCtrl'
            })
            .when('/view1', {
                templateUrl: 'view1/view1.html',
                controller: 'View1Ctrl'
            })
            .when('/joinUs',{
                templateUrl:'joinUs/joinUs.html',
                controller: 'JoinUsCtrl'
            })
            //.when('/login',{
            //    templateUrl:'login/login.html',
            //    controller: 'LoginCtrl'
            //})

            .otherwise({redirectTo: '/'});

        // use the HTML5 History API
        $locationProvider.html5Mode(true);
        $locationProvider.hashPrefix('!');
}])
    .run(function($rootScope,$route){
        $rootScope.$on("$routeChangeSuccess", function(currentRoute, previousRoute){
            //Change page title, based on Route information
            $rootScope.title = $route.current.title;
            $rootScope.keywords = $route.current.keywords;
            $rootScope.description = $route.current.description;
        });
        var currentUser = AV.User.current();
        console.log(currentUser);
        if(currentUser){
            var query = new AV.Query(UserInfomation);
            query.equalTo("userObject",currentUser);
            query.find(function(result){
                $rootScope.userInformation = result;
            })
        }
        $rootScope.searchName ="";
        $rootScope.slide = "";
        $rootScope.userInformation = "";
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
    .controller('headCtrl',function($scope,$location,$rootScope,$filter,$interval){



        $scope.$on("$routeChangeSuccess", function(){
            $scope.url = $filter('limitTo')($location.url(),'12');
            if($scope.url == '/'){
                $scope.home = 1;
            }else{
                $scope.home = 0;
            }
            if($scope.url == '/collections'){
                $scope.collectionChoose = 1;
            } else{
                $scope.collectionChoose = 0;
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
        $scope.edit = function(){
            if($scope.userInformation.vip==true){
                $location.path('/edit');
            }else{
                alert("您还不是觅客，无法编写文章");
            }
        }


        $scope.homeEnter = function($event){
            if($event.keyCode == 13){
                $rootScope.searchName=$scope.searchName;
                $location.path('/search');
            }
        }
        $scope.goSearch = function(){
            $rootScope.searchName=$scope.searchName;
            $location.path('/search');
        }

        $scope.hasApp = false;
        $scope.appShow = function(){
            $scope.hasApp = true;
        }
        $scope.appHid = function(){
            $scope.hasApp = false;
        }
        //打开登录框
        $scope.hasLogin = false;
        $scope.LoginOpen = function(){
            $scope.hasLogin = true;
        }

        //关闭登录框
        $scope.LoginClose = function(){
            $scope.hasLogin = false;
        }

        //加载条
        var intObj = {
            template: 3,
            parent: '#loginId' // this option will insert bar HTML into this parent Element
        };
        var indeterminateProgress = new Mprogress(intObj);

        //登录
        $scope.goLogin = function(){

            indeterminateProgress.start();

            AV.User.logIn($scope.userName,$scope.password,{

                //登录成功，关闭登录框
                success:function(user){
                    $scope.hasLogin = false;
                    $scope.noLogin = true;
                    $scope.isLogin = true;
                    var query = new AV.Query(UserInfomation);
                    query.equalTo("userObject",user);
                    query.find(function(result){
                        $scope.userInformation = result;
                        $rootScope.userInformation = result;
                    })
                },
                //登录失败，提示输入正确用户名和密码
                error:function(){
                  alert("请输入正确的用户名和密码。")
                }
            })
            indeterminateProgress.end();

        }

        //退出登录，返回首页
        $scope.logOut = function(){
            AV.User.logOut()
            $location.path('/');
            $scope.noLogin = false;
            $scope.isLogin = false;
            $scope.userName = null;
            $scope.password = null;
        }

        //打开注册页面
        $scope.hasRegister = false;
        $scope.RegisterOpen = function(){
            $scope.hasRegister =true;
        }

        //关闭注册页面
        $scope.RegisterClose = function(){
            $scope.hasRegister = false;
        }



        //获取验证码
        $scope.GetAuthCodeHide = false;
        $scope.reGetAuthCodeShow = false;
        $scope.getCode = function(){
            $scope.GetAuthCodeHide = true;
            console.log($scope.registerPhoneNumber);
                AV.Cloud.requestSmsCode({
                    mobilePhoneNumber: $scope.registerPhoneNumber,
                    name: '觅游',
                    op: '注册',
                    ttl: 10
                }).then(function(){
                    $scope.reGetAuthCodeShow = true;
                    $scope.GetAuthCodeUnvisitableShow = false;
                    $scope.GetAuthCodeShow = false;
                    $scope.second = 60;
                    $scope.changeSecond = function(){
                        $scope.second --;
                        if($scope.second<0){
                            $scope.reGetAuthCodeShow = false;
                            $scope.GetAuthCodeHide = false;
                        }
                    }
                    $interval($scope.changeSecond,1000);
                }, function(err){
                    console.log(err);
                    alert(err.message);
                });
        }

        //手机注册
        $scope.GoRegister = function(){
            console.log($scope.authCode,$scope.registerPhoneNumber);
            AV.Cloud.verifySmsCode($scope.authCode,$scope.registerPhoneNumber).then(function() {
                //验证成功,注册账号
                console.log("verified.");
                var user = new AV.User();
                user.set("username",$scope.registerPhoneNumber);
                user.set("password",$scope.registerPassword);
                user.signUp(null, {
                    success: function (user) {
                        console.log("registered.");

                        //创建userInfomation数据
                        var userInfomation = new UserInfomation();
                        userInfomation.set("userObject", user);
                        userInfomation.set("nickname", $scope.registerUserName);
                        userInfomation.set("mobilePhoneNumber", $scope.registerPhoneNumber);
                        userInfomation.save(null, {
                            success: function (userInfomation) {
                                console.log(userInfomation);
                                AV.User.logIn($scope.registerPhoneNumber, $scope.registerPassword, {
                                    success: function(result) {
                                        $scope.noLogin = true;
                                        $scope.isLogin = true;
                                        $scope.hasRegister = false;
                                        var query = new AV.Query(UserInfomation);
                                        query.equalTo("userObject",result);
                                        query.find(function(userResult){
                                            console.log(userResult);
                                            $scope.userInformation = userResult;
                                            $rootScope.userInformation = userResult;
                                        })
                                    },
                                    error: function(user, error) {
                                        alert(error.message);
                                    }
                                });
                            },
                            error: function (userInfomation, error) {
                                alert(error.message);
                            }
                        })
                    },
                    error: function (user, error) {
                        console.log("failure.");
                        alert(error.message);

                    }
                });
            }, function (err) {
                //验证失败
                console.log(err);
                alert(err.message);
            });
        }
        $scope.GoToLoginPage = function(){
            $scope.hasRegister = false;
            $scope.hasLogin = true;
        }
})
    .controller('footCtrl',function($scope,$location,$anchorScroll) {
        $scope.hasWeixin = false;
        $scope.weixinShow = function () {
            $scope.hasWeixin = true;
        }
        $scope.weixinHid = function () {
            $scope.hasWeixin = false;
        }
        $scope.edit = function(){
            $location.path('/edit');
        }
    })
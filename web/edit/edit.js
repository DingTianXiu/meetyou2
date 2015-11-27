/**
 * Created by mpb on 15/11/18.
 */

//Leancloud配置
AV.initialize("xheu55juaeye1u1e412588pyz37d3luqba7hhjd30btx9mid", "8h1dv6vtcxyh1hmtesqguubhzntl73n1nbjan4dfxd8f09s0");
var Article = AV.Object.extend('Article'),
    RecommendArticle = AV.Object.extend('RecommendArticle'),
    RecommendCollection = AV.Object.extend('RecommendCollection'),
    Collection = AV.Object.extend('Collection'),
    UserInfomation = AV.Object.extend('userInfomation'),
    User = AV.Object.extend('_User');


angular.module('myApp.Edit',[])
    .controller('EditCtrl',function($scope,$anchorScroll){
        //返回顶部
        $anchorScroll();

        $scope.editBasicInformaton = true;
        $scope.articleInformationHide = false;
        $scope.editEditNote = true;

        //创建游记下一步
        $scope.goArticleInformation = function(){
            $scope.editBasicInformaton= false;
            $scope.articleInformationHide = true;

        }

        //基本信息下一步
        $scope.goEditNote = function(){
            $scope.editEditNote = false;
            $scope.articleInformationHide = false;
        }

        //导航栏按键
        //创建游记
        $scope.goCreateNoteBtn = function(){
            $scope.editBasicInformaton = true;
            $scope.editEditNote = true;
            $scope.articleInformationHide = false;
        }
        //基本信息
        $scope.goArticleInformationBtn = function(){
            $scope.editBasicInformaton= false;
            $scope.articleInformationHide = true;
            $scope.editEditNote = true;
        }
        //编辑游记
        $scope.goEditNoteBtn = function(){
            $scope.editBasicInformaton= false;
            $scope.articleInformationHide = false;
            $scope.editEditNote = false;
        }

        //展开、合拢添加按键
        $scope.addNotePart =true;
        $scope.showAddNotePart =function(key){
            $scope.addNotePart = true;
            $scope.introDivShow = true;
            $scope.showForm = key
        }
        $scope.hideAddNotePart = function(key){
            $scope.addNotePart =false;
            $scope.introDivShow = true;
            $scope.showForm = key
        }

        //编辑及显示游记引言
        $scope.introDivShow = false;
        $scope.selectIntroDiv = function(){

        }
        $scope.selectIntroInput = function(){
            $scope.introDivShow =false;
        }

        $scope.data = ['1'];

        //点击添加文章模块
        $scope.addInput1 = function(key){
            $scope.showForm = key
            $scope.input1 = true;
            $scope.data.push('1');
            console.log(data);
        }
        $scope.addInput2 = function(key){
            $scope.showForm = key
            $scope.input2 = true;
            $scope.data.push('1');
        }
        $scope.addInput3 = function(key){
            $scope.showForm = key
            $scope.input3 = true;
            $scope.data.push('1');
        }

        //删除文章模块
        $scope.deleteInput1 = function(key){
            $scope.showForm = key
            $scope.input1 = false;
            $scope.sectionTitle = null;
        }
        $scope.deleteInput2 = function(key){
            $scope.showForm = key
            $scope.input2 = false;
            $scope.paragraphTitle = null;
        }
        $scope.deleteInput3 = function(key){
            $scope.showForm = key
            $scope.input3 = false;
            $scope.paragraphContent = null;
        }

        $scope.showPart1 = true;
        $scope.showPart2 = true;
        $scope.showPart3 = true;

        $scope.inputEdit1 = function(key){
            $scope.showForm = key

        }
        $scope.inputEdit2 = function(key){
            $scope.showForm = key

        }
        $scope.inputEdit3 = function(key){
            $scope.showForm = key

        }




        //$scope.userInformation = $rootScope.userInformation;
        //var file = document.getElementById('file').value,
        //    relation = document.getElementById('relationId').options[document.getElementById('relationId').selectedIndex].text,
        //    startedAt = document.getElementById('startedAtId').text;
        //var article = new Article();
        //article.set("title",$scope.title);
        //article.set("subtitle",$scope.subTitle);
        //article.set("background",file);
        //article.set("authorinformation",$scope.userInformation);
        //article.set("relationshipstring",relation);
        //article.set("duration",$scope.duration);
        //article.set("destination",$scope.destination);
        //article.set("startedAt",startedAt);

    })
//data=[1]
//ng-repeat="item in data"
//show
//$scope.add=function(){
//    data.push('1');
//}
//$scope.show=function('title'){
//    Show = 'titie'
//}
//ng-show="show==title"



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

        //添加文章初始化
        function reset() {
            $scope.selectedDay =null;
            $scope.selectedPart = null;
        }
//
        //网页加载初始化
        $scope.init = function () {
            $scope.articlechsnames = {
                "title": "标题",
                "subtitle": "副标题",

                "destination":"目的地",
                "intro":"摘要",
                "preparation":"行前准备",
                "transportation": "交通工具",
                "hotels": "宾馆",
                "type": "文章类型",
                "duration": "天数",
                "startedAt": "开始日期",

                "relationshipstring": "关系"

            };
            var DataSchema = {
                "Article": {
                    "title": {"_type": "string"},
                    "background": {"_type": "object"},
                    "subtitle": {"_type": "string"},
                    "destination": {"_type": "string"},
                    "intro": {"_type": "string"},
                    "preparation": {"_type": "string"},
                    "transportation": {"_type": "string"},
                    "hotels": {"_type": "string"},
                    "type": {"_type": "number"},
                    "duration": {"_type": "number"},
                    "startedAt": {"_type": "date"},

                    "relationship": {"_type": "object"},
                    "relationshipstring": {"_type": "string"},
                    "days": {
                        "_type": "object",
                        "title": {"_type": "string"},
                        "subtitle": {"_type": "string"},
                        "items": {
                            "_type": "array_of_object",
                            "title": {"_type": "string"},
                            "rank": {"_type": "number"},
                            "brief": {"_type": "string"},
                            "description": {"_type": "string"},
                            "pics": {"_type": "array_of_string"}
                        }
                    }
                },
                "Relationship": {
                    "name": {"type": "object"}
                },
                "Media": {
                    "file": {"type": "object"}
                }
            }
            //$scope.formSchema = DataSchema;
            //LeanCloud.setup(DataSchema);
            //var classRefs = LeanCloud.angularizeAll();
            //Article = classRefs['Article'];
            //Relationship = classRefs['Relationship'];
            //Media = classRefs['Media'];
            //$scope.refresh();

            //新建文章
            reset();
            $scope.selected = new Article({
                days: [],
                type: 0
            });
        };

         //添加第一个章节
        $scope.initAddDay = function(){
            reset();
            $scope.introDivShow = true;
            $scope.showForm = 0;
            if (!$scope.selected.days) {
                $scope.selected.days = [];
                var day = {items:[],title:""};
                $scope.selectedDay = day;
                $scope.selected.days.push(day);
            }
        }
//
//        //新建文章
//        $scope.newArticle = function () {
//            reset();
//            $scope.selected = new Article({
//                days: [],
//                type: 0
//            });
//        };
//
        //添加段落
        $scope.addItemTitle = function (key,input,itemIndex) {
            console.log("进入addItem");
            $scope.selectedPart = null;
            var item ={pics:[]};
            $scope.selectedDay.items.push(item);
            $scope.selectedPart =item;
            $scope.dayMakeSure = true;
            $scope.showInput = itemIndex;
            $scope.input = input;
            $scope.input1 = null;
            console.log($scope.showInput);
            console.log("addItem完成");
        }
        $scope.addItemDescription = function(key,input,itemIndex){
            console.log("addDescription开始");
            if($scope.selectedPart.description){
                $scope.selectedPart = null;
                var item ={pics:[]};
                $scope.selectedDay.items.push(item);
                $scope.selectedPart =item;
            }else
            $scope.dayMakeSure = true;
            $scope.showForm = key;
            $scope.showInput = itemIndex;
            $scope.input = input;
            $scope.input1 = null;
            console.log("addDescription结束");
        }
//
        //添加章节
        $scope.newDay = function (key,input) {
            reset();
            $scope.dayMakeSure = true;
            var day = {items:[],title:""};
            $scope.selectedDay = day;
            $scope.selected.days.splice(key,0,day);
            $scope.showForm = key;
            $scope.input1 = input;
            $scope.input = null;
        };

        //保存章节
        $scope.dayMakeSureBtn = function(key){
            $scope.dayMakeSure = false;
            $scope.showForm = null;
            console.log("$scope.selected.days",$scope.selected.days);
            console.log($scope.selected.days.length);
            $scope.input1 = null;
            $scope.input = null;
            //if($scope.selected.days.length==key+1){
            //    console.log($scope.selected.days.length);
            //    var day = {items:[],title:""};
            //    $scope.selectedDay = day;
            //    $scope.selected.days.push(day);
            //}

        }

//
//        //发布
//        $scope.save = function () {
//            reset();
//
//            $scope.selected.days = angular.copy($scope.selected.days);
////            $scope.selected.relationshipstring = $scope.selected.relationship.name;
//            for (var i=0;i<$scope.relationships.length;i++){
//                if($scope.selected.relationshipstring==$scope.relationships[i].name){
//                    $scope.selected.relationship = $scope.relationships[i];
//                }
//            };
//
//            if ($scope.selected) {
//                $scope.selected.save().then(
//                    function (selected) {
//                        $scope.selected = selected;
//                        console.log('saved');
//                    }
//                ).then(
//                    function () {
//                        $scope.$apply();
//                        alert('保存成功');
//                        angular.element('#my-popup').modal('close');
//                    },
//                    function (err) {
//                        $scope.errorMessage = err.message;
//                        alert(err.message);
//                    }
//                ).then($scope.refresh, $scope.refresh);
//            }
//        };
//
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

        //展开、折叠添加按键
        $scope.addNotePart =true;
        $scope.showAddNotePart =function(key){
            $scope.addNotePart = true;
            $scope.showForm = key;
            $scope.input = null;
        }
        $scope.hideAddNotePart = function(key){
            $scope.addNotePart =false;
            $scope.showForm = key;
        }

        //编辑及显示游记引言
        $scope.introDivShow = false;
        $scope.selectIntroDiv = function(){

        }
        $scope.selectIntroInput = function(){
            $scope.introDivShow =false;
        }


        //保存
        $scope.save = function(key){
            $scope.showForm = key
            $scope.showInput = $scope.showInput+5
        }

        //编辑
        $scope.inputEdit = function(key){
            $scope.showForm = key
            $scope.showInput = $scope.showInput-5
            console.log($scope.showInput);
        }

        //删除文章模块
        $scope.deleteInput1 = function(key){
            $scope.showForm = key;
            $scope.input1 = null;
            $scope.selectedDay.title = null;
        }
        $scope.deleteInput2 = function(key){
            $scope.showForm = key;
            $scope.input2 = false;
            $scope.paragraphTitle = null;
        }
        $scope.deleteInput3 = function(key){
            $scope.showForm = key;
            $scope.input3 = false;
            $scope.paragraphContent = null;
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



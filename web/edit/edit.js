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


angular.module('myApp.Edit',['angular-img-cropper'])
    .directive("fileread", [function () {
        return {
            scope: {
                fileread: "=",
                index: "="
            },
            link: function (scope, element, attributes) {
                element.bind("change", function (changeEvent) {
                    var reader = new FileReader();
                    reader.onload = function (loadEvent) {
                        scope.$apply(function () {
                            scope.url = loadEvent.target.result;
                            scope.fileread(scope.url,scope.index)
                        });
                    }
                    reader.readAsDataURL(changeEvent.target.files[0]);
                });
            }
        }
    }])
    .controller('EditCtrl',function($scope,$anchorScroll,$rootScope){
        //返回顶部
        $anchorScroll();

        //上传文章封面
        $scope.cropper = {};
        $scope.cropper.sourceImage = null;
        $scope.cropper.croppedImage   = null;
        $scope.bounds = {};
        $scope.bounds.left = 0;
        $scope.bounds.right = 0;
        $scope.bounds.top = 0;
        $scope.bounds.bottom = 0;
        $scope.cropAreaHide = true;
        $scope.upDateSurfacePlot =function(){
            $scope.cropAreaHide = true;
        }
        $scope.saveSurfacePlot = function(){
            $scope.cropAreaHide = false;
            console.log($scope.background);
        }
        var surfacePlotReader = new FileReader();

        //surfacePlotReader.onload = function (oFREvent) {
        //    //console.log("ffff");
        //    $scope.background = oFREvent.target.result;
        //    //console.log($scope.selected.background);
        //    //console.log("ofofof");
        //};

        loadSurfacePlot = function() {
            //console.log("调用文件上传函数");
            //console.log(document.getElementById("surfacePlot").files);
            if (document.getElementById("surfacePlot").files.length === 0) {
                console.log("什么都没有");
                return; }
            var oFile = document.getElementById("surfacePlot").files;
            $scope.background = oFile;
            //console.log("ofile:",document.getElementById("surfacePlot").files);
            surfacePlotReader.readAsDataURL(oFile);
            //console.log("调用结束");
        }




        //文章初始化
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
                type: 1
            });
            $scope.days = [];

            // 预先取出出行关系
            var Relationship = AV.Object.extend('Relationship');
            new AV.Query(Relationship).find().then(
                function (relationships) {
                    $scope.relationships = relationships;
                    $scope.$apply();
                    //console.log($scope.relationships);
                    //console.log($scope.relationships[0].name);
                    //console.log($scope.relationships[0].attributes.name)
                    //console.log($scope.relationships[0].get("name"));
                }
            );
        };

         //添加第一个章节
        $scope.initAddDay = function(){
            reset();
            $scope.introDivShow = true;
            $scope.showForm = 0;
            $scope.addBtnSave = 0;
            if (!$scope.days||$scope.days.length==0) {
                $scope.days = [];
                var day = {items:[],title:""};
                $scope.selectedDay = day;
                $scope.days.push(day);
                console.log($scope.days.length);
                $scope.input1 = 1;
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
        $scope.addItemTitle = function (key,input) {
            console.log("进入addItem");
            if($scope.days.length == key+1&&$scope.input1 == null){
                $scope.selectedPart = null;
                $scope.addBtnSave = key;
                var day = {items:[],title:""};
                $scope.selectedDay = day;
                $scope.days.splice(key,0,day);
                $scope.input1 = 1;
                $scope.showForm = key;
                var item ={pics:[]};
                $scope.selectedPart =item;
                $scope.days[key].items.push(item);
                $scope.dayMakeSure = true;
                $scope.input2 = input;
            }else{
                //if (!$scope.selectedDay.items) {
                //    $scope.selectedDay.items = [];
                //}
                $scope.selectedPart = null;
                var item ={pics:[]};
                $scope.selectedPart =item;
                $scope.days[key].items.push(item);
                $scope.dayMakeSure = true;
                $scope.input2 = input;
            }
            console.log("addItem完成");
        }
        //$scope.addItemDescription = function(key,input){
        //    console.log("addDescription开始");
        //    if($scope.selectedPart.description){
        //        $scope.selectedPart = null;
        //        var item ={pics:[]};
        //        $scope.selectedDay.items.push(item);
        //        $scope.input2 = null;
        //    }else
        //    $scope.dayMakeSure = true;
        //    $scope.showForm = key;
        //    $scope.input3 = input;
        //    console.log("addDescription结束");
        //}
//


        //添加图片
        $scope.addPic = function(url,key){
            if(!$scope.selectedDay){
                console.log("1");
                var day = {items:[],title:""};
                $scope.selectedDay = day;
                $scope.days.splice(key,0,day);
                $scope.showForm = key;
                $scope.input1 = 1;
                $scope.addBtnSave = key
                var item ={pics:[]};
                $scope.selectedPart =item;
                $scope.days[key].items.push(item);
                $scope.dayMakeSure = true;
                $scope.input2 = 2;
            }else if(!$scope.selectedPart){
                console.log("2");
                var item ={pics:[]};
                $scope.selectedPart =item;
                $scope.days[key].items.push(item);
                $scope.dayMakeSure = true;
                $scope.input2 = 2;
                $scope.input1 = 1;
            }
            $scope.selectedPart.pics.push(url);
            console.log("我要经来了")
        }

        //添加章节
        $scope.newDay = function (key,input) {
            reset();
            $scope.dayMakeSure = true;
            if($scope.days.length == key+1){
                var day = {items:[],title:""};
                $scope.selectedDay = day;
                $scope.days.push(day);
                $scope.showForm = key+1;
                $scope.input1 = input;
                $scope.addBtnSave = key+1
            }else{
                var day = {items:[],title:""};
                $scope.selectedDay = day;
                $scope.days.splice(key,0,day);
                $scope.showForm = key;
                $scope.input1 = input;
                $scope.addBtnSave = key
            }

        };

        //保存章节
        $scope.dayMakeSureBtn = function(){
            console.log("kkk")
            $scope.dayMakeSure = false;
            $scope.addNotePart =false;
            //$scope.showForm = null;
            $scope.input1 = null;
            $scope.input2 = null;
            $scope.editPicsBtnShow = false;
            reset();
            //if($scope.days.length==key+1){
            //    console.log($scope.days.length);
            //    var day = {items:[],title:""};
            //    $scope.selectedDay = day;
            //    $scope.days.push(day);
            //}
            console.log("jjj");

        }

//
        //发布
        $scope.save = function () {
            reset();

            console.log("1");
            $scope.days = angular.copy($scope.days);
            console.log("2");
            console.log($scope.relationshipstring);

//            $scope.selected.relationshipstring = $scope.selected.relationship.name;
            for (var i = 0; i < $scope.relationships.length; i++) {
                console.log($scope.relationships[i].name);
                if ($scope.relationshipstring == $scope.relationships[i].get("name")) {
                    $scope.relationship = $scope.relationships[i];
                    console.log($scope.relationship);
                }
            }
            ;
            console.log("3");
            $scope.selected.authorinformation = $rootScope.userInformation;
            console.log($scope.selected);
            console.log("4");
            if ($scope.selected) {
                console.log("5");
                $scope.selected.set("title",$scope.title);
                $scope.selected.set("subTitle",$scope.subTitle);
                $scope.selected.set("background",$scope.background);
                $scope.selected.set("relationshipstring",$scope.relationshipstring);
                $scope.selected.set("startedAt",$scope.startedAt);
                $scope.selected.set("duration",$scope.duration);
                $scope.selected.set("relationship",$scope.relationship);
                $scope.selected.set("destination",$scope.destination);
                $scope.selected.set("intro",$scope.intro);
                $scope.selected.set("days",$scope.days);
                $scope.selected.save(null,{
                    success:function(selected){
                        alert(selected.id);
                    },
                    error:function(selected,error){
                        console.log("6");
                        console.log(selected);
                        console.log(error);
                    }
                })
            };
        }
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
            //console.log($scope.showForm);
            //console.log("title:",$scope.days[key].title);
            //alert("title:",$scope.days[key].title);
            //alert("items:",$scope.days[key].items);
            //console.log("items:",$scope.days[key].items);
            if($scope.days[key].title.length==0&&$scope.days[key].items.length==0){  //编辑文章（章节标题、段落都为空）
                $scope.input1 = null;
                $scope.input2 = null;
                $scope.editPicsBtnShow = true;
                //console.log("key1",key);
            }else if($scope.days[key].items.length==0){  //编辑文章（章节标题为空，段落不为空）
                //console.log("key2",key);
                $scope.input1 = 1;
                $scope.dayMakeSure = true;
                $scope.selectedDay = $scope.days[key];
                $scope.editPicsBtnShow = true;
                console.log("selectItem");
                console.log($scope.selectedPart);
            }else{   //编辑文章（章节辩题、段落都不为空）
                $scope.input1 = 1;
                $scope.input2 = 2;
                $scope.dayMakeSure = true;
                $scope.selectedDay = $scope.days[key];
                $scope.editPicsBtnShow = true;
                console.log("key3",key);
                console.log($scope.selectedDay);
                //console.log("title11:",$scope.days[key].title);
                //console.log("titlelength:",$scope.days[key].title.length);
                //
                //alert("title11:",$scope.days[key].title);
                //console.log("items11:",$scope.days[key].items);
                //console.log("items11length:",$scope.days[key].items.length);
                //alert("items11:",$scope.days[key].items);
            }
            console.log($scope.showForm);
        }
        $scope.hideAddNotePart = function(key){
            $scope.addNotePart =false;
            $scope.showForm = key;
            $scope.editPicsBtnShow = false;
        }

        //编辑及显示游记引言
        $scope.introDivShow = false;
        $scope.selectIntroDiv = function(){

        }
        $scope.selectIntroInput = function(){
            $scope.introDivShow =false;
        }



        //编辑图片
        $scope.editPicsBtnShow = true;
        $scope.editPicUrlBtnShow = false;
        $scope.editPics = function(key,parentKey){
            $scope.editPicUrlBtnShow = true;
            $scope.PicIndex = key;
            $scope.itemIndex = parentKey;
            $scope.selectedPart = $scope.selectedDay.items[key];
        }
            //保存
        $scope.savePics = function(key){
            $scope.editPicUrlBtnShow = false;
            $scope.PicIndex = key;
        }
            //删除
        $scope.delPic = function(key){
            $scope.selectedPart.pics.splice(key,1);
            console.log($scope.selectedPart);
        }



        //删除文章模块
        $scope.delSection = function(key){
            console.log("开始");
            console.log($scope.selectedDay);
            //$scope.days = _.without($scope.days, day);
            $scope.days.splice(key,1);
            $scope.selectedDay = undefined;
            $scope.input1 = null;
            $scope.dayMakeSure = false;
            console.log("结束");
        };
        $scope.delItem = function(key) {
            console.log("delItem");
            $scope.selectedDay.items.splice(key,1);
            console.log("delItem完成")
        }


    })

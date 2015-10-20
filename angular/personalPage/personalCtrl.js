/**
 * Created by meetyou on 2015/10/15.
 */
//Leancloud≈‰÷√
AV.initialize("xheu55juaeye1u1e412588pyz37d3luqba7hhjd30btx9mid", "8h1dv6vtcxyh1hmtesqguubhzntl73n1nbjan4dfxd8f09s0");
var Article = AV.Object.extend('Article'),
    RecommendArticle = AV.Object.extend('RecommendArticle'),
    RecommendCollection = AV.Object.extend('RecommendCollection'),
    Tour = AV.Object.extend('Tour'),
    RecommendedTour = AV.Object.extend('RecommendTour');
    userInfomation = AV.Object.extend('userInfomation');

angular.module('myApp.PersonalPage', [])



    .controller('PersonalPageCtrl', function($scope,$rootScope,$routeParams) {

        var intObj = {
            template: 3,
            parent: '#personalPageId' // this option will insert bar HTML into this parent Element
        };
        var indeterminateProgress = new Mprogress(intObj);


        $scope.initIndex = function (){

            indeterminateProgress.start();

            var query = new AV.Query(userInfomation);
            query.include("relationship");
            query.include("authorinformation");
            query.include("MyTourArticle");

            var id = $routeParams.id;
            query.get(id).then(function(result){
                $scope.userInformation = result;
                console.log($scope.userInformation);
                var relation = $scope.userInformation.relation("MyTourArticle");
                console.log($scope.userInformation.get('headImage').url())
                return relation.query().find();
            })
            .then(function(articlesList){

                    for(var i = 0;i<articlesList.length;i++) {

                        if (articlesList[i].createdAt) {
                            articlesList[i].startDate = articlesList[i].get('startedAt').toLocaleDateString().replace(/\//gm, ".");
                            console.log(articlesList[i].get('startedAt'));
                        }
                        else {
                            articlesList[i].startDate = "";
                        }
                    }
                        console.log(articlesList);
                    $scope.articles = articlesList;
                    $scope.$apply();

                    indeterminateProgress.end();
                })

        }







    });
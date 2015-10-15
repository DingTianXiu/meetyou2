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

        var query = new AV.Query(Article);
        query.include("relationship");
        query.include("authorinformation");
        query.include("MyTourArticle");

        var id = $routeParams.id;
        query.get(id, {
            success: function (result) {

                if(result.get('authorinformation').get('MyTourArticle').get("startedAt")){
                    result.startDate = result.get("startedAt").toLocaleDateString().replace(/\//gm, ".");
                }
                $scope.articles = result;
                $scope.$apply();
            }
        })





    });
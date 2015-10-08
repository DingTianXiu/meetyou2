/**
 * Created by fengxiaoping on 4/17/15.
 */

function getUrlVars() {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}

AV.initialize("xheu55juaeye1u1e412588pyz37d3luqba7hhjd30btx9mid", "8h1dv6vtcxyh1hmtesqguubhzntl73n1nbjan4dfxd8f09s0");
var Article = AV.Object.extend('Article'),
    RecommendArticle = AV.Object.extend('RecommendArticle'),
    RecommendCollection = AV.Object.extend('RecommendCollection'),
    Collection = AV.Object.extend('Collection');

angular.module("myApp", [])
    .service('leancloud', function leancloud() {
        var ClassDefines = {
            'Article': {attributes: ['title', 'brief']},
            'Collection': {attributes: ['title', 'subtitle']}
        };

        return {
            angularizeAll: function () {
                angular.forEach(ClassDefines, function (classDefine, className) {
                    var classObject = AV.Object.extend(className);
                    angular.forEach(classDefine.attributes, function (attr) {
                        Object.defineProperty(classObject.prototype, attr, {
                            get: function () {
                                return this.get(attr);
                            },
                            set: function (value) {
                                this.set(attr, value);
                            }
                        });
                    })
                })
            }
        }
    })
    .run(function (leancloud) {
        leancloud.angularizeAll();
    })
    .controller("DashboardController", function ($scope) {
        var query = new AV.Query(Article);
        query.find()
            .then(function (articles) {
                $scope.$apply(function () {
                    $scope.articles = articles;
                })
            })

    })
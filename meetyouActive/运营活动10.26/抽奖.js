/**
 * Created by meetyou on 2015/10/27.
 */
angular.module('myApp',[])
    .controller('myCtrl',function($scope){

        $scope.loginShow = false;
        $scope.drawSuccess = false;

        //判断是否登录
        $scope.draw = function(){
            $scope.ifLogin = window.meetyou.isLogin();
            if($scope.ifLogin==null){       //未登录，切换登录界面
                $scope.loginShow = true;

            }else{     //已登录，上传数据
                $scope.userId = AVUser.getCurrentUser().getObjectId();


                $scope.drawSuccess = true;
            }
        }

        //确定键--登录
        $scope.Login = function(){
            window.meetyou.goLogin();
        }

        //取消键返回抽奖页面--不登录
        $scope.cancelLogin = function(){
            $scope.loginShow = false;
        }

        //抽奖成功，点击确定返回抽奖页面
        $scope.success = function(){
            $scope.drawSuccess = false;
        }
    })
/**
 * Created by meetyou on 2015/10/27.
 */
angular.module('myApp',[])
    .controller('myCtrl',function($scope){

        $scope.loginShow = false;
        $scope.drawSuccess = false;

        //�ж��Ƿ��¼
        $scope.draw = function(){
            $scope.ifLogin = window.meetyou.isLogin();
            if($scope.ifLogin==null){       //δ��¼���л���¼����
                $scope.loginShow = true;

            }else{     //�ѵ�¼���ϴ�����
                $scope.userId = AVUser.getCurrentUser().getObjectId();


                $scope.drawSuccess = true;
            }
        }

        //ȷ����--��¼
        $scope.Login = function(){
            window.meetyou.goLogin();
        }

        //ȡ�������س齱ҳ��--����¼
        $scope.cancelLogin = function(){
            $scope.loginShow = false;
        }

        //�齱�ɹ������ȷ�����س齱ҳ��
        $scope.success = function(){
            $scope.drawSuccess = false;
        }
    })
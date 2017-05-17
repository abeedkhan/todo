angular.module('ToDoApp')
    .controller('LogInController' , function($scope , $http , $location){
        $scope.toggleEye = "close";
        $scope.emailValidate = function () {
            if(!$scope.email.length){
                $scope.emailWarning = "Please input an Email";
                $("#email-warning").removeClass("hidden");
                $("#email-correct").addClass("hidden");
            }else{
                $scope.emailWarning = "";
                $("#email-warning").addClass("hidden");
                $("#email-correct").removeClass("hidden");
            }
        };
        $scope.passwordValidate = function () {
            $scope.passwordValidate = function () {
                if(!$scope.password.length){
                    $scope.passwordWorning = "Please Write Your Password";
                    $("#password-warning").removeClass("hidden");
                }else{
                    $scope.passwordWorning = "";
                    $("#password-warning").addClass("hidden");
                }
            }
        };
        $scope.toggleVisibility = function () {
            if($scope.toggleEye == "close"){
                $scope.toggleEye = "open";
                $("input[name='password']").get(0).type = "text";
            }else{
                $scope.toggleEye = "close";
                $("input[name='password']").get(0).type = "password";
            }
        };
        $scope.submit = function () {
            $http.post('api/login' , {email:$scope.email , password:$scope.password}).then(
                function (response) {
                    if(response.data) {
                        $http.get("app/authenticate").then(function (info) {
                            $location.url('/todos')
                        });
                    }
                }
            );
        }
    });
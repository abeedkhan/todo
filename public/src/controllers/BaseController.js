angular.module('ToDoApp')
    .controller('BaseController' , function($scope , User , $location , $route , $http){
        $scope.todoActive = "";
        $scope.userActive = "";
        $scope.goTo = function (page) {
            switch (page){
                case "toDo": $location.url("/todos") ; break;
                case "user": $location.url("/users") ; break;
                default: $location.url("/") ; break;
            }
        }
        $scope.logOutCurrent = function(){
            $http.get("app/logout").then(function (info) {
                $location.url("/")
            });
        }
        $scope.logOutAll = function(){
            var notice = document.getElementById("notice-from-header");
            $http.get("app/logoutall").then(function (info) {});
            var message ='<div class="alert alert-success alert-dismissable fade in">';
            message +='<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>';
            message +='<strong>Success! </strong>Successfully Logged Out From All Other Devices';
            message +='</div>';
            notice.innerHTML = message;
        }
    });
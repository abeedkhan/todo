angular.module('ToDoApp')
    .controller('UsersListController' , function($scope , $controller,  User , $location , $route , $http){
        $controller('BaseController', { $scope: $scope });
        $scope.userActive='active'
        $scope.getUsers = function(callback){
         return User.query(function (data) {
                $scope.users = data;
                $scope.users.disabled = _.where(data , {status:"disabled"});
                $scope.users.invited = _.where(data , {status:"invited"});
                $scope.users.registered = _.where(data , {status:"registered"});
                callback;
            });
        };
        $scope.getUsers(function(){});
        $scope.fields = ['firstName' , 'lastName' , 'email' , 'status' , 'role'];
        $scope.fieldsForSorting = ['firstName' , 'lastName' , 'email' , 'status'];
        $scope.roles = ['user','admin','guest'];
        $scope.userOrder = 'firstName';
        $scope.userRoleUpdate = function( role, userId){
            User.update({id:userId} , {role:role} , function (data) {
                $scope.getUsers(function(){
                    $route.reload();
                });
            });
        }
    });
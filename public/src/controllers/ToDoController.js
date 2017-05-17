angular.module('ToDoApp')
    .controller('ToDoController' , function($scope , $controller ,  Todo , Helpers ,  $location , $route , $http){
      $controller('BaseController', { $scope: $scope });
        $scope.todoActive = 'active';
        $scope.addToDo = function () {
            $location.path('/addTodo');
        };
        $scope.title="";
        $scope.status = "have to";
        $scope.detail="";
        $scope.createToDo = function () {
            $scope.todo = Todo.get({});
            $scope.todo.title = $scope.title;
            $scope.todo.status = $scope.status;
            $scope.todo.detail =  $scope.detail;
            $scope.todo.$save().then(function () {
            $location.path('/todos');
            })
        }
        $scope.deleteAllTodos = function () {
            Helpers.confirm("Are You Sure To Delete All Tasks To Do?" , function(){
                Todo.deleteTodos(function(){
                    $route.reload();
                });
            });
        };
        $scope.editTodo = function (tid) {
            $location.path("/todo/"+tid)
        }
        $scope.deleteSelected = function () {
            var allTodos = document.querySelectorAll(".id-holder");
            var selectedTodos = [];
            allTodos.forEach(function (checkBox, index, all) {
                if(checkBox.checked){
                    selectedTodos.push(Number(checkBox.value))
                }
            });
            if(selectedTodos.length){
                Todo.deletedSelected(selectedTodos , function(){
                    $route.reload();
                });
            }

        }
        $scope.getToDos = function(){
            return Todo.query(function (data) {
                $scope.todos = data;
            });
        };
        $scope.getToDos();
        $scope.sort = function (field) {
            $scope.sort.field = field;
            $scope.sort.order = !$scope.sort.order;
        };
        $scope.sort.field = 'title';
        $scope.sort.order = false;

    })
    .controller('ToDoUpdateController' , function($scope , $controller , $routeParams,  Todo , Helpers ,  $location , $route , $http){
        $controller('BaseController', { $scope: $scope });
        $scope.todoActive = 'active';
        $scope.tid = tid =($routeParams["tid"]);
        $scope.todo = Todo.get({tid:$scope.tid});
        $scope.saveToDo = function () {
            $scope.todo.$save().then(function () {
                $location.path('/todos');
            })
        }
});
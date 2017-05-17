angular.module('ToDoApp' , ['ngRoute' , 'ngResource' , 'ngAnimate' ])
    .config(function ($routeProvider , $locationProvider) {
        $routeProvider
            .when('/todo/:tid' , {
                controller:'ToDoUpdateController',
                templateUrl: 'views/todo-edit.html'
            })
            .when('/todos' , {
                controller:'ToDoController',
                templateUrl: 'views/todo.html'
            })
            .when('/addTodo' , {
                controller:'ToDoController',
                templateUrl: 'views/todo-add.html'
            })
            .when('/users' , {
                controller:'UsersListController',
                templateUrl: 'views/list.html'
            })
            .when('/' , {
                controller:'LogInController',
                templateUrl: 'views/login.html'
            });
        $locationProvider.html5Mode(true);
    });

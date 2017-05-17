angular.module('ToDoApp')
    .factory('User' , function ($resource) {
        return $resource('/api/user/:id' , {id: '@uid'} , {
            'update':{method: 'PUT'}
        });
    })
    .factory('Todo' , function ($resource , $http) {
        var resource = $resource('/api/todo/:tid' , {tid: '@tid'} , {
            'update':{method: 'PUT'}
        });
        resource.deletedSelected = function(selectedTodos , callback){
            $http.post('/api/deleteSelected' ,
                {
                    header:{
                        "Accept":"application/json"
                    },
                    url:"/api/deleteSelected",
                    data: { slectedTodos: selectedTodos }
                }).then(function (response) {
                    callback();
            });
        };
        resource.deleteTodos = function(callback){
            $http.delete("/api/todo").then(function () {
                callback();
            });
        };
        return resource;
    })
    .factory('Helpers' , function () {
        return {
            confirm:function(message , callback){
                bootbox.confirm({
                    message: message,
                    buttons: {
                        confirm: {
                            label: 'Yes',
                            className: 'btn-success'
                        },
                        cancel: {
                            label: 'No',
                            className: 'btn-danger'
                        }
                    },
                    callback: function (result) {
                        if(result){
                            callback();
                        }
                    }
                })
            }
        }
    })
;
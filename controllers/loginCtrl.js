'use strict';
angular.module('controller')
.controller('loginCtrl',[
	'$scope',
	'$state',
	'$http',
	'$q',
	function($scope,$state,$http,$q){
		console.log("This is login");
		$scope.userData={};
		$scope.Login=function(){
			var deferred = $q.defer(); 
			var url="http://120.27.30.105:8080/GaH/v1/login"
			console.log($scope.userData.userName);
			console.log($scope.userData.password);
			var params = {
				userName:$scope.userData.userName,
				password:$scope.userData.password
			}
			var promise = $http({
				url:url,
				method:"GET",
				params:params
			}).success(function (data,status,headers,config) { 
				deferred.resolve(data);  
            })  
            .error(function (data,status,headers,config) {  
                deferred.reject(data);  
            });
            deferred.promise.then(function(data){
            	if (data==1) {
            		$state.go("header.indexpage");
            	}else if(data==0) {
            		$scope.wrongPswd=true;
            	}           	
            },function(err){
            	$scope.wrongPswd=true;
    			console.log(err);
            });
	}
	
}])
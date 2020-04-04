app.controller("judgingCompetitionMaster", function ($scope, $http,$routeParams, $window, $location, constants, SocketService, competitionService, categoryService) {
    $scope.regex = constants.regex;

    SocketService.emit('judgeMasterEnterToCompetition',{userId :$window.sessionStorage.getItem('id'),idComp : $routeParams.idComp})

    let sportsmanQueue;
    let currentCategoryIndex = 0;
    let currentSportsmanIndex = 0;
    getDisplayData()
    function getDisplayData() {
        competitionService.getRegistrationState($routeParams.idComp)
            .then(function (result) {
               sportsmanQueue  = result.data;
               $scope.currentCategory = sportsmanQueue[currentCategoryIndex].category;
               $scope.currentSportsman = sportsmanQueue[currentCategoryIndex].users[currentSportsmanIndex];
               SocketService.emit('setNextSportsman',{ userId :$window.sessionStorage.getItem('id'),idComp: $routeParams.idComp ,sportsman: $scope.currentSportsman,category : $scope.currentCategory })

            }, function (error) {
                console.log(error)
            });
    }

    $scope.nextSportsman=function(){
        currentSportsmanIndex++
        if(!sportsmanQueue[currentCategoryIndex].users[currentSportsmanIndex]) {
            currentSportsmanIndex = 0
            currentCategoryIndex++
        }
        $scope.currentCategory = sportsmanQueue[currentCategoryIndex].category;
        $scope.currentSportsman = sportsmanQueue[currentCategoryIndex].users[currentSportsmanIndex];
        $scope.grade = ''
        SocketService.emit('setNextSportsman',{ userId :$window.sessionStorage.getItem('id') ,idComp: $routeParams.idComp ,sportsman: $scope.currentSportsman,category : $scope.currentCategory })

    }


    $scope.getAgeRange = categoryService.getAgeRange;

});

let app = angular.module('myApp', ["ngRoute", 'ui.bootstrap', 'ngPatternRestrict', 'cp.ngConfirm', 'angularjsToast', 'angular-loading-bar', 'ngAnimate','btford.socket-io','nvd3', 'vAccordion'])
    .config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
        cfpLoadingBarProvider.includeSpinner = true;
        cfpLoadingBarProvider.includeBar = true;
        cfpLoadingBarProvider.parentSelector = '#loading-bar-container';
        cfpLoadingBarProvider.spinnerTemplate = '<div>' +
                                                '<i class="fa fa-spinner fa-pulse"></i>\n' +
                                                '<span>אנא המתן...</span>' +
                                                '</div>';
    }]);

app.service('SocketService', ['socketFactory', function SocketService(socketFactory) {
    return socketFactory({
        ioSocket: io.connect('http://localhost:3000')
    });
}]);

app.controller("mainController", function ($scope, $location, $window, $rootScope, $uibModal) {
    if($window.sessionStorage.getItem('name') != null && $window.sessionStorage.getItem('name')!=='')
        $rootScope.name = $window.sessionStorage.getItem('name');
    if($window.sessionStorage.getItem('access') != null && $window.sessionStorage.getItem('access') != '')
        $rootScope.access = $window.sessionStorage.getItem('access');

    $scope.getClass = function (path) {
        return ("/" + $location.path().split("/")[1] === path) ? 'active' : '';
    };
    $scope.isShowMenuOrFooter = function(){
        return $location.path() !== '/login';
    };
    $scope.isShowLoadingBar = function(){
      return $location.path() !== '/home';
    };

    $rootScope.userTypes = {
        MANAGER: 1,
        COACH: 2,
        SPORTSMAN: 3,
        Judge :4
    };

    $scope.logout = function () {
        //need to delete $rootScope
        $window.sessionStorage.removeItem('name');
        $window.sessionStorage.removeItem('token');
        $rootScope.name = '';
        $rootScope.access = '';
        $location.path('/login');
    }

    $scope.openModalRegisterAdmin = function () {
        $uibModal.open({
            templateUrl: "views/modalView/registerAdminModal.html",
            controller: "registerAdminModalController as rAdminModalCtrl"
        }).result.catch(function () {
        });
    }
});

// config routes
app.config(function($routeProvider) {
    $routeProvider
        .when('/home', {
            templateUrl: 'views/home.html',
            controller: 'homeController as hCtrl'
        })
        .when('/login', {
            templateUrl: 'views/login.html',
            controller: 'loginController as loginCtrl'
        })
        .when('/users/register',{
            templateUrl :'views/addFormsView/registerUser.html',
            controller: 'registerController as chRegCtrl'
        })
        // .when('/calendar', {
        //     templateUrl: 'views/home.html',
        //     controller: 'homeController as hCtrl'
        // })
        .when('/profile', {
            resolve: {
                "check": function ($rootScope, $location, $window) {
                    let id = $window.sessionStorage.getItem("id");
                    if($rootScope.access == $rootScope.userTypes.COACH){
                        $location.path("/profile/coachProfile/" + id);
                    }
                    else if($rootScope.access == $rootScope.userTypes.SPORTSMAN){
                        $location.path("/profile/sportsmanProfile/" + id);
                    }
                    else if($rootScope.access == $rootScope.userTypes.Judge){
                        $location.path("/profile/refereeProfile/" + id)
                    }
                }
            }
        })
        .when('/profile/sportsmanProfile/:id?', {
            templateUrl: 'views/profileView/profilePage.html',
            controller: 'sportsmanProfileController as sportsmanProfileCtrl'
        })
        .when('/profile/coachProfile/:id?', {
            templateUrl: 'views/profileView/profilePage.html',
            controller: 'coachProfileController as coachProfileCtrl'
        })
        .when('/profile/refereeProfile/:id?', {
            templateUrl: 'views/profileView/profilePage.html',
            controller: 'refereeProfileController as refereeProfileCtrl'
        })
        .when('/sportClubs/addSportClub', {
            templateUrl: 'views/addFormsView/addNewClub.html',
            controller: 'addNewClubController as addClubCtrl'
        })
        .when('/sportClubs/sportClubs', {
            templateUrl: 'views/tablesView/clubTable.html',
            controller: 'clubController as clubCtrl'
        })
        .when('/sportClubs/clubProfile/:id?', {
            templateUrl: 'views/profileView/clubProfile.html',
            controller: 'clubProfileController as clubProfileCtrl'
        })
        .when('/users/couches', {
            templateUrl: 'views/tablesView/userTable.html',
            controller: 'coachController as coachCtrl'
        })
        .when('/users/admins', {
            templateUrl: 'views/tablesView/adminTable.html',
            controller: 'adminsTableController as adminsCtrl'
        })
        .when('/users/sportsmen', {
            templateUrl: 'views/tablesView/userTable.html',
            controller: 'sportsmenController as sportsmenCtrl'
        })
        .when('/users/referees', {
            templateUrl: 'views/tablesView/userTable.html',
            controller: 'refereesTableController as hCtrl'
        })
        .when('/competitions/addCompetition', {
            templateUrl: 'views/addFormsView/openCompetition.html',
            controller: 'openCompetitionController as hCtrl'
        })
        .when('/competitions/registerToCompetition', {
            templateUrl: 'views/tablesView/competitionTable.html',
            controller: 'registerToCompetitionController as regCompCtrl'
        })
        .when('/startJudging', {
            templateUrl: 'views/tablesView/competitionsToJudgeTable.html',
            controller: 'competitionsToJudgeController as competitionsToJudgeController'
        })
        .when('/competitions/results', {
            templateUrl: 'views/tablesView/competitionTable.html',
            controller: 'competitionResultsTableController as compResTableCtrl'
        })
        .when('/competitionResults/taullo/:idComp', {
            templateUrl: 'views/competitionResults/competitionResultsTaullo.html',
            controller: 'competitionResultsTaulloController as compResultsTaulloCtrl'
        })
        .when('/competitionResults/sanda/:idComp', {
            templateUrl: 'views/competitionResults/competitionResultsSanda.html',
            controller: 'competitionResultsSandaController as compResultsSandaCtrl'
        })
        .when('/competitions/getCompetitions', {
            templateUrl: 'views/tablesView/competitionTable.html',
            controller: 'competitionTableController as cTCtrl'
        })
        .when('/competitions/RegistrationState/:idCompetition/:date/:status', {
            templateUrl: 'views/competitionRegistrationView/registrationState.html',
            controller: 'registrationStateController as regStateCtrl'
        })
        .when('/events/addEvent', {
            templateUrl: 'views/addFormsView/openCompetition.html',
            controller: 'addEventController as addECtrl'
        })
        .when('/events/events', {
            templateUrl: 'views/tablesView/eventTable.html',
            controller: 'eventTableController as eventtCtrl'
        })
        .when('/events/messages', {
            templateUrl: 'views/tablesView/msgTable.html',
            controller: 'msgTableController as msgtCtrl'
        })
        .when('/sportsmanCompetitionRegistration/:idComp', {
            templateUrl: 'views/competitionRegistrationView/regSportsmanCompetition.html',
            controller: 'regSportsmanCompetitionController as sCompetitionRegCtrl'
        })
        .when('/judgeCompetitionRegistration/:idComp', {
            templateUrl: 'views/competitionRegistrationView/regJudgeCompetition.html',
            controller: 'regJudgeCompetitionController as jCompetitionRegCtrl'
        })
        .when('/judgingCompetitionMaster/:idComp', {
            templateUrl: 'views/competitionJudgingView/judgeCompetition.html',
            controller: 'judgingCompetitionMaster as jCompetitionMaster'
        })
        .when('/judgingCompetitionSimple/:idComp', {
            templateUrl: 'views/competitionJudgingView/judgeCompetition.html',
            controller: 'judgingCompetitionSimple as jCompetitionSimple'
        })
        .when('/waitingForCompetitionHost/:idComp', {
            templateUrl: 'views/loadingView/loading.html',
            controller: 'waitingForCompetitionHost as waitingForCompetitionHost'
        })
        .when('/waitingForTheNextSportsman/:idComp/:preSportsman', {
            templateUrl: 'views/loadingView/loading.html',
            controller: 'waitingForTheNextSportsman as waitingForTheNextSportsman'
        })
        .when('/wushuTree', {
            templateUrl: 'views/wushuTree.html',
            controller: 'wushuTree as wushuTreeController'
        })
        .otherwise({redirectTo: '/login'});
});

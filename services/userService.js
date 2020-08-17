/**
 * This service contains calls for endpoint for the user entity
 */

app.service('userService', function($window, $http, constants) {
    this.deleteProfile =function (data) {
        var req = {
            method: 'POST',
            url: constants.serverUrl + '/private/commonCoachManager/deleteSportsmanProfile',
            headers: {
                'x-auth-token': $window.sessionStorage.getItem('token')
            },
            data: data
        };
        return $http(req);
    }
});






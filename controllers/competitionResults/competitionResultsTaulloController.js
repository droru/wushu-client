app.controller("competitionResultsTaulloController", function ($scope, $http, $routeParams, $route, $window, $location, excelService,constants, SocketService, competitionService, toastNotificationService) {
    console.log("heree")
    getDisplayData()
    function getDisplayData() {
        competitionService.getResultCompetition($routeParams.idComp)
            .then(function (result) {
                $scope.compResults = result.data;
            }, function (error) {
                console.log(error);
            })
    }


 //Excel section -------------------------------------------------------------------------------------------------------

    let downloadExcelLinkCoachAsJudge = document.getElementById("downExcelResultCompetition");
    let dropZoneUploadCompetitionGrades = document.getElementById("dropZoneUploadCompetitionGrades");

    $scope.downloadExcelResultCompetition = function () {
        let token = $window.sessionStorage.getItem('token')
        let url = constants.serverUrl + '/downloadExcelFormatUpdateCompetitionResults/' + token+"/"+$routeParams.idComp;
        downloadExcelLinkCoachAsJudge.setAttribute('href', url);
        downloadExcelLinkCoachAsJudge.click();
    };


    dropZoneUploadCompetitionGrades.ondragover = function () {
        this.className = 'dropzone dragover';
        return false;
    };
    dropZoneUploadCompetitionGrades.ondragleave = function () {
        this.className = 'dropzone';
        return false;
    };
    dropZoneUploadCompetitionGrades.ondrop = function (e) {
        excelService.dropZoneDropFile(e, function (res) {
            changeDropZone(res.fileName);
            res.result.shift();
            uploadCompetitionGrades(res.result)
        })
    };

    function changeDropZone(name) {
        let nameArray = name.toString().split("\\");
        $scope.filename = nameArray[nameArray.length - 1];
        $scope.isDropped = true;
        dropZoneUploadCompetitionGrades.className = "dropzoneExcel"
    }

    $scope.BrowseFileClick = function () {
        let fileinput = document.getElementById("fileCompetitionUploadGrade");
        fileinput.click();
        fileinput.onchange = function (event) {
            excelService.uploadExcel(event, function (res) {
                changeDropZone(event.target.value.toString());
                res.shift();
                uploadCompetitionGrades(res)
            })
        };
    }

    function uploadCompetitionGrades(data) {
        let uploadData = {
            sportsman :data,
            idComp : $routeParams.idComp
        }
        competitionService.updateGradeCompetition(uploadData)
            .then((results) => {
                toastNotificationService.successNotification("ציונים הועלו בהצלחה");
                $route.reload();
            })
            .catch((err) => {
                toastNotificationService.errorNotification("ארעה שגיאה בעת העלאת הציונים")
                console.log(err);
                if (!err.data.message)
                    $scope.excelErrors = err.data;
            })
    }
    $scope.uploadNewFile = function () {
        $scope.excelErrors = [];
        $scope.isDropped = false;
        dropZoneUploadCompetitionGrades.className = "dropzone"
        document.getElementById("fileCompetitionUploadGrade").value = "";
    };
});

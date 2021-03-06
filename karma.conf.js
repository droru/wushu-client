// Karma configuration
// Generated on Fri Nov 01 2019 13:29:27 GMT+0200 (Israel Standard Time)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
        //loads
        'https://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js',
        './node_modules/angular/angular.js',
        './node_modules/angular-ui-router/release/angular-ui-router.js',
        './node_modules/angular-mocks/angular-mocks.js',
        './node_modules/angular-route/angular-route.js',
        './node_modules/angular-animate/angular-animate.js',
        './node_modules/angular-sanitize/angular-sanitize.js',
        './node_modules/angularjs-toast/angularjs-toast.min.js',
        './node_modules/angular-loading-bar/build/loading-bar.min.js',
        './node_modules/angular-socket-io/socket.min.js',
        './node_modules/angular-nvd3/dist/angular-nvd3.js',
        './node_modules/v-accordion/dist/v-accordion.js',
        'https://cdn.rawgit.com/angular-ui/bootstrap/gh-pages/ui-bootstrap-tpls-2.5.0.js',
        'https://cdn.rawgit.com/AlphaGit/ng-pattern-restrict/master/src/ng-pattern-restrict.min.js',
        './css/confirm/angular-confirm.js',
        './app.js',
        './services/confirmDialogsService.js',
        './services/toastNotificationService.js',
        './constants.js',

        //files to test
        './services/sportsmanService.js',
        './services/registerService.js',
        './services/pagingService.js',
        './services/competitionService.js',
        './services/commonFunctionsService.js',
        './services/categoryService.js',
        'controllers/competitionRegistration/registrationStateController.js',
        './filters/categoryBySportsmanFilter.js',
        './filters/coachByClubFilter.js',
        './filters/sportsmanByClubFilter.js',
        './filters/fromMapFilter.js',

        //test files
        'tests/services/sportsmanServiceTest.spec.js',
        'tests/services/registerServiceTest.js',
        'tests/services/pagingServiceTest.js',
        'tests/services/competitionServiceTest.js',
        'tests/services/commonFunctionsServiceTests.js',
        'tests/services/categoryServiceTest.js',
        'controllers/competitionRegistration/tests/registrationStateControllerTest.js',
        'tests/filters/categoryBySportsmanFilterTest.js',
        'tests/filters/coachByClubFilterTest.js',
        'tests/filters/sportsmanByClubFilterTest.js',
        'tests/filters/fromMapFilterTest.js'
    ],


    // list of files / patterns to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}

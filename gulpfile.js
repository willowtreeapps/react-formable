const gulp = require('gulp');
const initGulpTasks = require('react-component-gulp-tasks');

initGulpTasks(gulp, {
    component: {
        name: 'formable',
        dependencies: [
            'react',
            'react-dom',
            'react-router',
            'history'
        ],
        lib: 'lib'
    },

    example: {
        src: 'example/src',
        dist: 'example/dist',
        files: [
            'index.html',
            '.gitignore',
            'imgs/*'
        ],
        scripts: [
            'app.js'
        ],
        less: [
            'app.less'
        ]
    }
});

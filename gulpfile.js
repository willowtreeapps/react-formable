const gulp = require('gulp');
const initGulpTasks = require('react-component-gulp-tasks');

initGulpTasks(gulp, {
    component: {
        name: 'reform',
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
            '.gitignore'
        ],
        scripts: [
            'example.js'
        ],
        less: [
            'example.less'
        ]
    }
});

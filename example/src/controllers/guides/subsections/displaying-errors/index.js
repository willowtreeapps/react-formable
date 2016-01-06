/*eslint prefer-template:0*/
export const title = 'Displaying Errors';
export const link = 'display-errors';
export const content = [
    require('fs').readFileSync(__dirname + '/description.md', 'utf8')
];

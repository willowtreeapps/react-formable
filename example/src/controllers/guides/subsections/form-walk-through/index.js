/*eslint prefer-template:0*/
export const title = 'Form Walk Through';
export const link = 'form-walk-through';
export const content = [
    require('fs').readFileSync(__dirname + '/description.md', 'utf8')
];

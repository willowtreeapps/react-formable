const tsc = require('typescript');
const babel = require('babel-core');

module.exports = {
    process: function(src, path) {
        if (path.endsWith('.js')) {
            return babel.transform(src, {
                filename: path,
                presets: ['es2015', 'react'],
                retainLines: true,
                compact: false
            }).code;
        }

        if (path.endsWith('.ts') || path.endsWith('.tsx')) {
            return tsc.transpile(
                src,
                {
                    module: tsc.ModuleKind.CommonJS,
                    jsx: tsc.JsxEmit.React
                },
                path,
                []
            );
        }

        return src;
    }
};

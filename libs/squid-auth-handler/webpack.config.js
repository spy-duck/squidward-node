module.exports = function(options) {
    return {
        ...options,
        target: 'node16',
        output: {
            ...options.output,
            libraryTarget: 'commonjs2',
        }
    };
};
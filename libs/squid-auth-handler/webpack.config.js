module.exports = function(options) {
    console.log(options);
    return {
        ...options,
        target: 'node16',
        output: {
            ...options.output,
            libraryTarget: 'commonjs2',
        }
    };
};
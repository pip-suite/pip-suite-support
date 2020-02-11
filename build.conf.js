module.exports = {
    module: {
        name: 'pipSupport',
        styles: 'index',
        export: 'pip.support',
        standalone: 'pip.support'
    },
    build: {
        js: false,
        ts: false,
        tsd: true,
        bundle: true,
        html: true,
        sass: true,
        lib: true,
        images: true,
        dist: false
    },
    file: {
        lib: [
            '../node_modules/pip-webui-all/dist/**/*',
            '../pip-suite-rest/dist/**/*',
            '../pip-suite-entry/dist/**/*',
            '../pip-suite-guidance/dist/**/*'
        ]
    },
    samples: {
        port: 8180,
        https: false
    },
    api: {
        port: 8181
    }
};

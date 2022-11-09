// import { plugins } from "../config/plugins"

export const server = (done) => {
    app.plugins.browsersync.init ({
        server: {
            baseDir: `${app.path.build.html}`  // папка с результатом откуда запускаем browsersync
        },
        notify: false,
        port: 3000
    })
}
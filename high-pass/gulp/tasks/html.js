import fileInclude from "gulp-file-include"
import webpHtmlNosvg from "gulp-webp-html-nosvg"   // webp картинки 
import versionNumber from  "gulp-version-number"  //отключаем кеширование в браузере

//Путь к файлам с исходниками 
export const html = () => {
    return app.gulp.src(app.path.src.html)   // получили файлы
        .pipe(app.plugins.plumber(
        app.plugins.notify.onError({
            title: "HTML",
            message: "Error: <%= error.message %>"
        }))
        )
        .pipe(fileInclude())  // соединяем include
        .pipe(app.plugins.replace(/@img\//g, 'img/'))
        .pipe(
            app.plugins.if(
                app.isBuild,
                webpHtmlNosvg())
            )
        .pipe(
            app.plugins.if(
                app.isBuild,
                versionNumber({
                    'value' : '%DT%',
                    'append' : {
                        'key' : '_v',
                        'cover' : 0,
                        'to' : [
                            'css',
                            'js',
                        ]
                    },
                    'output' : {
                        'file' : 'gulp/version.json'
                    }
                })          
            )
            )
        .pipe(app.gulp.dest(app.path.build.html)) // перенесли файлы 
        .pipe(app.plugins.browsersync.stream())  // обновления browsersync в live режиме
}
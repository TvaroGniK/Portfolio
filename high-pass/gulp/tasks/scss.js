import dartSass from 'sass'; // препроцессор sass
import gulpSass from 'gulp-sass' 
import rename from 'gulp-rename'  //переименовать из scss в css

import cleanCss from 'gulp-clean-css'; //сжатие css файла
import webpcss from 'gulp-webpcss'; //вывод изображений webp
import autoprefixer from 'gulp-autoprefixer'; //добавление вендорных префиксов
import groupCssMediaQueries from 'gulp-group-css-media-queries'; //группировка медиа запросов

const sass = gulpSass(dartSass);

export const scss = () => {
    return app.gulp.src(app.path.src.scss, { sourcemaps: app.isDev })
    .pipe(app.plugins.plumber(
        app.plugins.notify.onError({
            title: "SCSS",
            message: "Error: <%= error.message %>"
        })))
    .pipe(app.plugins.replace(/@img\//g, '../img/'))
    .pipe(sass({
        outputStyle: 'expanded' //изначальный стиль готового файла 
    }))
    .pipe(
        app.plugins.if(
            app.isBuild,
            groupCssMediaQueries()
        )
    )
    .pipe(
        app.plugins.if(
            app.isBuild,
            webpcss ({
                    webpClass: ".webp",
                    noWebpClass: ".no-webp"
                })
        )
    )
    .pipe(
        app.plugins.if(
            app.isBuild,
            autoprefixer({
                grid: true,
                overrideBrowserslist: ["last 3 version"],
                cascade: true
            })
        )
    )

    // .pipe(groupCssMediaQueries())
    // .pipe(webpcss (
    //     {
    //         webpClass: ".webp",
    //         noWebpClass: ".no-webp"
    //     }
    // ))
    // .pipe(autoprefixer({
    //     grid: true,
    //     overrideBrowserslist: ["last 3 version"],
    //     cascade: true
    // }))

    .pipe(app.gulp.dest(app.path.build.css))  // не сжатый дубль фалйа стилей, можно закомментировать
    .pipe(
        app.plugins.if(
            app.isBuild,
            cleanCss()
        )
    )
    // .pipe(cleanCss())
    .pipe(rename ({
        extname: ".min.css"
    }))
    .pipe(app.gulp.dest(app.path.build.css))
    .pipe(app.plugins.browsersync.stream())
}

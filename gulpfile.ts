import * as gulp from "gulp";
import * as sass from "gulp-sass";
import * as plumber from "gulp-plumber";
import * as prefix from "gulp-autoprefixer";
import * as nodemon from "gulp-nodemon";
import * as chalk from "chalk";
const livereload = require("gulp-livereload"); // to disable error


const options = {
    pug: {
        "pretty": true
    },

    styles: {
        style: { outputStyle: "expanded" },
        src: "public/stylesheets/*.scss",
        prefixer: {
            browsers: ["last 10 versions"],
            cascade: false
        },
    }
};

gulp.task("nodemon", () => {
    livereload.listen();
    return nodemon({
        script: "server.ts",
        ext: "ts pug css",
        execMap: {
            "ts": "ts-node"
        }
    }).on("restart", () => {

        setTimeout(() => {
            livereload.changed("server.ts");

            gulp.src("server.ts", () => {
                console.log((chalk.green("Reloading the page... ;)")));
            });
        }, 700);

    });

})
gulp.task("styles", () => {
    let opt = options.styles;
    gulp.src(opt.src).
        pipe(sass(options.styles.style).on("error", sass.logError)).
        pipe(prefix(opt.prefixer)).
        pipe(gulp.dest("public/stylesheets"));

});

gulp.task("watch", () => {
    gulp.watch("public/stylesheets/*.scss", ["styles"]);

});


gulp.task("default", ["styles", "nodemon", "watch"]);

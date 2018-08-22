var compilerFactory = require('shaman-website-compiler').ShamanWebsiteCompilerFactory;
var nodePath = require('path');

module.exports.initialize = function(app) {
    app.use('/', function(req, res, next) {
        if (req.method == 'GET') {
            // 15 DAY CACHE
            res.header("Cache-Control", "public, max-age=1296000000");
            res.header("Expires", new Date(Date.now() + 1296000000).toUTCString());
        }
        next();
    });
    var compiler = compilerFactory({
        cwd: nodePath.join(__dirname, '..'),
        partials: [ "views/**/*.partial.html" ],
        pages: [ "views/**/*.html", "!views/**/*.partial.html" ],
        scripts: [""],
        styles: [ "" ],
        defaults: {
            title: "Burrito Express - Delicious",
            description: "Home site for Burito Express of Dayton, OH.  Were we serve delicious beef barbacoa, pork carnitas, chicken tinga, grilled chicken, and steak burritos.",
            twitter_user: "@hmcervantes"
        },
        isProd: !!process.env.PROD_FLAG,
        wwwRoot: 'views/',
        noHtmlSuffix: true,
        autoWatch: !process.env.PROD_FLAG
    });
    return compiler.compile(app);
}
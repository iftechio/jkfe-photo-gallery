const fs = require("fs");
const shell = require("shelljs");
const axios = require("axios");
const gulp = require("gulp");
const qiniu = require("gulp-qiniu");
const log = require("fancy-log");

// configs
const DEPLOY_SOURCE = "dist/**";
const DEPLOY_OUTPUT = "jkfe-picture-log";
const UPLOAD_SOURCE = "dist";
const QINIU_ACCESSKEY = "tYFesWPbj5p3ibOmadXn_p7hnxGkpmTNm_isdTEF";
const QINIU_SECRETKEY = "DTksh3gqDnR1phADCUp8jsZw0QLAiujZFDX04rw1";
const SECRET = "SyKH-E8ZX";

gulp.task("cdn", () =>
  gulp.src(DEPLOY_SOURCE).pipe(
    qiniu(
      {
        accessKey: QINIU_ACCESSKEY,
        secretKey: QINIU_SECRETKEY,
        bucket: "jike",
        private: false
      },
      {
        dir: `${DEPLOY_OUTPUT}/`,
        versioning: false,
        concurrent: 10
      }
    )
  )
);

gulp.task("upload", () => {
  const files = {};
  const config = JSON.parse(fs.readFileSync("./app.json", "utf-8"));
  const branch = shell.exec("git rev-parse --abbrev-ref HEAD");
  const hash = shell.exec("git rev-parse --short HEAD");
  if (branch.code !== 0 || hash.code !== 0) {
    log.error(branch.stderr + hash.stderr);
    return;
  }

  fs.readdir(UPLOAD_SOURCE, (e, result) => {
    result.forEach(file => {
      if (/\.html$/.test(file)) {
        const path = file.split(".")[0];
        const data = fs.readFileSync(`${UPLOAD_SOURCE}/${file}`, "utf-8");
        files[path] = data;
      }
    });
    axios
      .post("https://fedpy.ruguoapp.com/dpy/image/create", {
        ...config,
        files,
        secret: SECRET,
        version: `${branch.stdout}-${hash.stdout}`
      })
      .then(() => {
        log("上传成功");
      })
      .catch(e => {
        log.error(e);
      });
  });
});

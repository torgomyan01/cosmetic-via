const sass = require('sass');
const fs = require('fs');

function compileScssOnSave(scssPath, cssPath) {
  // Watch the SCSS file for changes
  fs.watchFile(scssPath, { interval: 500 }, (curr, prev) => {
    if (curr.mtime !== prev.mtime) {
      try {
        const result = sass.compile(scssPath);
        fs.writeFileSync(cssPath, result.css);
        console.log(`SCSS compiled: ${scssPath} -> ${cssPath}`);
      } catch (err) {
        console.error('SCSS compilation error:', err);
      }
    }
  });
}

// Usage:
compileScssOnSave('css/style.scss', 'css/style.css');

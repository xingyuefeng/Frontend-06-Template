var Generator = require('yeoman-generator');


module.exports = class extends Generator {
  // The name `constructor` is important here
  constructor(args, opts) {
    // Calling the super constructor is important so our generator is correctly set up
    super(args, opts);

    // Next, add your custom code
    this.option('babel'); // This method adds support for a `--babel` flag
  }

  writing() {
    this.fs.copyTpl(
      this.templatePath('babel.config.json'),
      this.destinationPath('babel.config.json'),
    );
    this.fs.copyTpl(
      this.templatePath('webpack.config.js'),
      this.destinationPath('webpack.config.js'),
    );
    this.fs.copyTpl(
      this.templatePath('index.jsx'),
      this.destinationPath('src/index.jsx'),
    );
    this.fs.copyTpl(
      this.templatePath('index.html'),
      this.destinationPath('assets/index.html'),
    );
  }

  install() {
    const pkgJson = {
      "name": "JSX",
      "version": "1.0.0",
      "description": "",
      "main": "index.js",
      "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1",
        "build": "webpack",
        "start": "webpack serve --open"
      },
      "keywords": [],
      "author": "",
      "license": "ISC",
      "devDependencies": {
        "@babel/core": "^7.12.10",
        "@babel/preset-env": "^7.12.11",
        "@babel/preset-react": "^7.12.10",
        "babel-loader": "^8.2.2",
        "clean-webpack-plugin": "^3.0.0",
        "css-loader": "^5.0.1",
        "html-webpack-plugin": "^4.5.1",
        "style-loader": "^2.0.0",
        "webpack": "^5.19.0",
        "webpack-cli": "^4.4.0",
        "webpack-dev-server": "^3.11.2"
      }
    }
    

    // Extend or create package.json file in destination path
    this.fs.extendJSON(this.destinationPath('package.json'), pkgJson);
    this.npmInstall(['react', 'react-dom'], { 'save-dev': true });
  }


};
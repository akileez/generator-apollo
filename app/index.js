'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var shell = require('shelljs');


var ApolloGenerator = yeoman.generators.Base.extend({
  init: function () {
    this.pkg = yeoman.file.readJSON(path.join(__dirname, '../package.json'));

    this.on('end', function () {
      if (this.options['install']) {
        shell.exec('npm link bower');
        shell.exec('npm link less');
        shell.exec('npm link coffee-script');
        shell.exec('npm link to');
        this.installDependencies({
          callback: function () {
            shell.exec('grunt bowercopy');
            shell.exec('grunt initialize');
          }
        });
      }
      if (this.options['init']) {
        this.installDependencies({
          callback: function () {
            shell.exec('grunt bowercopy');
            shell.exec('grunt initialize');
          }
        });
      }
      if (!this.options['init'] || !this.options['install']) {
        return;
      }
    });
  },

  askFor: function () {
    var done = this.async();

    // have Yeoman greet the user
    if (this.options['welcome']) {
      console.log(this.yeoman);
    }

    // replace it with a short and sweet description of your generator
    console.log(chalk.magenta('You\'re using the fantastic Apollo generator.'));

    var prompts = [
      // {
      //   type: 'confirm',
      //   name: 'someOption',
      //   message: 'Would you like to enable this option?',
      //   default: true
      // },
      {
        type: 'input',
        name: 'projName',
        message: 'What is the name of the project?',
        default: this.appname
      },
      {
        type: 'input',
        name: 'projVers',
        message: 'What is the version of the project?',
        default: '0.0.1'
      },
      {
        type: 'input',
        name: 'projDesc',
        message: 'Give a description for the project:',
        default: 'The best project ever.'
      },
      {
        type: 'input',
        name: 'projHome',
        message: 'Give a web address for the project:',
        default: 'akileez.github.io'
      },
      {
        type: 'input',
        name: 'gituser',
        message: 'Github login:',
        default: 'akileez'
      },
      {
        type: 'input',
        name: 'authorName',
        message: 'Your Name:',
        default: this.pkg.author.name
      },
      {
        type: 'input',
        name: 'authorURL',
        message: 'Your Homepage:',
        default: this.pkg.author.url
      },
      {
        type: 'input',
        name: 'authorTwit',
        message: 'Twitter Address:',
        default: this.pkg.author.twitter
      }
    ];

    this.prompt(prompts, function (props) {
      // this.someOption = props.someOption;
      this.projName   = props.projName;
      this.projVers   = props.projVers;
      this.projDesc   = props.projDesc;
      this.projHome   = props.projHome;
      this.gituser    = props.gituser;
      this.authorName = props.authorName;
      this.authorURL  = props.authorURL;
      this.authorTwit = props.authorTwit;

      done();
    }.bind(this));
  },

  app: function () {
    this.directory('app', 'app');
    this.directory('grunt', 'grunt');
    this.directory('temp', 'temp');
    this.mkdir('build');
    this.mkdir('build/dev');
    this.mkdir('build/dist');
    this.mkdir('build/stage');
    this.mkdir('test');
    this.mkdir('test/expected');
    this.mkdir('test/fixtures');

  },

  root: function () {
    if (this.options['install']) {
      this.template('_package.json', 'package.json');
    } else {
      this.template('_package2.json', 'package.json');
    }

    this.template('_bower.json', 'bower.json');

    this.copy('Gruntfile.coffee', 'Gruntfile.coffee');
    this.copy('bowerrc', '.bowerrc');
    this.copy('gitignore', '.gitignore');
    this.copy('editorconfig', '.editorconfig');
    this.copy('jshintrc', '.jshintrc');
  }
});

module.exports = ApolloGenerator;
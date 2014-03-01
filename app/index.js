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
      if (this.options['link']) {
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
      if (this.options['install']) {
        this.installDependencies({
          callback: function () {
            shell.exec('grunt bowercopy');
            shell.exec('grunt initialize');
          }
        });
      }
      if (!this.options['link'] || !this.options['install']) {
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

    if (this.options['link']) {
      var prompts = [
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
          name: 'projTmpl',
          message: 'Generate demo blog and articles? (true|false)',
          default: false
        }
      ];
    } else {
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
        },
        {
          type: 'input',
          name: 'projTmpl',
          message: 'Generate demo blog and articles? (true|false)',
          default: false
        }
      ];
    }



    this.prompt(prompts, function (props) {
      // this.someOption = props.someOption;
      this.projName   = props.projName;
      this.projVers   = props.projVers;
      this.projDesc   = props.projDesc;
      this.projHome   = props.projHome;
      this.projTmpl   = props.projTmpl;
      this.gituser    = props.gituser || 'akileez';
      this.authorName = props.authorName || this.pkg.author.name;
      this.authorURL  = props.authorURL || this.pkg.author.url;
      this.authorTwit = props.authorTwit || this.pkg.author.twitter;

      done();
    }.bind(this));
  },

  app: function () {
    this.directory('app', 'app');
    this.directory('grunt', 'grunt');
    this.directory('temp', 'temp');

    // Project folders
    this.mkdir('app/assemble/config/content');
    this.mkdir('app/assemble/data/content');
    this.mkdir('app/assemble/data/manifests');
    this.mkdir('app/assemble/data/metadata');
    this.mkdir('app/assemble/data/support');
    this.mkdir('app/assemble/partials/includes/cubes');
    this.mkdir('app/assemble/plugins/content/markdown');
    this.mkdir('app/assemble/plugins/content/views');
    this.mkdir('app/assets/data');
    this.mkdir('app/assets/fonts');
    this.mkdir('app/assets/ico');
    this.mkdir('app/assets/pdf');
    this.mkdir('app/assets/php');
    this.mkdir('app/scripts/coffee');
    this.mkdir('app/scripts/js/jquery');
    this.mkdir('app/scripts/js/jquery/bootstrap');
    this.mkdir('app/scripts/js/jquery/plugins');
    this.mkdir('app/scripts/js/views/custom');
    this.mkdir('app/scripts/js/views/snippets');
    this.mkdir('app/scripts/js/views/sources');
    this.mkdir('app/scripts/js/views/vendor');
    this.mkdir('app/styles/config');
    this.mkdir('app/styles/css/views');
    this.mkdir('app/styles/less/bootstrap');
    this.mkdir('build');
    this.mkdir('build/dev');
    this.mkdir('build/dist');
    this.mkdir('build/stage');
    this.mkdir('temp/convert');
    this.mkdir('temp/convert/js2coffee');
    this.mkdir('temp/convert/json');
    this.mkdir('temp/readme/proj');
    this.mkdir('temp/tree');
    this.mkdir('test');
    this.mkdir('test/expected');
    this.mkdir('test/fixtures');

  },

  templates: function () {
    this.template('blog/posts/post001.hbs', 'app/assemble/templates/blog/posts/post001.hbs');
    this.template('blog/posts/post002.hbs', 'app/assemble/templates/blog/posts/post002.hbs');
    this.template('blog/posts/post003.hbs', 'app/assemble/templates/blog/posts/post003.hbs');
    this.template('blog/posts/post004.hbs', 'app/assemble/templates/blog/posts/post004.hbs');
    this.template('blog/posts/post005.hbs', 'app/assemble/templates/blog/posts/post005.hbs');
    this.template('blog/posts/post006.hbs', 'app/assemble/templates/blog/posts/post006.hbs');
    this.template('blog/index.hbs', 'app/assemble/templates/blog/index.hbs');
    this.template('blog/index2.hbs', 'app/assemble/templates/blog/index2.hbs');
    this.template('blog/index3.hbs', 'app/assemble/templates/blog/index3.hbs');
    this.template('articles/article.hbs', 'app/assemble/templates/views/articles/article.hbs');
    this.template('articles/article2.hbs', 'app/assemble/templates/views/articles/article2.hbs');
    this.template('articles/article3.hbs', 'app/assemble/templates/views/articles/article3.hbs');
    this.template('articles/article4.hbs', 'app/assemble/templates/views/articles/article4.hbs');
    this.template('articles/article5.hbs', 'app/assemble/templates/views/articles/article5.hbs');
    this.template('articles/article6.hbs', 'app/assemble/templates/views/articles/article6.hbs');
  },

  root: function () {
    if (this.options['link']) {
      this.template('_package.json', 'package.json');
    } else {
      this.template('_package2.json', 'package.json');
    }

    this.template('_bower.json', 'bower.json');

    this.copy('Gruntfile.coffee', 'Gruntfile.coffee');
    this.copy('bowerrc', '.bowerrc');
    this.copy('gitignore', '.gitignore');
    this.copy('editorconfig', '.editorconfig');
  }
});

module.exports = ApolloGenerator;
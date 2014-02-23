'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');


var ApolloGenerator = yeoman.generators.Base.extend({
  init: function () {
    this.pkg = yeoman.file.readJSON(path.join(__dirname, '../package.json'));

    this.on('end', function () {
      if (!this.options['skip-install']) {
        this.npmInstall();
      }
    });
  },

  askFor: function () {
    var done = this.async();

    // have Yeoman greet the user
    console.log(this.yeoman);

    // replace it with a short and sweet description of your generator
    console.log(chalk.magenta('You\'re using the fantastic Apollo generator.'));

    var prompts = [
      {
        type: 'confirm',
        name: 'someOption',
        message: 'Would you like to enable this option?',
        default: true
      },
      {
        name: 'projName',
        message: 'What is the name of the project?'
      }
    ];

    this.prompt(prompts, function (props) {
      this.someOption = props.someOption;

      done();
    }.bind(this));
  },

  app: function () {
    this.mkdir('app');
    this.mkdir('app/assemble');
    this.mkdir('app/assemble/config');
    this.mkdir('app/assemble/config/_grunt');
    this.mkdir('app/assemble/config/content');
    this.mkdir('app/assemble/config/metadata');
    this.mkdir('app/assemble/config/support');
    this.mkdir('app/assemble/data');
    this.mkdir('app/assemble/data/content');
    this.mkdir('app/assemble/data/manifests');
    this.mkdir('app/assemble/data/metadata');
    this.mkdir('app/assemble/data/support');
    this.mkdir('app/assemble/helpers');
    this.mkdir('app/assemble/helpers/bootsrap');
    this.mkdir('app/assemble/helpers/html');
    this.mkdir('app/assemble/helpers/lib');
    this.mkdir('app/assemble/helpers/utils');
    this.mkdir('app/assemble/helpers/vendor');
    this.mkdir('app/assemble/partials');
    this.mkdir('app/assemble/partials/_layouts');
    this.mkdir('app/assemble/partials/_sections');
    this.mkdir('app/assemble/partials/_sections/_foot');
    this.mkdir('app/assemble/partials/_sections/_head');
    this.mkdir('app/assemble/partials/_sections/_nav');
    this.mkdir('app/assemble/partials/_sections/footer');
    this.mkdir('app/assemble/partials/_sections/header');
    this.mkdir('app/assemble/includes');
    this.mkdir('app/assemble/includes/blocks');
    this.mkdir('app/assemble/includes/bricks');
    this.mkdir('app/assemble/includes/cubes');
    this.mkdir('app/assemble/plugins');
    this.mkdir('app/assemble/plugins/components');
    this.mkdir('app/assemble/plugins/components/aside');
    this.mkdir('app/assemble/plugins/components/blog');
    this.mkdir('app/assemble/plugins/components/forms');
    this.mkdir('app/assemble/plugins/components/lists');
    this.mkdir('app/assemble/plugins/components/modals');
    this.mkdir('app/assemble/plugins/components/panels');
    this.mkdir('app/assemble/plugins/components/sliders');
    this.mkdir('app/assemble/plugins/components/social');
    this.mkdir('app/assemble/plugins/components/style');
    this.mkdir('app/assemble/plugins/components/tables');
    this.mkdir('app/assemble/plugins/components/tabs');
    this.mkdir('app/assemble/plugins/composites');
    this.mkdir('app/assemble/plugins/composites/headers');
    this.mkdir('app/assemble/plugins/composites/utils');
    this.mkdir('app/assemble/plugins/content');
    this.mkdir('app/assemble/plugins/content/markdown');
    this.mkdir('app/assemble/plugins/content/matter');
    this.mkdir('app/assemble/plugins/content/templates');
    this.mkdir('app/assemble/plugins/content/views');
    this.mkdir('app/assemble/templates');
    this.mkdir('app/assemble/templates/blog');
    this.mkdir('app/assemble/templates/blog/posts');
    this.mkdir('app/assemble/templates/error');
    this.mkdir('app/assemble/templates/site');
    this.mkdir('app/assemble/templates/sitemap');
    this.mkdir('app/assemble/templates/styleguide');
    this.mkdir('app/assemble/templates/views');
    this.mkdir('app/assemble/templates/views/articles');
    this.mkdir('app/assemble/templates/views/docs');
    this.mkdir('app/assets');
    this.mkdir('app/assets/data');
    this.mkdir('app/assets/fonts');
    this.mkdir('app/assets/ico');
    this.mkdir('app/assets/img');
    this.mkdir('app/assets/pdf');
    this.mkdir('app/assets/php');
    this.mkdir('app/scripts');
    this.mkdir('app/scripts/coffee');
    this.mkdir('app/scripts/js');
    this.mkdir('app/scripts/js/development');
    this.mkdir('app/scripts/js/development/custom');
    this.mkdir('app/scripts/js/development/fuelux');
    this.mkdir('app/scripts/js/development/plugins');
    this.mkdir('app/scripts/js/development/snippets');
    this.mkdir('app/scripts/js/development/sources');
    this.mkdir('app/scripts/js/development/vendor');
    this.mkdir('app/scripts/js/jquery');
    this.mkdir('app/scripts/js/jquery/bootstrap');
    this.mkdir('app/scripts/js/jquery/plugins');
    this.mkdir('app/scripts/js/views');
    this.mkdir('app/scripts/js/views/custom');
    this.mkdir('app/scripts/js/views/snippets');
    this.mkdir('app/scripts/js/views/sources');
    this.mkdir('app/scripts/js/views/vendor');
    this.mkdir('app/styles');
    this.mkdir('app/styles/config');
    this.mkdir('app/styles/css');
    this.mkdir('app/styles/css/development');
    this.mkdir('app/styles/css/views');
    this.mkdir('app/styles/less');
    this.mkdir('app/styles/less/bootstrap');
    this.mkdir('app/styles/less/components');
    this.mkdir('app/styles/less/framework');
    this.mkdir('app/styles/less/overrides');
    this.mkdir('app/styles/less/settings');
    this.mkdir('app/styles/less/theme');
    this.mkdir('app/styles/less/utilities');
    this.mkdir('app/styles/less/vendor');
    this.mkdir('app/styles/less/');
    this.mkdir('build');
    this.mkdir('build/dev');
    this.mkdir('build/dist');
    this.mkdir('build/stage');
    this.mkdir('grunt');
    this.mkdir('grunt/config');
    this.mkdir('grunt/custom');
    this.mkdir('grunt/custom/lib');
    this.mkdir('grunt/environment');
    this.mkdir('grunt/tasks');
    this.mkdir('temp');
    this.mkdir('temp/convert');
    this.mkdir('temp/convert/js2coffee');
    this.mkdir('temp/convert/json');
    this.mkdir('temp/readme');
    this.mkdir('temp/readme/docs');
    this.mkdir('temp/readme/proj');
    this.mkdir('temp/readme/tmpl');
    this.mkdir('temp/tree');
    this.mkdir('test');
    this.mkdir('test/expected');
    this.mkdir('test/fixtures');

    this.template('_package.json', 'package.json');

    this.copy('_package.json', 'package.json');
    this.copy('_bower.json', 'bower.json');
  },

  projectfiles: function () {
    this.copy('editorconfig', '.editorconfig');
    this.copy('jshintrc', '.jshintrc');
  }
});

module.exports = ApolloGenerator;
/**
 * Created by tom on 12.11.16.
 */

var generators = require('yeoman-generator');

module.exports = generators.Base.extend({
  // The name `constructor` is important here
  constructor: function () {
    // Calling the super constructor is important so our generator is correctly set up
    generators.Base.apply(this, arguments);


    // Next, add your custom code
    this.option('coffee'); // This method adds support for a `--coffee` flag
    this.argument('name', { type: String, required: false });

  },

  method1: function () {
    this.log('method 1 just ran');
  },

  method2: function () {
    this.log('method 2 just ran');
  },
  prompting: function () {
    return this.prompt([{
      type: 'input',
      name: 'name',
      message: 'Name of Container',
      default: 'BEHeader',
    }]).then(function (answers) {
      this.containerName = answers.name
      this.log('Name of Container', answers.name);
    }.bind(this));
  },
  writing: function () {
    this.fs.copyTpl(
      this.templatePath('Container.js'),
      this.destinationPath('app/containers/' + this.containerName + '/' + this.containerName + 'Container.js'),
      { name: this.containerName }
    );
    this.fs.copyTpl(
      this.templatePath('Component.js'),
      this.destinationPath('app/components/' + this.containerName + '/' + this.containerName + '.js'),
      {name: this.containerName}
    );
    this.fs.copyTpl(
      this.templatePath('styles.lsm'),
      this.destinationPath('app/components/' + this.containerName + '/styles.lsm')
    );

    var hook = '//#===== yeoman hook =====#',

      pathA   = 'app/containers/index.js',
      fileA   = this.readFileAsString(pathA),
      insertA = "export " + this.containerName + "Container from './" + this.containerName + "/" + this.containerName + "Container'";

      pathB   = 'app/components/index.js',
      fileB   = this.readFileAsString(pathB),
      insertB = "export " + this.containerName + " from './" + this.containerName + "/" + this.containerName + "'";

    if (fileA.indexOf(insertA) === -1) {
      this.writeFileFromString(fileA.replace(hook, insertA+'\n'+hook), pathA);
    }

    if (fileB.indexOf(insertB) === -1) {
      this.writeFileFromString(fileB.replace(hook, insertB+'\n'+hook), pathB);
    }
  }
});


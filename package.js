Package.describe({
  name: 'moberegger:validated-template',
  version: '0.0.5',
  summary: "Create Blaze templates using MDG's best practices without any of the boilerplate!",
  git: 'https://github.com/MichaelOber/validated-template',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.1');
  api.use('ecmascript');
  api.use(['templating', 'reactive-dict'], 'client');
  api.addFiles('validated-template.js');
  api.export('ValidatedTemplate', ['client']);
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('moberegger:validated-template');
  api.addFiles('validated-template-tests.js');
});
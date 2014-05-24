//DEVELOPMENT ----------------------------------------------------------------------------------
exports.appRoot = process.cwd()
exports.appPort = 3000;

exports.sessionSecret = "secret"

exports.templateOptions = { 
  map: { html: 'swig' },
  cache: false 
}
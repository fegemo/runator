module.exports = {
  method: 'GET',
  path: '/js/{param*}',
  handler: {
    directory: {
      path: 'client/js'
    }
  }
};
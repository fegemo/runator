// Add a route
var Decompress = require('decompress');
var compiler = require('../features/compiler');
var fs = require('fs-extra');

module.exports = function(io) {
  return {
    method: 'POST',
    path: '/submit',
    config: {
      payload: {
        output: 'file',
        maxBytes: 209715200,
        //allow: 'multipart/form-data',
        parse: true //or just remove this line since true is the default
      },
      handler: function (request, reply) {
        debugger;

        io.emit('console text', 'Começando...');

        var uploadedFile = request.payload['compressed-c-project-file'],
          tempDirectory = 'C:\\runatorTemporary\\' + uploadedFile.filename;
        if (uploadedFile) {

          fs.emptydirSync(tempDirectory);

          var decompress = new Decompress({mode: '755'})
            .src(uploadedFile.path)
            .dest(tempDirectory)
            .use(Decompress.zip({strip: 1}));

          io.emit('console text', 'Descompactando arquivo...');
          decompress.run(function(err) {
            if (err) {
              console.log(err);
              return;
            }
            io.emit('console text', 'Arquivo descompactado.');

            var output = '';
            io.emit('console text', 'Começando a compilar...');
            compiler.compile(tempDirectory, function(context, data) {
              io.emit('console text', data.toString());
              output += data.toString();
            }, function(context) {
              io.emit('console text', 'Fim da compilação.');
              reply.view('submitted', { result: { success: context.success, content: output, description: 'Final da compilação. Saída'}})
            });
          });
        } else {
          io.emit('console text', 'Erro!');
          reply.redirect('/');
        }
      }
    }
  }
};


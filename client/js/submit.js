
(function() {
  // upload JPEG files
  function uploadFile(file) {

    var formData = new FormData(),
        progressBar = document.getElementById('progress-upload');

    formData.append('compressed-c-project-file', file);
    var xhr = new XMLHttpRequest();
    if (xhr.upload) {
      xhr.upload.onprogress = function(e) {
        if (e.lengthComputable) {
          progressBar.value = (e.loaded / e.total) * 100;
          progressBar.textContent = progressBar.value; // Fallback for unsupported browsers.
        }
      };

      xhr.open('POST', '/submit', true);
      xhr.send(formData);
    }
  }

  document.getElementById('compressed-c-project-file').addEventListener('change', function(e) {
      // fetch FileList object
      var files = e.target.files || e.dataTransfer.files;

      // process all File objects
      for (var i = 0, f; f = files[i]; i++) {
        uploadFile(f);
      }
    }
  );

  var console = document.getElementById('console');
  var socket = io();
  socket.on('console text', function(msg) {
    console.innerText += '\n' + msg;
  });
}());

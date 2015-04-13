var fs = require('fs-extra');

function ExecuteCommand(command, args, workingDir, callbackStdout, callbackEnd) {
    debugger;
    var spawn = require('child_process').spawn,
        child = spawn(command, args, { cwd: workingDir }),
        ended = false,
        me = this;
    me.success = true;
    me.exit = 0;  // Send a cb to set 1 when cmd exits


    child.stdout.on('data', function (data) {
        callbackStdout(me, data);
    });
    child.stdout.on('end', function () {
        if (!ended) {
            callbackEnd(me);
            ended = true;
        }
    });

    child.stderr.on('data', function(data) {
        me.success = false;
        callbackStdout(me, data);
    });
    child.stderr.on('end', function () {
        me.success = false;
        if (!ended) {
            callbackEnd(me);
            ended =  true;
        }
    });
}


module.exports = {
    compile: function(destination, callbackStdout, callbackEnd) {
        // copies the Makefile to the destination dir
        fs.copySync(__dirname + '/../data/Makefile', destination + '/Makefile');
        // executes the make command
        new ExecuteCommand('mingw32-make', [], destination, callbackStdout, callbackEnd);
    }
};
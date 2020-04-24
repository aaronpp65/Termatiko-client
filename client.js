
const args = process.argv.slice(2)
console.log(args)
// args[0]=clientname
// args[1]=serverip

// var socket = require('socket.io');
var io = require('socket.io-client');
// var io = socket(server);
var socket = io.connect("http://100.26.198.158:6666" ,{
    reconnect:false,
    forceNew: true
    });
// socket = io.connect("http://100.26.198.158:6666");
var input = "";
var initialState="";
var os = require('os');

// socket.on('serverUp', function (data) {
    var pty = require('node-pty');

    const shell = process.env[os.platform() === 'win32' ? 'COMSPEC' : 'SHELL'];
    const ptyProcess = pty.spawn(shell, [], {
        name: 'xterm-color',
        cols: 80,
        rows: 30,
        cwd: process.cwd(),
        env: process.env
        });
        const ptyProcess_initial = pty.spawn(shell, [], {
        name: 'xterm-color',
        cols: 80,
        rows: 30,
        cwd: process.cwd(),
        env: process.env
        });

    ptyProcess_initial.onData(data => {
            initialState+=data
            });
    console.log("server is up");
    socket.on('serverUp', function (data) {
    socket.emit('clientname',args[0]);
    // ptyProcess.write('\r');
    socket.emit('cmdOutput',initialState)
});
    // ptyProcess.write('ls\r');
            // console.log('pt1',input);
            
    ptyProcess.onData(data => {

        socket.emit('cmdOutput',data)
        //   xterm.write(data);
        });
        socket.on('newCmd',newCMD);
        function newCMD(data){
            console.log('data from server :',data)
            // const code = data.charCodeAt(0);
            // if (code == 13) { // CR
            //     input+='\r'
            //     console.log('input is :',input)

                ptyProcess.write(data);
                // ptyProcess.onData(data => {
                //     finalData += data;
                //     });
                // console.log('finalData',finalData)
                // ptyProcess.on('end', () => {socket.emit('cmdOutput',finalData);finalData="";})     
            //     input = "";
            //     }
            // else if (code < 32 || code == 127) { // Control
            //     return;
            // } else { // Visible
            //     input += data;
            // }
                            }

    // });   
    //         socket.emit('clientname',args[0])
    // // ptyProcess.write('ls\r');
    //         // console.log('pt1',input);
            
    //         ptyProcess.onData(data => {
    //         // console.log('pt2',data1)
    //         // data1=''

    //         socket.emit('cmdOutput',data)
    //         //   xterm.write(data);
    //         });

            // socket.on('newCmd',newCMD);
            // function newCMD(data){
            //     const code = data.charCodeAt(0);
            //     if (code == 13) { // CR
            //         // ptyProcess.removeAllListeners('data');
            //         // console.log('input',input);
            //         input+='\r'
            //     console.log('data',input)

            //     ptyProcess.write(input);
            //     id = ptyProcess.onData(data => {
                            
            //         finalData += data;
                    
            //         });
            //         console.log(finalData)
            //     ptyProcess.on('end', () => socket.emit('cmdOutput',finalData)) 
            //         console.log('id',id)    
            //         input = "";
            //     }
            //     else if (code < 32 || code == 127) { // Control
            //         return;
            //     } else { // Visible
            //         input += data;
            //     }
            //                 }

// Initialize xterm.js and attach it to the DOM
// const xterm = new Terminal();
// xterm.open(document.getElementById('xterm'));
// xterm.write('Hello from \x1B[1;3;31mxterm.js\x1B[0m $ ')
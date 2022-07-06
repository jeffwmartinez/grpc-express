'use strict';
var debug = require('debug');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// var portgRPC2 = process.env.PORT || 8181

// // http2express // revert
var http2 = require('http2')
var fs = require('fs')

// // adding certificate options // revert?
// var server2 = http2.createSecureServer({
//     key: fs.readFileSync('./nodelocalhost-privkey.pem'),
//     cert: fs.readFileSync('./node_modules/localhost-cert.pem')
//   });

//   server2.on('error', (err) => console.error(err));
  
//   server2.on('stream', (stream, headers) => {
//     // stream is a Duplex
//     stream.respond({
//       'content-type': 'text/html; charset=utf-8',
//       ':status': 200
//     });
//     stream.end('<h1>Hello World</h1>');
//   });

//   server2.listen(8181)
  
var server2 = http2.createServer()





// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function () {
    debug('Express server listening on port ' + server.address().port);
});

// gRPC Server

var PROTO_PATH = __dirname + '/protos/helloworld.proto';


var grpc = require('@grpc/grpc-js');
var protoLoader = require('@grpc/proto-loader');
var packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    });
var hello_proto = grpc.loadPackageDefinition(packageDefinition).helloworld;

var portgRPC = process.env.portHttp2 || 8383

/**
 * Implements the SayHello RPC method.
 */
function sayHello(call, callback) {
    callback(null, { message: 'Hello ' + call.request.name });
}

/**
 * Starts an RPC server that receives requests for the Greeter service at the
 * sample server port
 */
function main() {
    var server = new grpc.Server();
    server.addService(hello_proto.Greeter.service, { sayHello: sayHello });
    // server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), () => {
    //   server.start();
    server.bindAsync(`0.0.0.0:${portgRPC}`, grpc.ServerCredentials.createInsecure(), () => {
        console.log(`gRPC server listening on ${portgRPC}`)
        server.start();
   
    });

}

main();
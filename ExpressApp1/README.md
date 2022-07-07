# gRPC node app

### Steps to run the application
#### 1. Clone the application and open the `ExpressApp1` app in Visual Studio or VS Code

#### 2. Clone the gRPC node client app
To see the app in action, you will also need to clone the [client repository](https://github.com/jeffwmartinez/grpc-node-client)

#### 3. Run the app locally
To run this app locally, use Ctrl+F5 to start the app.  A console will open and the gRPC service will start listening on port `8383`.

The browser will also launch w/ express and start listening on http://localhost:1337.  The server app is now ready to receive requests from the `grpc-client-node` app found in this repo.

##### Start the client application
Once the application is running, you can start the client application.  Open the client application and run it using Ctrl+F5.

The client app will open a console app and respond with the text "Greeting: Hello World"


##### Deploying to App Service
Now that it's tested locally, you can deploy the application to App Service.  Create a web app using the following directions in this [How-To](https://github.com/Azure/app-service-linux-docs/blob/master/HowTo/gRPC/use_gRPC_with_dotnet.md#deploy-to-app-service) to enable gRPC calls.

Once it's deployed, you can replace the listening port in the local client application with the azurewebsites.net url to test the deployed grpc server.

### Issues/Logs
1. Once deployed, the azurewebsites url shows an HTTP 415 error "This page isn't working right now"
2. However, the log stream application logs shows that the gRPC server is listening on 8383

```
{"timestamp":"2022-07-07T03:49:00.700304508Z","level":"INFO","machineName":"pl0sdlwk000CV9","containerName":"my-node-grpc-express-app_0_7a6c511a","message":" gRPC server listening on 8383\n","id":"f6fe9160-ff04-4206-983e-67c5423a2f68","instance":"7d541a8f0aa7702237eea8e36b3c0321166514fdfef681b7755b6e82339b42dd"}
```

3. Platform logs show container exposed at 8383

```
{"timestamp":"2022-07-07T03:48:51.414Z","level":"INFO","containerName":"my-node-grpc-express-app_0_7a6c511a","machineName":"pl0sdlwk000CV9","message":"docker run -d --expose=8080 --expose=8383 --name my-node-grpc-express-app_0_7a6c511a -e WEBSITE_SITE_NAME=my-node-grpc-express-app -e WEBSITE_AUTH_ENABLED=False -e WEBSITE_ROLE_INSTANCE_ID=0 -e WEBSITE_HOSTNAME=my-node-grpc-express-app.azurewebsites.net -e WEBSITE_INSTANCE_ID=7d541a8f0aa7702237eea8e36b3c0321166514fdfef681b7755b6e82339b42dd -e HTTP_LOGGING_ENABLED=1 -e WEBSITE_USE_DIAGNOSTIC_SERVER=True appsvc/node:16-lts_20220309.1 \n","id":"fdeecfd5-c82f-4597-b4ff-73da09e51a3b","instance":"7d541a8f0aa7702237eea8e36b3c0321166514fdfef681b7755b6e82339b42dd"}
```

```
{"timestamp":"2022-07-07T03:49:01.825Z","level":"INFO","containerName":"my-node-grpc-express-app_0_7a6c511a","machineName":"pl0sdlwk000CV9","message":"Container my-node-grpc-express-app_0_7a6c511a for site my-node-grpc-express-app initialized successfully and is ready to serve requests.","id":"5a3b36ff-639e-412e-87d9-9118f4394614","instance":"7d541a8f0aa7702237eea8e36b3c0321166514fdfef681b7755b6e82339b42dd"}
```

4. When trying to call make a call from the client - message undefined

```
TypeError: Cannot read property 'message' of undefined
    at Object.callback (C:\Users\jefmarti\source\repos\grpc_node\grpc-client-node\grpc-client-node\app.js:37:43)
    at Object.onReceiveStatus (C:\Users\jefmarti\source\repos\grpc_node\grpc-client-node\node_modules\?[4m@grpc?[24m\grpc-js\build\src\client.js:189:36)
    at Object.onReceiveStatus (C:\Users\jefmarti\source\repos\grpc_node\grpc-client-node\node_modules\?[4m@grpc?[24m\grpc-js\build\src\client-interceptors.js:365:141)
    at Object.onReceiveStatus (C:\Users\jefmarti\source\repos\grpc_node\grpc-client-node\node_modules\?[4m@grpc?[24m\grpc-js\build\src\client-interceptors.js:328:181)
    at C:\Users\jefmarti\source\repos\grpc_node\grpc-client-node\node_modules\?[4m@grpc?[24m\grpc-js\build\src\call-stream.js:187:78
?[90m    at processTicksAndRejections (internal/process/task_queues.js:77:11)?[39m
```


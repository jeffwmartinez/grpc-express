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

tl;dr
1. Add the app setting HTTP20_ONLY_PORT = 8383
2. In General Settings, set HTTP version = 2.0
3. In General Settings, set HTTP 2.0 Proxy = On

Once it's deployed, you can replace the listening port in the local client application with the azurewebsites.net url to test the deployed grpc server.

### Issues/Logs
1. The index.pug view isn't showing up when deployed to App Service.  Once deployed, the azurewebsites url shows an HTTP 415 error "This page isn't working right now".  However, the gRPC server is started and will respond to a client call.  

```json
{"timestamp":"2022-08-18T05:36:58.884820029Z","level":"ERROR","machineName":"RD00155DAE3E80","containerName":"grpc-node-express_1_5bc48533","message":" npm info it worked if it ends with ok\n","id":"6a2ba2cd-ee05-4243-b674-178f3f79195c","instance":"93ad2e7cf8572308af1ea47b5a6125d6b6778911630249caca8d58ef84d9937b"}

{"timestamp":"2022-08-18T05:36:58.893674007Z","level":"ERROR","machineName":"RD00155DAE3E80","containerName":"grpc-node-express_1_5bc48533","message":" npm info using npm@6.14.15\n","id":"40532eed-7af9-483d-95e2-cebd4ffe9f44","instance":"93ad2e7cf8572308af1ea47b5a6125d6b6778911630249caca8d58ef84d9937b"}

{"timestamp":"2022-08-18T05:36:58.893702507Z","level":"ERROR","machineName":"RD00155DAE3E80","containerName":"grpc-node-express_1_5bc48533","message":" npm info using node@v16.14.2\n","id":"1b0d23bb-fb54-410f-87f0-999edf1397d7","instance":"93ad2e7cf8572308af1ea47b5a6125d6b6778911630249caca8d58ef84d9937b"}

{"timestamp":"2022-08-18T05:36:59.591546035Z","level":"ERROR","machineName":"RD00155DAE3E80","containerName":"grpc-node-express_1_5bc48533","message":" npm info lifecycle express-app1@0.0.0~prestart: express-app1@0.0.0\n","id":"974ed6e7-5750-413e-ba09-d6a1b9631363","instance":"93ad2e7cf8572308af1ea47b5a6125d6b6778911630249caca8d58ef84d9937b"}

{"timestamp":"2022-08-18T05:36:59.651538862Z","level":"ERROR","machineName":"RD00155DAE3E80","containerName":"grpc-node-express_1_5bc48533","message":" npm info lifecycle express-app1@0.0.0~start: express-app1@0.0.0\n","id":"6e032075-d94e-4ae6-8558-d6d76d69e711","instance":"93ad2e7cf8572308af1ea47b5a6125d6b6778911630249caca8d58ef84d9937b"}
```


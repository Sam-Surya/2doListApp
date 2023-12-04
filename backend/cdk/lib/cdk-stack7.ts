import * as path from 'path';

import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import { Stack, StackProps } from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs';

import * as iam from 'aws-cdk-lib/aws-iam';





export class CdkStack7 extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);



  
    const role = new iam.Role(this, 'MyLambdaRole', {
      assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com'),
      description: 'An IAM role for my Lambda function',
      managedPolicies: [
        iam.ManagedPolicy.fromAwsManagedPolicyName('AmazonRDSDataFullAccess'),
        iam.ManagedPolicy.fromAwsManagedPolicyName(
          'service-role/AWSLambdaBasicExecutionRole'
        ),
      ],
    });

    // Defines AWS Lambda
    const fetchalltaskLambda = new lambda.Function(this, "FecthAllTaskLambdaSam", {

      runtime: lambda.Runtime.NODEJS_18_X,
      handler: 'all-task-lambda.handler',
      code: lambda.Code.fromAsset(path.join(__dirname, '..', '..', 'lambdas')),
      environment: {
        DB_HOST: 'cdkstack-samtodolistdatabaseinstancewriter665afb5c-utrtc6ot0wmr.cvrwn2k5tfju.us-east-1.rds.amazonaws.com',
        DB_USER: 'admin',
        DB_PASSWORD: '84771188',
        DB_NAME: '2doListdb',
      },

      role,

    })


    // Defines AWS Lambda
    const fetchcompltedtaskLambda = new lambda.Function(this, "FecthCompletedTaskLambdaSam", {

      runtime: lambda.Runtime.NODEJS_18_X,
      handler: 'completed-task-lambda.handler',
      code: lambda.Code.fromAsset(path.join(__dirname, '..', '..', 'lambdas')),
      environment: {
        DB_HOST: 'cdkstack-todolistdatabaseinstancewriter56f13bb4-oi5dbuywifqi.cvrwn2k5tfju.us-east-1.rds.amazonaws.com',
        DB_USER: 'admin',
        DB_PASSWORD: '84771188',
        DB_NAME: '2doListdb',
      },

      role,

    })


    // Defines AWS Lambda
    const fetchpendingtaskLambda = new lambda.Function(this, "FecthPendingTaskLambdaSam", {

      runtime: lambda.Runtime.NODEJS_18_X,
      handler: 'pending-task-lambda.handler',
      code: lambda.Code.fromAsset(path.join(__dirname, '..', '..', 'lambdas')),
      environment: {
        DB_HOST: 'cdkstack-todolistdatabaseinstancewriter56f13bb4-oi5dbuywifqi.cvrwn2k5tfju.us-east-1.rds.amazonaws.com',
        DB_USER: 'admin',
        DB_PASSWORD: '84771188',
        DB_NAME: '2doListdb',
      },

      role,

    })




    // Defines AWS Lambda
    const fetchdeletedtaskLambda = new lambda.Function(this, "FecthDeletedTaskLambdaSam", {

      runtime: lambda.Runtime.NODEJS_18_X,
      handler: 'deleted-task-lambda.handler',
      code: lambda.Code.fromAsset(path.join(__dirname, '..', '..', 'lambdas')),
      environment: {
        DB_HOST: 'cdkstack-todolistdatabaseinstancewriter56f13bb4-oi5dbuywifqi.cvrwn2k5tfju.us-east-1.rds.amazonaws.com',
        DB_USER: 'admin',
        DB_PASSWORD: '84771188',
        DB_NAME: '2doListdb',
      },

      role,

    })



    // Defines AWS Lambda
    const addtaskLambda = new lambda.Function(this, "AddTaskLambdaSam", {

      runtime: lambda.Runtime.NODEJS_18_X,
      handler: 'add-task-lambda.handler',
      code: lambda.Code.fromAsset(path.join(__dirname, '..', '..', 'lambdas')),
      environment: {
        DB_HOST: 'cdkstack-todolistdatabaseinstancewriter56f13bb4-oi5dbuywifqi.cvrwn2k5tfju.us-east-1.rds.amazonaws.com',
        DB_USER: 'admin',
        DB_PASSWORD: '84771188',
        DB_NAME: '2doListdb',
      },

      role,

    })


    // Defines AWS Lambda
    const increaseprogressLambda = new lambda.Function(this, "IncreaseProgressLambdaSam", {

      runtime: lambda.Runtime.NODEJS_18_X,
      handler: 'increase-progress-lambda.handler',
      code: lambda.Code.fromAsset(path.join(__dirname, '..', '..', 'lambdas')),
      environment: {
        DB_HOST: 'cdkstack-todolistdatabaseinstancewriter56f13bb4-oi5dbuywifqi.cvrwn2k5tfju.us-east-1.rds.amazonaws.com',
        DB_USER: 'admin',
        DB_PASSWORD: '84771188',
        DB_NAME: '2doListdb',
      },

      role,

    })


    // Defines AWS Lambda
    const deletetaskLambda = new lambda.Function(this, "DeleteTaskLambdaSam", {

      runtime: lambda.Runtime.NODEJS_18_X,
      handler: 'delete-task-lambda.handler',
      code: lambda.Code.fromAsset(path.join(__dirname, '..', '..', 'lambdas')),
      environment: {
        DB_HOST: 'cdkstack-todolistdatabaseinstancewriter56f13bb4-oi5dbuywifqi.cvrwn2k5tfju.us-east-1.rds.amazonaws.com',
        DB_USER: 'admin',
        DB_PASSWORD: '84771188',
        DB_NAME: '2doListdb',
      },

      role,

    })


    // Defines AWS Lambda
    const perdeletetaskLambda = new lambda.Function(this, "PermanentlyTaskLambdaSam", {

      runtime: lambda.Runtime.NODEJS_18_X,
      handler: 'permanently-delete-task-lambda.handler',
      code: lambda.Code.fromAsset(path.join(__dirname, '..', '..', 'lambdas')),
      environment: {
        DB_HOST: 'cdkstack-todolistdatabaseinstancewriter56f13bb4-oi5dbuywifqi.cvrwn2k5tfju.us-east-1.rds.amazonaws.com',
        DB_USER: 'admin',
        DB_PASSWORD: '84771188',
        DB_NAME: '2doListdb',
      },

      role,

    })




    // Defines AWS Lambda
    const edittaskLambda = new lambda.Function(this, "EditTaskLambdaSam", {

      runtime: lambda.Runtime.NODEJS_18_X,
      handler: 'edit-task-lambda.handler',
      code: lambda.Code.fromAsset(path.join(__dirname, '..', '..', 'lambdas')),
      environment: {
        DB_HOST: 'cdkstack-todolistdatabaseinstancewriter56f13bb4-oi5dbuywifqi.cvrwn2k5tfju.us-east-1.rds.amazonaws.com',
        DB_USER: 'admin',
        DB_PASSWORD: '84771188',
        DB_NAME: '2doListdb',
      },

      role,

    })



    // Defines AWS Lambda
    const restoretaskLambda = new lambda.Function(this, "RestoreTaskLambdaSam", {

      runtime: lambda.Runtime.NODEJS_18_X,
      handler: 'restore-task-lambda.handler',
      code: lambda.Code.fromAsset(path.join(__dirname, '..', '..', 'lambdas')),
      environment: {
        DB_HOST: 'cdkstack-todolistdatabaseinstancewriter56f13bb4-oi5dbuywifqi.cvrwn2k5tfju.us-east-1.rds.amazonaws.com',
        DB_USER: 'admin',
        DB_PASSWORD: '84771188',
        DB_NAME: '2doListdb',
      },

      role,

    })



    // Defines AWS Lambda
    const decreasetaskprogressLambda = new lambda.Function(this, "DecreaseTaskProgressLambdaSam", {

      runtime: lambda.Runtime.NODEJS_18_X,
      handler: 'decrease-precentage-lambda.handler',
      code: lambda.Code.fromAsset(path.join(__dirname, '..', '..', 'lambdas')),
      environment: {
        DB_HOST: 'cdkstack-todolistdatabaseinstancewriter56f13bb4-oi5dbuywifqi.cvrwn2k5tfju.us-east-1.rds.amazonaws.com',
        DB_USER: 'admin',
        DB_PASSWORD: '84771188',
        DB_NAME: '2doListdb',
      },

      role,

    })


    // Defines AWS Lambda
    const sorttaskLambda = new lambda.Function(this, "SortTaskLambdaSam", {

      runtime: lambda.Runtime.NODEJS_18_X,
      handler: 'sort-date-task-lambda.handler',
      code: lambda.Code.fromAsset(path.join(__dirname, '..', '..', 'lambdas')),
      environment: {
        DB_HOST: 'cdkstack-todolistdatabaseinstancewriter56f13bb4-oi5dbuywifqi.cvrwn2k5tfju.us-east-1.rds.amazonaws.com',
        DB_USER: 'admin',
        DB_PASSWORD: '84771188',
        DB_NAME: '2doListdb',
      },

      role,

    })




    // Defines AWS Lambda
    const usernameLambda = new lambda.Function(this, "UsernameLambdaSam", {

      runtime: lambda.Runtime.NODEJS_18_X,
      handler: 'fetch-username-lambda.handler',
      code: lambda.Code.fromAsset(path.join(__dirname, '..', '..', 'lambdas')),
      environment: {
        DB_HOST: 'cdkstack-todolistdatabaseinstancewriter56f13bb4-oi5dbuywifqi.cvrwn2k5tfju.us-east-1.rds.amazonaws.com',
        DB_USER: 'admin',
        DB_PASSWORD: '84771188',
        DB_NAME: '2doListdb',
      },

      role,

    })


    // Defines AWS Lambda
    const deleteSelectedLambda = new lambda.Function(this, "DeleteSelectedLambdaSam", {

      runtime: lambda.Runtime.NODEJS_18_X,
      handler: 'delete-selected-lambda.handler',
      code: lambda.Code.fromAsset(path.join(__dirname, '..', '..', 'lambdas')),
      environment: {
        DB_HOST: 'cdkstack-todolistdatabaseinstancewriter56f13bb4-oi5dbuywifqi.cvrwn2k5tfju.us-east-1.rds.amazonaws.com',
        DB_USER: 'admin',
        DB_PASSWORD: '84771188',
        DB_NAME: '2doListdb',
      },

      role,

    })


     // Defines AWS Lambda
     const perdeleteSelectedLambda = new lambda.Function(this, "PerDeleteSelectedLambdaSam", {

      runtime: lambda.Runtime.NODEJS_18_X,
      handler: 'per-delete-selected-task-lambda.handler',
      code: lambda.Code.fromAsset(path.join(__dirname, '..', '..', 'lambdas')),
      environment: {
        DB_HOST: 'cdkstack-todolistdatabaseinstancewriter56f13bb4-oi5dbuywifqi.cvrwn2k5tfju.us-east-1.rds.amazonaws.com',
        DB_USER: 'admin',
        DB_PASSWORD: '84771188',
        DB_NAME: '2doListdb',
      },

      role,

    })







    // Create an API Gateway
    const api = new apigateway.RestApi(this, '2doListFetchTask_Api', {

      defaultCorsPreflightOptions: {
        allowOrigins: apigateway.Cors.ALL_ORIGINS,
        allowMethods: apigateway.Cors.ALL_METHODS,
      },

    });





    // Create a resource
    const fetchalltaskResource = api.root.addResource('fetchalltask');


    // Create a resource
    const fetchcompletedtaskResource = api.root.addResource('fetchcompletedtask');



    // Create a resource
    const fetchpendingtaskResource = api.root.addResource('fetchpendingtask');



    // Create a resource
    const fetchdeletedtaskResource = api.root.addResource('fetchdeletedtask');



    // Create a resource
    const addtaskResource = api.root.addResource('addtask');



    // Create a resource
    const increaseprogressResource = api.root.addResource('increaseprogress');



    // Create a resource
    const deletetaskResource = api.root.addResource('deletetask');


    // Create a resource
    const perdeletetaskResource = api.root.addResource('permanentlydeletetask');



    // Create a resource
    const edittaskResource = api.root.addResource('edittask');



    // Create a resource
    const restoretaskResource = api.root.addResource('restoretask');


    // Create a resource
    const decreaseprogresstaskResource = api.root.addResource('decreasetaskprogress');


    // Create a resource
    const sorttaskResource = api.root.addResource('sorttask');


    // Create a resource
    const usernameResource = api.root.addResource('username');


    // Create a resource
    const deleteSelectedResource = api.root.addResource('deleteSelected');


    // Create a resource
    const perdeleteSelectedResource = api.root.addResource('perdeleteSelected');




















    // Define the API Gateway method and integrate with Lambda
    fetchalltaskResource.addMethod('GET', new apigateway.LambdaIntegration(fetchalltaskLambda));


    // Define the API Gateway method and integrate with Lambda
    fetchcompletedtaskResource.addMethod('GET', new apigateway.LambdaIntegration(fetchcompltedtaskLambda));


    // Define the API Gateway method and integrate with Lambda
    fetchpendingtaskResource.addMethod('GET', new apigateway.LambdaIntegration(fetchpendingtaskLambda));


    // Define the API Gateway method and integrate with Lambda
    fetchdeletedtaskResource.addMethod('GET', new apigateway.LambdaIntegration(fetchdeletedtaskLambda));


    // Define the API Gateway method and integrate with Lambda
    addtaskResource.addMethod('POST', new apigateway.LambdaIntegration(addtaskLambda));


    // Define the API Gateway method and integrate with Lambda
    increaseprogressResource.addMethod('POST', new apigateway.LambdaIntegration(increaseprogressLambda));


    // Define the API Gateway method and integrate with Lambda
    deletetaskResource.addMethod('POST', new apigateway.LambdaIntegration(deletetaskLambda));


    // Define the API Gateway method and integrate with Lambda
    perdeletetaskResource.addMethod('POST', new apigateway.LambdaIntegration(perdeletetaskLambda));



    // Define the API Gateway method and integrate with Lambda
    edittaskResource.addMethod('POST', new apigateway.LambdaIntegration(edittaskLambda));




    // Define the API Gateway method and integrate with Lambda
    restoretaskResource.addMethod('POST', new apigateway.LambdaIntegration(restoretaskLambda));





    // Define the API Gateway method and integrate with Lambda
    decreaseprogresstaskResource.addMethod('POST', new apigateway.LambdaIntegration(decreasetaskprogressLambda));



    // Define the API Gateway method and integrate with Lambda
    sorttaskResource.addMethod('GET', new apigateway.LambdaIntegration(sorttaskLambda));



    // Define the API Gateway method and integrate with Lambda
    usernameResource.addMethod('GET', new apigateway.LambdaIntegration(usernameLambda));


    // Define the API Gateway method and integrate with Lambda

    deleteSelectedResource.addMethod('POST', new apigateway.LambdaIntegration(deleteSelectedLambda));



    
    // Define the API Gateway method and integrate with Lambda

    perdeleteSelectedResource.addMethod('POST', new apigateway.LambdaIntegration(perdeleteSelectedLambda));







  }
}

import * as path from 'path';

import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import { CfnOutput, Duration, Stack, StackProps } from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs';

import * as iam from 'aws-cdk-lib/aws-iam';





export class CdkStack5 extends Stack {
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
    const forgotLambda = new lambda.Function(this, "ForgotLambdaSam", {
     
      runtime: lambda.Runtime.NODEJS_18_X, 
      handler: 'forgot-pass-lambda.handler', 
      code: lambda.Code.fromAsset(path.join(__dirname, '..', '..', 'lambdas')),
      environment: {
        DB_HOST: 'cdkstack-samtodolistdatabaseinstancewriter665afb5c-utrtc6ot0wmr.cvrwn2k5tfju.us-east-1.rds.amazonaws.com',
        DB_USER: 'admin',
        DB_PASSWORD: '84771188',
        DB_NAME: '2doListdb',
    },

    role,
    
    })


    // Create an API Gateway
      const api = new apigateway.RestApi(this, '2doListForgotApi_register', {

        defaultCorsPreflightOptions: {
          allowOrigins: apigateway.Cors.ALL_ORIGINS, 
          allowMethods: apigateway.Cors.ALL_METHODS, 
        },

      });
  
      // Create a resource
      const forgotResource = api.root.addResource('forgot');
  
     
     


     
   

       
     
      // Define the API Gateway method and integrate with Lambda
      forgotResource.addMethod('POST', new apigateway.LambdaIntegration(forgotLambda));






  }
}

#!/usr/bin/env node
import 'source-map-support/register';

import * as cdk from 'aws-cdk-lib'; 



import { CdkStack } from '../lib/cdk-stack';
import { CdkStack2 } from '../lib/cdk-stack2';
import { CdkStack3 } from '../lib/cdk-stack3';
import { CdkStack4 } from '../lib/cdk-stack4';
import { CdkStack5 } from '../lib/cdk-stack5';
import { CdkStack6 } from '../lib/cdk-stack6';
import { CdkStack7 } from '../lib/cdk-stack7';



const app = new  cdk.App();   




new CdkStack(app, 'CdkStack', {
 

});


new CdkStack2(app, 'CdkStack2-login-lambda-sam', {


});


new CdkStack3(app, 'CdkStack3-sam-s3', {


});





new CdkStack4(app, 'CdkStack4-register-lambda-sam', {


});


new CdkStack5(app, 'CdkStack5-forgot-lambda-sam', {


});


new CdkStack6(app, 'CdkStack6-reset-lambda-sam', {


});




new CdkStack7(app, 'CdkStack7-fetch-task-lambda-sam', {


});


















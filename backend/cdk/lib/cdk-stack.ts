import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as rds from 'aws-cdk-lib/aws-rds';
import * as ec2 from 'aws-cdk-lib/aws-ec2';


export class CdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create a VPC
    const vpc = new ec2.Vpc(this, 'MyVpc', {


    });


    const auroraSecurityGroup = new ec2.SecurityGroup(this, 'AuroraSecurityGroup', {
      vpc,
      allowAllOutbound: true, // Allow all outbound traffic
    });



    // Allow all inbound traffic
    auroraSecurityGroup.addIngressRule(ec2.Peer.anyIpv4(), ec2.Port.allTcp(), 'Allow all inbound traffic');




    // Create an Aurora MySQL database cluster
    const cluster = new rds.DatabaseCluster(this, 'todoListdatabaseinstance', {

      engine: rds.DatabaseClusterEngine.auroraMysql({ version: rds.AuroraMysqlEngineVersion.VER_3_03_1 }),

      credentials: {
        username: 'admin',
        password: cdk.SecretValue.unsafePlainText('84771188'),

      },

      writer: rds.ClusterInstance.serverlessV2('writer', {
        publiclyAccessible: true,

      }),




      serverlessV2MinCapacity: 0.5,
      serverlessV2MaxCapacity: 1,

      vpc,

      vpcSubnets: {
        subnetType: ec2.SubnetType.PUBLIC, // Use public subnets
      },
      securityGroups: [auroraSecurityGroup],

    });



    // Create an Aurora MySQL database cluster
    const cluster2 = new rds.DatabaseCluster(this, 'SamtodoListdatabaseinstance', {

      engine: rds.DatabaseClusterEngine.auroraMysql({ version: rds.AuroraMysqlEngineVersion.VER_3_03_1 }),

      credentials: {
        username: 'admin',
        password: cdk.SecretValue.unsafePlainText('84771188'),

      },

      writer: rds.ClusterInstance.serverlessV2('writer', {
        publiclyAccessible: true,

      }),




      serverlessV2MinCapacity: 0.5,
      serverlessV2MaxCapacity: 1,

      vpc,

      vpcSubnets: {
        subnetType: ec2.SubnetType.PUBLIC, // Use public subnets
      },
      securityGroups: [auroraSecurityGroup],

    });







  }

}


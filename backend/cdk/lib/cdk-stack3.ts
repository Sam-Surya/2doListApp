import * as path from 'path';
import * as s3Deploy from 'aws-cdk-lib/aws-s3-deployment';
import * as cdk from 'aws-cdk-lib';
import * as s3 from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';
import * as cloudFront from 'aws-cdk-lib/aws-cloudfront';
import * as cloudFrontOrigins from 'aws-cdk-lib/aws-cloudfront-origins';
import * as acm from 'aws-cdk-lib/aws-certificatemanager';
import * as route53 from 'aws-cdk-lib/aws-route53';


export class CdkStack3 extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);


    // Create an S3 bucket
    const bucket = new s3.Bucket(this, '2doList_sam', {
      websiteIndexDocument: 'index.html',
      
      bucketName: 'sam-2dolist-app',

      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      // When stack is deleted, delete this bucket also
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      // Delete contained objects when bucket is deleted
      autoDeleteObjects: true
      
    });


    
  



    const hostedZone = route53.HostedZone.fromHostedZoneAttributes(
      this,
      `sam-route53-zone`,
      {
        zoneName: 'dev.it.powerschoolcorp.com',
        hostedZoneId: 'Z040279616V5TPB4HW4L3'
      }
    );


    const certificate = new acm.Certificate(
      this,
      `sam-acm-cert`,
      {
        domainName: 'sam.dev.it.powerschoolcorp.com',
        validation: acm.CertificateValidation.fromDns(hostedZone)
      }
    );


    const cloudFrontDistribution = new cloudFront.Distribution(
      this,
      `Sam-cloudfront`,
      {
        // Default path pointing to S3 Web Bucket where static content resides
        defaultBehavior: {
          // Point to S3 Web Bucket as origin
          origin: new cloudFrontOrigins.S3Origin(bucket),
          // HTTP requests will be redirected to HTTPS
          viewerProtocolPolicy: cloudFront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
          // Only allow GET, HEAD, OPTIONS methods
          allowedMethods: cloudFront.AllowedMethods.ALLOW_GET_HEAD_OPTIONS,
          // Cache GET, HEAD, OPTIONS
          cachedMethods: cloudFront.CachedMethods.CACHE_GET_HEAD_OPTIONS
        },
        // If index.html is not specified in URL, assume it rather than given a 404 error
        defaultRootObject: 'index.html',
        // Allow IPv6 DNS requests with an IPv6 address
        enableIpv6: true,
        // Restrict site to the USA and Canada
        // geoRestriction: cloudFront.GeoRestriction.allowlist('US', 'CA'),
        // 100 is USA, Canada, Europe and Israel
        // priceClass: cloudFront.PriceClass.PRICE_CLASS_100,
        // Alternate domain name to use (instead of CloudFront auto-generated one)
        domainNames: ['sam.dev.it.powerschoolcorp.com'],
        // Certificate to use (instead of CloudFront auto-generated one)
        certificate,
        // For the scenario where the user navigates around the React single-page app (SPA), the URL
        // bar gets modified and user does a refresh of the page (e.g., hits F5 key). This should
        // intercept the error from the server side when the path is not found and redirect user to
        // root HTML of SPA. Client-side routing should take over from there.
        errorResponses: [
          {
            httpStatus: 403,
            responseHttpStatus: 200,
            responsePagePath: '/index.html'
          },
          {
            httpStatus: 404,
            responseHttpStatus: 200,
            responsePagePath: '/index.html'
          }
        ]
      }
    );



    // Deploy the contents of the 'assets' directory to the S3 bucket
    // new s3deploy.BucketDeployment(this, 'DeployAssets', {
    //   sources: [s3deploy.Source.asset(path.join(__dirname, '..', '..', '..', 'frontend', 'build'))],
    //   destinationBucket: bucket,
    // });


    const pathToStaticWebContent = path.join(__dirname, '..', '..', '..', 'frontend', 'build');

    const deploymentToS3Web = new s3Deploy.BucketDeployment(
      this,
      'sam-s3deploy',
      {
        // Static web content source
        // Note: The path to the source dist folder below must be kept updated manually if any folder
        //       restructuring or refactoring is done
        sources: [
          s3Deploy.Source.asset(pathToStaticWebContent, {
            exclude: ['index.html']
          })
        ],
        // Point to the S3 Web Bucket
        destinationBucket: bucket,
        prune: false
      }
    );





























  }
      
  












}

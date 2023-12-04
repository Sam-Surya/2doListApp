const mysql = require('mysql2/promise');


exports.handler = async (event) => {

    const responseHeaders = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
        'Access-Control-Allow-Methods': 'OPTIONS, POST, GET, PUT, DELETE'
    };

 
   
    if (!event.body || typeof event.body !== 'string') {
        return {
            statusCode: 400,
            headers: responseHeaders,
            body: JSON.stringify({ message: 'Invalid request body' }),
        };
    }


    const requestBody = JSON.parse(event.body);

    const { email, dob } = requestBody;
    try {
      

        const connection = await mysql.createConnection({
            host: 'cdkstack-samtodolistdatabaseinstancewriter665afb5c-utrtc6ot0wmr.cvrwn2k5tfju.us-east-1.rds.amazonaws.com',
            user: 'admin',
            password: '84771188',
            database: '2doListdb', 
        });
        

        console.log("Connected to Database")

        const [rows] = await connection.query('SELECT * FROM 2todoListUsers WHERE Email = ? AND DOB = ?', [email, dob]);

        if (rows.length === 1) {


          

            return {
                statusCode: 200,
                headers:responseHeaders,
                body: JSON.stringify({ message: 'Credential Matched successful' , email: email }),
            };
        } else {
            return {
                statusCode: 401,
                headers: responseHeaders, 
                body: JSON.stringify({ message: 'Invalid credentials' }),
            };
        }


    } catch (error) {
        console.error('Error:', error);
        return {
            statusCode: 500,
            headers: responseHeaders, 
            body: JSON.stringify({ message: 'Error Connecting to Database' }),
        };
    }
};

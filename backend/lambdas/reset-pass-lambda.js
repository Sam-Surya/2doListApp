const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');

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

    const {  password ,email} = requestBody;
 
   



    try {
       const connection = await mysql.createConnection({
            host: 'cdkstack-todolistdatabaseinstancewriter56f13bb4-oi5dbuywifqi.cvrwn2k5tfju.us-east-1.rds.amazonaws.com',
            user: 'admin',
            password: '84771188',
            database: '2doListdb', 
        });
        

        console.log("Connected to Database")

       const hashedPassword = await bcrypt.hash(password, 10);
      
       const [result] = await connection.query( 'UPDATE 2todoListUsers SET Password = ? WHERE Email = ?', [hashedPassword, email] );

            if (result.affectedRows === 1) {
                return {
                    statusCode: 200,
                    headers: responseHeaders,
                    body: JSON.stringify({ message: 'Password Reset successful' }),
                };
            } else {
                return {
                    statusCode: 401,
                    headers: responseHeaders,
                    body: JSON.stringify({ message: 'Password Reset failed, Could Not Reset Password ' }),
                };

            }

        }catch (error) {
            console.error('Error:', error);
            return {
                statusCode: 500,
                headers: responseHeaders, 
                body: JSON.stringify({ message: 'Error Connecting to Database' }),
            };
        }

};

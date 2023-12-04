const mysql = require('mysql2/promise');

exports.handler = async (event) => {
    const responseHeaders = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
        'Access-Control-Allow-Methods': 'OPTIONS, POST, GET, PUT, DELETE'
    };

    if (event.httpMethod !== 'GET') {
        return {
            statusCode: 400,
            headers: responseHeaders,
            body: JSON.stringify({ message: 'Invalid HTTP method. This endpoint only supports GET requests.' }),
        };
    }

    const { email } = event.queryStringParameters;

    try {
        const connection = await mysql.createConnection({
            host: 'cdkstack-todolistdatabaseinstancewriter56f13bb4-oi5dbuywifqi.cvrwn2k5tfju.us-east-1.rds.amazonaws.com',
            user: 'admin',
            password: '84771188',
            database: '2doListdb',
        });

        console.log('Connected to Database');

        const [rows] = await connection.query('SELECT * FROM 2doListTasks WHERE User_Email = ? AND Task_Status = ?', [email, 'Pending']);

        if (rows.length > 0) {
            return {
                statusCode: 200,
                headers: responseHeaders,
                body: JSON.stringify({ message: 'Tasks Fetched successfully', tasks: rows }),
            };
        } else {
            return {
                statusCode: 204,
                headers: responseHeaders,
                body: JSON.stringify({ message: 'No tasks found for the provided email', tasks: [] }),
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

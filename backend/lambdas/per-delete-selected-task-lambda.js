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

    const { email, taskIds } = requestBody; 

    try {
        const connection = await mysql.createConnection({
            host: 'cdkstack-todolistdatabaseinstancewriter56f13bb4-oi5dbuywifqi.cvrwn2k5tfju.us-east-1.rds.amazonaws.com',
            user: 'admin',
            password: '84771188',
            database: '2doListdb',
        });

        console.log('Connected to Database');

       
        for (const taskId of taskIds) {
            const [result] = await connection.query('DELETE FROM 2doListTasks WHERE User_Email = ? AND Task_ID = ?', [ email, taskId]);

            if (result.affectedRows !== 1) {
                console.error('Task Permanently Deletion Failed for Task_ID:', taskId);
            }
        }

        return {
            statusCode: 200,
            headers: responseHeaders,
            body: JSON.stringify({ message: 'Tasks Permanently Deleted Successfully' }),
        };
    } catch (error) {
        console.error('Error:', error);
        return {
            statusCode: 500,
            headers: responseHeaders,
            body: JSON.stringify({ message: 'Error Connecting to Database' }),
        };
    }
};

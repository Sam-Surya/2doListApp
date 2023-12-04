const mysql = require('mysql2/promise');

exports.handler = async (event) => {
    const responseHeaders = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
        'Access-Control-Allow-Methods': 'OPTIONS, POST, GET, PUT, DELETE'
    };

    

    if (typeof event.body !== 'object' && typeof event.body !== 'string') {
        return {
            statusCode: 400,
            headers: responseHeaders,
            body: JSON.stringify({ message: 'Invalid request body' }),
        };
    }

    const requestBody = JSON.parse(event.body);

    const { taskname, description, date, status , progress, email ,priority} = requestBody;
 
    try {
       const connection = await mysql.createConnection({
            host: 'cdkstack-todolistdatabaseinstancewriter56f13bb4-oi5dbuywifqi.cvrwn2k5tfju.us-east-1.rds.amazonaws.com',
            user: 'admin',
            password: '84771188',
            database: '2doListdb', 
        });
        

        console.log("Connected to Database")
      
       const [result] = await connection.query( 'INSERT INTO 2doListTasks (Task_Name, Task_Description, Task_Date, Task_Status, Task_Progress, User_Email , Task_Priority) VALUES (?, ?, ?, ?, ?, ?, ?)', [taskname, description, date, status, progress, email,  priority]  );

            if (result.affectedRows === 1) {
                return {
                    statusCode: 200,
                    headers: responseHeaders,
                    body: JSON.stringify({ message: 'Task Added successfully' }),
                };
            } else {
                return {
                    statusCode: 401,
                    headers: responseHeaders,
                    body: JSON.stringify({ message: 'Insertion failed, Could Not Insert Data ' }),
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

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

    const {email, taskId, taskProgress} = requestBody;
 
   



    try {
       const connection = await mysql.createConnection({
            host: 'cdkstack-todolistdatabaseinstancewriter56f13bb4-oi5dbuywifqi.cvrwn2k5tfju.us-east-1.rds.amazonaws.com',
            user: 'admin',
            password: '84771188',
            database: '2doListdb', 
        });
        

        console.log("Connected to Database")


        const parsedTaskProgress = parseInt(taskProgress, 10);


        if( parsedTaskProgress< 100){


            const [result] = await connection.query('UPDATE 2doListTasks SET Task_Status = ? WHERE User_Email = ? AND Task_ID = ?', [ 'Pending', email, taskId]);

        if (result.affectedRows === 1) {
            return {
                statusCode: 200,
                headers: responseHeaders,
                body: JSON.stringify({ message: 'Task Deleted Succesfully' }),
            };
        } else {
            return {
                statusCode: 401,
                headers: responseHeaders,
                body: JSON.stringify({ message: 'Task Deletion Failed' }),
            };

        }


        }else  if( parsedTaskProgress == 100){



            
            const [result] = await connection.query('UPDATE 2doListTasks SET Task_Status = ? WHERE User_Email = ? AND Task_ID = ?', [ 'Completed', email, taskId]);

        if (result.affectedRows === 1) {
            return {
                statusCode: 200,
                headers: responseHeaders,
                body: JSON.stringify({ message: 'Task Deleted Succesfully' }),
            };
        } else {
            return {
                statusCode: 401,
                headers: responseHeaders,
                body: JSON.stringify({ message: 'Task Deletion Failed' }),
            };

        }






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



const express = require('express');
const mysql = require('mysql');
const path = require('path');

const app = express();

// Create MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'asim123',
    database: 'test'
});

// Connect to MySQL
db.connect((err) => {
    if (err) throw err;
    console.log('MySQL Connected...');
});

// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the current directory
app.use(express.static(path.join(__dirname)));

// Define the /data route to fetch data from the database
app.get('/data', (req, res) => {
    let sql = 'SELECT * FROM Students';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results); // Send the data as JSON
    });
});

// Define the /add-data route to add data to the database
app.post('/add-data', (req, res) => {
    const { name1, CNIC, Grade, Course, GPA } = req.body;
    let sql = 'INSERT INTO Students (name, CNIC, Grade, Course, GPA) VALUES (?, ?, ?, ?, ?)';
    db.query(sql, [name1, CNIC, Grade, Course, GPA], (err, results) => {
        if (err) throw err;
        res.send('Data added successfully'); // Send a success message
    });
});

app.delete('/delete-user/:id', (req, res) => {
    const id = req.params.id;
    let sql = 'delete from Students where id = ?';
    db.query(sql, [id], (err, results) => {
        if (err) throw err;
        res.json('Deleted successfully'); // Send a success message
    });
});

app.put('/update-user/:id', (req, res) => {
    const ID = req.params.id;
    const { name, CNIC, Grade, Course, GPA } = req.body;

    // Validate ID before proceeding
    if (!ID) {
        return res.status(400).json({ message: 'ID is required' });
    }

    let sql = 'UPDATE Students SET ';
    let params = [];

    // Check each field and only include if it exists
    if (name) {
        sql += 'name = ?, '; // Add space before field name
        params.push(name);
    }
    if (CNIC) {
        sql += 'CNIC = ?, ';
        params.push(CNIC);
    }
    if (Course) {
        sql += 'Course = ?, ';
        params.push(Course);
    }
    if (Grade) {
        sql += 'Grade = ?, ';
        params.push(Grade);
    }
    if (GPA) {
        sql += 'GPA = ?, ';
        params.push(GPA);
    }

    // If no fields are updated, return an error
    if (params.length === 0) {
        return res.status(400).json({ message: 'No fields to update' });
    }

    // Remove the last comma and space
    sql = sql.slice(0, -2);

    // Add the WHERE clause to the query
    sql += ' WHERE ID = ?'; // Add space before WHERE
    params.push(ID); // Append ID at the end of the params array

    // Log the SQL query and params for debugging
    console.log('SQL Query:', sql);
    console.log('Params:', params);

    // Execute the query
    db.query(sql, params, (err, result) => {
        if (err) {
            console.error('Error executing query:', err); // Log error
            return res.status(500).json({ message: 'Database error', error: err });
        }

        // Check if any rows were affected (i.e., updated)
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ message: 'User updated successfully' });
    });
});


// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});



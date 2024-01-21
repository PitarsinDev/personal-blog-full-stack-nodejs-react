const express = require('express');
const bodyParser = require('body-parser');
const cors  = require('cors');
const mysql = require('mysql2');

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'blog_db'
});

db.connect((err) => {
    if (err) {
        console.error('Connection to database failed');
    } else {
        console.log('Connected to mysql');
    }
});

app.get('/api/posts', (req, res) => {
    db.query('SELECT * FROM posts', (err, results) => {
      if (err) {
        res.status(500).send({ error: 'Error fetching posts' });
      } else {
        res.status(200).send(results);
      }
    });
});
  

app.post('/api/posts', (req, res) => {
    const { title, content, imageUrl } = req.body;
    db.query(
      'INSERT INTO posts (title, content, image_url) VALUES (?, ?, ?)',
      [title, content, imageUrl],
      (err, result) => {
        if (err) {
          res.status(500).send({ error: 'Error creating post' });
        } else {
          res.status(201).send({ id: result.insertId });
        }
      }
    );
});

app.post('/api/comments', (req, res) => {
    const { postId, comment } = req.body;
  
    // ตรวจสอบว่าโพสต์ที่ถูกต้องหรือไม่
    db.query('SELECT * FROM posts WHERE id = ?', [postId], (err, results) => {
      if (err) {
        return res.status(500).send({ error: 'Error checking post existence' });
      }
  
      if (results.length === 0) {
        return res.status(404).send({ error: 'Post not found' });
      }

      db.query(
        'INSERT INTO comments (post_id, comment) VALUES (?, ?)',
        [postId, comment],
        (err, result) => {
          if (err) {
            return res.status(500).send({ error: 'Error creating comment' });
          } else {
            return res.status(201).send({ id: result.insertId });
          }
        }
      );
    });
});

app.listen(port, () => {
    console.log('Server is running');
});
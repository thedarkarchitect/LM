import express from 'express';
import morgan from 'morgan';
import * as path from 'path'; //this is a utility you can use to specify paths in
import { fileURLToPath } from 'url';
import courseRouter from './routes/course.routes.js'



const app = express();
const port = process.env.PORT || 10000;
const hardcodedPassword = 'Ineedajob'; // Replace with your actual password
let isLogined = false;
const __filename = fileURLToPath(import.meta.url); // this strips away the file:// protocol so the url can be used in path(gives you the filepath to the current file)
const __dirname = process.cws || path.dirname(__filename); // get the name of the directory


//middle ware
// Use Morgan for logging requests
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/api/courses', courseRouter);

// Create "Public" folder
app.use(express.static(path.join(__dirname, 'Public')));

// Route for "/" (serves login.html)
app.get('/', (req, res) => {
  isLogined = false;
  res.sendFile(path.join(__dirname, 'Public', 'login.html'));
});

// Route for "/login" (handles password verification)
app.post('/login', (req, res) => {
  const enteredPassword = req.body.password;
  console.log(enteredPassword)
  
  if (enteredPassword === hardcodedPassword) {
    // Password matches, redirect to /course
    isLogined = true;
    res.redirect('/node-course');
  } else {
    // Password doesn't match, send an error message
    res.status(401).send('Invalid password');
  }
});

// Route for "/course" (serves node-course.html, but requires authentication)
app.get('/node-course', (req, res) => {
  if (isLogined) {
    res.sendFile(path.join(__dirname, 'Public', 'node-course.html'));
  } else {
    res.redirect('/');
  }
});


app.listen(port, () => {
  console.log(`Server listening on port http://127.0.0.1:${port}`);
});

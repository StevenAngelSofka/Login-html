import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import mainRoutes from './src/routes/mainRoutes.js';

dotenv.config();
const __dirname  = path.resolve();

// Configuración del server
const app = express();
const PORT = process.env.PORT || 3500;

app.use(express.json());

// Configuración de vistas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));

// Sirve archivos estáticos 
app.use('/login', express.static(path.join(__dirname, 'src/views/login')));
app.use('/register', express.static(path.join(__dirname, 'src/views/register')));
app.use('/dashboard', express.static(path.join(__dirname, 'src/views/dashboard')));

app.use('/controllers', express.static(path.resolve('src/controllers')));
app.use('/models', express.static(path.resolve('src/models')));


// Rutas
app.use('', mainRoutes);


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
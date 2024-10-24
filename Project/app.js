const express = require('express');
const cookieParser = require('cookie-parser');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const app = express();
const port = 3000;

// Servir archivos estáticos desde la carpeta "public"
app.use(express.static('public'));

// Directorio permitido para la flag
const allowedDirectory = path.join(__dirname, 'flag/');

app.use(cookieParser());

// Ruta para la página principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Ruta para servir el robots.txt
app.get('/robots.txt', (req, res) => {
    res.type('text/plain');
    res.send(`User-agent: *
Disallow: /galleta
# agente-come-galletas`);
});

// Ruta para /galleta
app.get('/galleta', (req, res) => {
    // Verificación del User-Agent
    const userAgent = req.get('User-Agent');
    if (!userAgent || !userAgent.includes('agente-come-galletas')) {
        return res.status(403).send('Acceso denegado. Intenta de nuevo.');
    }

    // Si no hay cookie, no hay flag
    if (!req.cookies.profile) {
        const profileValue = crypto.randomUUID();
        const encodedProfileValue = Buffer.from(profileValue).toString('base64');
        res.cookie('profile', encodedProfileValue, { httpOnly: true });
        return res.send('La flag está en /var/app/flag/flag.txt');
    }

    // Intento de leer el archivo con base en la cookie
    let fileContent = '';
    try {
        // Decodificar el valor de la cookie
        let decodedProfile = Buffer.from(req.cookies.profile, 'base64').toString('utf-8');
        console.log('Decoded Profile:', decodedProfile); // Para depuración

        // Eliminar cualquier ../ en la ruta
        decodedProfile = decodedProfile.replace(/\.\.\//g, '');

        // Reemplazar ....//....// por ../../
        decodedProfile = decodedProfile.replace(/\.{4}\/\//g, '../');
        console.log('Sanitized Path:', decodedProfile); // Para depuración

        // Verificación de que la ruta decodificada está dentro del directorio permitido
        const filePath = path.resolve(path.join(allowedDirectory, decodedProfile));
        console.log('Trying to access file:', filePath); // Para depuración

        if (filePath.startsWith(allowedDirectory) && fs.existsSync(filePath)) {
            fileContent = fs.readFileSync(filePath, 'utf-8');
        } else {
            fileContent = 'Archivo no encontrado o acceso denegado.';
        }
    } catch (error) {
        console.log('Error:', error); // Para depuración
        fileContent = 'Error al procesar la solicitud.';
    }

    res.send(`${fileContent}`);
});

// Ruta para servir la flag en /flag/flag.txt
app.get('/flag/flag.txt', (req, res) => {
    res.status(403).send('Acceso denegado. Intenta de nuevo.');
});

app.listen(port, () => {
    console.log(`Servidor ejecutándose en http://localhost:${port}`);
});

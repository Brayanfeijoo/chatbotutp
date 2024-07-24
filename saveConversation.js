
const fs = require('fs');
const path = require('path');

// Ruta del archivo JSON donde se guardarán las conversaciones
const conversationsFile = path.join(__dirname, 'conversations.json');

// Función para guardar una conversación en el archivo JSON
function saveConversation(message) {
    let conversations = [];

    // Si el archivo ya existe, lee su contenido
    if (fs.existsSync(conversationsFile)) {
        const fileContent = fs.readFileSync(conversationsFile);
        conversations = JSON.parse(fileContent);
    }

    // Añade el nuevo mensaje a las conversaciones
    conversations.push(message);

    // Escribe el contenido actualizado en el archivo
    fs.writeFileSync(conversationsFile, JSON.stringify(conversations, null, 2));
}

// Exporta la función para usarla en otros archivos
module.exports = saveConversation;

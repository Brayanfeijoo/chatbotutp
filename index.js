const { makeWASocket, DisconnectReason, useMultiFileAuthState } = require('@whiskeysockets/baileys');
const fs = require('fs');
const qrcode = require('qrcode-terminal');
const path = require('path');
const saveConversation = require('./saveConversation');
const getResponse = require('./responseConfig');



// Ruta del archivo de sesión
const sessionPath = path.resolve('session.json');

// Función para generar el QR y manejar la sesión
async function initializeWhatsApp() {
    const { state, saveCreds } = await useMultiFileAuthState(sessionPath);

    // Crear una nueva conexión de WhatsApp
    const conn = makeWASocket({
        printQRInTerminal: true, // Muestra QR en la terminal
        auth: state, // Usa el estado de autenticación guardado
    });

    // Manejo de eventos
    conn.ev.on('connection.update', (update) => {
        const { connection, lastDisconnect } = update;
        if (connection === 'close') {
            if (lastDisconnect.error.output.statusCode !== DisconnectReason.loggedOut) {
                // Reconectar si no fue un cierre de sesión
                initializeWhatsApp();
            }
        } else if (connection === 'open') {
            console.log('Conectado a WhatsApp');
        }
    });

    conn.ev.on('creds.update', saveCreds);

    // Manejo del QR
    conn.ev.on('qr', (qr) => {
        qrcode.generate(qr, { small: true });
    });

    // Manejo de mensajes entrantes
    conn.ev.on('messages.upsert', async (message) => {
        console.log('Mensaje recibido:', message);
        if (message.messages[0].message.conversation) {
            const msg = message.messages[0].message.conversation;
            const response = getResponse(msg);
            const jid = message.messages[0].key.remoteJid;
            await conn.sendMessage(jid, { text: response });
            saveConversation(jid, msg, response);
        }
    });
}

// Ejecutar la función para iniciar la conexión
initializeWhatsApp().catch(err => console.error('Error al iniciar WhatsApp:', err));
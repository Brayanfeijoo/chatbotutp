const qrcode = require('qrcode-terminal');
const chalk = require('chalk');
const { createQR } = require('@whiskeysockets/baileys');

async function generateQRCode() {
    try {
        const qr = await createQR();
        
        // Mostrar el título
        console.log(chalk.red.bold('CHATBOT-UTP'));
        
        // Mostrar el QR en la terminal
        qrcode.generate(qr, { small: true }, (qrCode) => {
            console.log(qrCode);
        });

        // Mostrar el mensaje informativo
        console.log(chalk.green('Escanea el QR para iniciar sesión.'));
    } catch (err) {
        console.error(chalk.red('Error generando el QR:', err));
    }
}

generateQRCode();

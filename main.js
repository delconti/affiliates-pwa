if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js')
        .then(() => console.log('Service Worker registered'));
}

const registrationForm = document.getElementById('registrationForm');
registrationForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const formData = new FormData(registrationForm);
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        affiliateId: formData.get('affiliateId'),
        userId: null, // This will be filled after OneSignal registration
    };

    // Initialize OneSignal
    window.OneSignal = window.OneSignal || [];
    OneSignal.push(() => {
        OneSignal.init({
            appId: "YOUR-ONESIGNAL-APP-ID",
            allowLocalhostAsSecureOrigin: true,
        });
        
        OneSignal.push(() => {
            OneSignal.getUserId((userId) => {
                data.userId = userId;
                sendDataToServer(data);
            });
        });
    });
});

async function sendDataToServer(data) {
    const response = await fetch('https://your-server-endpoint.com/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    const result = await response.json();
    console.log(result);
}

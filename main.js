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
        phone: formData.get('phone').replace(/\D/g, ''), // Remove formatação
        affiliateId: formData.get('affiliateId'),
    };

    // Initialize OneSignal
    window.OneSignal = window.OneSignal || [];
    OneSignal.push(() => {
        OneSignal.init({
            appId: "SEU-ONESIGNAL-APP-ID", // Substitua por sua App ID
            allowLocalhostAsSecureOrigin: true,
        });

        OneSignal.push(async () => {
            await OneSignal.setExternalUserId(data.affiliateId);

            // Save essential user information to OneSignal tags
            await OneSignal.sendTags({
                name: data.name
            });

            // Use OneSignal API to store additional user data
            const response = await fetch('https://onesignal.com/api/v1/players', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    'Authorization': `Basic MjQ0Yzk0MTItNGNjMC00ZDU0LTg1N2EtZDlkYTI2ZTc5NTYy`, // Substitua pela sua API Key
                },
                body: JSON.stringify({
                    app_id: "a7baa9a1-f62e-4a3f-8933-895f85ae1154", // Substitua por sua App ID
                    identifier: data.affiliateId,
                    tags: {
                        email: data.email,
                        phone: `+55${data.phone}`
                    }
                })
            });

            const result = await response.json();
            console.log(result);
        });
    });
});

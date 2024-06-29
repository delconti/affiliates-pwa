if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js')
        .then(() => console.log('Service Worker registered'));
}

const registrationForm = document.getElementById('registrationForm');
registrationForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const formData = new FormData(registrationForm);
    const data = {
        email: formData.get('email'),
        phone: formData.get('phone'),
        affiliateId: formData.get('affiliateId'),
    };

    // Initialize OneSignal
    window.OneSignal = window.OneSignal || [];
    OneSignal.push(() => {
        OneSignal.init({
            appId: "SEU-ONESIGNAL-APP-ID", // Substitua por sua App ID
            allowLocalhostAsSecureOrigin: true,
        });

        OneSignal.push(() => {
            OneSignal.getUserId(async (userId) => {
                if (userId) {
                    // Set external user ID
                    OneSignal.setExternalUserId(data.affiliateId);
                    
                    // Save essential user information to OneSignal tags
                    await OneSignal.sendTags({
                        email: data.email,
                        phone: data.phone
                    });
                }
            });
        });
    });
});

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
    };

    // Initialize OneSignal
    window.OneSignal = window.OneSignal || [];
    OneSignal.push(() => {
        OneSignal.init({
            appId: "YOUR-ONESIGNAL-APP-ID",
            allowLocalhostAsSecureOrigin: true,
        });

        OneSignal.push(() => {
            OneSignal.getUserId(async (userId) => {
                if (userId) {
                    // Save user information to OneSignal tags
                    await OneSignal.sendTags({
                        userId: userId,
                        name: data.name,
                        email: data.email,
                        phone: data.phone,
                        affiliateId: data.affiliateId,
                    });
                }
            });
        });
    });
});

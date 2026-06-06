// MidsizeAI Website Logic

document.addEventListener("DOMContentLoaded", () => {
    console.log("MidsizeAI Ecosystem Initialized successfully.");

    // Dynamic Tracking Example: 
    // If a roofer comes from the podcast via a link like midsizeai.com?ref=podcast
    // We can track that and customize Samantha's booking link for them.
    const urlParams = new URLSearchParams(window.location.search);
    const referrer = urlParams.get('ref');
    
    if (referrer === 'podcast') {
        console.log("Visitor arrived from the Honest Roofer Podcast!");
        // You can add logic here to highlight podcast guest forms automatically
    }
});

// Function to smoothly open your GoHighLevel Web Call widget if needed later
function startSamanthaWebCall() {
    // This will house the Vapi / GoHighLevel Web-Call trigger script
    console.log("Connecting to Samantha AI Web Call Line...");
}

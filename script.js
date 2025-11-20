// script.js

// Load the API key from environment variables injected during build
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

// Quick safety check
if (!API_KEY) {
    console.error("Error: API key is missing. Make sure VITE_GEMINI_API_KEY is set in GitHub Secrets.");
}

// Example: call Gemini API
async function generateMood(text) {
    try {
        const response = await fetch("https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateText?key=" + API_KEY, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                prompt: { text }
            })
        });

        const data = await response.json();
        console.log("API Response:", data);
        return data;
    } catch (error) {
        console.error("Error:", error);
    }
}

// Example usage
document.addEventListener("DOMContentLoaded", () => {
    const btn = document.getElementById("analyzeBtn");
    const input = document.getElementById("textInput");
    const output = document.getElementById("result");

    btn.addEventListener("click", async () => {
        const mood = await generateMood(input.value);
        output.textContent = JSON.stringify(mood, null, 2);
    });
});

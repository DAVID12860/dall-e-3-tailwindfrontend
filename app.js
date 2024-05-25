document.getElementById("image-form").addEventListener("submit", async function(event) {
    event.preventDefault();
    
    const prompt = document.getElementById("prompt").value;
    const size = document.getElementById("size").value;
    const quality = document.getElementById("quality").value;

    const apiKey = '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'; // Replace with your actual API key

    try {
        const response = await fetch('https://api.openai.com/v1/images/generations', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: "dall-e-3",
                prompt: prompt,
                size: size,
                quality: quality,
                n: 1 // Number of images to generate
            })
        });
        
        const data = await response.json();
        if (response.ok) {
            const imageUrl = data.data[0].url; // Extract image URL from response
            displayImage(imageUrl, prompt);
        } else {
            console.error("Error:", data);
            alert("Failed to generate image. Please try again.");
        }
    } catch (error) {
        console.error("Error:", error);
        alert("An error occurred. Please try again.");
    }
});

function displayImage(url, altText) {
    const imageContainer = document.getElementById("image-container");
    imageContainer.innerHTML = ''; // Clear previous images
    const imgElement = document.createElement("img");
    imgElement.src = url;
    imgElement.alt = altText;
    imgElement.classList.add("m-4", "shadow-md", "rounded");
    imageContainer.appendChild(imgElement);
}
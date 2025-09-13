const form = document.getElementById("upload-form");
const resultContainer = document.getElementById("result-container");
const resultJson = document.getElementById("result-json");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const response = await fetch("/upload/", {
        method: "POST",
        body: formData,
    });

    if (response.ok) {
        const data = await response.json();
        resultJson.textContent = JSON.stringify(data, null, 2);
        resultContainer.style.display = "block";
    } else {
        resultJson.textContent = "An error occurred.";
        resultContainer.style.display = "block";
    }
});

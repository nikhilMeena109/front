// script.js

async function submitData() {
    const jsonInput = document.getElementById('jsonInput').value;
    const errorElement = document.getElementById('error');
    const dropdownContainer = document.getElementById('dropdownContainer');
    const resultsContainer = document.getElementById('resultsContainer');

    // Reset previous error messages and results
    errorElement.classList.add('hidden');
    resultsContainer.innerHTML = '';

    try {
        // Validate JSON
        const data = JSON.parse(jsonInput);

        // Call API
        const response = await fetch('http://localhost:3000/process-data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ data }),
        });

        const result = await response.json();

        // Check if the response is successful
        if (result.is_success) {
            dropdownContainer.classList.remove('hidden');
            sessionStorage.setItem('apiResponse', JSON.stringify(result));
        } else {
            errorElement.textContent = "An error occurred while processing the data.";
            errorElement.classList.remove('hidden');
        }
    } catch (error) {
        // Display error for invalid JSON
        errorElement.textContent = "Invalid JSON format. Please enter valid JSON.";
        errorElement.classList.remove('hidden');
    }
}

function filterResults() {
    const selectedOptions = Array.from(document.getElementById('dataSelect').selectedOptions).map(option => option.value);
    const resultsContainer = document.getElementById('resultsContainer');
    const apiResponse = JSON.parse(sessionStorage.getItem('apiResponse'));
    resultsContainer.innerHTML = ''; // Clear previous results

    selectedOptions.forEach(option => {
        const dataElement = document.createElement('p');
        dataElement.textContent = `${option.charAt(0).toUpperCase() + option.slice(1)}: ${apiResponse[option]}`;
        resultsContainer.appendChild(dataElement);
    });
}

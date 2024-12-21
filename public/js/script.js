document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault();
    const name = document.querySelector('input[name="name"]').value;
    const form = document.getElementById('communityForm');

    // Simulate form submission for demonstration purposes
    // In a real scenario, you would use AJAX to send the form data to the server
    setTimeout(() => {
        form.style.display = 'none';
        document.getElementById('welcome-name').innerText = `Welcome, ${name}!`;
        document.getElementById('welcome').style.display = 'block';
    }, 1000);
});

function showKidsDetails(show) {
    const kidsDetails = document.getElementById('kids-details');
    if (show) {
        kidsDetails.style.display = 'block';
        kidsDetails.innerHTML = `
            <input type="number" name="number_of_kids" placeholder="Number of Kids" required>
            <div id="kids-info"></div>
        `;
    } else {
        kidsDetails.style.display = 'none';
        document.getElementById('kids-info').innerHTML = '';
    }
}

document.querySelector('input[name="number_of_kids"]').addEventListener('input', function(event) {
    const numberOfKids = event.target.value;
    const kidsInfo = document.getElementById('kids-info');
    kidsInfo.innerHTML = '';
    for (let i = 0; i < numberOfKids; i++) {
        kidsInfo.innerHTML += `
            <h3>Kid ${i + 1} Details:</h3>
            <input type="text" name="kid_name_${i}" placeholder="Kid ${i + 1} Name" required>
            <input type="date" name="kid_dob_${i}" placeholder="Kid ${i + 1} Date of Birth" required>
            <label for="kid_education_${i}">Education:</label>
            <select name="kid_education_${i}" required>
                <option value="10th">10th</option>
                <option value="12th">12th</option>
                <option value="graduation">Graduation</option>
            </select>
            <label for="kid_marital_status_${i}">Marital Status:</label>
            <select name="kid_marital_status_${i}" required>
                <option value="single">Single</option>
                <option value="married">Married</option>
            </select>
        `;
    }
});

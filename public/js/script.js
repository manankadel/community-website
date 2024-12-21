document.addEventListener('DOMContentLoaded', function() {
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

    document.querySelectorAll('input[name="married"]').forEach((elem) => {
        elem.addEventListener('change', function(event) {
            const value = event.target.value;
            const spouseDetails = document.getElementById('spouse-details');
            if (value === 'yes') {
                spouseDetails.style.display = 'block';
            } else {
                spouseDetails.style.display = 'none';
                // Clear spouse details inputs if hidden
                document.getElementById('spouse_name').value = '';
                document.getElementById('spouse_dob').value = '';
                document.getElementById('spouse_age').value = '';
                document.getElementById('spouse_gotra').value = '';
            }
        });
    });

    document.querySelectorAll('input[name="kids"]').forEach((elem) => {
        elem.addEventListener('change', function(event) {
            const value = event.target.value;
            const kidsDetails = document.getElementById('kids-details');
            if (value === 'yes') {
                kidsDetails.style.display = 'block';
            } else {
                kidsDetails.style.display = 'none';
                // Clear kids details inputs if hidden
                document.getElementById('number_of_kids').value = '';
                document.getElementById('kids-info').innerHTML = '';
            }
        });
    });

    document.getElementById('number_of_kids').addEventListener('input', function(event) {
        const numberOfKids = event.target.value;
        const kidsInfo = document.getElementById('kids-info');
        kidsInfo.innerHTML = '';
        for (let i = 0; i < numberOfKids; i++) {
            kidsInfo.innerHTML += `
                <h3>Kid ${i + 1} Details:</h3>
                <input type="text" name="kid_name_${i}" placeholder="Kid ${i + 1} Name" required>
                <input type="date" name="kid_dob_${i}" required>
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
});

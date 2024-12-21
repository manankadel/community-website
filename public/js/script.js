document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('communityForm');
    form.addEventListener('submit', function (event) {
        const name = document.querySelector('input[name="name"]').value;
        form.style.display = 'none';
        document.getElementById('welcome-name').innerText = `Welcome, ${name}!`;
        document.getElementById('welcome').style.display = 'block';
    });

    // Married logic
    document.querySelectorAll('input[name="married"]').forEach((elem) => {
        elem.addEventListener('change', function (event) {
            const value = event.target.value;
            document.getElementById('spouse-details').style.display = value === 'yes' ? 'block' : 'none';
        });
    });

    // Kids logic
    document.querySelectorAll('input[name="kids"]').forEach((elem) => {
        elem.addEventListener('change', function (event) {
            const value = event.target.value;
            document.getElementById('kids-details').style.display = value === 'yes' ? 'block' : 'none';
        });
    });

    // Dynamic kids details
    document.getElementById('number_of_kids').addEventListener('input', function (event) {
        const kidsInfo = document.getElementById('kids-info');
        kidsInfo.innerHTML = '';
        for (let i = 0; i < event.target.value; i++) {
            kidsInfo.innerHTML += `
                <h3>Kid ${i + 1} Details:</h3>
                <input type="text" name="kid_name_${i}" placeholder="Kid ${i + 1} Name" required>
                <input type="date" name="kid_dob_${i}" required>
                <label>Education:</label>
                <select name="kid_education_${i}" required>
                    <option value="10th">10th</option>
                    <option value="12th">12th</option>
                    <option value="graduation">Graduation</option>
                </select>
                <label>Marital Status:</label>
                <select name="kid_marital_status_${i}" required>
                    <option value="single">Single</option>
                    <option value="married">Married</option>
                </select>`;
        }
    });
});

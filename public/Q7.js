document.addEventListener('DOMContentLoaded', function() {
    const dateElement = document.getElementById('current-date');
    const registrationForm = document.getElementById('registration-form'); // Change this to the actual form ID

    // Function to get the current date and time in the desired format
    function getCurrentDateTime() {
        const date = new Date();
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const dateString = date.toLocaleDateString(undefined, options);

        let hours = date.getHours();
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const seconds = date.getSeconds().toString().padStart(2, '0');
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // The hour '0' should be '12'

        const timeString = `${hours}:${minutes}:${seconds} ${ampm}`;
        return `${dateString}, ${timeString}`;
    }

    // Set the date and time to the HTML element
    if (dateElement) {
        dateElement.textContent = getCurrentDateTime();
    }
//password validation
    document.getElementById('createAccountForm').addEventListener('submit', function(event) {
        let username = document.getElementById('username').value;
        let password = document.getElementById('password').value;
        let confirmPassword = document.getElementById('confirmPassword').value;
    
        if (!username || !password || !confirmPassword) {
            alert("All fields are required.");
            event.preventDefault();
        } else if (password !== confirmPassword) {
            alert("Passwords do not match.");
            event.preventDefault();
        }
    });
});

//this for find pets webpage and its options
document.getElementById('submitBtn').addEventListener('click', function() {
    // Get form values
    const type = document.getElementById('type').value;
    const age = document.getElementById('age').value;
    const gender = document.getElementById('gender').value;

    // Simple client-side validation
    if (!type || !age || !gender) {
        alert('Please fill out all fields');
        return;
    }

    // Example data (in a real application, you would fetch this from a server)
    const pets = [
        { type: 'cat', age: '2', gender: 'male', Breed:'Maine Coon', name: 'Mittens' },
        { type: 'dog', age: '3', gender: 'female',Breed:'Bulldog', name: 'Rover' },
        { type: 'cat', age: '1', gender: 'female',Breed:'Scottish Fold', name: 'Fluffy' },
        { type: 'dog', age: '3', gender: 'male',Breed:'Labrador Retriever', name: 'Fido' }
    ];

    // Filter pets based on form input
    const results = pets.filter(pet => {
        return pet.type === type && pet.age === age && pet.gender === gender;
    });

    // Display results
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';

    if (results.length > 0) {
        results.forEach(pet => {
            const petDiv = document.createElement('div');
            petDiv.innerHTML = `Name: ${pet.name}, Type: ${pet.type}, Age: ${pet.age}, Gender: ${pet.gender}`;
            resultsDiv.appendChild(petDiv);
        });
    } else {
        resultsDiv.innerHTML = 'No matching pets found.';
    }
});

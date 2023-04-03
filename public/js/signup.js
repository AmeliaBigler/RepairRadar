const signupFormHandler = async (event) => {
    event.preventDefault();

    const userType = document.querySelector('#user-type').value;
    const username = document.querySelector('#name-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();

    if (userType === 'User') {
        if (username && email && password) {
            const response = await fetch('/users/signup', {
                method: 'POST',
                body: JSON.stringify({ userType, username, email, password }),
                headers: { 'Content-Type': 'application/json' },
            });

            if (response.ok) {
                alert('Sign up successful.')
                document.location.replace('/');
            } else {
                alert('Failed to signup.');
            }
        }
    } else if (userType === 'Mechanic') {
        if (username && email && password) {
            const response = await fetch('/users/signup', {
                method: 'POST',
                body: JSON.stringify({ userType, username, email, password }),
                headers: { 'Content-Type': 'application/json' },
            });

            if (response.ok) {
                alert('Sign up successful.')
                document.location.replace('/');
            } else {
                alert('Failed to signup.');
            }
        }
    }

};


document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);
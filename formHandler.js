const lambdaUrl = 'https://w2t4e4x656bgnsjnacsxxaxzwm0zaoya.lambda-url.us-east-1.on.aws/?action=form&key=pfdH8qWabOP81YLJXZbg'

// formHandler.js
function wrappedSubmit(event, oldHandler) {
    event.preventDefault();

    // Get the form that triggered the event
    const form = event.target;

    if (!oldHandler(form)) {
        return
    }

    // Create a FormData object from the form
    const formData = new FormData(form);

    // Convert FormData to a plain object
    const formObject = {};
    formData.forEach((value, key) => {
        formObject[key] = value;
    });

    // Add the form name to the data
    formObject['formName'] = form.getAttribute('name') || 'Unnamed Form';

    // Send form data to another URL
    fetch(lambdaUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formObject)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        window.location.href = formObject['redirect']        
    })
    .catch((error) => {
        console.error('Error:', error);
    });
};

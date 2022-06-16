//Declare variables

const password = document.querySelector('.password-field');
const checkboxes = document.querySelectorAll('.checkbox');
const ranges = document.querySelectorAll('.lever');
const okButton = document.querySelector('.ok-button');
const launch = document.querySelector('.launch-button');

let correctPassword = 'TrustNo1';

// Disable checkboxes, ranges and launch button by default
const disable = () => {
    checkboxes.forEach(button => {
        button.setAttribute('disabled', 'true');
    })
    ranges.forEach(button => {
        button.setAttribute('disabled', 'true');
    })
    launch.setAttribute('disabled', 'true');
}

// Conditions for launch-button
const launchSecurity = () => {
    let allCheckboxesChecked = true;
    let allLeversToHighest = true;

    for (let i = 0; i < checkboxes.length; i++) {
        let element = checkboxes[i];
        if (!element.checked) {
            allCheckboxesChecked = false;
        }
    }

    for (let i = 0; i < ranges.length; i++) {
        let element = ranges[i];
        if (element.value < 100) {
            allLeversToHighest = false;
        }
    }

    if (allCheckboxesChecked && allLeversToHighest === true) {
        launch.removeAttribute('disabled');
    }
}

// Function that enable checkboxes, ranges and launch
const enable = () => {

    launchSecurity();

    checkboxes.forEach( button => {
        button.removeAttribute('disabled');
    })
    ranges.forEach( button => {
        button.removeAttribute('disabled');
    })

    checkboxes.forEach( button => {
        button.onchange = launchSecurity;
    });
    ranges.forEach( button => {
        button.onchange = launchSecurity;
    });
}

// Function that recieve password
const checkPassword = () => {
    if (correctPassword === password.value) {
        password.value = '';
        password.setAttribute('disabled', 'true');
        okButton.setAttribute('disabled', 'true');
        enable();

    } else {
        password.value = '';
        alert('Incorrect password')
    }
}

// Create animation
const fly = () => {
    const rocket = document.querySelector(".rocket");

    rocket.animate([
        {transform: 'translate(0, 0) scale(20%) rotate(30deg)'},
            {transform: 'translate(600px, -320px) scale(40%) rotate(30deg)'}
    ],
        {
            duration: 4000,
            iterations: 1
        })
}

// Prevent unplanned rocket start
const uncheckLaunch = () => {
    checkboxes.forEach(button => {
        button.checked = false;
    })
    ranges.forEach(button => {
        button.value = 50;
    })
    launch.setAttribute('disabled', 'true');
}

//Function that controls order
const controlButtons = () => {
    disable();
    okButton.addEventListener('click', () => checkPassword());
    uncheckLaunch();
    launch.addEventListener('click', () => fly());
}
controlButtons();


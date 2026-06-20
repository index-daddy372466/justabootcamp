// variables
const logoContainer = document.getElementById('logo-container');
const email_input = document.getElementById('email-input');
const newsletterForm = document.getElementById('newsletter-form')
// functions
function handleWindowScroll(e) {
    const {scrollY} = window;
    const isPast = (y) => y > 0;

    // if logoContainer scrollY greater than 0 (leaves start)
    if(isPast(scrollY)) {
        logoContainer.classList.add('fixed-logo');
    }
    else {
        logoContainer.classList.remove('fixed-logo');
    }
}

// onscroll event
window.onscroll = handleWindowScroll


export function vibrateMode() {
    if(navigator.vibrate) {
        navigator.vibrate(133);

        console.log('vibration success')
        // alert('vibration success')
    }
}

let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
function verifyEmail(value) {
    return emailRegex.test(value);
}

if(email_input){
    email_input.oninput = handleEmailInput
}

function handleEmailInput(e) {
    const target = e.target;
    const value = e.target.value;

    console.log(value)

    if(verifyEmail(value)) {
        target.classList.add('green-force');

        newsletterForm.onsubimt = handleSubmit
        // document.getElementById('submit-input').onsubimt = handleSubmit
    } else {
        target.classList.remove('green-force');
        
    }
} 


function handleSubmit(e) {
    e.preventDefault()
    console.log(e)
}
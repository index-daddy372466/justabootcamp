// variables
const logoContainer = document.getElementById('logo-container');
const email_input = document.getElementById('email-input');
const newsletterForm = document.getElementById('newsletter-form');
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
const hamburger_menu = document.getElementById('hamburger-menu');
const hamburger_spans = [...hamburger_menu.children];
const span_rotate = 'span-rotate'
const hamburger_opens = ['top','mid','bottom']



// functions
// toggle hamburger with children & value (true/false)
function toggleHamburgerMenu(children) {
    for(let i = 0; i < children.length; i++) {
        // console.log(children[i])
        // console.log(children.indexOf(children[i]))

        // toggle each span
        children[i].classList.toggle(`${span_rotate}-${hamburger_opens[i]}`)
    }
}
toggleHamburgerMenu(hamburger_spans)
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

// verify email
function verifyEmail(value) {
    return emailRegex.test(value);
}

if(email_input){
    email_input.oninput = handleEmailInput
}

// handle email input
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

// handle submit
function handleSubmit(e) {
    e.preventDefault()
    console.log(e)
}

// virbate mode
export function vibrateMode() {
    if(navigator.vibrate) {
        navigator.vibrate(133);

        console.log('vibration success')
        // alert('vibration success')
    }
}
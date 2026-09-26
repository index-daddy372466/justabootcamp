// variables
const logoContainer = document.getElementById('logo-container');
const email_input = document.getElementById('email-input');
const newsletterForm = document.getElementById('newsletter-form');
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
const hamburger_menu = document.getElementById('hamburger-menu');
const hamburger_spans = hamburger_menu ? [...hamburger_menu.children] : null;
const span_rotate = 'span-rotate'
const hamburger_opens = ['top','mid','bottom']
const countdownContainer = document.getElementById('countdown-container')


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
// toggleHamburgerMenu(hamburger_spans)
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

// generate next saturday countdown
// function getNextSaturdayCountdown() {
//     const now = new Date();
//     let target = new Date();

//     // Set target time to 8:15:00 AM
//     target.setHours(8, 15, 0, 0);

//     // Calculate days until next Saturday (Saturday is 6)
//     // If today is Saturday and it's past 8:15 AM, it will target next week
//     let daysUntilSaturday = (6 - now.getDay() + 7) % 7;

//     if (daysUntilSaturday === 0 && now.getTime() >= target.getTime()) {
//         daysUntilSaturday = 7;
//     }

//     // Adjust target date to the correct Saturday
//     target.setDate(now.getDate() + daysUntilSaturday);

//     // Calculate the difference in milliseconds
//     const difference = target.getTime() - now.getTime();

//     // Convert difference into time units
//     const days = Math.floor(difference / (1000 * 60 * 60 * 24));
//     const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
//     const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
//     const seconds = Math.floor((difference % (1000 * 60)) / 1000);

//     let result = {
//         totalMs: difference,
//         days,
//         hours,
//         minutes,
//         seconds,
//         formatted: `${days}d ${hours}h ${minutes}m ${seconds}s`
//     };
//     return result;
// }
function getNextSundayCountdown() {
    const now = new Date();
    let target = new Date();

    // Set target time to 8:15:00 AM
    target.setHours(8, 15, 0, 0);

    // Calculate days until next Saturday (Saturday is 6)
    // If today is Saturday and it's past 8:15 AM, it will target next week
    let daysUntilSaturday = (7 - now.getDay() + 7) % 7;

    if (daysUntilSaturday === 0 && now.getTime() >= target.getTime()) {
        daysUntilSaturday = 7;
    }

    // Adjust target date to the correct Saturday
    target.setDate(now.getDate() + daysUntilSaturday);

    // Calculate the difference in milliseconds
    const difference = target.getTime() - now.getTime();

    // Convert difference into time units
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    let result = {
        totalMs: difference,
        days,
        hours,
        minutes,
        seconds,
        formatted: `${days}d ${hours}h ${minutes}m ${seconds}s`
    };
    return result;
}

// handle countdown container
let countdownChildren = [...countdownContainer.children];

// iterate through countdown
for(let i of countdownChildren){
    const {id} = i;
    setInterval(()=>{
    // i.textContent = `${getNextSaturdayCountdown()[id]}`;
    i.textContent = `${getNextSundayCountdown()[id]}`;
    },1000)

    i.classList.add('countdown')
}

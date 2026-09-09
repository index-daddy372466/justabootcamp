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
function getNextSaturdayCountdown() {
  const now = new Date();
  
  // Get current date strings in Eastern Time
  const options = { 
    timeZone: 'America/New_York', 
    year: 'numeric', month: '2-digit', day: '2-digit', 
    hour: '2-digit', minute: '2-digit', second: '2-digit', 
    hour12: false 
  };
  
  const formatter = new Intl.DateTimeFormat('en-US', options);
  const parts = formatter.formatToParts(now);
  const getPart = (type) => parts.find(p => p.type === type).value;
  
  // Build a date object representing current ET time values
  const etNowString = `${getPart('year')}-${getPart('month')}-${getPart('day')}T${getPart('hour')}:${getPart('minute')}:${getPart('second')}`;
  const etNow = new Date(etNowString);
  
  // Find day of week in ET (0 = Sunday, 6 = Saturday)
  const etDay = new Intl.DateTimeFormat('en-US', { timeZone: 'America/New_York', weekday: 'short' }).format(now);
  // Map day string or get numeric day via formatting a reference or shift
  const dayOfWeek = (new Date(etNow.toLocaleString('en-US', { timeZone: 'America/New_York' }))).getDay();
  
  // Calculate days until next Saturday (6)
  let daysUntilSat = (6 - dayOfWeek + 7) % 7;
  if (daysUntilSat === 0) {
    // If today is Saturday, target next week's Saturday
    daysUntilSat = 7;
  }
  
  // Target next Saturday at 00:00:00 ET
  const targetET = new Date(etNow);
  targetET.setDate(etNow.getDate() + daysUntilSat);
  targetET.setHours(0, 0, 0, 0);
  
  // Find difference in milliseconds
  // We compute offset between local time and target ET to align properly
  const diff = targetET - etNow;
  
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / 1000 / 60) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  
  let result = { days, hours, minutes, seconds, totalMs: diff };
  return result
}

// handle countdown container
let countdownChildren = [...countdownContainer.children];

// iterate through countdown
for(let i of countdownChildren){
    const {id} = i;
    setInterval(()=>{
    i.textContent = `${getNextSaturdayCountdown()[id]}`;
    },1000)

    i.classList.add('countdown')
}

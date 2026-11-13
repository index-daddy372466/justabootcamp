// variables
const logoContainer = document.getElementById('logo-container');
const logoSub = document.querySelector('.logo-subheader')
const email_input = document.getElementById('email-input');
const newsletterForm = document.getElementById('newsletter-form');
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
const hamburger_menu = document.getElementById('hamburger-menu');
const hamburger_spans = hamburger_menu ? [...hamburger_menu.children] : null;
const span_rotate = 'span-rotate'
const hamburger_opens = ['top','mid','bottom']
const contest_images_contiainer = document.getElementById('contest-images-container')
// const countdownContainer = document.getElementById('countdown-container')


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
        logoSub.classList.add('fixed-logo-subheader')
    }
    else {
        logoContainer.classList.remove('fixed-logo');
        logoSub.classList.remove('fixed-logo-subheader');
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

// toggle photos/images
let contest_images = [...document.querySelectorAll('.contest-img')]
for(let i = 0; i < contest_images.length; i++) {
    contest_images[i].onclick = enlargePhoto;
}
// click image / contest photo
function enlargePhoto(e) {
    const img = e.target;

    if(!img){
        console.error('Error: Check image source')
        return;
    }

    // get the current boolean from contest image
    let current_view = (img.getAttribute('--data-enlarged')) === "true" ? true : false;
    

    console.log("current view",current_view)

    if(!current_view){
        img.setAttribute('--data-enlarged', !current_view);
    }

    console.log("updated view",img.getAttribute('--data-enlarged') === "true" ? true : false)


    
    // if current_view is enlarged (true)
    if(current_view) {
        console.log('Image is already open. Click the background to exit.')
        return;
    }



    // create element (div)
    let div = document.createElement('div');

    // update div ID
    div.setAttribute('id','enlarged-bg');

    // update image class
    img.classList.add('enlarged-contest-img')

    // append image to div
    div.appendChild(img);

    // append div to container
    contest_images_contiainer.appendChild(div)


    // handle minimizing photo onclick
    div.onclick = minmizePhoto
}


function minmizePhoto(e) {
    let background_element = e.current_target || document.getElementById('enlarged-bg');

    if(!background_element){
      console.error('Error: Check image background source')
        return;
    }

    // append the image to the container 
    let image = background_element.children[0];
    contest_images_contiainer.appendChild(image);

    // update image class
    image.classList.remove('enlarged-contest-img')

    // update image attribute to false
    image.setAttribute('--data-enlarged',false)

    // remove background div
    background_element.remove();

}
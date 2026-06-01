// variables
const logoContainer = document.getElementById('logo-container');

// functions
function handleWindowScroll(e) {
    const {scrollY} = window;
    const isPast = (y) => y > 0;

    // if logoContainer scrollY greater than 0 (leaves start)
    if(isPast(scrollY)) {
        logoContainer.classList.add('fixed-logo')
    }
    else {
        logoContainer.classList.remove('fixed-logo')
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
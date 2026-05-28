import postFetch from "../postfetch.js"
// variables
const stars = [...document.querySelectorAll('.star')]
const polls = [...document.querySelectorAll('.poll-item')]
const submit_btn = document.getElementById('form-submit')
const star_obj = {
    blank:'./media/star_blank.png',
    full:'./media/star_full.png'
}
let global_rating = []
let global_rating_set = [];
let clicked = false;


// map stars
stars.map((star, index) => {
    star.onmouseover = (e) => startRatingHover(e,index)
    star.onmouseout = (e) => startRatingHoverOut(e,index)
    star.onclick = handleRatingClick

})

// map poll items
polls.map(poll => {
    poll.onclick = clickPollItem
})

// submit button
submit_btn.onclick = handleSubmit


// functions
function handleRatingClick(e) {
    global_rating_set = []
    global_rating_set = [...global_rating]

    stars.map(st => {
        if(global_rating_set.indexOf(st) == -1) {
            st.src = star_obj.blank;
        }
    })
    global_rating = []; // reset global rating for new portions
    vibrateMode()
    clicked = true;

}

function startRatingHover(e,index) {
    
    let portion = [];
    const target = e.target;
    
        console.log('alternative');

        portion = [...stars.filter((_,idx) => idx <= index)];
        global_rating = [...portion]

        portion.map(p => p.src = star_obj.full)

        console.log("PORTION", portion)
        console.log("PORTION_LENGTH", portion.length)
        
}

function startRatingHoverOut(e,index) {
    const target = e.target;

    // if not clicked
    if(!clicked) {
        stars.map(star => {
            star.src = star_obj.blank;
        })
    }

    // if clicked 
    if(clicked && global_rating_set.length > 0) {
        if(global_rating_set.indexOf(target) == -1){
            target.src = star_obj.blank
        }
    }
    
}

function clickPollItem(e){
    const target = e.target;
    target.classList.toggle('poll-active')

    vibrateMode()
}

function vibrateMode() {
    if(navigator.vibrate) {
        navigator.vibrate(133);

        console.log('vibration success')
        // alert('vibration success')
    }
}

function handleSubmit(){
    const dataset = {test:'kyle'}
    vibrateMode();
    
    postFetch('/rate-review/api/send-review',dataset)
}


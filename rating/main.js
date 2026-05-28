// variables
const stars = [...document.querySelectorAll('.star')]
const polls = [...document.querySelectorAll('.poll-item')]
const submit_btn = document.getElementById('form-submit')
const textarea = document.getElementById('textarea-feedback')

const star_obj = {
    blank:'./media/star_blank.png',
    full:'./media/star_full.png'
}
const url = {
    rating:'/rate-review/api/send-review'
}
let global_rating = []
let global_rating_set = [];
let clicked = false;
let dataset = {};

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
submit_btn.onclick = () => handleRatingSubmit(dataset)

textarea.oninput = handleTextArea

function handleTextArea(e) {
    const value = e.target.value;

    dataset.textarea = value;

    console.log(dataset)
}
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

    dataset.rating = global_rating_set.length;

    console.log(dataset)
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

    if(!dataset.hasOwnProperty('polls')) {
        dataset.polls = [];
    }
    if(dataset.polls){
        if(dataset.polls.indexOf(target.textContent) > -1) {
            dataset.polls = [...dataset.polls].filter(x => x !== target.textContent)
            
    } else {
        dataset.polls.push(target.textContent)
    }
    }

    
    // if(!target.classList.contains('poll-active') && dataset.polls.indexOf(target.textContent) == -1) {
        
    //     dataset.polls.push(target.textContent)
    // }

    // if(target.classList.contains('poll-active')) {
    //     dataset.polls = [...dataset.polls].filter(x => x !== target.textContent);
    // }

    console.log(dataset)
    console.log(target.classList)

}

function vibrateMode() {
    if(navigator.vibrate) {
        navigator.vibrate(133);

        console.log('vibration success')
        // alert('vibration success')
    }
}



function handleRatingSubmit(body){
    if(Object.keys(body).length < 1) {
        alert('Form: Check Body/Information');
        return;
    }

    alert(JSON.stringify(body))
}



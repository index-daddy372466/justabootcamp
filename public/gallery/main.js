import getFetch from '../fetch/getfetch.js'
const galleryContainer = document.getElementById('gallery-container')
let getMedia = await getFetch('/gallery/media','media');



/* ----------- Fetch media files ----------- */

let mediaObj = {} // declare media object
// iterate through media
for(let i = 0; i < getMedia.length; i++) {
    let media = getMedia[i]

    console.log(media);
    let split_media = media.split`.`
    let media_date = split_media[0]

    if(!mediaObj.hasOwnProperty(media_date) && Object.keys(mediaObj).indexOf(media_date) == -1){
        mediaObj[media_date] = []
    };

    if([...mediaObj[media_date]].indexOf(media) == -1) {
         mediaObj[media_date] = [...mediaObj[media_date],media]
    }

}
// display
displayClasses(mediaObj)

// <!-- section -->
//      <section id="20260613" class="class-gal gal-class class-section">
//         <h5 class="date-item header-font">20260613</h5>
//      </section>
//      <section id="20260606" class="class-gal gal-class class-section">
//         <h5 class="date-item header-font">20260606</h5>

//      </section>
//      <section id="20260530" class="class-gal gal-class class-section">
//         <h5 class="date-item header-font">20260530</h5>
        
//      </section>

/* ----------- Fetch media files ----------- */





// functions

// convert date to time
function convertDateToTime(date){
    let year = date.slice(0,4)
    let month = date.slice(4,6)
    let day = date.slice(6,8)
    let format_date = [month,day,year].join`-`

    // console.log(year,month,day)
    // console.log(format_date)
    if(!date || typeof(date) !== 'string'){
        console.error('convertDateToTime: Check arguments');
        return;
    }
    return new Date((format_date)).getTime();
}

function displayClasses(media_object){
    for(let key in media_object) {
        let section = document.createElement('section'), date_item = document.createElement('h5')
        section.id = convertDateToTime(key);
        section.classList.add('class-section','section-class')

        date_item.classList.add('date-item','header-font')
        date_item.textContent = section.id;

        section.appendChild(date_item)
        galleryContainer.appendChild(section)
    }
    
}

function hideClass(){}

function removeClass(){}





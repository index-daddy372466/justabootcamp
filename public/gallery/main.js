import getFetch from '../fetch/getfetch.js'
const galleryContainer = document.getElementById('gallery-container')
const preview_img = document.getElementById('preview-img')
let getMedia = await getFetch('/gallery/media','media');

console.log(getMedia)


/* ----------- Fetch media files ----------- */

let mediaObj = {} // declare media object
// iterate through media
for(let i = 0; i < getMedia.length; i++) {
    let {filename,data} = getMedia[i]

    let split_media = filename.split`.`
    let media_date = split_media[0]

    if(!mediaObj.hasOwnProperty(media_date) && Object.keys(mediaObj).indexOf(media_date) == -1){
        mediaObj[media_date] = []
    };

    if([...mediaObj[media_date]].indexOf(filename) == -1) {
         mediaObj[media_date] = [...mediaObj[media_date],{filename:filename,data:data}]
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
        let section = document.createElement('section'), date_item = document.createElement('h5'),
        section_div = document.createElement('div')

        section_div.classList.add('section-div')
        
        section.id = convertDateToTime(key);
        section.classList.add('class-section','section-class')

        date_item.classList.add('date-item','header-font')
        date_item.textContent = section.id;

        section.appendChild(date_item)
        galleryContainer.appendChild(section);
        
        let images = [...media_object[key]];
        images.map(image => {
            let img = new Image();
            let split_filename = image.filename.split`.`;
            let get_ext = split_filename[split_filename.length - 1];
            img.classList.add('class-image');

            
            let base64 = image['data'];

            // 3. Set it as the source of your image element
            img.src = base64;

            // 4. Clean up memory after the image loads
            // img.onload = () => {
            //     URL.revokeObjectURL(imageUrl);

            section_div.appendChild(img);
            section.appendChild(section_div);

            // console.log(img)
            // }

            img.onclick = viewImg;
            
        })
        
    }
    
}

function hideClass(){}

function removeClass(){}

let showing = false;
function viewImg(e) {
    let target = e.target
    let src = target.src;

    preview_img.src = src;
    preview_img.classList.remove('no-display');

    setTimeout(()=>showing = true,100)

    
}

window.onclick = (e) => {
    if(showing && !e.target.classList.contains('class-image')) {
        preview_img.classList.add('no-display')
    }
    showing = false;
}

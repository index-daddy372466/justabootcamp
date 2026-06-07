import getFetch from '../fetch/getfetch.js'
import { vibrateMode } from '../main.js';

// variables
const galleryContainer = document.getElementById('gallery-container')
const preview_img = document.getElementById('preview-img')
const previewExit = document.getElementById('preview-exit')

let files = await getFetch('/gallery/media2','dataset');
const {media} = JSON.parse(files);
// console.log(media) // check media dataset

/* ----------- Fetch media files ----------- */

// display rows of classes by date
displayClasses(media)


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

        section_div.classList.add('section-div','no-scrollbar')
        
        section.id = convertDateToTime(key);
        let formal_date = new Date(+section.id).toDateString()
        section.classList.add('class-section','section-class','no-scrollbar')

        date_item.classList.add('date-item','header-font')
        // date_item.textContent = section.id;
        date_item.textContent = formal_date

        section.appendChild(date_item)
        galleryContainer.appendChild(section);
        
        let images = [...media_object[key]];
        // console.log(images)
        // console.log(key)

        images.map(image => {
            let img = new Image();
            img.classList.add('class-image');

            // 3. Set the source of your image element
            img.src = image

            section_div.appendChild(img);
            section.appendChild(section_div);

            img.onclick = viewImg;
            
        })
        
    }
}
// sort sections
let all_sections = [...document.querySelectorAll('.class-section')]

let sort_sections = [...all_sections].sort((a,b) => {
    return new Date(b.children[0].textContent).getTime() - new Date(a.children[0].textContent).getTime()
})
// replace children
galleryContainer.replaceChildren(...sort_sections)

function exitPreview(e){
    vibrateMode()
    const target = e.target;

    preview_img.src = null;
    galleryContainer.classList.remove('blur-effect')
    preview_img.classList.add('no-display');
    previewExit.classList.add('no-display');
    
    showing = false

}

function removeClass(){}

var showing = false;
function viewImg(e) {
    vibrateMode()
    galleryContainer.classList.add('blur-effect')
    let target = e.target
    let src = target.src;

    preview_img.src = src;
    preview_img.classList.remove('no-display');
    previewExit.classList.remove('no-display');
    

    setTimeout(()=>showing = true,100)


    previewExit.onclick = exitPreview
    
}

window.onclick = (e) => {
    if(showing && !e.target.classList.contains('class-image') && !/^preview-(img|exit)$/.test(e.target.id)) {
        vibrateMode();
        preview_img.classList.add('no-display');
        previewExit.classList.add('no-display');

        galleryContainer.classList.remove('blur-effect');

        showing = false;
    }
}


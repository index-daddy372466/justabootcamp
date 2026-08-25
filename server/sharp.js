const sharp = require('sharp');
const arg_gif = process.argv[process.argv.length - 1]
const path = require('path')
const fs = require('node:fs')

const is_valid = (file) => /(gif|jpeg)$/.test(file)

// if(is_valid(arg_gif)) {
//     // vars
//     let splitFile = arg_gif.split`.`;
//     let filename = [splitFile[0],splitFile[1]].join`.`
//     let ext = splitFile[splitFile.length - 1];

//     // execution
//     // Compress by resizing and re-encoding with lower colors / optimization
//     let newFile = sharp(path.resolve(__dirname, `galleryv2/${filename}`), { animated: true }) // 'animated: true' preserves all frames
//     .resize(185) // Shrink width to 400px (scales height automatically)
//     .gif({ 
//         colours: 256, // Reduce the color palette (Max 256)
//         effort: 4    // Higher CPU effort (1-10) results in smaller files
//     })
//     .toFile(`${filename}.${ext}`)
//     .then(() => console.log('GIF compressed successfully!'))
//     .catch(err => console.error(err));
// } else {
//     console.error('Not a gif. Check arguments');
// }


// requirement:
// directory
// /server/gallery 
function massResize() {
    let get_files = fs.readdirSync(path.resolve(__dirname,'gallery'));

    if(get_files) {
        let files = [...get_files];

        console.log(files)

        files.map((file,index) => {
            if(is_valid(file)) {
            let splitFile = file.split`.`;
            let filename = splitFile[0];
            let ext = splitFile[splitFile.length - 1];

            // execution
            // Compress by resizing and re-encoding with lower colors / optimization
            let newFile = sharp(path.resolve(__dirname, `gallery/${filename}.${ext}`), { animated: true }) // 'animated: true' preserves all frames
            .resize(500,null,{
                kernel:'mitchell',
                withoutEnlargement:true,
            }) // Shrink width to 400px (scales height automatically)
            .gif({ 
                colours: 256, // Reduce the color palette (Max 256)
                effort: 9,    // Higher CPU effort (1-10) results in smaller files
                dither: 0.0   // 0.0 (off) produces sharper files and drastically reduces size
            })
            .toFile(`${filename}.${ext}`)
            .then(() => console.log(index,'GIF compressed successfully!'))
            .catch(err => console.error(err));
        } else {
            console.error('Not a gif. Check arguments');
        }
        })
    }
}
massResize()
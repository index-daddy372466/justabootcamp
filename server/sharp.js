const sharp = require('sharp');
const arg_gif = process.argv[process.argv.length - 1]
const path = require('path')

const is_valid = (file) => /(gif|jpeg)$/.test(file)

if(is_valid(arg_gif)) {
    // vars
    let splitFile = arg_gif.split`.`;
    let filename = [splitFile[0],splitFile[1]].join`.`
    let ext = splitFile[splitFile.length - 1];

    // execution
    // Compress by resizing and re-encoding with lower colors / optimization
    let newFile = sharp(path.resolve(__dirname, `galleryv2/${filename}`), { animated: true }) // 'animated: true' preserves all frames
    .resize(185) // Shrink width to 400px (scales height automatically)
    .gif({ 
        colours: 256, // Reduce the color palette (Max 256)
        effort: 4    // Higher CPU effort (1-10) results in smaller files
    })
    .toFile(`${filename}.${ext}`)
    .then(() => console.log('GIF compressed successfully!'))
    .catch(err => console.error(err));
} else {
    console.error('Not a gif. Check arguments');
}

const inputs = {
    submit:document.querySelector('input[type="submit"]'),
    labels:document.querySelectorAll('form label'),
    inputs:[...document.querySelectorAll('form input'),document.querySelector('form textarea')],
}

// functions
// function changeSubmitColor(target){

//     console.log(allValuesFilled(inputs.inputs))

//     if(!target){
//         console.error('Target Error: Target is not locked');
//         return;
//     }

//     if(!allValuesFilled([...inputs.inputs])) {
//         target.classList.remove('green-light')
//         target.classList.add('red-light')
//     } else {
//         target.classList.remove('red-light')
//         target.classList.add('green-light')
//     }

    
    
// }

// function allValuesFilled(array) {
//     if(!array){
//         console.error('Argument Error: Check argument(s)');
//         return;
//     }
//     return array.every(a => {
//         console.log(a.value.length)
//     });
// }

inputs.subnmit.onsubmit = submitPFTForm;
function submitPFTForm(){
    window.reload()
}
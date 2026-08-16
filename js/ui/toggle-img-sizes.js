// toggle-img-sizes.js
export function handleImgSizes({e}){
    const step = e.target.closest('.step')
    if(!step) return
    console.log(step.querySelector('.step-vid'))
    const media = step.querySelector('.step-img') ? step.querySelector('.step-img') : step.querySelector('.step-vid')
    if(media.length > 1){
        alert('not yet')
    } else {
        toggleImgSize(media)

    }
}

function toggleImgSize(media){
    
    media.classList.toggle('enlarge')

}

// nav/main-landing-nav.js
import { changeTutorialLink, tutorialLink } from "../ui/change-tutorial-link.js";
import { mainLandingPage } from "./keyboard-nav.js";
import { handleImgSizes } from "../ui/toggle-img-sizes.js";
let iStep = -1;
let steps = [];

function updateSteps() {
    steps = [...mainLandingPage.querySelectorAll(".step")];
    steps.forEach(step => {
        if(step.hasAttribute('data-auto-focus')){
            step.focus()
            step.scrollIntoView({behavior:'smooth', inline:'center', block:'center'})
        }
        step.addEventListener('keydown', e => {
            let key = e.key.toLowerCase()
            if(key === 'enter'){
                handleImgSizes({e})
            }
        });
        step.addEventListener('focusin', e => {
            scrollCenter(step)
        });
    })
}

export function refreshSteps() {
    updateSteps();
    iStep = -1;
}
export function mainLandingNav(e) {
    const key = e.key.toLowerCase();
    // always safe if DOM changed
    if (!steps.length) updateSteps();
    if (!steps.length) return false;
    if(!isNaN(key)){
        const intKey = parseInt(key)
        steps[intKey -1].focus()
    }
    if (key === "f") {
        iStep = (iStep + 1) % steps.length;
        steps[iStep]?.focus();
        return true;
    }
    if (key === "a") {
        iStep = (iStep - 1 + steps.length) % steps.length;
        steps[iStep]?.focus();
        return true;
    }
    if (key == 's') {
        if (e.target != sideBarBtn) {
            sideBarBtn.focus()
            return true
        } else {
            // lastClickedSideBarLink
        }
    }
    if (key == 't') {
        
        console.log(tutorialLink)
        tutorialLink.focus()
    }
    return false;
}
function scrollCenter(el){
    el.scrollIntoView({ 
        behavior: 'smooth', 
        inline: 'start',
        block: 'center' })
}
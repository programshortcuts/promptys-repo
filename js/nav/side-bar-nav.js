// nav/side-bar-nav.js
let iSideBarLinks = 0;
import { tutorialLink } from "../ui/change-tutorial-link.js";
import { mainLandingPage } from "./keyboard-nav.js";
export function sideBarNav(e) {
    const sideBarBtn = document.querySelector('#sideBarBtn')
    const plusBtn = document.querySelector('[data-nav-target="plus-btn"]')
    const editBtn = document.querySelector('[data-nav-target="edit-side-bar-btn"]')

    const key = e.key.toLowerCase();

    if (key === 'tab') return false;

    const sideBarLinks = [...document.querySelectorAll('.side-bar a')];
    if (!sideBarLinks.length) return false;


    if (!isNaN(key)) {
        const intKey = parseInt(key)
        sideBarLinks[intKey - 1]?.focus()
        return true
    }
    // 🔥 sync index with actual DOM focus
    const currentIndex = sideBarLinks.indexOf(document.activeElement);
    if (currentIndex !== -1) {
        iSideBarLinks = currentIndex;
    }
    if(key === 'p'){
        plusBtn.focus()
    }
    if(key === 'e'){
        editBtn.focus()
    }
    if (key === 'f') {
        if (e.target === sideBarBtn) {
            iSideBarLinks = 0
        } else {
            iSideBarLinks = (iSideBarLinks + 1) % sideBarLinks.length;
        }
        sideBarLinks[iSideBarLinks]?.focus();
        return true;
    }

    if (key === 'a') {
        iSideBarLinks =
            (iSideBarLinks - 1 + sideBarLinks.length) % sideBarLinks.length;

        sideBarLinks[iSideBarLinks]?.focus();
        return true;
    }
    
    if (key == 'm') {
        console.log('here')
        console.log(mainLandingPage)
        mainLandingPage.focus()
        scrollTo(0,0)

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

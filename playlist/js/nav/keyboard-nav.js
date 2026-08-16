// keyboard.js
export const mainLandingPage = document.querySelector(".main-landing-page");
import { letterFocusIndex } from "../../../js-index/letter-focus-index.js";
import { getFocusZone } from "./focus-zones.js"
import { sideBarNav } from "./side-bar-nav.js"
import { mainLandingNav } from "./main-landing-nav.js";
const navState = {
    zone: null,
    isLetterNav: false
}
export function initKeyboardNav({e,container}){
    navState.zone = getFocusZone(e)
    // should i query side-bar a elements here?
    routeKey(e)   
}
function routeKey(e){
    // object destructuring
    const {zone,isLetterNav} = navState
    // should i query side-bar a elements here?
    if(zone === 'side-bar'){
        const isHandled = sideBarNav(e)
        if(isHandled) return
    } else if(zone == 'main-landing-page') {
        const isHandled = mainLandingNav(e)
        if(isHandled) return

    } else {
        letterFocusIndex({e})
    }
}
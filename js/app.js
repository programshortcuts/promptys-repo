// app.js
import { initSidebar } from "./ui/sidebar.js";
import { initKeyboardNav } from "./nav/keyboard-nav.js";
import { loadPages } from "./data/page-storage.js";
import { changeTutorialLink } from "./ui/change-tutorial-link.js";

const pageWrapper = document.querySelector('.page-wrapper')
function initApp() {
    initSidebar();
    initGloablListeners()
    const allEls_TEMPORARY = pageWrapper.querySelectorAll('*')
    allEls_TEMPORARY.forEach(el => {
        if (el.hasAttribute('data-autoload')){
            el.focus()
        }
    })
}

function initGloablListeners(){
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            // console.log('TAB pressed — active element:', document.activeElement)
        }
    })
    pageWrapper.addEventListener('keydown', e => {
        initKeyboardNav({
            e,
            container: pageWrapper
        })
        changeTutorialLink({e})        
    });
}


initApp();


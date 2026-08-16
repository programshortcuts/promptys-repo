// toggle-sidebar.js
import { sideBarBtn } from "../nav/side-bar-nav.js";
export function initToggleSideBar(mainContent){
    const sideBar = document.querySelector('.side-bar')
    sideBar.addEventListener('click', e=> {
        if(e.target != sideBar) return
        toggleSideBar(mainContent)
    })
    sideBarBtn.addEventListener('click', e=> {
        e.stopImmediatePropagation()
        toggleSideBar(mainContent)
    })
    sideBarBtn.addEventListener('keydown', e=> {
        const key = e.key.toLowerCase()
        if(key == 'enter'){
            console.log(mainContent)
            toggleSideBar(mainContent)            
        }
        
    })
}
function toggleSideBar(container){
    container.classList.toggle('collapse')
}
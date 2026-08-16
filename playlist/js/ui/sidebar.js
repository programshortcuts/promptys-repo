// js/ui/sidebar.js
// LOAD DEFAULT PAGE WITH THIS INDEX *********************************************
let default_sidebar_index = 0
import { refreshSteps } from "../nav/main-landing-nav.js";
import { mainLandingPage } from "../nav/keyboard-nav.js";
import { loadPages, savePages } from "../data/page-storage.js";
import { lessonTemplate } from "../templates/lesson-template.js";
import {
    toggleEditMode,
    isEditMode,
    exitEditMode
} from "./sidebar-edit-mode.js";
import {
    initEditButton,
    initOutsideClickExit,
    initKeyExit
} from "./sidebar-edit-mode.js";
let pages = loadPages();

export function initSidebar() {
    renderSidebar();
    initSidebarClickHandler();
    initCreatePageButton();
    initEditButton(renderSidebar);
    initOutsideClickExit(renderSidebar);
    initKeyExit(renderSidebar);
}
// ======================
// RENDER SIDEBAR
// ======================
function renderSidebar() {
    const sideBarList = document.querySelector("#sideBarList");
    sideBarList.innerHTML = "";
    pages.forEach(page => {
        const li = document.createElement("li");
        const link = document.createElement("a");
        link.href = "#";
        link.textContent = page.title;
        link.dataset.pageId = page.id;
        li.append(link);
        // =========================
        // DELETE BUTTON (EDIT MODE ONLY)
        // =========================
        if (isEditMode()) {
            const deleteBtn = document.createElement("button");
            deleteBtn.textContent = "-";
            deleteBtn.classList.add("delete-page-btn");
            deleteBtn.addEventListener("click", (e) => {

                e.stopPropagation();

                const confirmed = confirm("Are you sure you want to delete this page?");

                if (!confirmed) return;

                const currentIndex = pages.findIndex(p => p.id === page.id);

                pages = pages.filter(p => p.id !== page.id);

                savePages(pages);

                renderSidebar();

                const links = document.querySelectorAll("#sideBarList a");
                
                if (links.length === 0) {
                    loadPage(null);
                    return;
                }

                let nextIndex = currentIndex - 1;

                if (nextIndex < 0) {
                    nextIndex = 0;
                }

                const targetLink = links[nextIndex] || links[0];

                if (targetLink) {
                    targetLink.focus();
                    targetLink.click();
                }
            });
            li.append(deleteBtn);
        }
        sideBarList.append(li);
    });
}
// ======================
// CLICK SIDEBAR LINKS
// ======================
 function initSidebarClickHandler() {
    const sideBarList = document.querySelector("#sideBarList");

    if(!document.eventsAdded){

        console.log(pages[default_sidebar_index].file)
        loadPage(pages[default_sidebar_index])
        
    }
    document.eventsAdded = true
    sideBarList.addEventListener("click", (e) => {
        const link = e.target.closest("a");
        if (!link) return;
        e.preventDefault();

        const pageId = link.dataset.pageId;
        const page = pages.find(p => p.id === pageId);
        
        if (!page){
            return;
        } 

        loadPage(page);
        
        refreshSteps()

    });
}
// ======================
// LOAD PAGE
// ======================
async function loadPage(page) {

 
    const html = await fetch(page.file)
        .then(r => r.text());

    mainLandingPage.innerHTML = html;
}
// ======================
// CREATE PAGE
// ======================
function initCreatePageButton() {
    const createBtn = document.querySelector("#createSidePage");
    createBtn.addEventListener("click", () => {
        const title = prompt("Enter page title");
        if (!title) return;
        const newPage = {
            id: crypto.randomUUID(),
            title,
            content: lessonTemplate.replace("New Lesson", title)
        };
        pages.push(newPage);
        savePages(pages);
        renderSidebar();
        loadPage(newPage);
    });
}
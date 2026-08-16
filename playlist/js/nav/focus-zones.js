// focus-zones.js
export function getFocusZone(e){
    if (e.target.closest('.side-bar')) {
        return  'side-bar'
    }
    if (e.target.closest('.main-landing-page') ||
        (e.target.closest('.main-landing-page'))) {
        return 'main-landing-page'
    }

}
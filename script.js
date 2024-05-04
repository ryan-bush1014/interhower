let root = document.querySelector(':root');
let main = document.querySelector('#main');

main.innerHTML = localStorage.getItem("content");

window.addEventListener('beforeunload', () => {
    localStorage.setItem("content", main.innerHTML);
});

document.addEventListener('keydown', function(event) {
    if (event.altKey && event.key === 'l') {
        main.innerHTML = "";
    }
  });

function prevent_enter(e) {
    // User hits enter key
    if (e.keyCode === 13) {
        e.preventDefault();
        window.getSelection().removeAllRanges();
        e.target.blur();
    }
}

function dark_mode() {
    let butt = document.querySelector('#dm');
    butt.innerText = (butt.innerText == '☼')? '☽' : '☼';
    let root_s = getComputedStyle(root);
    tc_main = root_s.getPropertyValue('--tc-main');
    tc_accent = root_s.getPropertyValue('--tc-accent');
    bg_main = root_s.getPropertyValue('--bg-main');
    bg_accent = root_s.getPropertyValue('--bg-accent');
    bg_contrast = root_s.getPropertyValue('--bg-contrast');
    tc_contrast = root_s.getPropertyValue('--tc-contrast');
    console.log(tc_main);

    root.style.setProperty('--tc-main', root_s.getPropertyValue('--tc-main-alt'));
    root.style.setProperty('--tc-accent', root_s.getPropertyValue('--tc-accent-alt'));
    root.style.setProperty('--bg-main', root_s.getPropertyValue('--bg-main-alt'));
    root.style.setProperty('--bg-accent', root_s.getPropertyValue('--bg-accent-alt'));
    root.style.setProperty('--bg-contrast', root_s.getPropertyValue('--bg-contrast-alt'));
    root.style.setProperty('--tc-contrast', root_s.getPropertyValue('--tc-contrast-alt'));

    root.style.setProperty('--tc-main-alt', tc_main);
    root.style.setProperty('--tc-accent-alt', tc_accent);
    root.style.setProperty('--bg-main-alt', bg_main);
    root.style.setProperty('--bg-accent-alt', bg_accent);
    root.style.setProperty('--bg-contrast-alt', bg_contrast);
    root.style.setProperty('--tc-contrast-alt', tc_contrast);
}

let target = false;

function add_drag() {
    existing = document.querySelectorAll('.draggable').length;
    drag = document.createElement('div');
    drag.innerHTML = `<span contenteditable onkeydown="prevent_enter(event)" class="taskname outfit-600" placeholder="Task"></span><div class="minner center">-</div><div class="mover center">✥</div><div class="editor contrast" id="edit-${existing+1}"><div data-tiny-editor data-formatblock="no" data-fontname="no" data-forecolor="no" data-justifyleft="no" data-outdent="no" data-indent="no" data-remove-format="no" class="outfit-400 taskinfo contrast" placeholder="Information"></div></div>`;
    // drag.classList.add('thin');
    drag.classList.add('draggable');
    drag.classList.add('task');
    drag.classList.add('bg-accent');
    drag.style['z-index'] = existing + 1;
    drag.clicked = false;
    main.appendChild(drag);
    window.__tinyEditor.transformToEditor(document.querySelector('.taskinfo'));
    // setTimeout(() => {drag.classList.remove('thin')}, 50);
}

function mousedown(e) {
    t = e.target;
    while (!t.classList.contains('draggable')) {
        t = t.parentElement;
    }
    drags = document.querySelectorAll('.draggable');
    for (let j = 0; j < drags.length; ++j) {
        if (drags[j].style['z-index'] > t.style['z-index']) {
            drags[j].style['z-index'] -= 1;
        }
    }
    t.style['z-index'] = drags.length;
    
    if (e.target.classList.contains('mover')) {
        if (e.touches) {
            e.clientX = e.touches[0].clientX;
            e.clientY = e.touches[0].clientY;
        }
        target = t;
        target.offsetX = e.clientX - target.getBoundingClientRect().left;
        target.offsetY = e.clientY - target.getBoundingClientRect().top;
    }

    if (e.target.classList.contains('minner')) {
        t.classList.contains('min')? t.classList.remove('min') : t.classList.add('min')
    }
}

function mouseup(e) {
    target = false;
}

function mousemove(e) {
    if (target) {
        if (e.touches) {
            e.clientX = e.touches[0].clientX;
            e.clientY = e.touches[0].clientY;
        }
        target.style['transform'] = `translate(clamp(0vw, ${100*(e.clientX - target.offsetX) / window.innerWidth}vw, calc(100vw - 100%)), clamp(0vh, ${100*(e.clientY - target.offsetY) / window.innerHeight}vh, calc(100vh - 100%)))`;
    }
}

main.addEventListener('mousedown', mousedown);
main.addEventListener('touchstart', (e) => {e.preventDefault(); mousedown(e)}, {passive: false});

document.addEventListener('mouseup', mouseup);
document.addEventListener('touchend', (e) => {e.preventDefault(); mouseup(e)}, {passive: false});

document.addEventListener('mousemove', mousemove);
document.addEventListener('touchmove', (e) => {e.preventDefault(); mousemove(e)}, {passive: false});

function hide_toggle() {
    for (elem of document.querySelectorAll('.trtrans')) {
        elem.classlist.contains('hidden-down')? elem.classList.remove('hidden-down') : elem.classList.add('hidden-down');
    }
}
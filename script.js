let root = document.querySelector(':root');
let main = document.querySelector('#main');

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
    drag.innerHTML = '<span contenteditable onkeydown="prevent_enter(event)" class="taskname" placeholder="Task title"></span><div class="mover center">✥</div><textarea class="taskinfo contrast" placeholder="Task info"></textarea>';
    // drag.classList.add('thin');
    drag.classList.add('draggable');
    drag.classList.add('task');
    drag.classList.add('bg-accent');
    drag.style['z-index'] = existing + 1;
    drag.clicked = false;
    main.appendChild(drag);
    // setTimeout(() => {drag.classList.remove('thin')}, 50);
}

main.addEventListener('mousedown', (e) => {
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
        target = t;
        target.offsetX = e.clientX - target.getBoundingClientRect().left;
        target.offsetY = e.clientY - target.getBoundingClientRect().top;
    }
});

document.addEventListener('mouseup', (e) => {
    target = false;
});

document.addEventListener('mousemove', (e) => {
    if (target) {
        target.style['transform'] = `translate(clamp(0vw, ${100*(e.clientX - target.offsetX) / window.innerWidth}vw, calc(100vw - 100%)), clamp(0vh, ${100*(e.clientY - target.offsetY) / window.innerHeight}vh, calc(100vh - 100%)))`;
    }
});

function hide_toggle() {
    for (elem of document.querySelectorAll('.trtrans')) {
        elem.classlist.contains('hidden-down')? elem.classList.remove('hidden-down') : elem.classList.add('hidden-down');
    }
}
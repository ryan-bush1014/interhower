let root = document.querySelector(':root');
let main = document.querySelector('#main');

function dark_mode() {
    root_s = getComputedStyle(root);
    tc_main = root_s.getPropertyValue('--tc-main');
    tc_accent = root_s.getPropertyValue('--tc-accent');
    bg_main = root_s.getPropertyValue('--bg-main');
    bg_accent = root_s.getPropertyValue('--bg-accent');
    console.log(tc_main);

    root.style.setProperty('--tc-main', root_s.getPropertyValue('--tc-main-alt'));
    root.style.setProperty('--tc-accent', root_s.getPropertyValue('--tc-accent-alt'));
    root.style.setProperty('--bg-main', root_s.getPropertyValue('--bg-main-alt'));
    root.style.setProperty('--bg-accent', root_s.getPropertyValue('--bg-accent-alt'));

    root.style.setProperty('--tc-main-alt', tc_main);
    root.style.setProperty('--tc-accent-alt', tc_accent);
    root.style.setProperty('--bg-main-alt', bg_main);
    root.style.setProperty('--bg-accent-alt', bg_accent);
}








let target = false;

function add_drag() {
    existing = document.querySelectorAll('.draggable').length;
    drag = document.createElement("div");
    drag.innerText = existing;
    drag.classList.add("draggable");
    drag.classList.add("task");
    drag.classList.add("bg-accent");
    drag.classList.add("center");
    drag.style['z-index'] = existing;
    drag.clicked = false;
    main.appendChild(drag);
}

main.addEventListener('mousedown', (e) => {
    target = e.target;
    target.offsetX = e.offsetX;
    target.offsetY = e.offsetY;
    drags = document.querySelectorAll('.draggable');
    for (let j = 0; j < drags.length; ++j) {
        if (drags[j].style['z-index'] > target.style['z-index']) {
            drags[j].style['z-index'] -= 1;
        }
    }
    target.style['z-index'] = drags.length - 1;
});

document.addEventListener('mouseup', (e) => {
    target = false;
});

document.addEventListener('mousemove', (e) => {
    if (target) {
        target.style['transform'] = `translate(${e.clientX - target.offsetX}px, ${e.clientY - target.offsetY}px)`;
    }
});
"use strict";
const color = document.getElementById('color');
const createBtn = document.getElementById('createBtn');
const list = document.getElementById('list');
createBtn.onclick = () => {
    let newNote = document.createElement('div');
    newNote.classList.add('note');
    newNote.innerHTML = `<span class="close">x</span>
    <textarea name="" id="" placeholder="Write content..." 
    rows="10" cols="30"></textarea> `;
    newNote.style.borderColor = color.value;
    list.appendChild(newNote);
};
document.addEventListener('click', (event) => {
    var _a;
    const target = event.target;
    if (target.classList.contains('close')) {
        (_a = target.parentNode) === null || _a === void 0 ? void 0 : _a.remove();
    }
});
let cursor = {
    x: null,
    y: null
};
let note = {
    dom: null,
    x: null,
    y: null
};
document.addEventListener('mousedown', (event) => {
    const target = event.target;
    if (target.classList.contains('note')) {
        cursor = {
            x: event.clientX,
            y: event.clientY
        };
        note = {
            dom: target,
            x: target.getBoundingClientRect().left,
            y: target.getBoundingClientRect().top
        };
    }
});
document.addEventListener('mousemove', (event) => {
    if (note.dom == null ||
        cursor.x == null || cursor.y == null ||
        note.x == null || note.y == null)
        return;
    let currentCursor = {
        x: event.clientX,
        y: event.clientY
    };
    let distance = {
        x: currentCursor.x - cursor.x,
        y: currentCursor.y - cursor.y
    };
    note.dom.style.left = (note.x + distance.x) + 'px';
    note.dom.style.top = (note.y + distance.y) + 'px';
    note.dom.style.cursor = 'grab';
});
document.addEventListener('mouseup', () => {
    if (note.dom == null)
        return;
    note.dom.style.cursor = 'auto';
    note.dom = null;
});

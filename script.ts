const color = document.getElementById('color') as HTMLInputElement;
const createBtn = document.getElementById('createBtn') as HTMLButtonElement;
const list = document.getElementById('list') as HTMLDivElement;

createBtn.onclick = () => {
    let newNote = document.createElement('div') as HTMLDivElement;
    newNote.classList.add('note');
    newNote.innerHTML = `<span class="close">x</span>
    <textarea name="" id="" placeholder="Write content..." 
    rows="10" cols="30"></textarea> `;
    newNote.style.borderColor = color.value;
    list.appendChild(newNote);
}

document.addEventListener('click', (event) => {
    const target = event.target as HTMLElement;

    if(target.classList.contains('close')){
        (target.parentNode as HTMLElement)?.remove();
    }
})

let cursor = {
    x: null as number | null,
    y: null as number | null
}
let note = {
    dom: null as HTMLElement | null,
    x: null as number | null,
    y: null as number | null
}

document.addEventListener('mousedown', (event) => {
    const target = event.target as HTMLElement;

    if(target.classList.contains('note')){
        cursor = {
            x: event.clientX,
            y: event.clientY
        }
        note = {
            dom: target,
            x: target.getBoundingClientRect().left,
            y: target.getBoundingClientRect().top
        }
    }
})

document.addEventListener('mousemove', (event) => {
    if(note.dom == null ||
        cursor.x == null || cursor.y == null||
        note.x == null || note.y == null
    ) return;

    let currentCursor = {
        x: event.clientX,
        y: event.clientY
    }
    let distance = {
        x: currentCursor.x - cursor.x,
        y: currentCursor.y - cursor.y
    }
    note.dom.style.left = (note.x + distance.x) + 'px';
    note.dom.style.top = (note.y + distance.y) + 'px';
    note.dom.style.cursor = 'grab';
})

document.addEventListener('mouseup', () => {
    if(note.dom == null) return;
    note.dom.style.cursor = 'auto';
    note.dom = null;
})
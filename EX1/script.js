const redCircle = document.getElementById('redCircle');
const blueCircle = document.getElementById('blueCircle');
const redSquare = document.getElementById('redSquare');
const blueSquare = document.getElementById('blueSquare');

// Add event listeners for drag and drop
redCircle.addEventListener('dragstart', dragStart);
blueCircle.addEventListener('dragstart', dragStart);
redSquare.addEventListener('dragover', allowDrop);
blueSquare.addEventListener('dragover', allowDrop);
redSquare.addEventListener('drop', drop);
blueSquare.addEventListener('drop', drop);

function dragStart(event) {
    event.dataTransfer.setData('text', event.target.id);
}

function allowDrop(event) {
    event.preventDefault();
}

function drop(event) {
    event.preventDefault();
    const data = event.dataTransfer.getData('text');
    const target = event.target;

    // Check if the target is the correct one
    if (target === redSquare && data === 'redCircle') {
        // Append the element to the target
        target.appendChild(document.getElementById(data));
        // Make the circle undraggable
        redCircle.removeAttribute('draggable');
        // Change the cursor css style to default (previous to pointer)
        redCircle.style.cursor = 'default';
    } else if (target === blueSquare && data === 'blueCircle') {
        target.appendChild(document.getElementById(data));
        blueCircle.removeAttribute('draggable');
        blueCircle.style.cursor = 'default';
    }
}

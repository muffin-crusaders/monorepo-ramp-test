import * as two from 'ramp-two';

const separators = [' + ', ' = ', ''];

const science = two.doScience();

const fragment = document.createElement('span');
fragment.innerHTML = science.line;

science.emoji.forEach((emoji, index) => {
    const button = document.createElement('button');
    button.classList.add('emoji-button');
    button.innerHTML = emoji;
    button.addEventListener('click', () => (button.innerHTML = two.getEmoji()));

    fragment.appendChild(button);
    fragment.appendChild(document.createTextNode(separators[index]));
});

document.body.appendChild(fragment);

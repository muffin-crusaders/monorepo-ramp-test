import * as two from 'ramp-two';

const line = two.doScience();

const fragment = document.createElement('span');
fragment.innerHTML = line;

document.body.appendChild(fragment);

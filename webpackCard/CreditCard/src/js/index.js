import '../style/main.scss'
import {
  el, mount, setChildren
} from "redom";
import {renderCard} from './veiwCrad.js';
import {contentVisibleCard} from './contentVisible.js';
import {contentMask} from './contentVisibleinputMask.js';
import {inputMask} from './mask.js';
import {validFunc} from './validateInputCard.js';

function crediCardApp () {
  const cardInput = renderCard();
  const container = el('div.container.card-container');
  setChildren(container, [contentVisibleCard(), cardInput.formWrapper]);
  setChildren(document.body, container);

  contentMask();
  inputMask();
  validFunc(cardInput.btnForm);
}


console.log('4893 4703 3104 1845')
console.log('5368 2902 0110 1112')
console.log('4916 1089 2626 8679')
console.log('4556 6035 7829 6676')
console.log('6390 0230 9005 7121 77')


crediCardApp();








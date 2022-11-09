import v8n from 'v8n';
import {
    el, mount, setChildren, text
} from "redom";
import payform from 'payform';
import JCB from '../assets/img/jcb.jpeg';
import VISA from '../assets/img/visa.jpeg';
import MAESTRO from '../assets/img/maestro.jpeg';
import MASTERCARD from '../assets/img/mastercard.jpeg';
import BLANK from '../assets/img/_blank.png';

const carbBank = {
    VISA: VISA,
    MAESTRO: MAESTRO,
    MASTERCARD: MASTERCARD,
    JCB: JCB
};

const valid = {
  number: false,
  date: false,
  code: false,
  email: false,
};

function unlockBtn(cardInput) {    
  cardInput.disabled = Object.values(valid).includes(false);
}

const inputUnvalid = (input, errBlock, errName = 'err') => {
      input.style.borderColor = 'red';
      input.after(errBlock);
      errBlock.textContent = errName;
}; 

const removeErr = (input, errBlock) => {
    input.addEventListener('input', ()=> {
    input.style.borderColor = 'black';
    errBlock.remove();
    });
}

const paySystem = (checkSystem, div, input) => {
    input.after(div);
    div.textContent = `${checkSystem}`;
}

export function validFunc (cardInput) {
    const inputAll = Array.from(document.getElementsByClassName('input-card'));
    const namePaySystem = document.getElementById('pay-system');
    const erorDivNum =  el('div.error_div');
    const erorDivDate =  el('div.error_div');
    const erorDivCode =  el('div.error_div');
    const erorDivEmail =  el('div.error_div');
    const divPaySystem =  el('div.pay-system_div');
    
    inputAll.forEach(input => {
      input.addEventListener('blur', () => {
          if(input.classList.contains(`input-number`)) {
              removeErr(input, erorDivNum);
              valid.number = payform.validateCardNumber(input.value.trim());
              if (valid.number) {
                  paySystem(payform.parseCardType(input.value.trim()).toUpperCase(), divPaySystem, input);
                //   namePaySystem.textContent = payform.parseCardType(input.value.trim()).toUpperCase();
                 namePaySystem.src = Object.keys(carbBank).includes(payform.parseCardType(input.value.trim()).toUpperCase()) ? carbBank[payform.parseCardType(input.value.trim()).toUpperCase()] : BLANK;
              } else {
                  inputUnvalid(input, erorDivNum, 'Номер не валиден или содержит менее 16 цифр');
                //   namePaySystem.textContent = '****';
                  divPaySystem.remove();
                  namePaySystem.src = BLANK;
              }
              unlockBtn(cardInput)
          } 
    
          if(input.classList.contains(`input-date`)) {
              removeErr(input, erorDivDate);
              const validCardDate = input.value.trim().split('/');
              valid.date = payform.validateCardExpiry(validCardDate[0], validCardDate[1]);
              if(!valid.date) {
                inputUnvalid(input, erorDivDate, 'Не раньше текущей даты');
              } 
              unlockBtn(cardInput);
          } 
    
          if(input.classList.contains(`input-code`)) {
              removeErr(input, erorDivCode);
              valid.code = payform.validateCardCVC(input.value.trim());
              if(!valid.code){
                  inputUnvalid(input, erorDivCode, '3 цифры на обороте карты');
              }
              unlockBtn(cardInput);
          } 
    
          if(input.classList.contains(`input-email`)) {
              removeErr(input, erorDivEmail)
              valid.email = v8n().pattern(/^[A-Z0-9._%+-]+@+[A-Z0-9-]+.+.[A-Z]{2,6}$/i).test(input.value.trim());
              if(!valid.email) {
                  inputUnvalid(input, erorDivEmail, 'Введите валидный Email');
              }
              unlockBtn(cardInput);
          } 
      });
    });
}
  

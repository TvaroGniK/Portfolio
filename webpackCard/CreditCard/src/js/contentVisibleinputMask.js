const checkValue = (textValue, inputValue) => {
  for(let i = 0; i < textValue.length ; i ++) {
    if (!inputValue[i]) {
      inputValue[i] = '*';
    }
  }
}

export const contentMask = () => {
    const inputAll = Array.from(document.getElementsByClassName('input-card'));
    const contCardNumber = document.getElementById('card-number');
    const contantCardMonth = document.getElementById('card-mounth');
    const contantCardYear = document.getElementById('card-year');
    const contantCardCvv = document.getElementById('cvv');

    inputAll.forEach(inp => {
        inp.addEventListener('input', () => {
            if(inp.classList.contains(`input-number`)) {
                const newValue = contCardNumber.textContent.split(' ').join('');
                const inpVal = inp.value.split(' ').join('').split('');
                checkValue(newValue, inpVal);
                const textValue = inpVal.join('').replace(/(.{4})/g, '$1 ');
                contCardNumber.textContent = textValue;
                if(textValue.length > 20 ) {
                  contCardNumber.textContent =textValue.substring(0, inp.value.length);
                }
            }

            if(inp.classList.contains(`input-code`)) {
                const inpVal = inp.value.split('');
                const newValue = contantCardCvv.textContent;
                checkValue(newValue, inpVal);
                contantCardCvv.textContent = inpVal.join('');
            }

            if(inp.classList.contains(`input-date`)) {
                const inpValMonth = inp.value.trim().split('/')[0].split('');
                const newValueMonth = contantCardMonth.textContent;
                const newValueYear = contantCardYear.textContent;
                if( inp.value.length > 3) {
                    const inpValYear = inp.value.trim().split('/')[1].split('');
                    checkValue(newValueYear, inpValYear);
                    contantCardYear.textContent = inpValYear.join('');
                } else {
                  contantCardYear.textContent = '**';
                }
                checkValue(newValueMonth, inpValMonth);
                contantCardMonth.textContent = inpValMonth.join('');
            }
        });
    });
}
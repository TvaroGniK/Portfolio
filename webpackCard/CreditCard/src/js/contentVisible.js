import {
    el, mount, setChildren
} from "redom";
import BLANK from '../assets/img/_blank.png';



export const contentVisibleCard = () => {
    const visualWrap = el('div.content-wrapper');
    const cardFront = el('div.content-card.content-card-front', [el('p.card-front-number#card-number', '**** **** **** ****'), el('div.card-front-info', [el('img.card-front-paysystem#pay-system', {src: BLANK, alt: 'Лого банка'}) ,el('p.card-front-date', [el('span.card-front-date__month#card-mounth', '**'), el('span.card-front-date__slash', '/') ,el('span.card-front-date__year#card-year', '**')])])]);
    const cardBack = el('div.content-card.content-card-back', [el('p.cvv#cvv', '***')]);
     setChildren(visualWrap, [cardFront, cardBack]);
    return visualWrap;
}


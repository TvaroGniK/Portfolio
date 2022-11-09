import { createTooltip } from "./createTooltip.js";
import { svgVk } from "./svg.js";
import { svgPhone } from "./svg.js";
import { svgFb } from "./svg.js";
import { svgEmail } from "./svg.js";
import { svgOther } from "./svg.js";

// время созднаия и изменения в таблице
export const formatDate = data => {
  const newDate = new Date(data);
  const correctDate = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  }
  const resultDate =  newDate.toLocaleDateString('ru', correctDate);
  return resultDate;
};


export const formatTime = data => {
  const newDate = new Date(data);
  const res = [newDate.getHours(), newDate.getMinutes()].map(function (x) {
    return x < 10 ? "0" + x : x;
  }).join(":");
  return res;
};

// свг иконки в таблице для контактов
export const createCotactLink = (type, value, element, svg, item) => {
  const setTooltip = createTooltip(type, value);
  element = document.createElement('a');
  element.classList.add('contact__link');
  element.innerHTML = svg;

  if (type === "Email") {
    element.href = `mailto:${value.trim()}`
  } else if (type === "Телефон") {
    element.href = `tel:${value.trim()}`
    setTooltip.tooltipValue.style.color = 'var(--light-color)';
    setTooltip.tooltipValue.style.textDecoration = 'none';
  } else {
    element.href = value.trim;
  }
  element.append(setTooltip.tooltip);
  item.append(element);
};

export const createContactItemByType = (type, value, item) => {
  switch(type) {
    case "Телефон":
            let phone;
            createCotactLink(type, value, phone, svgPhone, item);
            break;
    case "FaceBook":
            let fb;
            createCotactLink(type, value, fb, svgFb, item);
            break;
    case "VK":
            let vk;
            createCotactLink(type, value, vk, svgVk, item);
            break;
    case "Email":
            let email;
            createCotactLink(type, value, email, svgEmail, item);
            break;
    case "Другое":
            let other;
            createCotactLink(type, value, other, svgOther, item);
            break;
    default:
            break;
  };
};







import * as  PaulFunctions from "./modules/functions.js"
PaulFunctions.isWebp();
import "./modules/just-validate.min.js"
// import "./modules/yndxmap.js"
// import ymaps from 'ymaps';


document.querySelector('.close-map').addEventListener('click', function () {
  document.querySelector('.close').classList.toggle('is--close');
});



new window.JustValidate('.contacts-form', {
  rules: {
    name: {
      required: true,
      minLength: 2,
      maxLength: 15
    },
    tel: {
      required: true,
      function: (name, value) => {
        const phone = selector.inputmask.unmaskedvalue()
        return Number(phone) && phone.length === 10
      }
    },
    mail: {
      required: true,
      email: true
    },
  },
});




// ymaps
//   .load()
//   .then(maps => {
//     const map = new maps.Map('#map', {
//       center: [-8.369326, 115.166023],
//       zoom: 7
//     });
//   })
//   .catch(error => console.log('Failed to load Yandex Maps', error));


ymaps.ready(startMap);
function startMap() {
const mapElem = document.querySelector('#map');
const myMap = new ymaps.Map(
  "map",
  {
    center: [55.7709259351403,37.6382280906728],
    zoom: 14,
    controls: ['geolocationControl', 'zoomControl']
  },
  {
    suppressMapOpenBlock: true,
    geolocationControlSize: "large",
    geolocationControlPosition:  { top: "200px", right: "20px" },
    geolocationControlFloat: 'none',
    zoomControlSize: "small",
    zoomControlFloat: "none",
    zoomControlPosition: { top: "120px", right: "20px" }
  }
);

const myPlacemark = new ymaps.Placemark(
  [55.77099537805762,37.643419895696084],
  {},
  {
    iconLayout: "default#image",
    iconImageHref: "/img/map.svg",
    iconImageSize: [20, 20],
    iconImageOffset: [-20, -40],
  }
);

myMap.geoObjects.add(myPlacemark);

setTimeout(() => {
  myMap.container.fitToViewport();
}, 5000);
}


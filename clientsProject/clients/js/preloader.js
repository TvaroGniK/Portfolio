import { svgPreloader } from "./svg.js";

export const preloader = () => {
  const preloaderBlock = document.createElement('div');
  const preloaderCircle = document.createElement('span');

  preloaderBlock.classList.add('preload');
  preloaderCircle.innerHTML = svgPreloader;

  preloaderBlock.append(preloaderCircle);

  return preloaderBlock;
}
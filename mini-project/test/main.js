var fragPre = document.createDocumentFragment(),
    fragPost = document.createDocumentFragment(),
    clonedPre, clonedPost,
    selectSlide = document.getElementById("numberOfSlides"),

    //options
    numberOfSlides = 3;


var items   = document.querySelectorAll("#gallery .slider-scroller-inner .item"),
    len     = items.length,
    current = 1,  /* the current item we're looking */
    wrapper = document.getElementById("wrapper"),
    transformVal = 0;


/* 1. Cloning last items and appending to first */

for(var i=numberOfSlides ; i > 0 ; i--) {
    clonedPre = items[items.length-i].cloneNode(true);
    fragPre.append(clonedPre);
}

wrapper.insertBefore(fragPre , items[0]);

/* . Cloning first items and appending to first */

for(var j = 0 ; j <= numberOfSlides-1 ; j++) {
    clonedPost = items[j].cloneNode(true);
    fragPost.append(clonedPost);
}

wrapper.appendChild(fragPost);

/* Slider arrow click function */

var slideWidth=items[0].offsetWidth;
var counter = 0;
var timer = null;
var timeout = null;
wrapper.style.transform = "translate3d(" + (-slideWidth) * (numberOfSlides) + "px,0,0)";

function arrowClick(dir) {
    // if timeout || timer is not null than sliding is processing right now, prevent processing user's actions in this case
    if (timeout || timer) {
      return;
    }
    timeout = setTimeout(function() {
        counter = 0;
        direction = dir;
        var str = wrapper.style.transform;
        var left = str.substring(12, str.length - 11);
        console.log(left);
        animateSlide(current, left);
        timeout = null; // <-- setting timeout to null that will mean that function is partly (also will check timer) ready for new user's actions
    }, 300);
}

/* slide number click function */

function changeCurrent(curr) {
    current = curr;
    wrapper.style.transform =  "translate3d(" + -(slideWidth) * (current + (numberOfSlides-1)) + "px,0,0)";
}


/* actual sliding effect */

function animateSlide(curr, left) {
    // if timer is not prevent processing new animation
    if (timer) {
      return;
    }
    timer = setInterval(function() {
        if(counter < slideWidth) {
            counter += 2; // <-- this is the speed of animation. bigger number faster animating
            transformVal = parseInt(left, 10) + (-(counter) * direction);
            wrapper.style.transform = "translate3d(" + transformVal + "px,0,0)";
        } else {
            current += direction;
            cycle = !!(current === 0 || current > len);
            if (cycle) {
              current = (current === 0)? len : 1;
              wrapper.style.transform ="translate3d(" + (-(slideWidth) * (current + (numberOfSlides-1))) + "px,0,0)";
            }
            counter = 0;
            clearInterval(timer);
            timer = null; // <-- setting timer to null and now it's ready for another animaton
        }
    }, 0);
}
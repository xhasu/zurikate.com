(function() {

  const burger = document.querySelector('#burger');
  const menu = document.querySelector('#menu');

  burger && burger.addEventListener('click', () => {
    toggleHeaderNavbar();
  });

  const toggleHeaderNavbar = () => {
    menu && menu.classList.toggle('open');
  }

  // scrollview
  let toView = document.querySelectorAll('[data-to-view^="#"]');
  let toViewSize = toView.length;

  for (let i = 0; i < toViewSize; i++) {
    toView.item(i).addEventListener('click', function (e) {
      e.preventDefault();

      toggleHeaderNavbar();

      document
        .querySelector(this.getAttribute('data-to-view'))
        .scrollIntoView({ behavior: 'smooth' });
    });
  }

  // parallax - rellax

  new Rellax('.board .board-bg', { speed: -8 });
  new Rellax('.kit .kit-bg', { speed: 4 });

  // new Rellax('.background-noise img', { speed: 4 });

  new Rellax('.hero-head', { speed: 2 });
  new Rellax('.hero-description', { speed: 1 });

  // swiper
  let swipers = document.querySelectorAll('.board-swiper');

  swipers.forEach((swiper) => {
    let el = swiper.querySelector('.swiper-container');
    let arrows = swiper.querySelector('.swiper-arrows');

    new Swiper(el, {
      // loop: true,
      threshold: 20,
      autoplay: {
        delay: 6000,
        disableOnInteraction: false,
      },
      slidesPerView: 2,
      breakpoints: {
        960: {
          slidesPerView: 3,
        }
      },
      navigation: {
        prevEl: arrows.querySelector('.arrow-prev'),
        nextEl: arrows.querySelector('.arrow-next'),
      },
    });
  });

  // swiper showcase
  let swiperShowcase = document.querySelector('.showcase-swiper .swiper-container');
  let showcaseArrows = document.querySelector('.showcase .swiper-arrows');

  new Swiper(swiperShowcase, {
    // loop: true,
    threshold: 20,
    effect: 'fade',
    fadeEffect: {
      crossFade: true,
    },
    autoplay: {
      delay: 6000,
      disableOnInteraction: false,
    },
    navigation: {
      prevEl: showcaseArrows.querySelector('.arrow-prev'),
      nextEl: showcaseArrows.querySelector('.arrow-next'),
    },
  });

  // swiper hero
  let swiperHero = document.querySelector('.hero-swiper .swiper-container');

  new Swiper(swiperHero, {
    loop: true,
    threshold: 20,
    autoplay: {
      delay: 1500,
      disableOnInteraction: false,
    },
    pagination: {
      el: swiperHero.querySelector('.swiper-pagination'),
      type: 'bullets',
      clickable: true,
    },
    effect: 'fade',
    fadeEffect: {
      crossFade: true,
    },
  });

  // AOS
  try {  
    Promise.all(Array.from(document.images).filter(img => !img.complete && img.loading != "lazy").map(img => new Promise(resolve => { img.onload = img.onerror = resolve; }))).then((promises) => {
      console.log('images finished loading', promises.length);
      AOS.init();
    });
  } catch (err) {
    console.log(err)
    AOS.init();
  }

  // color picker
  const hueb = new Huebee('#color', {
    shades: 0,
    hues: 5,
    // setText: false,
    customColors: [
      "#1b1413",
      "#090909",
      "#870c0c",
      "#c13b7f",
      "#765f31",
      "#af9409",
      "#5c873c",
      "#313031",
    ]
  })

})();
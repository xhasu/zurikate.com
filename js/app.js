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
  new Rellax('.board .board-info', {
    speed: 6,
    center: true,
  });

  new Rellax('.board .board-bg', {
    speed: 10,
  });

  new Rellax('.background-noise img', {
    speed: 6,
  });

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
      breakpoints: {
        960: {
          slidesPerView: 3,
        }
      },
      navigation: {
        prevEl: arrows.querySelector('.arrow-prev'),
        nextEl: arrows.querySelector('.arrow-next'),
      },
      slidesPerView: 'auto',
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
    // loop: true,
    threshold: 20,
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

})();
(function() {

  // video
  const promovideo = document.querySelector('#promovideo');
  if( window.innerWidth < 768 ) {
    promovideo.querySelector('source').setAttribute('src', 'media/BMW-Zurikate-Mobile.mp4?v=' + (+new Date))
  } else {
    promovideo.querySelector('source').setAttribute('src', 'media/BMW-Zurikate.mp4?v=' + (+new Date))
    setTimeout(() => {
      promovideo.play();
    }, 0);
  }
  
  // contact mobile
  if( window.innerWidth < 640 ) {
    $('.info-contact').insertAfter($('#contactForm'));
  }

  // menu
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

      /*document
        .querySelector(this.getAttribute('data-to-view'))
        .scrollIntoView({ behavior: 'smooth' });*/
      var headerheight = document.querySelector('header.header').offsetHeight + 5;
      var offsetPosition = document.querySelector(this.getAttribute('data-to-view')).getBoundingClientRect().top - headerheight + window.scrollY;
      window.scrollTo({top: offsetPosition, behavior: 'smooth'});
    });
  }

  // parallax - rellax

  new Rellax('.board .board-bg', { speed: 4 });
  new Rellax('.kit .kit-bg', { speed: 4 });

  // new Rellax('.background-noise img', { speed: 4 });

  // new Rellax('.embed-head', { speed: 2 });
  new Rellax('.hero-head', { speed: 1 });
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
      delay: 2000,
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

  // form contact ajax
  let btnSubmit = document.querySelector('#contactForm');
  let isLoading = false;
  btnSubmit &&
    btnSubmit.addEventListener('submit', (e) => {
      e.preventDefault();

      if (isLoading) return;
      isLoading = true;

      toggleLoadingForm();

      let url = '/contact.php';

      let email = document.querySelector('#email').value;
      let car = document.querySelector('#car').value;
      let city = document.querySelector('#city').value;
      let file_vehicle = document.querySelector('#file_vehicle').files[0];
      let file_wheel = document.querySelector('#file_wheel').files[0];
      let opt = document.querySelector('input[name=opt]:checked').value;
      let color = document.querySelector('#color').value;

      let data = new FormData();
      data.append('email', email);
      data.append('car', car);
      data.append('city', city);
      data.append('file_vehicle', file_vehicle);
      data.append('file_wheel', file_wheel);
      data.append('color', color);
      data.append('opt', opt);

      axios
        .post(url, data)
        .then((response) => {
          console.log(response.data);
          if (response.data.success) {
            showSnackbar('Thank you for contacting us');
            clearContactForm();
          }
          if (response.data.error) {
            console.log(response.data);
            showSnackbar('Email is not valid');
          }
          isLoading = false;
          toggleLoadingForm();
        })
        .catch((err) => {
          console.log(err);
          showSnackbar('Ups... connection failed, try again');
          isLoading = false;
          toggleLoadingForm();
        });

      return false;
    });

  function showSnackbar (message) {
    Snackbar.show({
      pos: 'bottom-right',
      showAction: false,
      text: message,
      textColor: '#000',
      backgroundColor: '#CBFF00',
    });
  }

  function clearContactForm() {
    document.querySelector('#email').value = '';
    document.querySelector('#car').value = '';
    document.querySelector('#city').value = '';
    document.querySelector('#file_vehicle').value = null;
    document.querySelector('#file_wheel').value = null;
    // document.querySelector('input[name=opt]:checked').value = '';
    document.querySelector('#color').value = '';
  }

  function toggleLoadingForm() {
    document.querySelector('.loading').classList.toggle('active');
    document.querySelector('body').classList.toggle('overflow-hidden');
  }

})();
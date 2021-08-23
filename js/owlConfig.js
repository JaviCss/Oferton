

$("#owl1").owlCarousel({
    autoplay: false,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    autoplaySpeed: 1000,
    items: 1,
    loop: true,
    autoHeight: false,
    responsiveClass: true,
    responsive: {
      0: {
        margin: 0,
        items: 1,
        nav: false,
        dots: true,
      },
      600: {
        margin: 0,
        items: 1,
        nav: false,
        dots: true,
      },
      1024: {
        margin: 0,
        items: 1,
        nav: false,
        loop: true,
        dots: true,
      },
    },
  })
  $("#owl2").owlCarousel({
    autoplay: false,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    autoplaySpeed: 1000,
    items: 1,
    loop: true,
    autoHeight: false,
    responsiveClass: true,
    responsive: {
      0: {
        margin: 0,
        items: 3,
        nav: false,
        dots: false,
      },
      600: {
        margin: 0,
        items: 7,
        nav: false,
        dots: false,
      },
      1024: {
        margin: 0,
        items: 11,
        nav: true,
        loop: false,
        dots: false,
      },
    },
  })
document.addEventListener('DOMContentLoaded', function () {
    var menuBtn = document.getElementById('menu-btn');
    var menuBtnFechar = document.getElementById('btn-fechar');
    var mobileMenu = document.getElementById('mobile-menu');
    var content = document.querySelector('.content');

    menuBtn.addEventListener('click', function() {
        if (mobileMenu.style.right === "-250px") {
            mobileMenu.style.right = "0";
            content.style.marginRight = "250px";
        } else {
            mobileMenu.style.right = "-250px";
            content.style.marginRight = "0";
        }
    });

    menuBtnFechar.addEventListener('click', function() {
        if (mobileMenu.style.right === "-250px") {
            mobileMenu.style.right = "0";
            content.style.marginRight = "250px";
        } else {
            mobileMenu.style.right = "-250px";
            content.style.marginRight = "0";
        }
    });
});

var swiper = new Swiper(".mySwiper", {
    slidesPerView: 4,
    spaceBetween: -15,
    loop: true,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
});


var bannerBtn = document.querySelector('.btn');

function updateSwiper() {
    if (window.innerWidth < 768) {
        swiper.params.slidesPerView = 1; 
        bannerBtn.innerText = "Levar";
    } else if (window.innerWidth < 992) {
        swiper.params.slidesPerView = 2; 
        bannerBtn.innerText = "Levar";
    } else {
        swiper.params.slidesPerView = 4; 
    }
    swiper.update();
}

updateSwiper();


window.addEventListener("resize", function () {
    updateSwiper();
});
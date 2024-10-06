document.addEventListener('DOMContentLoaded', function () {
    var menuBtn = document.getElementById('menu-btn');
    var menuBtnFechar = document.getElementById('btn-fechar');
    var mobileMenu = document.getElementById('mobile-menu');
    
    mobileMenu.style.left = "-250px";

    menuBtn.addEventListener('click', function() {
        if (mobileMenu.style.left === "-250px") {
            mobileMenu.style.left = "0";
        } else {
            mobileMenu.style.left = "-250px";
        }
    });

    menuBtnFechar.addEventListener('click', function() {
        if (mobileMenu.style.left === "0px") {
            mobileMenu.style.left = "-250px";
        } 
    });
});

if(window.innerWidth > 991){
    const elementos = document.querySelectorAll("#but")

    elementos.forEach(function(elemento){
        const butNext = document.createElement("div");
        butNext.classList.add("swiper-button-next");

        const butPrev = document.createElement("div");
        butPrev.classList.add("swiper-button-prev");

        elemento.appendChild(butNext);
        elemento.appendChild(butPrev);
    });
}

var swiper = new Swiper(".mySwiper", {
    slidesPerView: 4,
    spaceBetween: 15,
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

var swiperPrincipal = new Swiper(".mySwiperPrincipal", {
    slidesPerView: 6,
    spaceBetween: 15,
    loop:true,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
});

var swiperPrincipal2 = new Swiper(".mySwiperPrincipal2", {
    slidesPerView: 6,
    spaceBetween: 15,
    loop:true,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
});

function updateSwiper() {
    if (window.innerWidth < 768) {
        swiper.params.slidesPerView = 1.2; 
        swiperPrincipal.params.slidesPerView = 2.2; 
        swiperPrincipal2.params.slidesPerView = 2.2; 
        bannerBtn.innerText = "Levar";

    } else if (window.innerWidth < 992) {

        swiperPrincipal.params.slidesPerView = 4.2;
        swiperPrincipal2.params.slidesPerView = 4.2;
        swiper.params.slidesPerView = 4.2; 
        bannerBtn.innerText = "Levar";

    } else {
        swiperPrincipal1.params.slidesPerView = 6; 
        swiperPrincipal2.params.slidesPerView = 6; 
        bannerBtn.innerText = "Comprar agora";
    }
    swiper.update();
}

updateSwiper();

window.addEventListener("resize", function () {
    updateSwiper();
});

/* =====================================================
   Stackly SLIDER.JS
   Swiper Sliders
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* ==========================
       TESTIMONIAL SLIDER
    ========================== */

    const testimonialSlider =
    document.querySelector(".testimonial-slider");

    if(testimonialSlider){

        new Swiper(".testimonial-slider", {

            loop:true,

            speed:1000,

            spaceBetween:30,

            autoplay:{
                delay:4000,
                disableOnInteraction:false
            },

            pagination:{
                el:".swiper-pagination",
                clickable:true
            },

            navigation:{
                nextEl:".swiper-button-next",
                prevEl:".swiper-button-prev"
            },

            breakpoints:{

                0:{
                    slidesPerView:1
                },

                768:{
                    slidesPerView:2
                },

                1200:{
                    slidesPerView:3
                }

            }

        });

    }

    /* ==========================
       TEAM SLIDER (OPTIONAL)
    ========================== */

    const teamSlider =
    document.querySelector(".team-slider");

    if(teamSlider){

        new Swiper(".team-slider", {

            loop:true,

            speed:900,

            spaceBetween:25,

            autoplay:{
                delay:3500,
                disableOnInteraction:false
            },

            breakpoints:{

                0:{
                    slidesPerView:1
                },

                768:{
                    slidesPerView:2
                },

                1024:{
                    slidesPerView:4
                }

            }

        });

    }

    /* ==========================
       BLOG SLIDER (OPTIONAL)
    ========================== */

    const blogSlider =
    document.querySelector(".blog-slider");

    if(blogSlider){

        new Swiper(".blog-slider", {

            loop:true,

            speed:900,

            spaceBetween:25,

            autoplay:{
                delay:5000,
                disableOnInteraction:false
            },

            breakpoints:{

                0:{
                    slidesPerView:1
                },

                768:{
                    slidesPerView:2
                },

                1200:{
                    slidesPerView:3
                }

            }

        });

    }

});

/* =====================================================
   CUSTOM AUTO LOGO SLIDER
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    const brandSlider =
    document.querySelector(".brand-slider");

    if(!brandSlider) return;

    const clone =
    brandSlider.innerHTML;

    brandSlider.innerHTML += clone;

});

/* =====================================================
   DYNAMIC SWIPER STYLES
===================================================== */

const sliderStyles =
document.createElement("style");

sliderStyles.innerHTML = `

.swiper{
    width:100%;
    padding-bottom:50px;
}

.swiper-pagination-bullet{

    width:12px;
    height:12px;

    background:#ffffff;

    opacity:.4;

}

.swiper-pagination-bullet-active{

    opacity:1;

    background:#14b8a6;

}

.swiper-button-next,
.swiper-button-prev{

    color:#14b8a6;

}

.brand-slider{

    display:flex;
    gap:60px;

    width:max-content;

    animation:
    brandScroll 25s linear infinite;

}

.brand-slider:hover{
    animation-play-state:paused;
}

@keyframes brandScroll{

    0%{
        transform:translateX(0);
    }

    100%{
        transform:translateX(-50%);
    }

}

`;

document.head.appendChild(sliderStyles);
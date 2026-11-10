/* =====================================================
   Stackly PARTICLES.JS
   Animated AI Background
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    const particlesContainer =
    document.getElementById("particles-js");

    if(!particlesContainer) return;

    particlesJS("particles-js", {

        particles: {

            number: {
                value: 90,
                density: {
                    enable: true,
                    value_area: 1000
                }
            },

            color: {
                value: [
                    "#059669",
                    "#14b8a6",
                    "#f43f5e"
                ]
            },

            shape: {
                type: "circle"
            },

            opacity: {
                value: 0.5,
                random: true
            },

            size: {
                value: 4,
                random: true
            },

            line_linked: {

                enable: true,

                distance: 150,

                color: "#14b8a6",

                opacity: 0.25,

                width: 1

            },

            move: {

                enable: true,

                speed: 2,

                direction: "none",

                random: false,

                straight: false,

                out_mode: "out",

                bounce: false

            }

        },

        interactivity: {

            detect_on: "canvas",

            events: {

                onhover: {
                    enable: true,
                    mode: "grab"
                },

                onclick: {
                    enable: true,
                    mode: "push"
                },

                resize: true

            },

            modes: {

                grab: {

                    distance: 180,

                    line_linked: {
                        opacity: 0.8
                    }

                },

                push: {
                    particles_nb: 4
                }

            }

        },

        retina_detect: true

    });

});

/* =====================================================
   OPTIONAL FLOATING GLOW ORBS
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    const body = document.body;

    for(let i = 0; i < 5; i++){

        const orb =
        document.createElement("div");

        orb.classList.add("glow-orb");

        orb.style.left =
        Math.random() * 100 + "%";

        orb.style.top =
        Math.random() * 100 + "%";

        orb.style.animationDuration =
        (10 + Math.random() * 10) + "s";

        body.appendChild(orb);

    }

});

const orbStyle =
document.createElement("style");

orbStyle.innerHTML = `

.glow-orb{

position:fixed;

width:250px;
height:250px;

border-radius:50%;

background:
radial-gradient(
circle,
rgba(0,229,255,.12),
transparent 70%
);

pointer-events:none;

z-index:-1;

animation:
floatOrb linear infinite;

filter:blur(10px);

}

@keyframes floatOrb{

0%{
transform:
translateY(0px)
translateX(0px);
}

25%{
transform:
translateY(-60px)
translateX(40px);
}

50%{
transform:
translateY(40px)
translateX(-40px);
}

75%{
transform:
translateY(-30px)
translateX(60px);
}

100%{
transform:
translateY(0px)
translateX(0px);
}

}

`;

document.head.appendChild(orbStyle);
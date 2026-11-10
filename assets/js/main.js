/* =====================================================
   Stackly - MAIN JS
   Loader + Mobile Menu + Counter
   FAQ + Scroll Top + Animations
===================================================== */

/* =====================================================
   STRICT EMAIL VALIDATOR (GLOBAL)
   Rules:
   - Accept only valid email address formats.
   - Allow letters, numbers, and only these special characters: '@' and '.'.
   - Reject spaces and all other special characters (e.g., _, -, +, !, #, etc.).
   - Ensure the email contains a valid username, '@', domain name, and extension.
===================================================== */
function validateStrictEmail(email) {
    if (!email || typeof email !== "string" || !email.trim()) {
        return {
            valid: false,
            message: "Please enter your email address."
        };
    }

    const val = email.trim();

    // 1. Reject spaces
    if (/\s/.test(val)) {
        return {
            valid: false,
            message: "Email address cannot contain spaces."
        };
    }

    // 2. Reject all characters except letters, numbers, '@', and '.'
    if (/[^a-zA-Z0-9@.]/.test(val)) {
        return {
            valid: false,
            message: "Only letters, numbers, '@', and '.' are allowed."
        };
    }

    // 3. Must contain exactly one '@'
    const atParts = val.split("@");
    if (atParts.length !== 2) {
        return {
            valid: false,
            message: "Email address must contain exactly one '@' symbol."
        };
    }

    const username = atParts[0];
    const domainPart = atParts[1];

    // 4. Validate Username before '@'
    if (!username) {
        return {
            valid: false,
            message: "Email must include a username before the '@' symbol."
        };
    }

    if (username.startsWith(".") || username.endsWith(".")) {
        return {
            valid: false,
            message: "Username cannot start or end with a dot ('.')."
        };
    }

    if (username.includes("..")) {
        return {
            valid: false,
            message: "Username cannot contain consecutive dots ('..')."
        };
    }

    // 5. Validate Domain part after '@'
    if (!domainPart) {
        return {
            valid: false,
            message: "Email must include a domain name after the '@' symbol."
        };
    }

    if (domainPart.startsWith(".") || domainPart.endsWith(".")) {
        return {
            valid: false,
            message: "Domain name cannot start or end with a dot ('.')."
        };
    }

    if (domainPart.includes("..")) {
        return {
            valid: false,
            message: "Domain name cannot contain consecutive dots ('..')."
        };
    }

    if (!domainPart.includes(".")) {
        return {
            valid: false,
            message: "Email domain must include an extension (e.g., .com)."
        };
    }

    const domainLabels = domainPart.split(".");
    const extension = domainLabels[domainLabels.length - 1];

    // Extension must be at least 2 letters (e.g., com, org, net, io)
    if (!/^[a-zA-Z]{2,}$/.test(extension)) {
        return {
            valid: false,
            message: "Domain extension must be at least 2 letters (e.g., .com)."
        };
    }

    // Every preceding domain label must be letters/numbers only
    for (let i = 0; i < domainLabels.length - 1; i++) {
        if (!/^[a-zA-Z0-9]+$/.test(domainLabels[i])) {
            return {
                valid: false,
                message: "Domain name can only contain letters and numbers."
            };
        }
    }

    // 6. Comprehensive regex check
    const strictEmailRegex = /^[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*\.[a-zA-Z]{2,}$/;
    if (!strictEmailRegex.test(val)) {
        return {
            valid: false,
            message: "Please enter a valid email address (e.g., username@domain.com)."
        };
    }

    return {
        valid: true,
        message: ""
    };
}
window.validateStrictEmail = validateStrictEmail;

/* =====================================================
   STRICT PASSWORD VALIDATOR (GLOBAL)
   Rules:
   - At least one uppercase letter (A–Z).
   - At least one lowercase letter (a–z).
   - At least one number (0–9).
   - At least one special character (e.g., @, #, $, !).
   - Minimum 8 characters.
===================================================== */
function validateStrictPassword(password) {
    if (!password || typeof password !== "string") {
        return {
            valid: false,
            message: "Please enter your password."
        };
    }

    if (password.length < 8) {
        return {
            valid: false,
            message: "Password must be at least 8 characters long."
        };
    }

    if (!/[A-Z]/.test(password)) {
        return {
            valid: false,
            message: "Password must contain at least one uppercase letter (A–Z)."
        };
    }

    if (!/[a-z]/.test(password)) {
        return {
            valid: false,
            message: "Password must contain at least one lowercase letter (a–z)."
        };
    }

    if (!/[0-9]/.test(password)) {
        return {
            valid: false,
            message: "Password must contain at least one number (0–9)."
        };
    }

    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?`~]/.test(password)) {
        return {
            valid: false,
            message: "Password must contain at least one special character (e.g., @, #, $, !)."
        };
    }

    return {
        valid: true,
        message: ""
    };
}
window.validateStrictPassword = validateStrictPassword;

document.addEventListener("DOMContentLoaded", () => {

    /* ==========================
       MOBILE MENU
    ========================== */

    const menuBtn = document.querySelector(".mobile-toggle");
    const nav = document.querySelector("nav");

    if(menuBtn && nav){

        menuBtn.addEventListener("click", () => {

            nav.classList.toggle("active");

            const icon = menuBtn.querySelector("i");

            if(nav.classList.contains("active")){

                icon.classList.remove("fa-bars");
                icon.classList.add("fa-times");

            }else{

                icon.classList.remove("fa-times");
                icon.classList.add("fa-bars");

            }

        });

    }

    /* ==========================
       CLOSE MENU AFTER CLICK
    ========================== */

    const navLinks = document.querySelectorAll("nav a");

    navLinks.forEach(link => {

        link.addEventListener("click", () => {

            if(nav){

                nav.classList.remove("active");

                if(menuBtn){

                    menuBtn.innerHTML =
                    '<i class="fas fa-bars"></i>';

                }

            }

        });

    });

    /* ==========================
       COUNTER ANIMATION
    ========================== */

    const counters =
    document.querySelectorAll(".counter");

    const startCounter = () => {

        counters.forEach(counter => {

            const target =
            +counter.getAttribute("data-target");

            let count = 0;

            const speed = target / 150;

            const updateCounter = () => {

                count += speed;

                if(count < target){

                    counter.innerText =
                    Math.floor(count);

                    requestAnimationFrame(
                    updateCounter);

                }else{

                    counter.innerText =
                    target + "+";

                }

            };

            updateCounter();

        });

    };

    const counterSection =
    document.querySelector(".counter-section");

    if(counterSection){

        const observer =
        new IntersectionObserver(entries => {

            entries.forEach(entry => {

                if(entry.isIntersecting){

                    startCounter();

                    observer.disconnect();

                }

            });

        });

        observer.observe(counterSection);

    }

    /* ==========================
       FAQ ACCORDION
    ========================== */

    const faqButtons =
    document.querySelectorAll(".faq-question");

    faqButtons.forEach(button => {

        button.addEventListener("click", () => {

            const answer =
            button.nextElementSibling;

            document
            .querySelectorAll(".faq-answer")
            .forEach(item => {

                if(item !== answer){

                    item.style.display = "none";

                }

            });

            if(answer.style.display === "block"){

                answer.style.display = "none";

            }else{

                answer.style.display = "block";

            }

        });

    });

    /* ==========================
       SCROLL TO TOP
    ========================== */

    const scrollBtn =
    document.getElementById("scrollTop");

    window.addEventListener("scroll", () => {

        if(scrollBtn){

            if(window.scrollY > 500){

                scrollBtn.classList.add("show");

            }else{

                scrollBtn.classList.remove("show");

            }

        }

    });

    if(scrollBtn){

        scrollBtn.addEventListener("click", () => {

            window.scrollTo({

                top:0,
                behavior:"smooth"

            });

        });

    }

    /* ==========================
       ACTIVE NAVIGATION & CURRENT PAGE HIGHLIGHT
    ========================== */
    function initActiveNav() {
        const rawPath = window.location.pathname;
        let currentPage = rawPath.substring(rawPath.lastIndexOf('/') + 1).toLowerCase();
        if (!currentPage || currentPage === '' || currentPage === '/') {
            currentPage = 'index.html';
        }

        const headerNavLinks = document.querySelectorAll('header nav ul li a');
        let matched = false;

        headerNavLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (!href) return;
            const linkTarget = href.substring(href.lastIndexOf('/') + 1).split('#')[0].toLowerCase();

            const isCurrent = (linkTarget === currentPage) ||
                              (currentPage === 'service-details.html' && linkTarget === 'services.html') ||
                              (currentPage === 'blog-details.html' && linkTarget === 'blog.html');

            if (isCurrent) {
                link.classList.add('active');
                link.setAttribute('aria-current', 'page');
                matched = true;
            } else {
                link.classList.remove('active');
                link.removeAttribute('aria-current');
            }
        });

        if (!matched && (currentPage === '' || currentPage === 'index.html')) {
            const homeLink = document.querySelector("header nav ul li a[href='index.html']");
            if (homeLink) {
                homeLink.classList.add('active');
                homeLink.setAttribute('aria-current', 'page');
            }
        }
    }

    initActiveNav();
    /* ==========================
       HEADER SCROLL EFFECT
    ========================== */

    const header =
    document.querySelector("header");

    window.addEventListener("scroll", () => {

        if(header){

            if(window.scrollY > 100){

                header.style.background =
                "rgba(7,11,22,.95)";

                header.style.boxShadow =
                "0 10px 30px rgba(0,0,0,.3)";

            }else{

                header.style.background =
                "rgba(7,11,22,.85)";

                header.style.boxShadow =
                "none";

            }

        }

    });

    /* ==========================
       CUSTOM CURSOR
    ========================== */

    const cursor =
    document.querySelector(".cursor");

    if(cursor){

        document.addEventListener(
        "mousemove",
        (e) => {

            cursor.style.left =
            e.clientX + "px";

            cursor.style.top =
            e.clientY + "px";

        });

    }

    /* ==========================
       FLOATING CARDS EFFECT
    ========================== */

    const cards =
    document.querySelectorAll(
    ".service-card,.team-card,.price-card,.blog-card,.case-card"
    );

    cards.forEach(card => {

        card.addEventListener("mouseenter", () => {

            card.style.transform =
            "translateY(-12px)";

        });

        card.addEventListener("mouseleave", () => {

            card.style.transform =
            "translateY(0px)";

        });

    });

    /* ==========================
       CONTACT FORM
    ========================== */

    const contactForm =
    document.querySelector(".contact-form");

    if(contactForm){
        const contactEmail = contactForm.querySelector("#contactEmail");
        const contactError = contactForm.querySelector("#contactError");

        if(contactEmail){
            contactEmail.addEventListener("input", () => {
                contactEmail.classList.remove("input-error");
                if(contactError) contactError.textContent = "";
            });
        }

        contactForm.addEventListener(
        "submit",
        (e) => {

            e.preventDefault();

            const name =
            contactForm.querySelector(
            "#contactName"
            );
            const email =
            contactForm.querySelector(
            "#contactEmail"
            );
            const message =
            contactForm.querySelector(
            "#contactMessage"
            );
            const error =
            contactForm.querySelector(
            "#contactError"
            );

            if(!name || !name.value.trim()){
                if(error) error.textContent = "Please enter your name.";
                if(name) { name.classList.add("input-error"); name.focus(); }
                return;
            }

            const emailVal = email ? email.value : "";
            const emailValidation = validateStrictEmail(emailVal);
            if(!emailValidation.valid){
                if(error) error.textContent = emailValidation.message;
                if(email) { email.classList.add("input-error"); email.focus(); }
                return;
            }

            if(!message || !message.value.trim()){
                if(error) error.textContent = "Please enter your message.";
                if(message) { message.classList.add("input-error"); message.focus(); }
                return;
            }

            if(error){
                error.textContent = "";
            }
            if(email) email.classList.remove("input-error");

            window.location.href =
            "404.html";

        });

    }

    /* ==========================
       NEWSLETTER
    ========================== */

    const newsletterForms = document.querySelectorAll(
        ".newsletter form, .newsletter-form"
    );

    newsletterForms.forEach((newsletterForm) => {
        const input = newsletterForm.querySelector('input[type="email"]');
        const error = newsletterForm.querySelector(".newsletter-error");

        if (input && error) {
            input.addEventListener("input", () => {
                input.classList.remove("input-error");
                if (error.getAttribute("data-status") !== "success") {
                    error.textContent = "";
                }
            });
        }

        newsletterForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const emailVal = input ? input.value : "";
            const emailValidation = validateStrictEmail(emailVal);

            if (!emailValidation.valid) {
                if (error) {
                    error.style.color = "#ef4444";
                    error.removeAttribute("data-status");
                    error.textContent = emailValidation.message;
                }
                if (input) {
                    input.classList.add("input-error");
                    input.focus();
                }
                return;
            }

            // Valid subscription
            if (input) input.classList.remove("input-error");
            if (error) {
                error.style.color = "#10b981";
                error.setAttribute("data-status", "success");
                error.textContent = "Thank you for subscribing to Stackly AI updates!";
                setTimeout(() => {
                    if (error.getAttribute("data-status") === "success") {
                        error.textContent = "";
                        error.removeAttribute("data-status");
                    }
                }, 5000);
            }
            if (input) input.value = "";
        });
    });

    /* =====================================================
       GLOBAL STRICT EMAIL VALIDATION FOR ALL FORMS
    ===================================================== */
    document.querySelectorAll("form").forEach((form) => {
        const emailInputs = form.querySelectorAll(
            'input[type="email"], input[id*="email" i], input[name*="email" i]'
        );

        emailInputs.forEach((emailInput) => {
            emailInput.addEventListener("input", () => {
                emailInput.classList.remove("input-error");
                emailInput.setCustomValidity("");
            });

            form.addEventListener("submit", (e) => {
                const res = validateStrictEmail(emailInput.value);
                if (!res.valid) {
                    e.preventDefault();
                    e.stopPropagation();
                    emailInput.classList.add("input-error");
                    emailInput.setCustomValidity(res.message);

                    const errorEl = form.querySelector(
                        ".auth-field-error, .contact-error, .newsletter-error, .email-field-error"
                    );
                    if (errorEl) {
                        errorEl.textContent = res.message;
                        errorEl.style.color = "#ef4444";
                    }
                    emailInput.reportValidity();
                    emailInput.focus();
                } else {
                    emailInput.setCustomValidity("");
                    emailInput.classList.remove("input-error");
                }
            }, true);
        });
    });

    /* =====================================================
       GLOBAL STRICT PASSWORD VALIDATION FOR ALL FORMS
    ===================================================== */
    document.querySelectorAll("form").forEach((form) => {
        const passwordInputs = form.querySelectorAll('input[type="password"]');

        passwordInputs.forEach((passInput) => {
            passInput.addEventListener("input", () => {
                passInput.classList.remove("input-error");
                passInput.setCustomValidity("");
            });

            form.addEventListener("submit", (e) => {
                const isConfirm = passInput.id.toLowerCase().includes("confirm") || 
                                  passInput.name.toLowerCase().includes("confirm") || 
                                  passInput.placeholder.toLowerCase().includes("confirm") ||
                                  passInput.placeholder.toLowerCase().includes("re-");

                if (!isConfirm) {
                    const res = validateStrictPassword(passInput.value);
                    if (!res.valid) {
                        e.preventDefault();
                        e.stopPropagation();
                        passInput.classList.add("input-error");
                        passInput.setCustomValidity(res.message);

                        const errorEl = form.querySelector(
                            `#${passInput.id}Error, .password-error, .auth-field-error`
                        );
                        if (errorEl) {
                            errorEl.textContent = res.message;
                            errorEl.style.color = "#ef4444";
                        }
                        passInput.reportValidity();
                        passInput.focus();
                    } else {
                        passInput.setCustomValidity("");
                        passInput.classList.remove("input-error");
                    }
                }
            }, true);
        });
    });

    /* ==========================
       REVEAL ON SCROLL
    ========================== */

    const revealElements =
    document.querySelectorAll(
    ".service-card,.team-card,.blog-card,.price-card,.case-card,.why-card,.solution-card"
    );

    const revealObserver =
    new IntersectionObserver(entries => {

        entries.forEach(entry => {

            if(entry.isIntersecting){

                entry.target.style.opacity = "1";

                entry.target.style.transform =
                "translateY(0)";

            }

        });

    }, {
        threshold:0.1
    });

    revealElements.forEach(item => {

        item.style.opacity = "0";
        item.style.transform =
        "translateY(40px)";
        item.style.transition =
        "all .8s ease";

        revealObserver.observe(item);

    });

});

/* ==========================
CONSOLE BRANDING
========================== */

console.log(
"%cStackly",
"font-size:28px;font-weight:bold;color:#14b8a6;"
);

console.log(
"%cFuture Powered By Artificial Intelligence",
"font-size:14px;color:#059669;"
);

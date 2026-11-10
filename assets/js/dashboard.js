/**
 * Stackly AI - Unified Dashboard Logic
 * Features:
 * 1. Extracts user name from loggedInUserEmail before the '@' symbol
 * 2. Formats and dynamically displays the name in welcome message and header
 * 3. Replaces profile image with a stylish circular element showing first letter of email name
 * 4. Full responsive mobile sidebar navigation with backdrop overlay
 * 5. Logo redirection to appropriate dashboard home (dashboard.html for Admin, user.html for User)
 * 6. Interactive element redirection to 404.html (stat boxes, action buttons, cards, charts, forms)
 *    EXCEPTIONS: Sidebar menu, Logo, Header elements, Logout button, Go to Home button.
 */

document.addEventListener("DOMContentLoaded", function () {
    // 1. Detect if this is an Admin page or User page
    const pathname = window.location.pathname.toLowerCase();
    const isAdmin = pathname.includes("admin") || (pathname.includes("dashboard") && !pathname.includes("user"));
    
    // Default fallbacks if user navigated directly without logging in
    const defaultEmail = isAdmin ? "admin@stackly.com" : "user@stackly.com";
    const defaultRole = isAdmin ? "admin" : "user";
    const dashboardHome = isAdmin ? "dashboard.html" : "user.html";

    // 2. Retrieve email and role from localStorage
    const savedEmail = localStorage.getItem("loggedInUserEmail");
    const savedRole = localStorage.getItem("loggedInUserRole") || defaultRole;
    
    const userEmail = (savedEmail && savedEmail.trim().length > 0) ? savedEmail.trim() : defaultEmail;

    // 3. Extract the name from email before '@' symbol
    let rawName = "Admin";
    if (userEmail.includes("@")) {
        rawName = userEmail.split("@")[0];
    } else {
        rawName = userEmail;
    }

    // Format the name: capitalize words and replace dots/dashes/underscores with space
    let formattedName = rawName
        .split(/[._-]/)
        .filter(part => part.length > 0)
        .map(part => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
        .join(" ");

    if (!formattedName) {
        formattedName = isAdmin ? "Admin" : "User";
    }

    // 4. Extract first letter as Initial
    const initialLetter = rawName.charAt(0).toUpperCase() || (isAdmin ? "A" : "U");

    // 5. Populate Dynamic Name in all matching elements
    document.querySelectorAll(".dynamic-user-name").forEach(el => {
        el.textContent = formattedName;
    });

    const headerName = document.getElementById("userNameHeader");
    if (headerName) {
        headerName.textContent = formattedName;
    }

    const headerRole = document.getElementById("userRoleHeader");
    if (headerRole) {
        headerRole.textContent = isAdmin ? "Administrator" : "Pro Member";
    }

    // 6. Populate Avatar Initial in all circular avatar elements
    document.querySelectorAll(".user-avatar-initial").forEach(el => {
        el.textContent = initialLetter;
    });

    // 7. Populate Dynamic Email where needed
    document.querySelectorAll(".dynamic-user-email").forEach(el => {
        if (el.tagName === "INPUT") {
            el.value = userEmail;
        } else {
            el.textContent = userEmail;
        }
    });

    // Populate Dynamic Name in form inputs on profile pages
    document.querySelectorAll(".dynamic-user-input-name").forEach(el => {
        if (el.tagName === "INPUT") {
            el.value = formattedName;
        }
    });

    // 8. Website Logo navigation: Navigate to the appropriate dashboard home page
    document.querySelectorAll(".sidebar-logo a, .dash-header-logo").forEach(logo => {
        logo.href = dashboardHome;
        logo.setAttribute("title", isAdmin ? "Admin Dashboard Home" : "User Dashboard Home");
    });

    // 9. Mobile Sidebar Drawer & Backdrop Handling
    const sidebarToggle = document.querySelector(".sidebar-toggle");
    const sidebar = document.querySelector(".sidebar");
    
    // Inject mobile backdrop if not present
    let backdrop = document.querySelector(".sidebar-backdrop");
    if (!backdrop) {
        backdrop = document.createElement("div");
        backdrop.className = "sidebar-backdrop";
        document.body.appendChild(backdrop);
    }

    function openSidebar() {
        if (sidebar) sidebar.classList.add("active");
        if (backdrop) backdrop.classList.add("active");
        document.body.style.overflow = "hidden";
    }

    function closeSidebar() {
        if (sidebar) sidebar.classList.remove("active");
        if (backdrop) backdrop.classList.remove("active");
        document.body.style.overflow = "";
    }

    if (sidebarToggle && sidebar) {
        sidebarToggle.addEventListener("click", function (e) {
            e.stopPropagation();
            if (sidebar.classList.contains("active")) {
                closeSidebar();
            } else {
                openSidebar();
            }
        });

        backdrop.addEventListener("click", closeSidebar);

        const closeBtn = sidebar.querySelector(".sidebar-close-btn");
        if (closeBtn) {
            closeBtn.addEventListener("click", closeSidebar);
        }
    }

    // 10. Logout handler: redirects to login.html
    document.querySelectorAll(".logout-link, a.logout-btn").forEach(btn => {
        btn.addEventListener("click", function (e) {
            e.preventDefault();
            e.stopPropagation();
            window.location.href = "login.html";
        });
    });

    // 11. Go to Home button: redirects to index.html
    document.querySelectorAll("a.home-btn").forEach(btn => {
        btn.addEventListener("click", function (e) {
            e.stopPropagation();
            window.location.href = "index.html";
        });
    });

    // 12. Global 404 Redirection for dashboard interactive elements
    // Redirects all clickable buttons, links, cards, icons, stat boxes inside dashboard content to 404.html
    // EXCEPTIONS: Sidebar, Header elements, Website Logo, Logout button, Go to Home button, Newsletter
    const dashboardContent = document.querySelector(".dashboard-content");
    if (dashboardContent) {
        dashboardContent.addEventListener("click", function (e) {
            // Keep header elements working normally
            if (e.target.closest(".dashboard-top-bar")) {
                return;
            }

            // Do not block typing/focus in inputs/textareas/selects
            if (e.target.closest("input, textarea, select")) {
                return;
            }

            // Keep newsletter form working normally
            if (e.target.closest(".newsletter, .newsletter-form, .dashboard-newsletter")) {
                return;
            }

            // Check if clicking any button, link, stat box, card, action button, badge, table row, icon, chart
            const interactiveTarget = e.target.closest(
                "a, button, .dash-stat-box, .stat-card, .dash-btn, .dash-card, .dash-badge, table tr, canvas"
            );

            if (interactiveTarget) {
                e.preventDefault();
                e.stopPropagation();
                window.location.href = "404.html";
            }
        });

        // Intercept all other form submissions inside dashboard content and redirect to 404.html
        dashboardContent.querySelectorAll("form:not(.newsletter-form)").forEach(form => {
            form.addEventListener("submit", function (e) {
                e.preventDefault();
                e.stopPropagation();
                window.location.href = "404.html";
            });
        });
    }

    // 13. Newsletter & Global Email Validation for Dashboard Pages
    const validateStrictEmail = window.validateStrictEmail || function (email) {
        if (!email || typeof email !== "string" || !email.trim()) {
            return { valid: false, message: "Please enter your email address." };
        }
        const val = email.trim();
        if (/\s/.test(val)) {
            return { valid: false, message: "Email address cannot contain spaces." };
        }
        if (/[^a-zA-Z0-9@.]/.test(val)) {
            return { valid: false, message: "Only letters, numbers, '@', and '.' are allowed." };
        }
        const atParts = val.split("@");
        if (atParts.length !== 2) {
            return { valid: false, message: "Email address must contain exactly one '@' symbol." };
        }
        const username = atParts[0];
        const domainPart = atParts[1];
        if (!username) {
            return { valid: false, message: "Email must include a username before the '@' symbol." };
        }
        if (username.startsWith(".") || username.endsWith(".")) {
            return { valid: false, message: "Username cannot start or end with a dot ('.')." };
        }
        if (username.includes("..")) {
            return { valid: false, message: "Username cannot contain consecutive dots ('..')." };
        }
        if (!domainPart) {
            return { valid: false, message: "Email must include a domain name after the '@' symbol." };
        }
        if (domainPart.startsWith(".") || domainPart.endsWith(".")) {
            return { valid: false, message: "Domain name cannot start or end with a dot ('.')." };
        }
        if (domainPart.includes("..")) {
            return { valid: false, message: "Domain name cannot contain consecutive dots ('..')." };
        }
        if (!domainPart.includes(".")) {
            return { valid: false, message: "Email domain must include an extension (e.g., .com)." };
        }
        const domainLabels = domainPart.split(".");
        const extension = domainLabels[domainLabels.length - 1];
        if (!/^[a-zA-Z]{2,}$/.test(extension)) {
            return { valid: false, message: "Domain extension must be at least 2 letters (e.g., .com)." };
        }
        for (let i = 0; i < domainLabels.length - 1; i++) {
            if (!/^[a-zA-Z0-9]+$/.test(domainLabels[i])) {
                return { valid: false, message: "Domain name can only contain letters and numbers." };
            }
        }
        const strictEmailRegex = /^[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*\.[a-zA-Z]{2,}$/;
        if (!strictEmailRegex.test(val)) {
            return { valid: false, message: "Please enter a valid email address (e.g., username@domain.com)." };
        }
        return { valid: true, message: "" };
    };

    const dashNewsletterForms = document.querySelectorAll(
        ".newsletter form, .newsletter-form"
    );

    dashNewsletterForms.forEach((newsletterForm) => {
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

    // Global strict email validation for dashboard forms
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
                    emailInput.reportValidity();
                    emailInput.focus();
                } else {
                    emailInput.setCustomValidity("");
                    emailInput.classList.remove("input-error");
                }
            }, true);
        });
    });

    // 14. Global Strict Password Validation for Dashboard Forms
    const validateStrictPassword = window.validateStrictPassword || function (password) {
        if (!password || typeof password !== "string") {
            return { valid: false, message: "Please enter your password." };
        }
        if (password.length < 8) {
            return { valid: false, message: "Password must be at least 8 characters long." };
        }
        if (!/[A-Z]/.test(password)) {
            return { valid: false, message: "Password must contain at least one uppercase letter (A–Z)." };
        }
        if (!/[a-z]/.test(password)) {
            return { valid: false, message: "Password must contain at least one lowercase letter (a–z)." };
        }
        if (!/[0-9]/.test(password)) {
            return { valid: false, message: "Password must contain at least one number (0–9)." };
        }
        if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?`~]/.test(password)) {
            return { valid: false, message: "Password must contain at least one special character (e.g., @, #, $, !)." };
        }
        return { valid: true, message: "" };
    };

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
});

/* =========================================================
   TOL MAKUACH TOL — PORTFOLIO JAVASCRIPT
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       1. CURRENT YEAR
       ===================================================== */

    const yearElement = document.getElementById("year");

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }


    /* =====================================================
       2. NAVBAR SCROLL EFFECT
       ===================================================== */

    const navbar = document.querySelector(".navbar");

    if (navbar) {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 50) {
                navbar.classList.add("scrolled");
            } else {
                navbar.classList.remove("scrolled");
            }
        });
    }


    /* =====================================================
       3. MOBILE MENU
       ===================================================== */

    const nav = document.querySelector("nav");
    const navButton = document.querySelector(".nav-button");

    if (navButton && nav) {
        navButton.addEventListener("click", () => {
            nav.classList.toggle("mobile-active");
            navButton.classList.toggle("active");
        });
    }


    /* =====================================================
       4. NAVIGATION LINKS
       ===================================================== */

    const navLinks = document.querySelectorAll("nav a");

    navLinks.forEach((link) => {

        link.addEventListener("click", (event) => {

            const targetId = link.getAttribute("href");

            /* Close mobile menu */
            if (nav) {
                nav.classList.remove("mobile-active");
            }

            if (navButton) {
                navButton.classList.remove("active");
            }

            /* Smooth scrolling */
            if (
                targetId &&
                targetId.startsWith("#") &&
                targetId.length > 1
            ) {
                const targetSection =
                    document.querySelector(targetId);

                if (targetSection) {
                    event.preventDefault();

                    targetSection.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });
                }
            }

        });

    });


    /* =====================================================
       5. ACTIVE NAVIGATION LINK
       ===================================================== */

    const sections =
        document.querySelectorAll("section[id]");

    function updateActiveNavigation() {

        let currentSection = "";

        sections.forEach((section) => {

            const sectionTop =
                section.offsetTop - 180;

            const sectionHeight =
                section.offsetHeight;

            if (
                window.scrollY >= sectionTop &&
                window.scrollY <
                sectionTop + sectionHeight
            ) {
                currentSection = section.id;
            }

        });

        navLinks.forEach((link) => {

            const linkTarget =
                link.getAttribute("href");

            link.classList.remove("active");

            if (
                currentSection &&
                linkTarget === "#" + currentSection
            ) {
                link.classList.add("active");
            }

        });

    }

    window.addEventListener(
        "scroll",
        updateActiveNavigation
    );

    updateActiveNavigation();


    /* =====================================================
       6. SCROLL REVEAL ANIMATION
       ===================================================== */

    const revealElements =
        document.querySelectorAll(
            ".section, .service-card, .project-card, .about-box, .stat, .contact-content"
        );

    if (
        revealElements.length > 0 &&
        "IntersectionObserver" in window
    ) {

        const revealObserver =
            new IntersectionObserver(
                (entries, observer) => {

                    entries.forEach((entry) => {

                        if (entry.isIntersecting) {

                            entry.target.classList.add("show");

                            observer.unobserve(
                                entry.target
                            );

                        }

                    });

                },
                {
                    threshold: 0.15
                }
            );

        revealElements.forEach((element) => {

            element.classList.add("reveal");

            revealObserver.observe(element);

        });

    } else {

        revealElements.forEach((element) => {
            element.classList.add("show");
        });

    }


    /* =====================================================
       7. TYPING EFFECT
       ===================================================== */

    const typingElement =
        document.querySelector(".typing-text");

    if (typingElement) {

        const roles = [
            "UI/UX Designer",
            "Web Developer",
            "Graphic Designer",
            "Cybersecurity Student"
        ];

        let roleIndex = 0;
        let characterIndex = 0;
        let deleting = false;

        function typeRole() {

            const currentRole =
                roles[roleIndex];

            if (!deleting) {

                typingElement.textContent =
                    currentRole.substring(
                        0,
                        characterIndex + 1
                    );

                characterIndex++;

                if (
                    characterIndex >=
                    currentRole.length
                ) {

                    deleting = true;

                    setTimeout(
                        typeRole,
                        1500
                    );

                    return;
                }

            } else {

                typingElement.textContent =
                    currentRole.substring(
                        0,
                        characterIndex - 1
                    );

                characterIndex--;

                if (characterIndex <= 0) {

                    characterIndex = 0;
                    deleting = false;

                    roleIndex++;

                    if (
                        roleIndex >= roles.length
                    ) {
                        roleIndex = 0;
                    }

                }

            }

            setTimeout(
                typeRole,
                deleting ? 60 : 100
            );

        }

        typeRole();
    }


    /* =====================================================
       8. BACK TO TOP BUTTON
       ===================================================== */

    let backToTop =
        document.querySelector(".back-to-top");

    if (!backToTop) {

        backToTop =
            document.createElement("button");

        backToTop.className =
            "back-to-top";

        backToTop.innerHTML = "↑";

        backToTop.setAttribute(
            "aria-label",
            "Back to top"
        );

        document.body.appendChild(
            backToTop
        );
    }


    window.addEventListener("scroll", () => {

        if (window.scrollY > 500) {

            backToTop.classList.add("visible");

        } else {

            backToTop.classList.remove("visible");

        }

    });


    backToTop.addEventListener(
        "click",
        () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }
    );


  /* =====================================================
   9. CONTACT FORM — EMAILJS INTEGRATION
   ===================================================== */

const contactForm = document.querySelector("#contact-form");

if (contactForm) {

    contactForm.addEventListener("submit", async (event) => {

        event.preventDefault();

        const submitButton =
            contactForm.querySelector('button[type="submit"]');

        // Validate form fields
        if (!contactForm.reportValidity()) {
            return;
        }

        // Save original button text
        const originalButtonText = submitButton.textContent;

        // Disable button while sending
        submitButton.disabled = true;
        submitButton.textContent = "Sending...";

        try {

            // Send message through EmailJS
            const response = await emailjs.sendForm(
                "service_hzf1jmn",
                "template_smdsa5l",
                contactForm
            );

            console.log("Email sent successfully:", response);

            // Success notification
            alert(
                "Thank you! Your message has been sent successfully."
            );

            // Clear form
            contactForm.reset();

        } catch (error) {

            // Display error
            console.error("EmailJS Error:", error);

            alert(
                "Sorry! Your message could not be sent. Please try again."
            );

        } finally {

            // Restore button
            submitButton.disabled = false;
            submitButton.textContent = originalButtonText;

        }

    });

}    /* =====================================================
       10. PROJECT CARD EFFECT
       ===================================================== */

    const projectCards =
        document.querySelectorAll(".project-card");

    projectCards.forEach((card) => {

        card.addEventListener(
            "mouseenter",
            () => {
                card.classList.add(
                    "project-hover"
                );
            }
        );

        card.addEventListener(
            "mouseleave",
            () => {
                card.classList.remove(
                    "project-hover"
                );
            }
        );

    });


    /* =====================================================
       11. BUTTON RIPPLE EFFECT
       ===================================================== */

    const buttons =
        document.querySelectorAll(".btn");

    buttons.forEach((button) => {

        button.addEventListener(
            "click",
            function (event) {

                const ripple =
                    document.createElement("span");

                ripple.classList.add("ripple");

                const rect =
                    button.getBoundingClientRect();

                const size =
                    Math.max(
                        rect.width,
                        rect.height
                    );

                ripple.style.width =
                    size + "px";

                ripple.style.height =
                    size + "px";

                ripple.style.left =
                    event.clientX -
                    rect.left -
                    size / 2 +
                    "px";

                ripple.style.top =
                    event.clientY -
                    rect.top -
                    size / 2 +
                    "px";

                button.appendChild(ripple);

                setTimeout(() => {
                    ripple.remove();
                }, 600);

            }
        );

    });


    /* =====================================================
       12. IMAGE LOADING
       ===================================================== */

    const images =
        document.querySelectorAll("img");

    images.forEach((image) => {

        image.addEventListener(
            "load",
            () => {

                image.classList.add("loaded");

            }
        );

    });


    /* =====================================================
       13. HANDLE BROKEN IMAGES
       ===================================================== */

    images.forEach((image) => {

        image.addEventListener(
            "error",
            () => {

                console.warn(
                    "Image could not be loaded:",
                    image.src
                );

                /* Do not hide the image automatically.
                   This makes it easier to see which image
                   path needs to be fixed. */

            }
        );

    });


    /* =====================================================
       14. CONSOLE MESSAGE
       ===================================================== */

    console.log(
        "Portfolio loaded successfully."
    );

    console.log(
        "Welcome to Tol Makuach Tol's portfolio."
    );

});

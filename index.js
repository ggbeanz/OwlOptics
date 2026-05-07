// initialization

const RESPONSIVE_WIDTH = 1024

let isHeaderCollapsed = window.innerWidth < RESPONSIVE_WIDTH
const collapseBtn = document.getElementById("collapse-btn")
const collapseHeaderItems = document.getElementById("collapsed-header-items")
const headerLinks = document.querySelectorAll(".header-links")
const faqAccordion = document.querySelectorAll(".faq-accordion")
const siteImages = document.querySelectorAll("img")

function onHeaderClickOutside(e) {
    if (!collapseHeaderItems.contains(e.target) && !collapseBtn.contains(e.target)) {
        toggleHeader()
    }
}

function toggleHeader(e) {
    if (e) e.stopPropagation()

    if (isHeaderCollapsed) {
        collapseHeaderItems.classList.add("opacity-100")
        collapseHeaderItems.style.width = "60vw"
        collapseHeaderItems.style.pointerEvents = "auto"
        collapseBtn.classList.remove("bi-list")
        collapseBtn.classList.add("bi-x", "max-lg:tw-fixed")
        collapseBtn.setAttribute("aria-expanded", "true")
        isHeaderCollapsed = false

        setTimeout(() => window.addEventListener("click", onHeaderClickOutside), 1)
    } else {
        collapseHeaderItems.classList.remove("opacity-100")
        collapseHeaderItems.style.width = "0vw"
        collapseHeaderItems.style.pointerEvents = "none"
        collapseBtn.classList.remove("bi-x", "max-lg:tw-fixed")
        collapseBtn.classList.add("bi-list")
        collapseBtn.setAttribute("aria-expanded", "false")
        isHeaderCollapsed = true
        window.removeEventListener("click", onHeaderClickOutside)
    }
}

function closeHeader() {
    if (window.innerWidth < RESPONSIVE_WIDTH && !isHeaderCollapsed) {
        toggleHeader()
    }
}

function responsive() {
    if (window.innerWidth > RESPONSIVE_WIDTH) {
        collapseHeaderItems.style.width = ""
        collapseHeaderItems.style.pointerEvents = "auto"
        collapseHeaderItems.classList.add("opacity-100")
        collapseBtn.setAttribute("aria-expanded", "false")
        window.removeEventListener("click", onHeaderClickOutside)
        isHeaderCollapsed = false
    } else {
        collapseHeaderItems.style.width = "0vw"
        collapseHeaderItems.style.pointerEvents = "none"
        collapseHeaderItems.classList.remove("opacity-100")
        collapseBtn.classList.remove("bi-x", "max-lg:tw-fixed")
        collapseBtn.classList.add("bi-list")
        collapseBtn.setAttribute("aria-expanded", "false")
        isHeaderCollapsed = true
    }
}

window.addEventListener("resize", responsive)
window.addEventListener("load", responsive)

headerLinks.forEach((link) => {
    link.addEventListener("click", closeHeader)
})

// Make non-hero images lazy without editing every <img> tag.
siteImages.forEach((img) => {
    const src = img.getAttribute("src") || ""
    const isHero = src.includes("final_prototype.jpg") || src.includes("logo.png")

    if (!isHero) {
        img.setAttribute("loading", "lazy")
    } else {
        img.setAttribute("fetchpriority", "high")
    }
    img.setAttribute("decoding", "async")
})

/**
 * Animations
 */

gsap.registerPlugin(ScrollTrigger)

gsap.to(".reveal-up", {
    opacity: 0,
    y: "100%",
})

gsap.to("#dashboard", {
    boxShadow: "0px 15px 25px -5px #1a9f99",
    duration: 0.3,
    scrollTrigger: {
        trigger: "#hero-section",
        start: "60% 60%",
        end: "80% 80%",
    }
})

gsap.to("#dashboard", {
    scale: 1,
    translateY: 0,
    rotateX: "0deg",
    scrollTrigger: {
        trigger: "#hero-section",
        start: window.innerWidth > RESPONSIVE_WIDTH ? "top 95%" : "top 70%",
        end: "bottom bottom",
        scrub: 1,
    }
})

faqAccordion.forEach(function (btn) {
    const content = btn.nextElementSibling
    btn.setAttribute("role", "button")
    btn.setAttribute("tabindex", "0")
    btn.setAttribute("aria-expanded", "false")

    function toggleFaq() {
        btn.classList.toggle("active")
        const expanded = btn.classList.contains("active")
        btn.setAttribute("aria-expanded", String(expanded))

        if (expanded) {
            content.style.maxHeight = content.scrollHeight + "px"
            content.style.padding = "20px 18px"
        } else {
            content.style.maxHeight = "0px"
            content.style.padding = "0px 18px"
        }
    }

    btn.addEventListener("click", toggleFaq)
    btn.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault()
            toggleFaq()
        }
    })
})

// ------------- reveal section animations ---------------

const sections = gsap.utils.toArray("section")

sections.forEach((sec) => {
    const revealUptimeline = gsap.timeline({
        paused: true,
        scrollTrigger: {
            trigger: sec,
            start: "10% 80%",
            end: "20% 90%",
        }
    })

    revealUptimeline.to(sec.querySelectorAll(".reveal-up"), {
        opacity: 1,
        duration: 0.8,
        y: "0%",
        stagger: 0.2,
    })
})
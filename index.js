// Loading animation
setTimeout(function() {
    document.getElementById("loading").classList.add("animated");
    document.getElementById("loading").classList.add("fadeOut");
    setTimeout(function() {
        document.getElementById("loading").classList.remove("animated");
        document.getElementById("loading").classList.remove("fadeOut");
        document.getElementById("loading").style.display = "none";
        }, 800);
    }, 1500
);

// MagicGrid initialization
const magicProjectsGrid = new MagicGrid({
    container: "#work_section",
    gutter: 30,
    static: true,
    maxColumns: 2,
    useTransform: true
});

const magicForksGrid = new MagicGrid({
    container: "#forks_section",
    gutter: 30,
    static: true,
    maxColumns: 2,
    useTransform: true
});

$("document").ready(() => {
    magicProjectsGrid.listen();
    magicForksGrid.listen();
});

const sectionLinks = document.querySelectorAll("[data-section]");
    const sections = Array.from(sectionLinks, link =>
    document.getElementById(link.dataset.section)
).filter(Boolean);

function updateActiveSection() {
    const headerOffset = document.getElementById("header").offsetHeight + 20;
    const currentPosition = window.scrollY + headerOffset;
    let currentSection = sections[0];

    sections.forEach(section => {
        if (section.offsetTop <= currentPosition) {
            currentSection = section;
        }
    });

    sectionLinks.forEach(link => {
        link.classList.toggle(
            "active",
            link.dataset.section === currentSection.id
        );
    });
}

window.addEventListener("scroll", updateActiveSection);
window.addEventListener("resize", updateActiveSection);
updateActiveSection();

// Blog section
$.getJSON("blog.json", function(blog) {
    blog = blog || [];
    if (blog.length == 0) {
        return (document.getElementById("blog_section").style.display = "none");
    }
    for (var i = 0; i < blog.length; i++) {
        $("#blogs").append(`
        <a href="./blog/${blog[i].url_title}/" target="_blank">
            <section>
                <img src="./blog/${blog[i].url_title}/${blog[i].top_image}">
                <div class="blog_container">
                    <div class="section_title">${blog[i].title}</div>
                    <div class="about_section">
                        ${blog[i].sub_title}
                    </div>
                </div>
            </section>
        </a>
        `);
    }
}).fail(function() {
    return (document.getElementById("blog_section").style.display = "none");
});
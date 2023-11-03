
function loadDesktopContent() {
    console.log("Window width: " + window.innerWidth); 
    if (window.innerWidth >= 768) {
        let xhr = new XMLHttpRequest();
        xhr.open("GET", "./Desktop/elpriser.html", true);

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                let desktopContent = document.getElementById("desktop-content");
                if (desktopContent) {
                    desktopContent.innerHTML = xhr.responseText;
                    console.log("Desktop content loaded!");
                }
            }
        };

        xhr.send();
    }
}

window.addEventListener("load", loadDesktopContent);
window.addEventListener("resize", loadDesktopContent);

document.getElementById("openButton").addEventListener("click", () => {
    const button = document.getElementById("openButton");
    if (button.textContent === "Close Model") {
        document.getElementById("params").style.animation = "closeParams 0.5s forwards";
        button.textContent = "Open Model";
        return;
    }
    else{
        document.getElementById("params").style.animation = "openParams 0.5s forwards";
        button.textContent = "Close Model";
    }

});

document.getElementById("openButton").addEventListener("click", () => {
    const button = document.getElementById("openButton");
    if (button.textContent === "Close config") {
        document.getElementById("params").style.animation = "closeParams 0.5s forwards";
        button.textContent = "Open config";
        document.getElementById("config-select").style.display = "none";
        document.getElementById("mapArea").style.display = "none";
        document.getElementById("paramArea").style.display = "none";
        return;
    }
    else{
        document.getElementById("params").style.animation = "openParams 0.5s forwards";
        button.textContent = "Close config";
        document.getElementById("config-select").style.display = "block";
        document.getElementById("mapArea").style.display = "block";
        document.getElementById("paramArea").style.display = "none";
    }

});

document.getElementById("config-select").addEventListener("change", (event) => {
    const selectedValue = event.target.value;
    const paramArea = document.getElementById("paramArea");
    const mapArea = document.getElementById("mapArea");

    if (selectedValue === "characterConfig") {
        paramArea.style.display = "block";
        mapArea.style.display = "none";
    }   else if (selectedValue === "mapConfig") {
        paramArea.style.display = "none";
        mapArea.style.display = "block";
    }
});
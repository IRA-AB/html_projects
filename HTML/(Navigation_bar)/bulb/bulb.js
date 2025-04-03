function bulbswitch(sw) {
    var image = document.getElementById("bulb");
    if (image.src.match("bulbonn")) {
        image.src = "bulboffn.png";
    } else {
        image.src = "bulbonn.png";
    }
    var background = document.getElementById("body");
    if (background.style.backgroundColor === "black"){
        background.style.backgroundColor = "white";
    } else {
        background.style.backgroundColor = "black";
    }
}
const fonts = ["Arial", "Verdana", "Courier New", "Georgia", "Times New Roman", "Trebuchet MS", "Comic Sans MS", "Impact", "Lucida Console", "Tahoma"];

function changeFont() {
    const textElement = document.getElementById("text");
    const randomFont = fonts[Math.floor(Math.random() * fonts.length)];
    textElement.style.fontFamily = randomFont;
    const fontName = document.getElementById("fontname");
    fontName.textContent = randomFont;
}
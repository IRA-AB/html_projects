function zoomin(monthId) {
    const allCards = document.querySelectorAll('.card');
    allCards.forEach(card => {
        if (card.id === monthId) {
            card.style.transform = 'scale(1.5)';
            card.style.zIndex = '10';
            card.style.position = 'relative';
            card.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
        } else {
            card.style.transform = 'scale(0.8)';
            card.style.opacity = '0.5';
            card.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
        }
    });
}
function Zoomout() {
    const allCards = document.querySelectorAll('.card');
    allCards.forEach(card => {
        card.style.transform = 'scale(1)';
        card.style.zIndex = '1';
        card.style.position = 'static';
        card.style.opacity = '1';
        card.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
    });
}
document.addEventListener('click', (event) => {
    const allCards = document.querySelectorAll('.card');
    const isCardClicked = Array.from(allCards).some(card => card.contains(event.target));
    if (!isCardClicked) {
        Zoomout();
    }
});
let lastClickedDate = null;
function highlightDate(event) {
    if (lastClickedDate) {
        lastClickedDate.classList.remove('highlighted');
    }
    event.target.classList.add('highlighted');
    lastClickedDate = event.target;
}
document.querySelectorAll('.card td').forEach(cell => {
    if (cell.textContent.trim() !== '') {
        cell.addEventListener('click', highlightDate);
    }
});
"use strict";
const symbols = ['🐶', '🐴', '🐮', '🐷', '🐵', '🦁', '🐔', '🐻'];
const gameSymbols = [...symbols, ...symbols]; // ペアにする
let cards = [];
let flippedCards = [];
function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}
function createBoard() {
    const board = document.getElementById('game-board');
    board.innerHTML = '';
    cards = [];
    flippedCards = [];
    const shuffled = shuffle(gameSymbols.map((symbol, index) => ({ symbol, id: index })));
    shuffled.forEach((item, index) => {
        const cardEl = document.createElement('div');
        cardEl.className = 'card';
        cardEl.dataset.id = String(index);
        const card = {
            id: item.id,
            symbol: item.symbol,
            element: cardEl,
            matched: false,
        };
        cardEl.addEventListener('click', () => handleCardClick(card));
        board.appendChild(cardEl);
        cards.push(card);
    });
}
function handleCardClick(card) {
    if (card.matched || flippedCards.includes(card))
        return;
    if (flippedCards.length === 2)
        return;
    revealCard(card);
    flippedCards.push(card);
    if (flippedCards.length === 2) {
        checkMatch();
    }
}
function revealCard(card) {
    card.element.classList.add('revealed');
    card.element.textContent = card.symbol;
}
function hideCard(card) {
    card.element.classList.remove('revealed');
    card.element.textContent = '';
}
function checkMatch() {
    const [first, second] = flippedCards;
    if (first.symbol === second.symbol) {
        first.matched = true;
        second.matched = true;
        first.element.classList.add('matched');
        second.element.classList.add('matched');
        flippedCards = [];
        if (cards.every(card => card.matched)) {
            setTimeout(() => alert('🎉 クリアしました！'), 300);
        }
    }
    else {
        setTimeout(() => {
            hideCard(first);
            hideCard(second);
            flippedCards = [];
        }, 1000);
    }
}
createBoard();

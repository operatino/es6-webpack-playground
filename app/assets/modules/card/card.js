'use strict';

require('./card.css');

class Card {
    constructor(options = {}) {
    }
    prepareHtml({img, title, imdb} = {}) {
        return `
            <div class="card">
                <div class="card_image"><img class="card_image-content" src="${img}" alt="${title}"></div>
                <div class="card_info">
                    <div class="card_title">${title}</div>
                    <div class="card_rating">IMDB: ${imdb}</div>
                </div>
            </div>
        `;
    }
}

module.exports = Card;

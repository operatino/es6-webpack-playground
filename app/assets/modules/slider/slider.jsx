'use strict';

require('./slider.css');
var card = new (require('../card/card.jsx'))();

class Slider {
    constructor() {
        this.transform = 0;
        this.itemsInARow = 3;
        this.transformStep = 100 / this.itemsInARow;
        this.keysDown = [];
    }
    render(el, data) {
        if (!(el && data)) return;

        let that = this;
        let items = that.prepareItems(data);

        that.el  = el;

        el.innerHTML = `
            <div class="slider">
                <a href="#" class="slider_arrow __left js-slide" data-direction="left"></a>
                <div class="slider_content-wrapper"><div class="slider_content">${items}</div></div>
                <a href="#" class="slider_arrow __right js-slide" data-direction="right"></a>
            </div>
        `;

        that.elContent = that.el.querySelector('.slider_content');

        that.addKeyListeners();
        that.addArrowListeners();
    }
    prepareItems(data) {
        let output = '';

        data.forEach(item => {
            let cardHtml = card.prepareHtml(item);

            output += `<div class="slider_item">
                            ${cardHtml}
                       </div>`;
        });

        return output;
    }
    addArrowListeners() {
        let that = this;
        let elArrows = that.el.querySelectorAll('.js-slide');

        for (let i=0; i < elArrows.length; i++) {
            let item = elArrows[i];

            item.addEventListener('click', (e) => {
                let direction = e.currentTarget.dataset.direction;

                that.slide(direction);

                e.preventDefault();
            });
        }
    }
    addKeyListeners() {
        let that = this;
        let isComboKeyPressed = function(code, arr) {
            let restrictedKeys = [91, 18, 17];
            let output = false;

            for (let i=0; i < restrictedKeys.length; i++){
                let item = restrictedKeys[i];
                if (arr.indexOf(item) > -1) {
                    output = true;
                    break;
                }
            }

            return output;
        };

        document.onkeydown = function(e) {
            if (!e) e = window.event;

            let code = e.keyCode;

            // Remember pressed keys to not override browser shortcuts
            if (that.keysDown.indexOf(code) === -1) that.keysDown.push(code);
            if (isComboKeyPressed(code, that.keysDown)) return;

            switch (code) {
                case 37:
                    that.slide('left');
                    e.preventDefault();
                    break;
                case 39:
                    that.slide('right');
                    e.preventDefault();
                    break;
            }
        };

        document.onkeyup = function(event) {
            if (!event) event = window.event;

            let code = event.keyCode;
            let pressedKeyIndex = that.keysDown.indexOf(code);

            if (pressedKeyIndex > -1) that.keysDown.splice(pressedKeyIndex, 1);
        };

        // Reset pressed keys to re-focus
        that.el.addEventListener('click', () => {
            that.keysDown = [];
        })
    }
    slide(direction) {
        let that = this;
        let maxTransform = (that.elContent.childNodes.length - that.itemsInARow) * that.transformStep;
        let transform = direction === 'left' ? that.transform - that.transformStep : that.transform + that.transformStep;

        if (transform < 0 || transform > maxTransform) return;

        that.transform  = transform;

        that.elContent.style.webkitTransform = `translateX(-${transform}%)`;
        that.elContent.style.transform = `translateX(-${transform}%)`;
    }
}

module.exports = Slider;

'use strict';

let getMovies = new (require('./modules/getMovies/getMovies.jsx'))({
    url: 'http://lg-devtest.herokuapp.com/data.json'
});
let slider = new (require('./modules/slider/slider.jsx'))();

getMovies.getData({
    filter: 'Action'
}, function(err, data){
    if (err) console.log('Error getting data', err);

    let sliderHook = document.querySelector('.js-slider');

    slider.render(sliderHook, getMovies.flattenData(data));
});

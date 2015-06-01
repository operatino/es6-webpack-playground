'use strict';

class GetMovies {
    constructor(options = {}) {
        this.url = options.url;
        this.msgNoUrl = 'No URL defined';
    }
    getData({filter} = {}, cb = function(){}) {
        let that = this;

        if (!that.url) cb(that.msgNoUrl);

        that.request(that.url, function(err, data){
            if (err) cb(err);

            cb(null, that.processData(data, filter));
        });
    }
    processData(data, genreFilter) {
        if (!data.data) return data;

        // Keeping data structure
        data.data = data.data.map(item => {
            if (!item.assets) return item;

            // Filter by genre, if enabled
            if (genreFilter) item.assets = item.assets.filter(value => value.genre === genreFilter);

            item.assets = GetMovies.sortData(item.assets);

            return item;
        });

        return data;
    }
    static sortData(array) {
        // Sort descending
        array.sort((a, b) => {
            return b.imdb - a.imdb;
        });

        return array;
    }
    flattenData(data) {
        if (!data.data) return {};

        let output = [];

        data.data.forEach(item => {
            if (!item.assets) return;

            item.assets.forEach(asset => {
                output.push(asset);
            });
        });

        return GetMovies.sortData(output);
    }
    request(url, cb = function(){}) {
        let that = this;

        if (!url) cb(that.msgNoUrl);

        let request = new XMLHttpRequest();

        request.open('GET', that.url, true);
        request.setRequestHeader('Authorization', 'Bearer u12A8f3Zg');
        request.onload = function () {
            if (request.status >= 200 && request.status < 400) {
                cb(null, JSON.parse(request.responseText));
            } else {
                cb(this.statusText);
            }
        };

        request.onerror = function () {
            cb(this.statusText);
        };

        request.send();
    }
}

module.exports = GetMovies;

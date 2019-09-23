const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fundaydb', {useNewUrlParser: true});
fs.readdirSync(path.join(__dirname, './../models')).forEach(function(file) {
    if(file.indexOf('.js') >= 0) {
        require(path.join(__dirname, './../models') + '/' + file);
    }
});

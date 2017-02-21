const M = require('../../server/m/m');

let app = new M;

app.use((req, res, next) => {
    console.log(1);
    next();
    console.log('1 - end')
})
app.use((req, res, next) => {
    next()
    console.log(2);
})
app.use((req, res, next) => {
    console.log(3);
})
app.listen(8999);

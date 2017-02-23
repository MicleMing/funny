const M = require('../../server/m/m');
const url = require('url');
const path = require('path');
const staticReSource = require('../../server/m-static/static');
const bodyParser = require('../../server/m-body/bodyParser');
const cookieParser = require('../../server/m-cookie/cookieParser');


let app = new M;

app.use((req, res, next) => {
    console.log(req.url);
    next();
    console.log('1 - end')
})
app.use(staticReSource(path.join(path.resolve(__dirname, '..'), 'unit')));
app.use(bodyParser());
app.use(cookieParser());

app.use((req, res, next) => {
    console.log(req.cookie);
    console.log(req.body);
})

app.listen(8999);

const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');


const secrectKey = "myKey111";

// Sample JWT token for demo purposes
const jwtToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiU2l0ZVBvaW50IFJ' +
  'lYWRlciJ9.sS4aPcmnYfm3PQlTtH14az9CGjWkjnsDyG_1ats4yYg';

// Use default middlewares (CORS, static, etc)
server.use(middlewares);

// Make sure JSON bodies are parsed correctly
server.use(bodyParser.json());

// Handle sign-in requests
server.post('/sign-in', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  if(username === 'demo' && password === 'demo'){
    var token = jwt.sign({username}, secrectKey);
    const obj = {
      name: 'Le Trung Cuong',
      token: token
    };
    res.send(obj);
  }
  else{
    res.status(442).send('tài khoản hoặc mật khẩu không chính xác');
  }
});

// Protect other routes
server.use((req, res, next) => {
  if(isAuthorized(req)){
    console.log('Quyền truy cập được chấp nhận');
    next();
  }else{
    console.log('quyền truy cập bị từ chối, token jwt không hợp lệ');

    res.sendStatus(401);
  }
});

// Check whether request is allowed
function isAuthorized(req){

  let bearer = req.get('Authorization');
  var decode = jwt.verify(bearer, secrectKey);
  if(decode.username ===  'demo'){
    return true;
  }
  return false;
}

// API routes
server.use(router);


// Start server
const port = 3000;
server.listen(port, () => {
  console.log('JSON Server is running on port: ' + port);
});

const express = require('express');
const bodyParser = require('body-parser');
const promoRouter = express.Router();

promoRouter.use(bodyParser.json());
promoRouter.route('/')
.all((req, res, next)=> {
  res.statusCode = 200;
  res.setHeader('Content-type','text-html');
  next();
})
.get((req, res, next)=> {
  res.end('Will send all promotions to you');
})
.put((req, res, next)=>{
  res.statusCode = 403;
  res.end('Put operation not supported');
})
.post((req, res, next)=>{
  res.end('Will add the promotion: ' + req.body.name + ' with details: ' + req.body.description);
})
.delete((req, res, next) => {
  res.end('Deleting all the promotions');
});

promoRouter.route('/:promoId')
.all((req, res, next)=> {
  res.statusCode = 200;
  res.setHeader('Content-type','text');
  next();
})
.get((req, res, next)=>{
 res.end('will send u the '+req.params.promoId+ ' promotion');
})
.post((req, res, next) => {
  res.statusCode = 403;
  res.end('POST operation not supported on /promotions/'+ req.params.promoId);
})
.put((req, res, next)=>{
  res.write('Updating the promotion: ' + req.params.promoId + '\n');
  res.end('Will update the promotion: ' + req.body.name + 
        ' with details: ' + req.body.description);
})
.delete((req, res, next)=>{
   res.end('Deleting promotion: ' + req.params.promoId);
});


module.exports = promoRouter;

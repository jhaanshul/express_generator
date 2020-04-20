const express = require('express');
const bodyParser = require('body-parser');
const dishRouter = express.Router();

dishRouter.use(bodyParser.json());
dishRouter.route('/')
.all((req, res, next)=> {
  res.statusCode = 200;
  res.setHeader('Content-type','text-html');
  next();
})
.get((req, res, next)=> {
  res.end('Will send all dishes to you');
})
.put((req, res, next)=>{
  res.statusCode = 403;
  res.end('Put operation not supported');
})
.post((req, res, next)=>{
  res.end('Will add the dish: ' + req.body.name + ' with details: ' + req.body.description);
})
.delete((req, res, next) => {
  res.end('Deleting all the dishes');
});

dishRouter.route('/:dishId')
.all((req, res, next)=> {
  res.statusCode = 200;
  res.setHeader('Content-type','text');
  next();
})
.get((req, res, next)=>{
 res.end('will send u the '+req.params.dishId+ ' dish');
})
.post((req, res, next) => {
  res.statusCode = 403;
  res.end('POST operation not supported on /dishes/'+ req.params.dishId);
})
.put((req, res, next)=>{
  res.write('Updating the dish: ' + req.params.dishId + '\n');
  res.end('Will update the dish: ' + req.body.name + 
        ' with details: ' + req.body.description);
})
.delete((req, res, next)=>{
   res.end('Deleting dish: ' + req.params.dishId);
});


module.exports = dishRouter;

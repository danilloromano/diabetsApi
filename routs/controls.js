module.exports = function(app){


  app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
  });


  app.get('/controlsData/:id', function(req, res) {
    const connection = app.DAO.connection();
    const controlsDao = new app.DAO.controlsDao(connection);
    let id  = req.params.id.toString();
    let controls = {};
    controlsDao.listControlsById(id,controls,function(error,result) {
      if (error) {
        res.status(500).send(error);
        return;
      }
      res.status(200).send(JSON.stringify(result[0]));
      console.log(result);
    });
    return;
  });
  
  app.get('/controlsData', function(req, res){
    var connection = app.DAO.connection();
    var controlsDao = new app.DAO.controlsDao(connection);
    var controls = [];
    controlsDao.list(controls,function(error,result){
      if (error) {
        res.status(500).send(error);
        return;
      }
      res.status(200).send(JSON.stringify(result));
    });
    return;
  });

  app.get('/controls/controlsReport/:data', function(req, res) {
    const connection = app.DAO.connection();
    const controlsDao = new app.DAO.controlsDao(connection);
    let data  = req.params.data.toString();
    let report = [];
    controlsDao.listByData(data,report,function(error,result) {
      if (error) {
        res.status(500).send(error);
        return;
      }
      res.status(200).send(JSON.stringify(result));
    });
    return;
  });

  app.post('/controls/newControls',function(req,res){
    var error = req.validationErrors();

    if (error) {
      res.status(400).send(error);
      return;
    }

    var newControls = req.body;
    var connection = app.DAO.connection();
    var controlsDao =  new app.DAO.controlsDao(connection);

    controlsDao.saveControls(newControls,function(error,result){
      if (error) {
        return res.status(404).send(error);
      }
      return res.status(201);//.json(result);
    });
    return;
  });

  app.delete('/controls/deleteControls/:id',function(req,res){

    var error = req.validationErrors();

    if (error) {
      res.status(400).send(error);
      return;
    }

    var id = req.params.id;
    var connection = app.DAO.connection();
    var controlsDao =  new app.DAO.controlsDao(connection);

    controlsDao.deleteControls(id,function(error,result){
      if (error) {
        res.status(500).send(error)
      }
      res.status(203);
    });
    return;
  });

  app.put('/controls/updateControls/:id',function(req,res){
    let id = req.params.id;
    let controls = req.body;
    var connection = app.DAO.connection();
    var controlsDao =  new app.DAO.controlsDao(connection);
      controlsDao.updateCOntrols(controls,id,function(error,result){
        if (error) {
          res.status(500).send(error)
        }
        res.status(203);
      });
      return;
    });

}

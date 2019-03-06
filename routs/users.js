module.exports = function(app) {

  app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
  });
  

  app.get('/userData', function(req, res){
    var connection = app.DAO.connection();
    var userDao = new app.DAO.userDao(connection);
    var user = [];
    userDao.list(user,function(error,result){
      if (error) {
        console.log(error);
        res.status(500).send(error);
        return;
      }

      res.status(200).send(JSON.stringify(result));
    });
    return;
  });

  app.get('/userData/:id', function(req, res) {
    const connection = app.DAO.connection();
    const userDao = new app.DAO.userDao(connection);
    let id  = req.params.id.toString();
    let user = {};
    userDao.listUserById(id,user,function(error,result) {
      if (error) {
        res.status(500).send(error);
        return;
      }
      res.status(200).send(JSON.stringify(result[0]));
      console.log(result);
    });
    return;
  });

  app.post('/users/newUser',function(req,res){
    var error = req.validationErrors();

    if (error) {
      console.log("erros encontrados");
      res.status(400).send(error);
      return;
    }

    var novoUser = req.body;
    console.log(novoUser);
    var connection = app.DAO.connection();
    var userDao =  new app.DAO.userDao(connection);

    userDao.saveUser(novoUser,function(error,result){
      if (error) {
        console.log(error);
        res.status(500).send(error)
      }
      console.log(result);
      res.status(201).json(result);
    });
    connection.end();
  });

  app.put('/user/change/:id',function(req,res){
    var error = req.validationErrors();

    if (error) {
      console.log("erros encontrados");
      res.status(400).send(error);
      return;
    }
    let id = req.params.id;
    let user = req.body;
    var connection = app.DAO.connection();
    var userDao = new app.DAO.userDao(connection);

    userDao.changeUser(user,id,function(error,result){
      if (error) {
        console.log(error);
        res.status(500).send(error)
      }
      console.log('user alterado');
      res.status(202).json(result);
    });
    connection.end();
  });


  app.delete('/users/deleteUser/:id',function(req,res) {
    console.log(req.params);
    var error = req.validationErrors();

    if (error) {
      console.log("erros encontrados");
      res.status(400).send(error);
      return;
    }

    var id = req.params.id;
    console.log(id);
    var connection = app.DAO.connection();
    var userDao = new app.DAO.userDao(connection);

    userDao.deleteUser(id,function(error,result){
      if (error) {
        console.log(error);
        res.status(500).send(error)
      }
      console.log('usuario deletado');
      res.status(203).json(result);
    });
    connection.end();
  });
};

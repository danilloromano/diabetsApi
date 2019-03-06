function userDao(connection) {
    this._connection = connection;
};

userDao.prototype.saveUser = function(novoUser,callback) {
    this._connection.query('INSERT INTO users SET ?',novoUser, callback);
};

userDao.prototype.listUserById = function(id,user,callback) {
    this._connection.query("select * from users where id = ?",[id,user],callback);
}

userDao.prototype.list = function(user,callback) {
    this._connection.query("select * from users;", user, callback);
};

userDao.prototype.changeUser = function(user,id,callback){
  this._connection.query("UPDATE users set ? WHERE id = ? ",[user,id],callback);
};

userDao.prototype.deleteUser = function(id,callback) {
    this._connection.query('delete from users where id = ?',[id], callback);
};

module.exports = function(){
    return userDao;
};

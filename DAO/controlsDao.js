
function controlsDao(connection) {
    this._connection = connection;
}

controlsDao.prototype.list = function(controls,callback) {
    this._connection.query("select * from controls;", controls, callback);
}

controlsDao.prototype.listControlsByData = function(data,controls,callback) {
    this._connection.query("select * from controls where data = ?",[data,controls],callback);
}

controlsDao.prototype.saveControls = function(newControl,callback) {
    this._connection.query('INSERT INTO controls SET ?',newControl, callback);
}

controlsDao.prototype.updateControls = function(controls,id,callback) {
    this._connection.query("UPDATE controls set ? WHERE id = ? ",[controls,id], callback);
}

controlsDao.prototype.deleteControls = function(id,callback) {
    this._connection.query('delete from controls where id = ?',[id], callback);
}

module.exports = function(){
    return controlsDao;
};

module.exports = function(sequelize , DataTypes){
    return sequelize.define("login" , {
        uid: {type: DataTypes.INTEGER },
        ip: {type: DataTypes.STRING}
    });
}
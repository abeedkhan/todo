module.exports = function(sequelize , DataTypes){
    return sequelize.define("todo" , {
        tid: {
            type: DataTypes.INTEGER,
            unique: true,
            primaryKey: true,
            autoIncrement: true
        },
        uid: {
            type: DataTypes.INTEGER,
        },
        status: {
            type: DataTypes.STRING,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
                notEmpty:true
            }
        },
        detail: {
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
                notEmpty:true
            }
        }
    });
}
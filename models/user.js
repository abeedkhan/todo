module.exports = function(sequelize , DataTypes){
    return sequelize.define("user" , {
        uid: {
            type: DataTypes.INTEGER,
            unique: true,
            primaryKey: true,
            autoIncrement: true
        },
        companyid: {
            type: DataTypes.INTEGER,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
                notEmpty:true
            }
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
                notEmpty:true
            }
        },
        password:{
            type: DataTypes.STRING,
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
                notEmpty:true
            }
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
                notEmpty:true
            }
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
                notEmpty:true
            }
        },
    });
}
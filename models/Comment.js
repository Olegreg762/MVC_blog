const {Model, Datatypes} = require("sequelize");
const sequelize = require("../config/connection");

class Comment extends Model {}

Comment.init(
    {
        id:{
            type: Datatypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        comment_body:{
            type: Datatypes.TEXT,
            allowNull: false,
        },
        user_id:{
            type: Datatypes.INTEGER,
            references:{
                model: "user",
                key: "id"
            }
        },
        post_id:{
            type: Datatypes.INTEGER,
            references:{
                model: "post",
                key: "key"
            }
        }
    },
    {
        sequelize,
        timestamps: true,
        freezeTableName: true,
        underscored: true,
        modelName: "comment"
    }
);

module.exports = Comment;
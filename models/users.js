module.exports = (Sequelize, DataTypes) => {
    const User = Sequelize.define(
        "User",
        {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            username: {
                type: DataTypes.STRING(15),
                allowNull: false,
            },
            name: {
                type: DataTypes.STRING(15),
                allowNull: false,
            },
            pw: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },
            like_post_id: {
                type: DataTypes.STRING(255),
                allowNull: true,
            },
        },
        {
            tableName: "users",
            freezeTableName: true,
            timestamps: false,
        }
    );

    return User;
};

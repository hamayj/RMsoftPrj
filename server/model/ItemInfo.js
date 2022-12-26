const ItemInfo = (Sequelize, DataTypes)=> {
    const model = Sequelize.define(
        // 모델 이름
        'ItemInfo',
        // 컬럼 정의
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true
            },
            itemName: {
                type: DataTypes.STRING(255),
                allowNull: false
            },
            price: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            registerDate: {
                type: DataTypes.DATEONLY,
                allowNull: false
            },
            // companyId: {
            //     type: DataTypes.INTEGER,
            //     allowNull: false
            // }
        },
        // 모델 옵션
        {
            charset: "utf8", // 한국어 설정
            collate: "utf8_general_ci", // 한국어 설정
            timestamps: false,
            freezeTableName: true,
            tableName: 'ItemInfo',
        }
    );
    return model;
}
module.exports = ItemInfo;
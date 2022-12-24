const PurchaseInfo = (Sequelize, DataTypes)=> {
    const model = Sequelize.define(
        // 모델 이름
        'PurchaseInfo',
        // 컬럼 정의
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true
            },
            buyerId: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            price: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            purchaseDate: {
                type: DataTypes.DATEONLY,
                allowNull: false
            },
            itemInfo: {
                type: DataTypes.INTEGER,
                allowNull: false
            }
        },
        // 모델 옵션
        {
            charset: "utf8", // 한국어 설정
            collate: "utf8_general_ci", // 한국어 설정
            timestamps: false,
            freezeTableName: true,
            tableName: 'purchaseInfo',
        }
    );
    return model;
}

module.exports = PurchaseInfo;
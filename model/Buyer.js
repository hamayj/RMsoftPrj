const Buyer = (Sequelize, DataTypes)=> {
    const model = Sequelize.define(
        // 모델 이름
        'Buyer',
        // 컬럼 정의
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true
            },
            buyerName: {
                type: DataTypes.STRING(255),
                allowNull: false
            },
            buyerPhone: {
                type: DataTypes.STRING(255),
                allowNull: false
            }
        },
        // 모델 옵션
        {
            charset: "utf8", // 한국어 설정
            collate: "utf8_general_ci", // 한국어 설정
            timestamps: false,
            freezeTableName: true,
            tableName: 'Buyer',
        }
    );
    return model;
}

export default Buyer;
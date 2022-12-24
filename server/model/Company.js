const Company = (Sequelize, DataTypes)=> {
    const model = Sequelize.define(
        // 모델 이름
        'Company',
        // 컬럼 정의
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true
            },
            companyName: {
                type: DataTypes.STRING(255),
                allowNull: false
            },
            ceoName: {
                type: DataTypes.STRING(255),
                allowNull: true
            },
            phone: {
                type: DataTypes.STRING(255),
                allowNull: true
            }
        },
        // 모델 옵션
        {
            charset: "utf8", // 한국어 설정
            collate: "utf8_general_ci", // 한국어 설정
            timestamps: false,
            freezeTableName: true,
            tableName: 'Company',
        }
    );
    return model;
}

module.exports = Company;
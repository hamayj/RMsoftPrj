const Sequelize = require("sequelize");

const config = require("../config/config.json")["development"];
const db = {};
const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
);

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.ItemInfo = require("./ItemInfo").default(sequelize, Sequelize);
db.Company = require("./Company").default(sequelize, Sequelize);
db.Buyer = require("./Buyer")(sequelize, Sequelize);
db.PurchaseInfo = require("./PurchaseInfo")(sequelize, Sequelize);

// 상품정보 테이블의 등록업체명 컬럼을(1), 등록업체 테이블의 PK(N)와 연결시킴. 1:N 관계
db.ItemInfo.hasMany(db.Company, {
    foreignKey: "companyId",
    sourceKey : "id",
    onDelete: "cascade"
});
db.Company.belongsTo(db.ItemInfo, {
    foreignKey: "companyId", // belongsTo라고 헷갈리지 말고 hasMany 쓸 때와 동일하게 써주면 된다.
    sourceKey : "id",
    onDelete: "cascade"
})

// 구매정보 테이블의 상품정보 컬럼을, 상품정보 테이블의 id컬럼(PK)와 연결시킴.
db.PurchaseInfo.hasMany(db.ItemInfo, {
    foreignKey: "itemInfo",
    sourceKey : "id",
    onDelete: "cascade"
});
db.ItemInfo.belongsTo(db.PurchaseInfo, {
    foreignKey: "itemInfo",
    sourceKey : "id",
    onDelete: "cascade"
})

// 구매자 테이블의 id 컬럼을, 구매정보 테이블의 buyer_id 컬럼과 연결시킴.
db.PurchaseInfo.hasMany(db.Buyer, {
    foreignKey: "buyerId",
    sourceKey : "id",
    onDelete: "cascade"
});
db.Buyer.belongsTo(db.PurchaseInfo, {
    foreignKey: "buyerId",
    sourceKey : "id",
    onDelete: "cascade"
})

module.exports = db;
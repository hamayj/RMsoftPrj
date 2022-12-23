const express = require("express");
const app = express();
const port = 8000;
const bodyParser = require("body-parser");

app.set("view engine", "ejs");
app.use(express.urlencoded({extended: true}));
app.use( bodyParser.json() ); // json 파싱하기 위해 설정 추가

const Models = require("./model");
const { Sequelize, Company } = require("./model");

// 상품 정보 조회
app.get("/items", async (req, res) => {
    console.log("path: /items, method: get ");
    let items = await Models.ItemInfo.findAll();
    
    let getCompanySql = `
    select * from iteminfo as i join company as c
    on i.companyId = c.id
    `;

    console.log('검색 결과 :', items);
    await res.json("200", {items: getCompanySql});
}); 

// 등록업체 조회
app.get("/company", async (req, res) => {
    console.log("path: /company, method: get");
    let company = await Models.Company.findAll();
    console.log('검색 결과 :', company);
    res.json("등록업체 정보", {company: company});
});

// 구매자 조회
app.get("/buyer", async (req, res) => {
    console.log("path: /buyer, method: get");
    let buyer = await Models.Buyer.findAll();

    let maskingSql = `
    select replace(buyerPhone, substr(buyerPhone, 9, 2), '*') buyerPhone
    from buyer         
    `;

    console.log('검색 결과 :', buyer);
    res.json("구매자 정보", {buyer: buyer});
});


// 구매정보 조회
app.get("/buyer", async (req, res) => {
    console.log("path: /buyer, method: get");
    let purchaseInfo = await Models.PurchaseInfo.findAll();

    let joinSql = `
    select * 
    from purchaseInfo as p
    join buyer as b 
        on b.id = p.buyerId
    join itemInfo as i
        on i.id = p.itemInfo
    `;
    
    console.log('검색 결과 :', purchaseInfo);
    res.json("구매자 정보", {purchaseInfo: purchaseInfo});
});

// let user = User.findOne();
// user = { name: 'a', age: '12' }
// user.name = user.name + '**';
// res.send(user)
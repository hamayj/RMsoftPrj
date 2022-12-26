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
    let query = 'select itemInfo.itemName, itemInfo.price, itemInfo.registerDate as register_date, company.companyName as company from itemInfo inner join company on itemInfo.companyId = company.id;';

    let items = await Models.sequelize.query( query, {
        type: Models.sequelize.QueryTypes.SELECT, 
        raw: true
    });
    
    let results = {
        total_item_counts: items.length,
        list: items
    }

    // console.log('검색 결과 :', items)
    res.json(results);
}); 

// 등록업체 조회
app.get("/company", async (req, res) => {
    console.log("path: /company, method: get");
    let company = await Models.Company.findAll();
    let results = {};
    
    results.total_company_counts = company.length;
    results.list = company;
    console.log("조회결과 :", results);
    res.json(results);
});

// 구매자 조회 
app.get("/buyer", async (req, res) => {
    console.log("path: /buyer, method: get");
    let buyer = await Models.Buyer.findAll();
    let results0 = {}; // 결과적으로 json으로 보내줄 컨테이너 객체.
    results0.total_buyer_counts = buyer.length;
    let results = [];
    // 개인정보 마스킹 처리
    for (let i=0; i<buyer.length; i++) {
        console.log(buyer[i].buyerPhone);
        let new_phone = "";
        for(let j=0; j<buyer[i].buyerPhone.length; j++) {
            if (j === 10 || j === 11) new_phone += "*";
            else new_phone += buyer[i].buyerPhone[j];
        }
        buyer[i].buyerPhone = new_phone;
        let result = {};
        result.name = buyer[i].buyerName;
        result.phone = buyer[i].buyerPhone;
        results.push(result);
    }
    results0.list = results;
    res.json(results0);
});


// 구매정보 조회 -> 모든 테이블 합쳐야되니 두개로 나눠서 합쳤음.
app.get("/purchaseInfo", async (req, res) => {
    console.log("path: /purchaseInfo, method: get");
    let query = 'select * from purchaseInfo inner join buyer on purchaseInfo.buyerId = buyer.id;'

    let results = {};
    let purchaseInfo = await Models.sequelize.query( query, {
        type: Models.sequelize.QueryTypes.SELECT, 
        raw: true
    });

    for ( let i = 0; i < purchaseInfo.length; i++ ) {
        let query = `select * from itemInfo inner join company on itemInfo.companyId = company.id where itemInfo.id = ${purchaseInfo[i].itemInfo}`;
        
        let itemInfo = await Models.sequelize.query( query, {
            type: Models.sequelize.QueryTypes.SELECT, 
            raw: true
        });
        purchaseInfo[i]["item"] = itemInfo;
    }

    results.total_purchase_counts = purchaseInfo.length;
    results.lists = purchaseInfo;
    res.json(results);
});



app.listen(port, () => {
    console.log("Server port : ", port);
});



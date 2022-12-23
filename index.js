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
app.get("/", async (req, res) => {
    console.log("path: /items, method: get ");
    let items = await Models.ItemInfo.findAll();
    console.log('검색 결과 :', items);
    await res.json("200", {items: itemsInfo});
});

app.get("/", async (req, res) => {
    console.log("path: /companys, method: get ");
    let company = await Models.Company.findAll();
    console.log('검색 결과 :', company);
    res.status(200).json({
        data: company});
});



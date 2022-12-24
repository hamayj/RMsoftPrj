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
    let results = [];
    let result = {};
    for (let i=0; i<buyer.length; i++) {
        console.log(buyer[i].buyerPhone);
        let new_phone = "";
        for(let j=0; j<buyer[i].buyerPhone.length; j++) {
            if (j === 10 || j === 11) new_phone += "*";
            else new_phone += buyer[i].buyerPhone[j];
        }
        buyer[i].buyerPhone = new_phone;
        result.name = buyer[i].buyerName;
        result.phone = buyer[i].buyerPhone;
        results.push(result);

    }
    console.log(results);
    res.send(results);
    
    //loop 도는 코드를 참고해서 만들어보자. ㅠ__ㅠ
    // let getPhones = async (req, res) => {
    //     let result = await Models.Buyer.findAll();//{where: {buyerPhone : req.query.buyerPhone}});
    //     console.log(result);
    //     let ls = [];
    //     for (let i = 0; i<result.length; i++) {
    //         let event = await Models.Buyer.findOne({where : {id : result[i].event_id}});
    //         ls.push({'id' : event.id, 'title' : event.title, 'date' : result[i].date , 's_id': result[i].id});
    //     }
    //     res.send(ls);
    // }


    // 짤라서 만드는 코드 참고.
    // concat(str, 0, 4) + ** + concat(str, 6, 10) 
    // let maskingSql = `
    // select replace(buyerPhone, substr(buyerPhone, 9, 2), '*') buyerPhone
    // from buyer         
    // `;

    // console.log('검색 결과 :', buyer);
    // res.json("구매자 정보", {buyer: buyer});
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

// loop? 


app.listen(port, () => {
    console.log("Server port : ", port);
});



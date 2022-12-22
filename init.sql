/* shopInfo 데이터베이스 만들기 */
CREATE DATABASE shopInfo DEFAULT CHARACTER SET utf8 DEFAULT COLLATE utf8_general_ci;

/* 사용자명: rm, 비밀번호: RMsoft1! 인 사용자 만들기 */
CREATE USER 'rm'@'%' IDENTIFIED BY 'RMsoft1!';

-- 권한 부여. *.*으로 설정시 모든 데이터베이스와 테이블에 접근이 허용된다.
GRANT ALL PRIVILEGES ON *.* TO 'rm'@'%' WITH GRANT OPTION;

-- 변경된 권한 적용하기
FLUSH PRIVILEGES;

-- 접근 허용하기 (user의 plugin 변경)
ALTER USER 'rm'@'%' IDENTIFIED WITH mysql_native_password BY 'RMsoft1!';

-- shopInfo 데이터베이스 사용하기
USE shopInfo;

-- 테이블 만들기
CREATE TABLE `itemInfo` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `itemName` varchar(255) NOT NULL,
  `price` int NOT NULL,
  `register_date` date NOT NULL,
  `companyId` int NOT NULL
);

CREATE TABLE `company` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `companyName` varchar(255) NOT NULL,
  `ceoName` varchar(255),
  `phone` varchar(255)
);

CREATE TABLE `buyer` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `buyerName` varchar(255) NOT NULL,
  `buyerPhone` varchar(255) NOT NULL
);


CREATE TABLE `purchaseInfo` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `buyer_id` int NOT NULL,
  `price` int NOT NULL,
  `purchaseDate` date NOT NULL,
  `itemInfo` int NOT NULL
);


ALTER TABLE `itemInfo` ADD FOREIGN KEY (`companyId`) REFERENCES `company` (`id`) ON DELETE CASCADE;
ALTER TABLE `purchaseInfo` ADD FOREIGN KEY (`itemInfo`) REFERENCES `itemInfo` (`id`) ON DELETE CASCADE;
ALTER TABLE `purchaseInfo` ADD FOREIGN KEY (`buyer_id`) REFERENCES `buyer` (`id`) ON DELETE CASCADE;



-- 데이터 추가
INSERT INTO `company` (companyName, ceoName, phone) values ("(주)RM", "최광훈", "010-1234-5678");
INSERT INTO `itemInfo` (itemName, price, register_date, companyId) values ("알엠크림 3종 세트", "20000", "2022-12-22", 1);
INSERT INTO `buyer` (buyerName, buyerPhone) values ("함유정", "010-3272-0190");
INSERT INTO `purchaseInfo` (buyer_id, price, purchaseDate, itemInfo) values (1, "20000", "2022-12-23", 1);



-- 데이터 확인
select * from `company`;
select * from `itemInfo`;
select * from `buyer`;
select * from `purchaseInfo`;




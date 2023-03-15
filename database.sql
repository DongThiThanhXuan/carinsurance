drop database if exists vehicleinsurance 
go
create database vehicleinsurance
go
use vehicleinsurance

go
-- bảng này để lưu thông tin user.
create table account(
accountid int primary key identity,
personid varchar(20),--số CMND,CCCD
accountemail varchar(100),--dùng email để đăng nhập
passwords varchar(100),
accountname  varchar(100),
accountadd varchar(100),
accountphone varchar(20),
roles varchar(10),--admin/customer/saler
accountstatus tinyint -- 0 là ko hoạt động, 1 là hoạt động, 
)
go
-- bảng này để lưu thông tin xe.
create table brandvehicle(
brandid int primary key identity,
brandname varchar(50),-- hãng xe                    
)
go

-- bảng này để lưu thông tin xe.
create table vehicle(
vehicleid int primary key identity,
brandid int foreign key references brandvehicle(brandid),-- hãng xe
vehiclemodel varchar(50),--dòng xe
vehicleversion varchar(50),--version xe 
yearofmanufacture int,--nam xuat hien
vehicleprice  decimal(10,0)--giá niêm yết của xe                             
)
go
-- bảng này để lưu thông tin bảo hiểm theo từng dòng xe, của từng agents
create table policys(
policyid int primary key identity,
vehicleid int foreign key references vehicle(vehicleid),-- loại xe nào
vehiclewarranty  decimal(5,2),-- xe còn bảo hành thì là 1, xe hết bảo hành là 0       
vehicletheft decimal(5,2),--tỷ lệ % bồi thường trên giá trị ước tính của bảo hiểm  khi bị trộm cắp
vehicleaccident decimal(5,2),--tỷ lệ % bồi thường trên giá trị ước tính của bảo hiểm  khi bị tai nạn
Vehiclebody decimal(5,2),--tỷ lệ % bồi thường trên giá trị ước tính của bảo hiểm  trên thân xe, vỏ xe  
Vehicleengine decimal(5,2),--tỷ lệ % bồi thường trên giá trị ước tính của bảo hiểm   trên động cơ, máy móc xe
Flood decimal(5,2),--tỷ lệ % bồi thường trên giá trị ước tính của bảo hiểm khi xe bị ngập nước
insurancepercent decimal(5,2),-- % phí bảo hiểm áp dụng, thường từ 1,4 đến 2%
policystatus tinyint,--policy con su dung la 1, policy an di la 0

)
go
-- bảng này để lưu thông tin giá trị ước tính/ đánh giá của xe theo thông tin khách hàng nhập vào
create table estimate(
estimateid int primary key identity,
accountid int foreign key references account(accountid),-- khách hàng nào
policyid int foreign key references policys(policyid),--mua gói BH nào
vehiclebodynumber   varchar(100),  -- số khung xe                        
vehicleenginenumber   varchar(100),  -- biển số xe
buyyear int,--năm mua xe: Được hiển thị từ năm xe bán ra thị trường đến nay.
numberyear tinyint,-- số năm khách hàng mua BH, tối thiểu 1 năm, tối đa 3 năm. 
marketvalue decimal(10,0),-- giá trị thị trường của xe = giá niêm yết trên bảng policys-(( năm hiện tại-năm mua xe)*giá niêm yết trên bảng policys*7%)
--vi dụ: Giá niêm yết: 250000
--xe mua vào 2018, năm hiện tại: 2022 -> số năm sử dụng = 4
--khấu hao: ( năm hiện tại-năm mua xe)*giá niêm yết trên bảng policys*7% = 4 * 25000 * 7% =70000
--giá trị hiện tại= giá trị ban đầu - khấu hao: 250000- 70000 = 180000
insurancefee decimal(10,0),-- phí bảo hiểm= marketvalue * insurancepercent trên bảng policys * numberyear ------>>>> đây là số tiền khách phải trả
valueestimate decimal(10,0),-- giá trị ước tính của bảo hiểm= marketvalue
paymentdate date,--ngày thanh toans
expirationdate date,-- ngày hết hạn hợp đồng
paypalbillno varchar(100),--số bill thanh toán paypal
remark varchar(100)
)
go
-- bảng này để lưu thông tin yêu cầu bồi thường của từng khách hàng
create table claim(
claimid int primary key identity,
estimateid int foreign key references estimate(estimateid),
submitdate date,--ngày gửi hồ sơ claim
vehicletheftstt tinyint,--status mặc định là 0, yêu cầu bồi thường vì lý do trộm cắp thì stt là 1
vehicletheftmoney decimal(10,0),--số tiền khách hàng submit vì lý do bồi thường là trộm cắp
vehicleaccidentstt tinyint,--status mặc định là 0, yêu cầu bồi thường vì lý do tai nạn thì stt là 1
vehicleaccidentmoney decimal(10,0),--số tiền khách hàng submit vì lý do bồi thường là tai nạn
Vehiclebodystt tinyint,--status mặc định là 0, yêu cầu bồi thường vì muốn bồi thường vỏ xe thì stt là 1
Vehiclebodymoney decimal(10,0),--số tiền khách hàng submit vì muốn bồi thường vỏ xe 
Vehicleenginestt tinyint,--status mặc định là 0, yêu cầu bồi thường vì muốn bồi thường động cơ, máy móc thì stt là 1
Vehiclemoney decimal(10,0),--số tiền khách hàng submit vì muốn bồi thường động cơ, máy móc
approvalstt tinyint,--khi mới insert thì là null, nếu duyệt đồng ý chi trả thì là 1, từ chối chi trả thì là 2
approvalvehicletheftmoney decimal(10,0),--số tiền thực tế chi trả vì lý do bồi thường là trộm cắp
approvalvehicleaccidentmoney decimal(10,0),--số tiền thực tế chi trả vì lý do bồi thường là tai nạn
approvalVehiclebodymoney decimal(10,0),--số tiền thực tế chi trả vì muốn bồi thường vỏ xe 
approvalVehiclemoney decimal(10,0),--số tiền thực tế chi trả vì muốn bồi thường động cơ, máy móc
claimstt tinyint,--mới tạo là 0, đang chờ khách hàng phản hồi,
--chờ khach hàng bổ sung hồ sơ là 1, 
--chờ bên thứ 3, ngoài bảo hiểm phản hồi là 2,
--chờ nội bộ bên bảo hiểm phản hồi là 3, 
--giải quyết xong các thủ tục chi trả thì là 4
--giải quyết xong  và thông báo ko chi trả thì là 5
reamark varchar(max)-- dùng ghi chú thông tin để biết
)
go
-- bảng này để lưu thông tin tài liệu khách hàng submit như hình ảnh, file doc...
create table claimdetails(
claimdetailsid int primary key identity,
claimid int foreign key references claim(claimid),
filenames varchar(50) 
)
go
insert into account (personid, accountemail, passwords, accountname, accountadd, accountphone, roles,   accountstatus)
values('230158715', 'admin@email.com', '$2a$10$307cyTHNZITyKITSg5u6HeYoC4jneI0QNfUt55sVKgb0ITT3HkO0y', 'Tran Van Toan', 'Q.1, TP.HCM', '0909456777', 'admin', 1)
go
insert into account (personid, accountemail, passwords, accountname, accountadd, accountphone, roles,   accountstatus)
values('458791023312', 'ng.bao123@email.com', '$2a$10$307cyTHNZITyKITSg5u6HeYoC4jneI0QNfUt55sVKgb0ITT3HkO0y', 'Nguyen Anh Bao', 'Q.5, TP.HCM', '0918478561', 'customer',  1)
go
insert into account (personid, accountemail, passwords, accountname, accountadd, accountphone, roles,   accountstatus)
values('102134781012', 'vananh.ng@email.com', '$2a$10$307cyTHNZITyKITSg5u6HeYoC4jneI0QNfUt55sVKgb0ITT3HkO0y', 'Nguyen Van Anh', 'Q.1, TP.HCM', '0909647888', 'customer',  1)
go
insert into account (personid, accountemail, passwords, accountname, accountadd, accountphone, roles,   accountstatus)
values('120547712015', 'thao_hoang@email.com', '$2a$10$307cyTHNZITyKITSg5u6HeYoC4jneI0QNfUt55sVKgb0ITT3HkO0y', 'Hoang Quoc Thao', 'Q.Tan Binh, TP.HCM', '0978411222', 'customer',  1)
go
insert into account (personid, accountemail, passwords, accountname, accountadd, accountphone, roles,   accountstatus)
values('242574125', 'anh_lam@email.com', '$2a$10$307cyTHNZITyKITSg5u6HeYoC4jneI0QNfUt55sVKgb0ITT3HkO0y', 'Lam Ngoc Anh', 'Q.Tan Phu, TP.HCM', '0884123650', 'customer',  1)
go
insert into account (personid, accountemail, passwords, accountname, accountadd, accountphone, roles,   accountstatus)
values('910258796100', 'ng.phu123@email.com', '$2a$10$307cyTHNZITyKITSg5u6HeYoC4jneI0QNfUt55sVKgb0ITT3HkO0y', 'Nguyen Quoc Phu', 'TP.Thu Duc, TP.HCM', '0908124755', 'customer',  1)
go
insert into account (personid, accountemail, passwords, accountname, accountadd, accountphone, roles,   accountstatus)
values('910258984567', 'hoa.ng@email.com', '$2a$10$307cyTHNZITyKITSg5u6HeYoC4jneI0QNfUt55sVKgb0ITT3HkO0y', 'Nguyen Thi Hoa', 'TP.Thu Duc, TP.HCM', '0916478900', 'customer',  1)
go
insert into account (personid, accountemail, passwords, accountname, accountadd, accountphone, roles,   accountstatus)
values('242578412', 'hoang.ng@email.com', '$2a$10$307cyTHNZITyKITSg5u6HeYoC4jneI0QNfUt55sVKgb0ITT3HkO0y', 'Nguyen Huy Hoang', 'Q.3, TP.HCM', '0774875611', 'customer', 1)
go
insert into account (personid, accountemail, passwords, accountname, accountadd, accountphone, roles,   accountstatus)
values('910258123481', 'ngocanh@email.com', '$2a$10$307cyTHNZITyKITSg5u6HeYoC4jneI0QNfUt55sVKgb0ITT3HkO0y', 'Nguyen Ngoc Anh', 'Q.8, TP.HCM', '09147456301', 'customer',  1)
go
insert into brandvehicle(brandname) values ('TOYOTA')
go
insert into brandvehicle(brandname) values ('MERCEDES-BENZ')
go
insert into brandvehicle(brandname) values ('LEXUS')
go
insert into vehicle (brandid,vehiclemodel,vehicleversion,vehicleprice,yearofmanufacture) values (1,'COROLLA CROSS','1.8HV',40194,2020)
go
insert into vehicle (brandid,vehiclemodel,vehicleversion,vehicleprice,yearofmanufacture) values (1,'COROLLA CROSS','1.8G',32035,2020)
go
insert into vehicle (brandid,vehiclemodel,vehicleversion,vehicleprice,yearofmanufacture) values (1,'COROLLA CROSS','1.8V',36329,2021)
go
insert into vehicle (brandid,vehiclemodel,vehicleversion,vehicleprice,yearofmanufacture) values (1,'VIOS','1.5E MT(7 air bag)',21470,2018)
go
insert into vehicle (brandid,vehiclemodel,vehicleversion,vehicleprice,yearofmanufacture) values (1,'VIOS','1.5E CVT(7 air bag)',23832,2018)
go
insert into vehicle (brandid,vehiclemodel,vehicleversion,vehicleprice,yearofmanufacture) values (1,'VIOS','1.5G CVT',25218,2018)
go
insert into vehicle (brandid,vehiclemodel,vehicleversion,vehicleprice,yearofmanufacture) values (1,'VIOS','1.5E MT(3 air bag)',21470,2020)
go
insert into vehicle (brandid,vehiclemodel,vehicleversion,vehicleprice,yearofmanufacture) values (1,'VIOS','1.5E CVT(3 air bag)',23832,2020)
go
insert into vehicle (brandid,vehiclemodel,vehicleversion,vehicleprice,yearofmanufacture) values (1,'VIOS','G-RS',27267,2021)
go
insert into vehicle (brandid,vehiclemodel,vehicleversion,vehicleprice,yearofmanufacture) values (2,'C-CLASS','C180',64369,2021)
go
insert into vehicle (brandid,vehiclemodel,vehicleversion,vehicleprice,yearofmanufacture) values (2,'C-CLASS','C300',84552,2010)
go
insert into vehicle (brandid,vehiclemodel,vehicleversion,vehicleprice,yearofmanufacture) values (2,'GLC','200',77251,2016)
go
insert into vehicle (brandid,vehiclemodel,vehicleversion,vehicleprice,yearofmanufacture) values (2,'GLC','300',107097,2016)
go
insert into vehicle (brandid,vehiclemodel,vehicleversion,vehicleprice,yearofmanufacture) values (3,'RX','300',139130,2003)
go
insert into vehicle (brandid,vehiclemodel,vehicleversion,vehicleprice,yearofmanufacture) values (3,'RX','350',179924,2009)
go
insert into vehicle (brandid,vehiclemodel,vehicleversion,vehicleprice,yearofmanufacture) values (3,'RX','450H',202254,2009)
go
insert into vehicle (brandid,vehiclemodel,vehicleversion,vehicleprice,yearofmanufacture) values (3,'RX','350L',183789,2018)
go
insert into vehicle (brandid,vehiclemodel,vehicleversion,vehicleprice,yearofmanufacture) values (3,'RX','300F SPORT',144164,2021)
go
insert into vehicle (brandid,vehiclemodel,vehicleversion,vehicleprice,yearofmanufacture) values (3,'GX','460 SPORT',247015,2019)
go
insert into policys(vehicleid,vehiclewarranty,vehicletheft,vehicleaccident,Vehiclebody,Vehicleengine,Flood,insurancepercent,policystatus)
values(15,1,60,0,0,0,0,1.4,1)
go
insert into policys(vehicleid,vehiclewarranty,vehicletheft,vehicleaccident,Vehiclebody,Vehicleengine,Flood,insurancepercent,policystatus)
values(15,1,50,100,0,0,0,1.5,1)
go
insert into policys(vehicleid,vehiclewarranty,vehicletheft,vehicleaccident,Vehiclebody,Vehicleengine,Flood,insurancepercent,policystatus)
values(15,1,50,100,100,0,0,1.6,1)
go
insert into policys(vehicleid,vehiclewarranty,vehicletheft,vehicleaccident,Vehiclebody,Vehicleengine,Flood,insurancepercent,policystatus)
values(15,1,50,100,100,100,0,1.8,1)
go
insert into policys(vehicleid,vehiclewarranty,vehicletheft,vehicleaccident,Vehiclebody,Vehicleengine,Flood,insurancepercent,policystatus)
values(15,1,50,100,100,100,100,2,1)
go
insert into policys(vehicleid,vehiclewarranty,vehicletheft,vehicleaccident,Vehiclebody,Vehicleengine,Flood,insurancepercent,policystatus)
values(15,1,0,100,0,0,0,1.4,1)
go
insert into policys(vehicleid,vehiclewarranty,vehicletheft,vehicleaccident,Vehiclebody,Vehicleengine,Flood,insurancepercent,policystatus)
values(15,1,0,0,100,0,0,1.4,1)
go
insert into policys(vehicleid,vehiclewarranty,vehicletheft,vehicleaccident,Vehiclebody,Vehicleengine,Flood,insurancepercent,policystatus)
values(15,1,0,0,0,100,0,1.4,1)
go
insert into policys(vehicleid,vehiclewarranty,vehicletheft,vehicleaccident,Vehiclebody,Vehicleengine,Flood,insurancepercent,policystatus)
values(15,1,0,0,0,100,100,1.4,1)
go
insert into policys(vehicleid,vehiclewarranty,vehicletheft,vehicleaccident,Vehiclebody,Vehicleengine,Flood,insurancepercent,policystatus)
values(15,0,0,100,0,0,0,1.5,1)
go
insert into policys(vehicleid,vehiclewarranty,vehicletheft,vehicleaccident,Vehiclebody,Vehicleengine,Flood,insurancepercent,policystatus)
values(15,0,0,0,100,0,0,1.5,1)
go
insert into policys(vehicleid,vehiclewarranty,vehicletheft,vehicleaccident,Vehiclebody,Vehicleengine,Flood,insurancepercent,policystatus)
values(15,0,0,0,0,100,0,1.5,1)
go
insert into policys(vehicleid,vehiclewarranty,vehicletheft,vehicleaccident,Vehiclebody,Vehicleengine,Flood,insurancepercent,policystatus)
values(15,0,0,0,0,100,100,1.5,1)
go
insert into policys(vehicleid,vehiclewarranty,vehicletheft,vehicleaccident,Vehiclebody,Vehicleengine,Flood,insurancepercent,policystatus)
values(15,0,40,0,0,0,0,1.6,1)
go
insert into policys(vehicleid,vehiclewarranty,vehicletheft,vehicleaccident,Vehiclebody,Vehicleengine,Flood,insurancepercent,policystatus)
values(15,0,40,100,0,0,0,1.6,1)
go
insert into policys(vehicleid,vehiclewarranty,vehicletheft,vehicleaccident,Vehiclebody,Vehicleengine,Flood,insurancepercent,policystatus)
values(15,0,40,100,100,0,0,1.7,1)
go
insert into policys(vehicleid,vehiclewarranty,vehicletheft,vehicleaccident,Vehiclebody,Vehicleengine,Flood,insurancepercent,policystatus)
values(15,0,40,100,100,100,0,1.9,1)
go
insert into policys(vehicleid,vehiclewarranty,vehicletheft,vehicleaccident,Vehiclebody,Vehicleengine,Flood,insurancepercent,policystatus)
values(15,0,40,100,100,100,100,2,1)
go
--------------------
insert into policys(vehicleid,vehiclewarranty,vehicletheft,vehicleaccident,Vehiclebody,Vehicleengine,Flood,insurancepercent,policystatus)
values(14,1,70,0,0,0,0,1.4,1)
go
insert into policys(vehicleid,vehiclewarranty,vehicletheft,vehicleaccident,Vehiclebody,Vehicleengine,Flood,insurancepercent,policystatus)
values(14,1,70,100,0,0,0,1.5,1)
go
insert into policys(vehicleid,vehiclewarranty,vehicletheft,vehicleaccident,Vehiclebody,Vehicleengine,Flood,insurancepercent,policystatus)
values(14,1,70,100,100,0,0,1.6,1)
go
insert into policys(vehicleid,vehiclewarranty,vehicletheft,vehicleaccident,Vehiclebody,Vehicleengine,Flood,insurancepercent,policystatus)
values(14,1,70,100,100,100,0,1.8,1)
go
insert into policys(vehicleid,vehiclewarranty,vehicletheft,vehicleaccident,Vehiclebody,Vehicleengine,Flood,insurancepercent,policystatus)
values(14,1,70,100,100,100,100,2,1)
go
insert into policys(vehicleid,vehiclewarranty,vehicletheft,vehicleaccident,Vehiclebody,Vehicleengine,Flood,insurancepercent,policystatus)
values(14,1,0,100,0,0,0,1.4,1)
go
insert into policys(vehicleid,vehiclewarranty,vehicletheft,vehicleaccident,Vehiclebody,Vehicleengine,Flood,insurancepercent,policystatus)
values(14,1,0,0,100,0,0,1.4,1)
go
insert into policys(vehicleid,vehiclewarranty,vehicletheft,vehicleaccident,Vehiclebody,Vehicleengine,Flood,insurancepercent,policystatus)
values(14,1,0,0,0,100,0,1.4,1)
go
insert into policys(vehicleid,vehiclewarranty,vehicletheft,vehicleaccident,Vehiclebody,Vehicleengine,Flood,insurancepercent,policystatus)
values(14,1,0,0,0,100,100,1.4,1)
go
insert into policys(vehicleid,vehiclewarranty,vehicletheft,vehicleaccident,Vehiclebody,Vehicleengine,Flood,insurancepercent,policystatus)
values(14,0,0,100,0,0,0,1.5,1)
go
insert into policys(vehicleid,vehiclewarranty,vehicletheft,vehicleaccident,Vehiclebody,Vehicleengine,Flood,insurancepercent,policystatus)
values(14,0,0,0,100,0,0,1.5,1)
go
insert into policys(vehicleid,vehiclewarranty,vehicletheft,vehicleaccident,Vehiclebody,Vehicleengine,Flood,insurancepercent,policystatus)
values(14,0,0,0,0,100,0,1.5,1)
go
insert into policys(vehicleid,vehiclewarranty,vehicletheft,vehicleaccident,Vehiclebody,Vehicleengine,Flood,insurancepercent,policystatus)
values(14,0,0,0,0,100,100,1.5,1)
go
insert into policys(vehicleid,vehiclewarranty,vehicletheft,vehicleaccident,Vehiclebody,Vehicleengine,Flood,insurancepercent,policystatus)
values(14,0,40,0,0,0,0,1.6,1)
go
insert into policys(vehicleid,vehiclewarranty,vehicletheft,vehicleaccident,Vehiclebody,Vehicleengine,Flood,insurancepercent,policystatus)
values(14,0,40,100,0,0,0,1.6,1)
go
insert into policys(vehicleid,vehiclewarranty,vehicletheft,vehicleaccident,Vehiclebody,Vehicleengine,Flood,insurancepercent,policystatus)
values(14,0,40,100,100,0,0,1.7,1)
go
insert into policys(vehicleid,vehiclewarranty,vehicletheft,vehicleaccident,Vehiclebody,Vehicleengine,Flood,insurancepercent,policystatus)
values(14,0,40,100,100,100,0,1.9,1)
go
insert into policys(vehicleid,vehiclewarranty,vehicletheft,vehicleaccident,Vehiclebody,Vehicleengine,Flood,insurancepercent,policystatus)
values(14,0,40,100,100,100,100,2,1)
go
--------------------
insert into policys(vehicleid,vehiclewarranty,vehicletheft,vehicleaccident,Vehiclebody,Vehicleengine,Flood,insurancepercent,policystatus)
values(10,1,70,0,0,0,0,1.4,1)
go
insert into policys(vehicleid,vehiclewarranty,vehicletheft,vehicleaccident,Vehiclebody,Vehicleengine,Flood,insurancepercent,policystatus)
values(10,1,70,100,0,0,0,1.5,1)
go
insert into policys(vehicleid,vehiclewarranty,vehicletheft,vehicleaccident,Vehiclebody,Vehicleengine,Flood,insurancepercent,policystatus)
values(10,1,70,100,100,0,0,1.6,1)
go
insert into policys(vehicleid,vehiclewarranty,vehicletheft,vehicleaccident,Vehiclebody,Vehicleengine,Flood,insurancepercent,policystatus)
values(10,1,70,100,100,100,0,1.8,1)
go
insert into policys(vehicleid,vehiclewarranty,vehicletheft,vehicleaccident,Vehiclebody,Vehicleengine,Flood,insurancepercent,policystatus)
values(10,1,70,100,100,100,100,2,1)
go
insert into policys(vehicleid,vehiclewarranty,vehicletheft,vehicleaccident,Vehiclebody,Vehicleengine,Flood,insurancepercent,policystatus)
values(10,1,0,100,0,0,0,1.4,1)
go
insert into policys(vehicleid,vehiclewarranty,vehicletheft,vehicleaccident,Vehiclebody,Vehicleengine,Flood,insurancepercent,policystatus)
values(10,1,0,0,100,0,0,1.4,1)
go
insert into policys(vehicleid,vehiclewarranty,vehicletheft,vehicleaccident,Vehiclebody,Vehicleengine,Flood,insurancepercent,policystatus)
values(10,1,0,0,0,100,0,1.4,1)
go
insert into policys(vehicleid,vehiclewarranty,vehicletheft,vehicleaccident,Vehiclebody,Vehicleengine,Flood,insurancepercent,policystatus)
values(10,1,0,0,0,100,100,1.4,1)
go
insert into policys(vehicleid,vehiclewarranty,vehicletheft,vehicleaccident,Vehiclebody,Vehicleengine,Flood,insurancepercent,policystatus)
values(10,0,0,100,0,0,0,1.5,1)
go
insert into policys(vehicleid,vehiclewarranty,vehicletheft,vehicleaccident,Vehiclebody,Vehicleengine,Flood,insurancepercent,policystatus)
values(10,0,0,0,100,0,0,1.5,1)
go
insert into policys(vehicleid,vehiclewarranty,vehicletheft,vehicleaccident,Vehiclebody,Vehicleengine,Flood,insurancepercent,policystatus)
values(10,0,0,0,0,100,0,1.5,1)
go
insert into policys(vehicleid,vehiclewarranty,vehicletheft,vehicleaccident,Vehiclebody,Vehicleengine,Flood,insurancepercent,policystatus)
values(10,0,0,0,0,100,100,1.5,1)
go
insert into policys(vehicleid,vehiclewarranty,vehicletheft,vehicleaccident,Vehiclebody,Vehicleengine,Flood,insurancepercent,policystatus)
values(10,0,40,0,0,0,0,1.6,1)
go
insert into policys(vehicleid,vehiclewarranty,vehicletheft,vehicleaccident,Vehiclebody,Vehicleengine,Flood,insurancepercent,policystatus)
values(10,0,40,100,0,0,0,1.6,1)
go
insert into policys(vehicleid,vehiclewarranty,vehicletheft,vehicleaccident,Vehiclebody,Vehicleengine,Flood,insurancepercent,policystatus)
values(10,0,40,100,100,0,0,1.7,1)
go
insert into policys(vehicleid,vehiclewarranty,vehicletheft,vehicleaccident,Vehiclebody,Vehicleengine,Flood,insurancepercent,policystatus)
values(10,0,40,100,100,100,0,1.9,1)
go
insert into policys(vehicleid,vehiclewarranty,vehicletheft,vehicleaccident,Vehiclebody,Vehicleengine,Flood,insurancepercent,policystatus)
values(10,0,40,100,100,100,100,2,1)
go

--------------------
insert into policys(vehicleid,vehiclewarranty,vehicletheft,vehicleaccident,Vehiclebody,Vehicleengine,Flood,insurancepercent,policystatus)
values(1,1,70,0,0,0,0,1.4,1)
go
insert into policys(vehicleid,vehiclewarranty,vehicletheft,vehicleaccident,Vehiclebody,Vehicleengine,Flood,insurancepercent,policystatus)
values(1,1,70,100,0,0,0,1.5,1)
go
insert into policys(vehicleid,vehiclewarranty,vehicletheft,vehicleaccident,Vehiclebody,Vehicleengine,Flood,insurancepercent,policystatus)
values(1,1,70,100,100,0,0,1.6,1)
go
insert into policys(vehicleid,vehiclewarranty,vehicletheft,vehicleaccident,Vehiclebody,Vehicleengine,Flood,insurancepercent,policystatus)
values(1,1,70,100,100,100,0,1.8,1)
go
insert into policys(vehicleid,vehiclewarranty,vehicletheft,vehicleaccident,Vehiclebody,Vehicleengine,Flood,insurancepercent,policystatus)
values(1,1,70,100,100,100,100,2,1)
go
insert into policys(vehicleid,vehiclewarranty,vehicletheft,vehicleaccident,Vehiclebody,Vehicleengine,Flood,insurancepercent,policystatus)
values(1,1,0,100,0,0,0,1.4,1)
go
insert into policys(vehicleid,vehiclewarranty,vehicletheft,vehicleaccident,Vehiclebody,Vehicleengine,Flood,insurancepercent,policystatus)
values(1,1,0,0,100,0,0,1.4,1)
go
insert into policys(vehicleid,vehiclewarranty,vehicletheft,vehicleaccident,Vehiclebody,Vehicleengine,Flood,insurancepercent,policystatus)
values(1,1,0,0,0,100,0,1.4,1)
go
insert into policys(vehicleid,vehiclewarranty,vehicletheft,vehicleaccident,Vehiclebody,Vehicleengine,Flood,insurancepercent,policystatus)
values(1,1,0,0,0,100,100,1.4,1)
go
insert into policys(vehicleid,vehiclewarranty,vehicletheft,vehicleaccident,Vehiclebody,Vehicleengine,Flood,insurancepercent,policystatus)
values(1,0,0,100,0,0,0,1.5,1)
go
insert into policys(vehicleid,vehiclewarranty,vehicletheft,vehicleaccident,Vehiclebody,Vehicleengine,Flood,insurancepercent,policystatus)
values(1,0,0,0,100,0,0,1.5,1)
go
insert into policys(vehicleid,vehiclewarranty,vehicletheft,vehicleaccident,Vehiclebody,Vehicleengine,Flood,insurancepercent,policystatus)
values(1,0,0,0,0,100,0,1.5,1)
go
insert into policys(vehicleid,vehiclewarranty,vehicletheft,vehicleaccident,Vehiclebody,Vehicleengine,Flood,insurancepercent,policystatus)
values(1,0,0,0,0,100,100,1.5,1)
go
insert into policys(vehicleid,vehiclewarranty,vehicletheft,vehicleaccident,Vehiclebody,Vehicleengine,Flood,insurancepercent,policystatus)
values(1,0,40,0,0,0,0,1.6,1)
go
insert into policys(vehicleid,vehiclewarranty,vehicletheft,vehicleaccident,Vehiclebody,Vehicleengine,Flood,insurancepercent,policystatus)
values(1,0,40,100,0,0,0,1.6,1)
go
insert into policys(vehicleid,vehiclewarranty,vehicletheft,vehicleaccident,Vehiclebody,Vehicleengine,Flood,insurancepercent,policystatus)
values(1,0,40,100,100,0,0,1.7,1)
go
insert into policys(vehicleid,vehiclewarranty,vehicletheft,vehicleaccident,Vehiclebody,Vehicleengine,Flood,insurancepercent,policystatus)
values(1,0,40,100,100,100,0,1.9,1)
go
insert into policys(vehicleid,vehiclewarranty,vehicletheft,vehicleaccident,Vehiclebody,Vehicleengine,Flood,insurancepercent,policystatus)
values(1,0,40,100,100,100,100,2,1)
go
--------------------
insert into estimate(accountid,policyid,vehiclebodynumber,vehicleenginenumber,buyyear,numberyear,marketvalue,insurancefee,valueestimate,paymentdate,expirationdate,paypalbillno)
values(2,3,'NIWDNSA321','BJKDSA9E1442',2015,1,91761,1469,89926,CAST('2021-12-12' as date),CAST('2023-01-12' as date),'FCE24CDCMNKLJW')

insert into estimate(accountid,policyid,vehiclebodynumber,vehicleenginenumber,buyyear,numberyear,marketvalue,insurancefee,valueestimate,paymentdate,expirationdate,paypalbillno)
values(3,40,'FDDDGF123','WERDFFDRTGT111',2020,1,60313,1086,57900,CAST('2022-05-10' as date),CAST('2023-05-09' as date),'FCE24CDCMBCFRD')

insert into estimate(accountid,policyid,vehiclebodynumber,vehicleenginenumber,buyyear,numberyear,marketvalue,insurancefee,valueestimate,paymentdate,expirationdate,paypalbillno)
values(4,10,'1234FREHRH','1113DR3R43F',2010,1,28788,403,23030,CAST('2022-05-25' as date),CAST('2023-05-24' as date),'FRWD15TRTTRW')

insert into estimate(accountid,policyid,vehiclebodynumber,vehicleenginenumber,buyyear,numberyear,marketvalue,insurancefee,valueestimate,paymentdate,expirationdate,paypalbillno)
values(6,72,'23RF34RE3445','DRWRFEFR4343',2022,2,40194,1608,40194,CAST('2022-05-30' as date),CAST('2024-05-29' as date),'FRWD15TRTETRYT')

insert into estimate(accountid,policyid,vehiclebodynumber,vehicleenginenumber,buyyear,numberyear,marketvalue,insurancefee,valueestimate,paymentdate,expirationdate,paypalbillno)
values(5,56,'1213F543GHTH','4344RTRT354',2020,1,34567,519,32493,CAST('2022-06-05' as date),CAST('2023-05-04' as date),'WESFGRRETHTRTT')

insert into estimate(accountid,policyid,vehiclebodynumber,vehicleenginenumber,buyyear,numberyear,marketvalue,insurancefee,valueestimate,paymentdate,expirationdate,paypalbillno)
values(7,52,'323FGYY5YHT5T','43RTFG54656',2022,2,64369,2188,63082,CAST('2022-06-10' as date),CAST('2024-06-09' as date),'AERWREVFGRTHT')

insert into estimate(accountid,policyid,vehiclebodynumber,vehicleenginenumber,buyyear,numberyear,marketvalue,insurancefee,valueestimate,paymentdate,expirationdate,paypalbillno)
values(3,15,'RET453TGRRE5','DG5T5H4Y56YJ',2012,1,53977,864,50738,CAST('2022-06-12' as date),CAST('2023-06-11' as date),'QEQWFVEWTREGT')

insert into estimate(accountid,policyid,vehiclebodynumber,vehicleenginenumber,buyyear,numberyear,marketvalue,insurancefee,valueestimate,paymentdate,expirationdate,paypalbillno)
values(4,67,'REWREFVRWBTE','232RFEG43T5T',2021,1,37380,523,37380,CAST('2022-06-23' as date),CAST('2023-06-22' as date),'QWRFGRTGTHTNYH')

insert into estimate(accountid,policyid,vehiclebodynumber,vehicleenginenumber,buyyear,numberyear,marketvalue,insurancefee,valueestimate,paymentdate,expirationdate,paypalbillno)
values(8,50,'NHMYHTJTJYTJ','G44TGTRH54YG',2021,1,59861,898,57467,CAST('2022-06-28' as date),CAST('2023-06-27' as date),'QVFBTHTEERYHTR')

insert into estimate(accountid,policyid,vehiclebodynumber,vehicleenginenumber,buyyear,numberyear,marketvalue,insurancefee,valueestimate,paymentdate,expirationdate,paypalbillno)
values(7,8,'FDGFTREGREH44','43F45TG4GY45H',2010,2,28789,806,25910,CAST('2022-07-05' as date),CAST('2024-07-04' as date),'DSDSETERGBTR')

insert into estimate(accountid,policyid,vehiclebodynumber,vehicleenginenumber,buyyear,numberyear,marketvalue,insurancefee,valueestimate,paymentdate,expirationdate,paypalbillno)
values(6,45,'DS343F4354G43','B5465HJYH5YH5',2022,2,64369,1802,63082,CAST('2022-07-10' as date),CAST('2024-07-09' as date),'WERWRFVRETREG')

--------------------------------
insert into policys(vehicleid,vehiclewarranty,vehicletheft,vehicleaccident,Vehiclebody,Vehicleengine,Flood,insurancepercent,policystatus)
values(10,0,40,100,0,0,0,1.6,2)
go
insert into policys(vehicleid,vehiclewarranty,vehicletheft,vehicleaccident,Vehiclebody,Vehicleengine,Flood,insurancepercent,policystatus)
values(10,0,40,100,100,0,0,1.7,2)
go
insert into policys(vehicleid,vehiclewarranty,vehicletheft,vehicleaccident,Vehiclebody,Vehicleengine,Flood,insurancepercent,policystatus)
values(10,0,40,100,100,100,0,1.9,2)
go
insert into policys(vehicleid,vehiclewarranty,vehicletheft,vehicleaccident,Vehiclebody,Vehicleengine,Flood,insurancepercent,policystatus)
values(10,0,40,100,100,100,100,2,2)
go




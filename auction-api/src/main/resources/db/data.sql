INSERT INTO Posts(make, model, year, km, gearbox, fuel, city, price) VALUES('Bmw', '320', 2003, 298000, 'Mechanine', 'Benzinas', 'Vilnius', 1400);
INSERT INTO Posts(make, model, year, km, gearbox, fuel, city, price) VALUES('Bmw', '730', 2006, 268000, 'Automatine', 'Dyzelinas', 'Kaunas', 4400);
INSERT INTO Posts(make, model, year, km, gearbox, fuel, city, price) VALUES('Bmw', '330', 2008, 262326, 'Automatine', 'Benzinas', 'Klaipeda', 5210);

INSERT INTO Bets(city,date,sum,username,post_id) VALUES('Klaipeda',CURRENT_TIMESTAMP(0),2000,'Jonas323',1);
INSERT INTO Bets(city,date,sum,username,post_id) VALUES('Vilnius',CURRENT_TIMESTAMP(0),2200,'Vairuotojas',1);
INSERT INTO Bets(city,date,sum,username,post_id) VALUES('Vilnius',CURRENT_TIMESTAMP(0),2300,'Salemis',1);
INSERT INTO Bets(city,date,sum,username,post_id) VALUES('Kaunas',CURRENT_TIMESTAMP(0),2400,'Nysktukas',1);
INSERT INTO Bets(city,date,sum,username,post_id) VALUES('Vilnius',CURRENT_TIMESTAMP(0),2400,'Saliarska',2);

INSERT INTO Users( username, password, name, last_name,city)
    VALUES( 'user', '{bcrypt}$2y$12$A7x.2lPxE6YdV8ed6OYbDucRiod32wqMF9JNerE.wq4glQWaIjRnO', 'John', 'Doe','Vilnius');
INSERT INTO Users( username, password, name, last_name,city)
    VALUES('admin', '{bcrypt}$2y$12$A7x.2lPxE6YdV8ed6OYbDucRiod32wqMF9JNerE.wq4glQWaIjRnO', 'Jack', 'Sparrow','Kaunas');

INSERT INTO Roles(role_id, role) VALUES(1, 'CUSTOMER');
INSERT INTO Roles(role_id, role) VALUES(2, 'ADMIN');

INSERT INTO Users_Roles(user_id, role_id) VALUES(1, 1);
INSERT INTO Users_Roles(user_id, role_id) VALUES(2, 2);

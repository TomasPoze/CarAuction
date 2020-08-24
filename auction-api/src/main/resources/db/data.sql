INSERT INTO Posts(make, file_name ,model, year, km, gearbox, fuel, city, price) VALUES('Bmw','71950672_1168220920041814_4287095342500937728_n.jpg', '320', 2003, 298000, 'Mechanine', 'Benzinas', 'Vilnius', 300);
INSERT INTO Posts(make, file_name ,model, year, km, gearbox, fuel, city, price) VALUES('Bmw','71950672_1168220920041814_4287095342500937728_n.jpg', '730', 2006, 268000, 'Automatine', 'Dyzelinas', 'Kaunas', 0);
INSERT INTO Posts(make, file_name ,model, year, km, gearbox, fuel, city, price) VALUES('Bmw', '71950672_1168220920041814_4287095342500937728_n.jpg','330', 2008, 262326, 'Automatine', 'Benzinas', 'Klaipeda', 0);

INSERT INTO BETS (CITY,DATE,SUM,USERNAME,POST_ID) VALUES ('Klaipeda',CURRENT_TIMESTAMP(0),200,'Kablys',1);
INSERT INTO BETS (CITY,DATE,SUM,USERNAME,POST_ID) VALUES ('Vilnius',CURRENT_TIMESTAMP(0),300,'Orla',1);

INSERT INTO Users( username, password, name, last_name,city)
    VALUES( 'user', '{bcrypt}$2y$12$A7x.2lPxE6YdV8ed6OYbDucRiod32wqMF9JNerE.wq4glQWaIjRnO', 'John', 'Doe','Vilnius');
INSERT INTO Users( username, password, name, last_name,city)
    VALUES('admin', '{bcrypt}$2y$12$A7x.2lPxE6YdV8ed6OYbDucRiod32wqMF9JNerE.wq4glQWaIjRnO', 'Jack', 'Sparrow','Kaunas');

INSERT INTO Roles(role_id, role) VALUES(1, 'CUSTOMER');
INSERT INTO Roles(role_id, role) VALUES(2, 'ADMIN');

INSERT INTO Users_Roles(user_id, role_id) VALUES(1, 1);
INSERT INTO Users_Roles(user_id, role_id) VALUES(2, 2);

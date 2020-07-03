INSERT INTO Posts(title, price) VALUES('Bmw E46', 2000);
INSERT INTO Posts(title, price) VALUES('Bmw E91', 6000);
INSERT INTO Posts(title, price) VALUES('Bmw E65', 5600);


INSERT INTO Users(user_id, username, password, name, last_name,city)
    VALUES(1, 'user', '{bcrypt}$2y$12$A7x.2lPxE6YdV8ed6OYbDucRiod32wqMF9JNerE.wq4glQWaIjRnO', 'John', 'Doe','Vilnius');
INSERT INTO Users(user_id, username, password, name, last_name,city)
    VALUES(2, 'admin', '{bcrypt}$2y$12$A7x.2lPxE6YdV8ed6OYbDucRiod32wqMF9JNerE.wq4glQWaIjRnO', 'Jack', 'Sparrow','Kaunas');

INSERT INTO Roles(role_id, role) VALUES(1, 'CUSTOMER');
INSERT INTO Roles(role_id, role) VALUES(2, 'ADMIN');

INSERT INTO Users_Roles(user_id, role_id) VALUES(1, 1);
INSERT INTO Users_Roles(user_id, role_id) VALUES(2, 2);

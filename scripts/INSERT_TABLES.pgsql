
INSERT INTO account
(type, description, credit)
 VALUES 
('ACCOUNT 1', 'this is the first account', 79),
('ACCOUNT 2', 'this is the second account', 88),
('ACCOUNT 3', 'this is the third account', 89),
('ACCOUNT 4', 'this is the fourth account', 76);

   INSERT INTO session 
(name, account_id)
 VALUES 
 ('SESSION 1', (SELECT id FROM account WHERE type= 'ACCOUNT 1')),
 ('SESSION 2', (SELECT id FROM account WHERE type= 'ACCOUNT 2')),
 ('SESSION 3', (SELECT id FROM account WHERE type= 'ACCOUNT 2')),
 ('SESSION 4', (SELECT id FROM account WHERE type= 'ACCOUNT 4'));



 INSERT INTO folder
(title, session_id)
 VALUES 
 ('Download', (SELECT id FROM session WHERE name = 'SESSION 1')),
 ('Images', (SELECT id FROM session WHERE name = 'SESSION 2')),
 ('Videos', (SELECT id FROM session WHERE name = 'SESSION 3')),
 ('Slides', (SELECT id FROM session WHERE name = 'SESSION 2')),
 ('Music', (SELECT id FROM session WHERE name = 'SESSION 4'));


  INSERT INTO plugin 
(type, name, session_id)
 VALUES 
 ('Plugin 1', 'VLC', (SELECT id FROM session WHERE name = 'SESSION 4') ),
 ('Plugin 2', 'MKV', (SELECT id FROM session WHERE name = 'SESSION 1') ),
 ('Plugin 3', 'Winamp', (SELECT id FROM session WHERE name = 'SESSION 1') ),
 ('Plugin 4', 'PDF', (SELECT id FROM session WHERE name = 'SESSION 3') ),
 ('Plugin 5', 'WoRD', (SELECT id FROM session WHERE name = 'SESSION 2') );



    INSERT INTO "user" 
(firstname, lastname, email, password, birthdate, session_id)
 VALUES 
 ('Michel', 'Gobert', crypt('m.gobert@gmx.fr', gen_salt('bf', 8)), crypt('m12458', gen_salt('bf', 8)), '18-04-1985', (SELECT id FROM session WHERE name = 'SESSION 2')),
 ('Bobby', 'Sixkiller', crypt('bs@renegade.usa', gen_salt('bf', 8)), crypt('renegade', gen_salt('bf', 8)), '25-12-1953', (SELECT id FROM session WHERE name = 'SESSION 1')),
 ('Raino', 'Raines', crypt('rraines@renegade.cz', gen_salt('bf', 8)), crypt('rainogade', gen_salt('bf', 8)), '01-01-1957', NULL),
 ('Jean-Pierre', 'Viellot', crypt('jp.vieillot@real.fr', gen_salt('bf', 8)), crypt('jiji', gen_salt('bf', 8)), '12-07-1963', NULL),
 ('Marc', 'Caro', crypt('Caropique@caro.ru', gen_salt('bf', 8)), crypt('imtheboss', gen_salt('bf', 8)), '05-02-1968', (SELECT id FROM session WHERE name = 'SESSION 4'));




   INSERT INTO provider 
(type)
 VALUES 
 ('Twilio'),
 ('Twitter'),
 ('Facebook'),
 ('Linkedin'),
 ('OuestJob');


   INSERT INTO message
(content, type, author, provider_id, user_id)
 VALUES 
 ('Hello man', 'SMS', '0633127458', (SELECT id FROM provider WHERE type = 'Twilio'), (SELECT id FROM "user" WHERE firstname = 'Raino')),
 ('Hello girl', 'MESSAGE', 'Michel', (SELECT id FROM provider WHERE type = 'Facebook'), (SELECT id FROM "user" WHERE firstname = 'Michel')),
 ('Its rainy, i gona stay at home', 'MESSAGE', 'Michel', (SELECT id FROM provider WHERE type = 'Facebook'), (SELECT id FROM "user" WHERE firstname = 'Michel')),
 ('noJob-NoMoney', 'MESSAGE', 'MarcoO', (SELECT id FROM provider WHERE type = 'Linkedin'), (SELECT id FROM "user" WHERE firstname = 'Marc')),
 ('NoPain, NO Fromage', 'SMS', '0588547765', (SELECT id FROM provider WHERE type = 'Twilio'), (SELECT id FROM "user" WHERE firstname = 'Jean-Pierre'));

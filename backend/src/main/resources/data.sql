-- Room Types
INSERT INTO room_types (id, name, quantity) VALUES (1, 'Single Room', 10);
INSERT INTO room_types (id, name, quantity) VALUES (2, 'Double Room', 15);
INSERT INTO room_types (id, name, quantity) VALUES (3, 'Triple Room', 5);
INSERT INTO room_types (id, name, quantity) VALUES (4, 'Family Room', 10);
INSERT INTO room_types (id, name, quantity) VALUES (5, 'Suite', 5);
INSERT INTO room_types (id, name, quantity) VALUES (6, 'Pet Friendly Room', 5);

-- Rooms
-- Single Rooms
INSERT INTO rooms (room_number, room_type_id) VALUES ('1', 1);
INSERT INTO rooms (room_number, room_type_id) VALUES ('2', 1);
INSERT INTO rooms (room_number, room_type_id) VALUES ('3', 1);
INSERT INTO rooms (room_number, room_type_id) VALUES ('4', 1);
INSERT INTO rooms (room_number, room_type_id) VALUES ('5', 1);
INSERT INTO rooms (room_number, room_type_id) VALUES ('6', 1);
INSERT INTO rooms (room_number, room_type_id) VALUES ('7', 1);
INSERT INTO rooms (room_number, room_type_id) VALUES ('8', 1);
INSERT INTO rooms (room_number, room_type_id) VALUES ('9', 1);
INSERT INTO rooms (room_number, room_type_id) VALUES ('10', 1);
-- Double Rooms
INSERT INTO rooms (room_number, room_type_id) VALUES ('11', 2);
INSERT INTO rooms (room_number, room_type_id) VALUES ('12', 2);
INSERT INTO rooms (room_number, room_type_id) VALUES ('13', 2);
INSERT INTO rooms (room_number, room_type_id) VALUES ('14', 2);
INSERT INTO rooms (room_number, room_type_id) VALUES ('15', 2);
INSERT INTO rooms (room_number, room_type_id) VALUES ('16', 2);
INSERT INTO rooms (room_number, room_type_id) VALUES ('17', 2);
INSERT INTO rooms (room_number, room_type_id) VALUES ('18', 2);
INSERT INTO rooms (room_number, room_type_id) VALUES ('19', 2);
INSERT INTO rooms (room_number, room_type_id) VALUES ('20', 2);
INSERT INTO rooms (room_number, room_type_id) VALUES ('21', 2);
INSERT INTO rooms (room_number, room_type_id) VALUES ('22', 2);
INSERT INTO rooms (room_number, room_type_id) VALUES ('23', 2);
INSERT INTO rooms (room_number, room_type_id) VALUES ('24', 2);
INSERT INTO rooms (room_number, room_type_id) VALUES ('25', 2);
-- Triple Rooms
INSERT INTO rooms (room_number, room_type_id) VALUES ('26', 3);
INSERT INTO rooms (room_number, room_type_id) VALUES ('27', 3);
INSERT INTO rooms (room_number, room_type_id) VALUES ('28', 3);
INSERT INTO rooms (room_number, room_type_id) VALUES ('29', 3);
INSERT INTO rooms (room_number, room_type_id) VALUES ('30', 3);
-- Family Rooms
INSERT INTO rooms (room_number, room_type_id) VALUES ('31', 4);
INSERT INTO rooms (room_number, room_type_id) VALUES ('32', 4);
INSERT INTO rooms (room_number, room_type_id) VALUES ('33', 4);
INSERT INTO rooms (room_number, room_type_id) VALUES ('34', 4);
INSERT INTO rooms (room_number, room_type_id) VALUES ('35', 4);
INSERT INTO rooms (room_number, room_type_id) VALUES ('36', 4);
INSERT INTO rooms (room_number, room_type_id) VALUES ('37', 4);
INSERT INTO rooms (room_number, room_type_id) VALUES ('38', 4);
INSERT INTO rooms (room_number, room_type_id) VALUES ('39', 4);
INSERT INTO rooms (room_number, room_type_id) VALUES ('40', 4);
-- Suite
INSERT INTO rooms (room_number, room_type_id) VALUES ('41', 5);
INSERT INTO rooms (room_number, room_type_id) VALUES ('42', 5);
INSERT INTO rooms (room_number, room_type_id) VALUES ('43', 5);
INSERT INTO rooms (room_number, room_type_id) VALUES ('44', 5);
INSERT INTO rooms (room_number, room_type_id) VALUES ('45', 5);
-- Pet Friendly Rooms
INSERT INTO rooms (room_number, room_type_id) VALUES ('46', 6);
INSERT INTO rooms (room_number, room_type_id) VALUES ('47', 6);
INSERT INTO rooms (room_number, room_type_id) VALUES ('48', 6);
INSERT INTO rooms (room_number, room_type_id) VALUES ('49', 6);
INSERT INTO rooms (room_number, room_type_id) VALUES ('50', 6);

-- MENU
--Appetizers
INSERT INTO menu (type, name_en, name_it, price) VALUES ('Appetizers', 'Mixed cold cuts with mountain cheeses', 'Affettati misti con formaggi di malga', 14.00);
INSERT INTO menu (type, name_en, name_it, price) VALUES ('Appetizers', 'Mussels in Cassopippa', 'Cozze in Cassopippa', 13.00);
INSERT INTO menu (type, name_en, name_it, price) VALUES ('Appetizers', 'Sardines in Saor', 'Sarde in Saor', 9.00);
INSERT INTO menu (type, name_en, name_it, price) VALUES ('Appetizers', 'Pan-fried eggs and Acqualagna truffle D.O.P.', 'Uova in padella e tartufo di Acqualagna D.O.P.', 12.00);
INSERT INTO menu (type, name_en, name_it, price) VALUES ('Appetizers', 'Veneto appetizer', 'Antipasto Veneto', 10.00);
INSERT INTO menu (type, name_en, name_it, price) VALUES ('Appetizers', 'Terracotta: Asiago and gorgonzola fusion with pears and walnuts', 'Terracotta: fusione di Asiago e gorgonzola con pere e noci', 12.00);
--First Courses
INSERT INTO menu (type, name_en, name_it, price) VALUES ('First Courses', 'Bigoli of fresh pasta with white ragù from the courtyard', 'Bigoli di pasta fresca al ragù bianco di cortile', 11.00);
INSERT INTO menu (type, name_en, name_it, price) VALUES ('First Courses', 'Bigoli of fresh pasta in anchovy sauce', 'Bigoli di pasta fresca in salsa di acciughe', 11.00);
INSERT INTO menu (type, name_en, name_it, price) VALUES ('First Courses', 'Tagliolini of fresh pasta from grandpa Bepi''s garden', 'Tagliolini dipasta fresca dell''orto di nonno Bepi', 1.00);
INSERT INTO menu (type, name_en, name_it, price) VALUES ('First Courses', 'Spaghetti with clams', 'Spaghetti con vongole', 14.00);
INSERT INTO menu (type, name_en, name_it, price) VALUES ('First Courses', 'Tagliatelle or tagliolini with Acqualagna truffle D.O.P', 'Tagliatelle o tagliolini al tartufo di Acqualagna D.O.P.', 17.00);
INSERT INTO menu (type, name_en, name_it, price) VALUES ('First Courses', 'Tagliatelle or tagliolini with mixed mushrooms and Porcini mushrooms', 'Tagliatelle o tagliolini con funghi misti e Porcini', 14.00);
INSERT INTO menu (type, name_en, name_it, price) VALUES ('First Courses', 'Bigoli of fresh pasta all''Amatriciana D.O.P', 'Bigoli di pasta fresca all''Amatriciana D.O.P.', 12.00);
--Second Courses
INSERT INTO menu (type, name_en, name_it, price) VALUES ('Second Courses', 'Fiorentina', 'Fiorentina', 6.50);
INSERT INTO menu (type, name_en, name_it, price) VALUES ('Second Courses', 'Rib steak', 'Costata di Manzo', 5.00);
INSERT INTO menu (type, name_en, name_it, price) VALUES ('Second Courses', 'Beef tartare on a bed of mixed salad', 'Tartare di manzo su letto di misticanza', 18.00);
INSERT INTO menu (type, name_en, name_it, price) VALUES ('Second Courses', 'Scottona tartare with Acqualagna D.O.P. truffle', 'Tartare di Scottona con tartufo di Acqualagna D.O.P.', 24.00);
INSERT INTO menu (type, name_en, name_it, price) VALUES ('Second Courses', '"Salty lips": Vicenza-style cod and creamed with sardines in saor and polenta', '"Labbar salate": baccalà alla vicentina e mantecatto con sarde in saor e polenta', 17.00);
INSERT INTO menu (type, name_en, name_it, price) VALUES ('Second Courses', 'Vicenza-style cod with polenta', 'Baccalà alla Vicentina con polentina', 17.00);
INSERT INTO menu (type, name_en, name_it, price) VALUES ('Second Courses', 'Ribs with potatoes', 'Ribs con patate', 18.00);
INSERT INTO menu (type, name_en, name_it, price) VALUES ('Second Courses', 'Venetian-style octopus with potatoes', 'Polpo alla Veneziana con patate', 19.00);
--Side Dishes
INSERT INTO menu (type, name_en, name_it, price) VALUES ('Second Courses', 'Salad with tomatoes and onion', 'Insalata con omodori e cipolla', 5.00);
INSERT INTO menu (type, name_en, name_it, price) VALUES ('Second Courses', 'Bud Spencer beans with sausage and spicy tomato', 'Fagioli alla Bud Spencer con salsiccia e pomodoro piccante', 7.00);
INSERT INTO menu (type, name_en, name_it, price) VALUES ('Second Courses', 'Beans and onion', 'Fagioli e cipolla', 5.00);
INSERT INTO menu (type, name_en, name_it, price) VALUES ('Second Courses', 'Potatoes Ca''Dorina style with speck, onion and melted butter', 'Patate alla Ca''Dorina con speck, cipolla e burro fuso', 6.00);
--WINES
--Reds
INSERT INTO menu (type, name_en, name_it, price) VALUES ('Reds', 'Cabernet Sauvignon Frassinella', 'Cabernet Sauvignon Frassinella', 21.00);
INSERT INTO menu (type, name_en, name_it, price) VALUES ('Reds', 'Malbech Frassinella', 'Malbech Frassinella', 21.00);
INSERT INTO menu (type, name_en, name_it, price) VALUES ('Reds', 'Cabernet Frassinella', 'Cabernet Frassinella', 21.00);
INSERT INTO menu (type, name_en, name_it, price) VALUES ('Reds', 'Refosco Affinato Frassinella D.P. Rosso', 'Refosco Affinato Frassinella D.P. Rosso', 22.00);
INSERT INTO menu (type, name_en, name_it, price) VALUES ('Reds', 'Refosco Frassinella IGT Veneto Orientale', 'Refosco Frassinella IGT Veneto Orientale', 21.00);
INSERT INTO menu (type, name_en, name_it, price) VALUES ('Reds', 'Valpolicella Ripasso - Benedetti la Villa', 'Valpolicella Ripasso - Benedetti la Villa', 26.00);
INSERT INTO menu (type, name_en, name_it, price) VALUES ('Reds', 'Valpolicella Classico Superiore - Benedetti la Villa', 'Valpolicella Classico Superiore - Benedetti la Villa', 25.00);
INSERT INTO menu (type, name_en, name_it, price) VALUES ('Reds', 'Cabernet - Parco Del Venda', 'Valpolicella Classico Superiore - Benedetti la Villa', 22.00);
INSERT INTO menu (type, name_en, name_it, price) VALUES ('Reds', 'Merlot - Parco del Venda', 'Merlot - Parco del Venda', 22.00);
INSERT INTO menu (type, name_en, name_it, price) VALUES ('Reds', 'Merlot Lapilli - Parco del Venda', 'Merlot Lapilli - Parco del Venda', 26.00);
INSERT INTO menu (type, name_en, name_it, price) VALUES ('Reds', 'Cabernet Agape - Parco del Venda', 'Cabernet Agape - Parco del Venda', 26.00);
--Whites
INSERT INTO menu (type, name_en, name_it, price) VALUES ('Whites', 'Pinot Grigio Frassinella', 'Pinot Grigio Frassinella', 21.00);
INSERT INTO menu (type, name_en, name_it, price) VALUES ('Whites', 'Rio Floriano Friulano Collio DOC', 'Rio Floriano Friulano Collio DOC', 26.00);
INSERT INTO menu (type, name_en, name_it, price) VALUES ('Whites', 'Chardonnay - Parco del Venda', 'Chardonnay - Parco del Venda', 22.00);
INSERT INTO menu (type, name_en, name_it, price) VALUES ('Whites', 'Chardonnay - Frassinella', 'Chardonnay - Frassinella', 21.00);
INSERT INTO menu (type, name_en, name_it, price) VALUES ('Whites', 'Pinot Bianco', 'Pinot Bianco', 22.00);
INSERT INTO menu (type, name_en, name_it, price) VALUES ('Whites', 'Pinello autochtono', 'Pinello autochtono', 22.00);
--Bubbles
INSERT INTO menu (type, name_en, name_it, price) VALUES ('Bubbles', 'Prosecco - Parco del Venda', 'Prosecco - Parco del Venda', 20.00);
INSERT INTO menu (type, name_en, name_it, price) VALUES ('Bubbles', 'Champagne - Uve Blanche Estelle ENCRY-BRUT', 'Champagne - Uve Blanche Estelle ENCRY-BRUT', 80.00);
--Desserts
INSERT INTO menu (type, name_en, name_it, price) VALUES ('Desserts', 'Tiramisù', 'Tiramisù', 6.00);
INSERT INTO menu (type, name_en, name_it, price) VALUES ('Desserts', 'Profiteroles', 'Profiteroles', 6.00);
INSERT INTO menu (type, name_en, name_it, price) VALUES ('Desserts', 'Grandma''s cake', 'Torta della nonna', 6.00);
INSERT INTO menu (type, name_en, name_it, price) VALUES ('Desserts', 'Chocolate soufflé with warm heart', 'Soufflè al cioccolato con cuore caldo', 6.00);

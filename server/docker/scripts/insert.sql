INSERT INTO Users(name, email, password, role) VALUES ('admin1', 'user1@gmail.com', '$2b$10$Z/NUzokqoRvPQ.2Nk/yERepoMPRbVXguNBga7TsnXr2PqSrqvCcSq', 'admin');
INSERT INTO Users(name, email, password, role) VALUES ('admin2', 'user2@gmail.com', '$2b$10$Z/NUzokqoRvPQ.2Nk/yERepoMPRbVXguNBga7TsnXr2PqSrqvCcSq', 'admin');
INSERT INTO Users(name, email, password, role) VALUES ('member1', 'user3@gmail.com', '$2b$10$Z/NUzokqoRvPQ.2Nk/yERepoMPRbVXguNBga7TsnXr2PqSrqvCcSq', 'member');
INSERT INTO Users(name, email, password, role) VALUES ('member2', 'user4@gmail.com', '$2b$10$Z/NUzokqoRvPQ.2Nk/yERepoMPRbVXguNBga7TsnXr2PqSrqvCcSq', 'member');

INSERT INTO Teams(name, description) VALUES('team1', 'team 1');
INSERT INTO Teams(name, description) VALUES('team2', 'team 2');

INSERT INTO Team_Members(team_id, user_id) VALUES(1, 1);
INSERT INTO Team_Members(team_id, user_id) VALUES(1, 3);
INSERT INTO Team_Members(team_id, user_id) VALUES(2, 2);
INSERT INTO Team_Members(team_id, user_id) VALUES(2, 4);


INSERT INTO Projects(team_id, name, description, end_date) VALUES(1, 'proyect lorem', 'lorem', '2024-11-30 16:54:41.918');
INSERT INTO Projects(team_id, name, description, end_date) VALUES(1, 'proyect lorem', 'lorem', '2024-11-30 16:54:41.918');
INSERT INTO Projects(team_id, name, description, end_date) VALUES(1, 'proyect lorem', 'lorem', '2024-11-30 16:54:41.918');
INSERT INTO Projects(team_id, name, description, end_date) VALUES(1, 'proyect lorem', 'lorem', '2024-11-30 16:54:41.918');
INSERT INTO Projects(team_id, name, description, end_date) VALUES(1, 'proyect lorem', 'lorem', '2024-11-30 16:54:41.918');
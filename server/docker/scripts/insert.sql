INSERT INTO Users(name, email, password) VALUES ('admin1', 'user1@gmail.com', '$2b$10$Z/NUzokqoRvPQ.2Nk/yERepoMPRbVXguNBga7TsnXr2PqSrqvCcSq');
INSERT INTO Users(name, email, password) VALUES ('admin2', 'user2@gmail.com', '$2b$10$Z/NUzokqoRvPQ.2Nk/yERepoMPRbVXguNBga7TsnXr2PqSrqvCcSq');
INSERT INTO Users(name, email, password) VALUES ('member1', 'user3@gmail.com', '$2b$10$Z/NUzokqoRvPQ.2Nk/yERepoMPRbVXguNBga7TsnXr2PqSrqvCcSq');
INSERT INTO Users(name, email, password) VALUES ('member2', 'user4@gmail.com', '$2b$10$Z/NUzokqoRvPQ.2Nk/yERepoMPRbVXguNBga7TsnXr2PqSrqvCcSq');

INSERT INTO Projects(name, description) VALUES ('proyect 1', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam');
INSERT INTO Projects(name, description) VALUES ('proyect 2', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam');
INSERT INTO Projects(name, description) VALUES ('proyect 3', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam');

INSERT INTO Projects_Members(role, project_id, user_id) VALUES ('admin', 1, 1);
INSERT INTO Projects_Members(role, project_id, user_id) VALUES ('member', 1, 3);
INSERT INTO Projects_Members(role, project_id, user_id) VALUES ('member', 1, 4);


INSERT INTO Projects_Members(role, project_id, user_id) VALUES ('admin', 2, 2);
INSERT INTO Projects_Members(role, project_id, user_id) VALUES ('member', 2, 3);
INSERT INTO Projects_Members(role, project_id, user_id) VALUES ('member', 2, 4);


INSERT INTO Projects_Members(role, project_id, user_id) VALUES ('admin', 3, 1);
INSERT INTO Projects_Members(role, project_id, user_id) VALUES ('member', 3, 3);
INSERT INTO Projects_Members(role, project_id, user_id) VALUES ('member', 3, 4);

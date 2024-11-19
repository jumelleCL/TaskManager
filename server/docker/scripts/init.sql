DROP TABLE IF EXISTS Users;
CREATE TABLE Users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(255) CHECK (role IN ('admin', 'member')) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

DROP TABLE IF EXISTS Teams;
CREATE TABLE Teams (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modified_at DATE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

DROP TABLE IF EXISTS Team_Members;
CREATE TABLE Team_Members (
    id SERIAL PRIMARY KEY,
    team_id INT NOT NULL,
    user_id INT NOT NULL,
    FOREIGN KEY (team_id) REFERENCES Teams(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE
);

DROP TABLE IF EXISTS Projects;
CREATE TABLE Projects (
    id SERIAL PRIMARY KEY,
    team_id INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    start_date DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    end_date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modified_at DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (team_id) REFERENCES Teams(id) ON DELETE CASCADE
);

DROP TABLE IF EXISTS Tasks;
CREATE TABLE Tasks (
    id SERIAL PRIMARY KEY,
    project_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    assigned_to INT NOT NULL,
    priority VARCHAR(255) CHECK (priority IN('high','medium', 'low')) NOT NULL,
    status VARCHAR(255) CHECK(status IN('pending', 'in_progress', 'completed')) NOT NULL,
    due_date DATE NOT NULL,
    created_at DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    modified_at DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (project_id) REFERENCES Projects(id) ON DELETE CASCADE,
    FOREIGN KEY (assigned_to) REFERENCES Users(id) ON DELETE CASCADE
);

DROP TABLE IF EXISTS Activity_log;
CREATE TABLE Activity_log(
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    task_id INT NOT NULL,
    activity_type VARCHAR(255) CHECK(activity_type IN('created', 'updated_status', 'comented','added_attachment')),
    timestamp DATE NOT NULL,
    FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE,
    FOREIGN KEY (task_id) REFERENCES Tasks(id) ON DELETE CASCADE
);


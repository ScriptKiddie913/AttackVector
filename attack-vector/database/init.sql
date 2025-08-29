-- Users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    is_admin BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP
);

-- Categories table
CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL,
    description TEXT
);

-- Challenges table
CREATE TABLE challenges (
    id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    description TEXT,
    category_id INTEGER REFERENCES categories(id),
    difficulty VARCHAR(20) CHECK (difficulty IN ('easy', 'medium', 'hard', 'insane')),
    flag VARCHAR(255) NOT NULL,
    points INTEGER NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    is_storyline BOOLEAN DEFAULT FALSE,
    storyline_order INTEGER,
    storyline_parent INTEGER REFERENCES challenges(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Submissions table
CREATE TABLE submissions (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    challenge_id INTEGER REFERENCES challenges(id),
    flag_submitted VARCHAR(255) NOT NULL,
    is_correct BOOLEAN NOT NULL,
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, challenge_id, is_correct)
);

-- Scores table
CREATE TABLE scores (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) UNIQUE,
    total_score INTEGER DEFAULT 0,
    last_solved TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_challenges_category ON challenges(category_id);
CREATE INDEX idx_submissions_user ON submissions(user_id);
CREATE INDEX idx_submissions_challenge ON submissions(challenge_id);
CREATE INDEX idx_scores_user ON scores(user_id);
CREATE INDEX idx_scores_total ON scores(total_score DESC);

-- Insert default admin user
INSERT INTO users (username, email, password_hash, is_admin) VALUES 
('admin', 'sagnik.saha.raptor@gmail.com', '$2b$12$eSJJ8QC/.Vv.PTXcH5xBUu8o.2.qmOjVU.2ZpzBbT.qmP.xJf.0bG', TRUE);

-- Insert default categories
INSERT INTO categories (name, description) VALUES 
('Web', 'Web application exploitation challenges'),
('Crypto', 'Cryptography challenges'),
('Forensics', 'Digital forensics challenges'),
('OSINT', 'Open-source intelligence challenges'),
('Reverse Engineering', 'Reverse engineering challenges'),
('Pwn', 'Binary exploitation challenges'),
('Misc', 'Miscellaneous challenges');

-- Insert sample challenges
INSERT INTO challenges (title, description, category_id, difficulty, flag, points, is_active) VALUES
('Hello World', 'Welcome to Attack Vector! Submit the flag to get your first points.', 7, 'easy', 'flag{w3lc0m3_t0_4tt4ck_v3ct0r}', 100, TRUE),
('Basic SQL Injection', 'Can you bypass the login form?', 1, 'medium', 'flag{sqli_bypass3d}', 200, TRUE);

-- Initialize scores for admin
INSERT INTO scores (user_id, total_score) VALUES (1, 0);
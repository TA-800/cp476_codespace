-- Enforce foreign keys
-- Reference: https://sqlite.org/pragma.html#pragma_foreign_keys
PRAGMA foreign_keys = ON;

ATTACH DATABASE 'project.db' AS 'project';

-- Use STRICT keyword in SQLite to use strict typing because by default, SQLite is flexible with typing
-- For example: For example, if a table column has a type of "INTEGER", then SQLite tries to convert anything inserted into that column into an integer. So an attempt to insert the string '123' results in an integer 123 being inserted.
-- Reference: https://sqlite.org/stricttables.html

-- In SQLite3 PRIMARY KEYs can be null, disallow that by adding NOT NULL

CREATE TABLE Users (
    -- AUTOINCREMENT is default behaviour, ref: https://sqlite.org/autoinc.html
    UserID INTEGER  NOT NULL PRIMARY KEY,
    UserName TEXT NOT NULL,
    Password TEXT NOT NULL,
    Email TEXT NOT NULL
) STRICT;

CREATE TABLE Courses (
    CourseID INTEGER  NOT NULL PRIMARY KEY,
    CourseName TEXT NOT NULL,
    CourseCode TEXT NOT NULL,
    CourseDesc TEXT
) STRICT;

CREATE TABLE Reviews (
    ReviewID INTEGER  NOT NULL PRIMARY KEY,
    UserID INTEGER NOT NULL,
    CourseID INTEGER NOT NULL,
    Rating INTEGER NOT NULL,
    Comment TEXT,
    Workload INTEGER,
    -- SQLite has no boolean types, 1 and 0's are used instead, so just add a simple constraint to make sure inserted values are either 1 or 0 (TRUE or FALSE)
    GroupWork INTEGER CHECK(GroupWork IN (0, 1)),
    IsCompleted INTEGER CHECK(IsCompleted IN (0, 1)),
    GradeAchieved REAL,
    DatePublished TEXT DEFAULT CURRENT_DATE,
    DateEdited TEXT,

    FOREIGN KEY (UserID) REFERENCES Users(UserID),
    FOREIGN KEY (CourseID) REFERENCES Courses(CourseID)
) STRICT;

CREATE TABLE EvalTypes (
    EvalTypeID INTEGER NOT NULL PRIMARY KEY,
    EvalTitle TEXT NOT NULL,
    KeywordDetails TEXT
) STRICT;

CREATE TABLE Keywords (
    KeywordID INTEGER  NOT NULL PRIMARY KEY,
    KeywordTitle TEXT NOT NULL,
    KeywordDetails TEXT
) STRICT;

CREATE TABLE ReviewEvalTypes (
    ReviewID INTEGER NOT NULL,
    EvalTypeID INTEGER NOT NULL,

    PRIMARY KEY (ReviewID, EvalTypeID),
    FOREIGN KEY (EvalTypeID) REFERENCES EvalTypes(EvalTypeID),
    FOREIGN KEY (ReviewID) REFERENCES Reviews(ReviewID)
) STRICT;

CREATE TABLE ReviewKeywords (
    ReviewID INTEGER NOT NULL,
    KeywordID INTEGER NOT NULL,

    PRIMARY KEY (ReviewID, KeywordID),
    FOREIGN KEY (KeywordID) REFERENCES Keywords(KeywordID),
    FOREIGN KEY (ReviewID) REFERENCES Reviews(ReviewID)
) STRICT;


-- Insert some default values here so when we build locally, we have some test data to work with
INSERT INTO Users (UserName, Password, Email) VALUES (
    'ta800', '123', 'ta800@gmail.com'
);

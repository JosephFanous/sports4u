/*
Created: 2020-04-06
Modified: 2020-04-13
Model: SQLite 3.7
Database: SQLite 3.7
*/


-- Create tables section -------------------------------------------------

-- Table User

CREATE TABLE User
(
  UserID INTEGER NOT NULL
        CONSTRAINT PK_User PRIMARY KEY AUTOINCREMENT,
  First Name TEXT NOT NULL,
  Last Name TEXT NOT NULL,
  UserName TEXT NOT NULL,
  Email TEXT NOT NULL,
  Password TEXT NOT NULL,
  Rating INTEGER DEFAULT 0,
  NumberOFSportHosted INTEGER DEFAULT 0,
  NotificationSet INTEGER DEFAULT 1,
  CONSTRAINT UserName UNIQUE (UserName),
  CONSTRAINT Email UNIQUE (Email)
);

-- Table Location

CREATE TABLE Location
(
  LocationID INTEGER NOT NULL
        CONSTRAINT PK_Location PRIMARY KEY AUTOINCREMENT,
  Latitude double precision NOT NULL,
  Longitude double precision NOT NULL,
  Address TEXT NOT NULL
);

-- Table Event

CREATE TABLE Event
(
  EventID INTEGER NOT NULL
        CONSTRAINT PK_Event PRIMARY KEY AUTOINCREMENT,
  UserID INTEGER,
  LocationID INTEGER,
  Name TEXT NOT NULL,
  SportID INTEGER,
  StartTime TEXT NOT NULL,
  EndTime TEXT NOT NULL,
  EventAddedTime TEXT,
  EventDone INTEGER DEFAULT 0,
  PeopleAttending INTEGER DEFAULT 0,
  CONSTRAINT Relationship3 FOREIGN KEY (UserID) REFERENCES User (UserID) ON DELETE CASCADE,
  CONSTRAINT Relationship4 FOREIGN KEY (LocationID) REFERENCES Location (LocationID) ON DELETE CASCADE, 
  CONSTRAINT Relationship5 FOREIGN KEY (SportID) REFERENCES SportType (SportID) ON DELETE CASCADE
);

CREATE INDEX IX_Relationship15 ON Event (UserID);

CREATE INDEX IX_Relationship18 ON Event (LocationID);

CREATE INDEX IX_Relationship12 ON Event (SportID);

-- Table EventRating

CREATE TABLE EventRating
(
  UserID INTEGER NOT NULL,
  EventID INTEGER NOT NULL,
  Rating INTEGER NOT NULL,
  CONSTRAINT PK_EventRating PRIMARY KEY (UserID,EventID),
  CONSTRAINT Relationship2 FOREIGN KEY (UserID) REFERENCES User (UserID) ON DELETE CASCADE,
  CONSTRAINT Relationship6 FOREIGN KEY (EventID) REFERENCES Event (EventID) ON DELETE CASCADE
);

-- Table UserAttendingEvent

CREATE TABLE UserAttendingEvent
(
  UserID INTEGER NOT NULL,
  EventID INTEGER NOT NULL,
  CONSTRAINT PK_UserAttendingEvent PRIMARY KEY (UserID,EventID),
  CONSTRAINT Relationship1 FOREIGN KEY (UserID) REFERENCES User (UserID) ON DELETE CASCADE,
  CONSTRAINT Relationship7 FOREIGN KEY (EventID) REFERENCES Event (EventID) ON DELETE CASCADE
);

-- Table SportType

CREATE TABLE SportType
(
  SportID INTEGER NOT NULL
        CONSTRAINT PK_SportType PRIMARY KEY AUTOINCREMENT,
  SportName TEXT
);

INSERT INTO SportType (SportName) VALUES ("Basketball");
INSERT INTO SportType (SportName) VALUES ("Volleyball");
INSERT INTO SportType (SportName) VALUES ("Table Tennis");
INSERT INTO SportType (SportName) VALUES ("Soccer");
INSERT INTO SportType (SportName) VALUES ("Badminton");
INSERT INTO SportType (SportName) VALUES ("Hockey");
INSERT INTO SportType (SportName) VALUES ("Baseball");
INSERT INTO SportType (SportName) VALUES ("Football");

-- Table Notification

CREATE TABLE Notification
(
  UpdateEvent TEXT,
  DeleteEvent TEXT,
  JoinedUser TEXT,
  UserID INTEGER,
  EventID NONE
);


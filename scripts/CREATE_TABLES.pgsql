DROP TABLE if EXISTS folder;
DROP TABLE if EXISTS plugin;
DROP TABLE if EXISTS provider CASCADE;
DROP TABLE if EXISTS session CASCADE;
DROP TABLE if EXISTS account;
DROP TABLE if EXISTS "user" CASCADE;
DROP TABLE if EXISTS message;
DROP extension if not exists "uuid-ossp";
DROP EXTENSION pgcrypto;
DROP EXTENSION citext;

CREATE extension if not exists "uuid-ossp";
CREATE EXTENSION pgcrypto;
CREATE EXTENSION citext;

CREATE TABLE IF NOT EXISTS account (
  id uuid primary key not null default uuid_generate_v4(),
  type VARCHAR(255) NOT NULL,
  description TEXT,
  isSuspended BOOLEAN NOT NULL default false,
  credit INTEGER,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP,
  deleted_at TIMESTAMP
);

CREATE TABLE IF NOT EXISTS session (
  id uuid primary key not null default uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP,
  deleted_at TIMESTAMP,
  account_id uuid REFERENCES account (id) NOT NULL
);

CREATE TABLE if not exists folder (
  id uuid primary key not null default uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP,
  deleted_at TIMESTAMP,
  session_id uuid REFERENCES session (id) NOT NULL
);

CREATE TABLE IF NOT EXISTS plugin (
  id uuid primary key not null default uuid_generate_v4(),
  type VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP,
  deleted_at TIMESTAMP,
  session_id uuid REFERENCES session (id) NOT NULL
);

CREATE TABLE IF NOT EXISTS "user" (
  id uuid primary key not null default uuid_generate_v4(),
  firstname VARCHAR(255) NOT NULL,
  lastname VARCHAR(255) NOT NULL,
  email CITEXT NOT NULL,
  password VARCHAR(255) NOT NULL,
  birthdate DATE NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP,
  deleted_at TIMESTAMP,
  session_id uuid REFERENCES session (id)
);

CREATE TABLE IF NOT EXISTS provider (
  id uuid primary key not null default uuid_generate_v4(),
  type VARCHAR(255) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP,
  deleted_at TIMESTAMP
);

CREATE TABLE IF NOT EXISTS message (
  id uuid primary key not null default uuid_generate_v4(),
  content VARCHAR(255) NOT NULL,
  type VARCHAR(255) NOT NULL,
  author VARCHAR(255) NOT NULL,
  received_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP,
  deleted_at TIMESTAMP,
  provider_id uuid REFERENCES provider (id) NOT NULL,
  user_id uuid REFERENCES "user" (id) NOT NULL
);


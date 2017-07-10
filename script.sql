create extension if not exists "uuid-ossp";
create table message (
  id uuid primary key not null default uuid_generate_v4(),
  content VARCHAR(255),
  sender VARCHAR(255),
  type VARCHAR(255),
  provider VARCHAR(255),
"providerMessageId" VARCHAR(255)
);
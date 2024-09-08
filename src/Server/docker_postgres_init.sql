/*###########################*/
/*######## users ############*/
/*###########################*/
CREATE TABLE IF NOT EXISTS dim_companies(
  company_id SERIAL PRIMARY KEY,
  company_name VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS dim_users (
  user_id SERIAL PRIMARY KEY,
  user_name VARCHAR(255) NOT NULL,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  role VARCHAR(50) NOT NULL CHECK (role IN ('maintenance', 'manager', 'administrator')),
  company_id INTEGER NOT NULL REFERENCES dim_companies(company_id)
);

/*make sure each company can have unique user names
 but every company can the same user name of diffrent cmpanies*/
CREATE UNIQUE INDEX idx_dim_users_company_user ON dim_users (company_id, user_name);

INSERT INTO dim_companies (company_name)
VALUES ('Acme Corporation');

INSERT INTO dim_companies (company_name)
VALUES ('HIT');

INSERT INTO dim_users 
(user_name, first_name, last_name, email, password, phone, role, company_id) VALUES
 ('tempAdmin', 'John', 'Doe', 'johndoeACME@example.com', 'Password1', '555-1234', 'administrator', 1),
 ('tempAdmin', 'John', 'Doe', 'johndoeHIT@example.com', 'Password1', '555-1234', 'administrator', 2);

/*###########################*/
/*######## guides ###########*/
/*###########################*/
CREATE TABLE IF NOT EXISTS fact_guides (
  guide_id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  file_name TEXT NOT NULL,
  file_path TEXT NOT NULL,
  added_date TEXT NOT NULL,
  company_id INTEGER NOT NULL REFERENCES public.dim_companies(company_id)
);

/*###########################*/
/*######## missions #########*/
/*###########################*/
CREATE TABLE IF NOT EXISTS fact_missions (
  mission_id SERIAL PRIMARY KEY,
  mission_title VARCHAR(255) NOT NULL,
  mission_description TEXT,
  status VARCHAR(50) NOT NULL DEFAULT 'unfinished' CHECK (status IN ('unfinished', 'finished')),
  priority VARCHAR(50) NOT NULL DEFAULT 'low' CHECK (status IN ('low','medium', 'high')),
  start_mission_date TIMESTAMP,
  end_mission_date TIMESTAMP,
  latitudes DOUBLE PRECISION[] NOT NULL,
  longitudes DOUBLE PRECISION[] NOT NULL,
  company_id INTEGER NOT NULL REFERENCES dim_companies(company_id),
  location_id INTEGER NOT NULL REFERENCES dim_locations(location_id)
);

/*###########################*/
/*######## location #########*/
/*###########################*/
CREATE TABLE IF NOT EXISTS dim_locations (
  location_id SERIAL PRIMARY KEY,
  address_name TEXT DEFAULT '',
  city TEXT DEFAULT '',
  country TEXT DEFAULT '',
  latitude DOUBLE PRECISION DEFAULT 0.0,
  longitude DOUBLE PRECISION DEFAULT 0.0,
  zone_name VARCHAR(10) DEFAULT 'north' CHECK (zone_name IN ('north', 'center', 'south')) NOT NULL
);

ALTER TABLE fact_missions
ADD COLUMN location_id INTEGER NOT NULL REFERENCES dim_locations(location_id);

ALTER TABLE dim_users
ADD COLUMN location_id INTEGER REFERENCES dim_locations(location_id);

INSERT INTO dim_locations(address_name, city, country, latitude, longitude, work_zone) 
VALUES('Default Address', 'Default City', 'Default Country', 0.0, 0.0, 'north')
RETURNING location_id;

UPDATE dim_users
SET location_id = 1
WHERE location_id IS NULL;

ALTER TABLE dim_users
ALTER COLUMN location_id SET NOT NULL;

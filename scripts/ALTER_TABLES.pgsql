 ALTER TABLE account
 /*ALTER created_at
 SET DEFAULT CURRENT_TIMESTAMP;*/
 RENAME COLUMN amount to credit 
 TYPE INTEGER;

 ALTER TABLE folder
 DROP COLUMN account_isSuspended;

ALTER TABLE session
  RENAME COLUMN type to name 

ALTER TABLE message
ALTER COLUMN user_id
SET NOT NULL


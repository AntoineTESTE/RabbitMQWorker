UPDATE session
SET account_id = (SELECT id FROM account WHERE type = 'ACCOUNT 1')
WHERE name = 'SESSION 1',
SET account_id = (SELECT id FROM account WHERE type = 'ACCOUNT 2')
WHERE name = 'SESSION 2',
SET account_id = (SELECT id FROM account WHERE type = 'ACCOUNT 2')
WHERE name = 'SESSION 3',
SET account_id = (SELECT id FROM account WHERE type = 'ACCOUNT 4')
WHERE name = 'SESSION 4',
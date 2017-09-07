SELECT content
From message
INNER JOIN user
ON message.user_id = user_id


SELECT *
FROM "user" u
INNER JOIN session s
ON s.id = u.session_id


SELECT *
FROM message
WHERE provider = "Facebook"

SELECT *
FROM message
INNER JOIN provider
ON message.provider_id = provider.id
WHERE provider.type = 'Facebook'

SELECT a.type
FROM account a
INNER JOIN session s
ON a.id = s.account_id
INNER JOIN "user" u
ON s.id = u.session_id
INNER JOIN message m
ON u.id = m.user_id
INNER JOIN provider p
ON m.provider_id = p.id
WHERE p.type = 'Linkedin'

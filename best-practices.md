# LiveE  — Coding best practices

This guide is heavily based on Software Architecture Principles, Unix philosophy and common sense.

### Use Dependency Injection (DI)
Enhance modularity thanks to the DI pattern. Every module requiring another should give him everything he needs to work.
```js
// api.js
const models = require('./models')();
const handlers = require('./handlers')(models);

// handlers/index.js
module.exports = (models) => {
  return {
    hello: require('./hello')(models)
  };
};

// handlers/hello.js
module.exports = (models) => {
  return {
    get: (req, res) => res.send('OK');
  };
};
```

### Prefer explicit variable names over shorter ones
```js
// Bad
const cfg = { api: 'http://google.com' };
const logST = (txt, s) => setTimeout(console.log, s, txt);

// Good
const config = { api: 'http://google.com' };
const logAfter = (text, seconds) => setTimeout(console.log, seconds * 1000, text);
```

### Use `return` instead of `else` to reduce cyclomatic complexity and improve readability
`else` is a code smell in most situations, a need to refactor.
```js
// Bad
const getUserState = (isAlive, isHere) => {
  if (isAlive) {
    if (isHere) {
      return 'Alive and here, yeaaa';
    } else {
      return 'Where did he go ...?';
    }
  } else {
    return 'Hum...';
  }
};

// Good
const getUserState = (isAlive, isHere) => {
  if (!isAlive) {
    return 'Hum...';
  }
  if (isHere) {
    return 'Alive and here, yeaaa';
  }
  return 'Where did he go ...?';
};
```

### Favor readable code over smart code
You need to define what "smart code" is for you and your team. "Smart" for one can be "normal" for another.
```js
// Bad
// Takes some time to understand
const getUserState = (isAlive, isHere) => {
  return !isAlive ? 'Hum...' : isHere ? 'Alive and here, yeaaa' : 'Where did he go ...?';
};

// Good
const getUserState = (isAlive, isHere) => {
  if(!isAlive) {
    return 'Hum...';
  }
  return isHere ? 'Alive and here, yeaaa' : 'Where did he go ...?';
};
```

### The smaller your functions, the better
```js

```

### Use destructuration and assertions to prevent errors at runtime
```js
/// handlers/index.js
// for some reasons, services is undefined (1.) or an empty object (2.)
module.exports = (services) => {
  return {
    hello: require('./hello')(services)
  }
};

/// handlers/hello.js
// Bad
module.exports = (services) => {
  return {
    hello: (req, res) => services.Authentication.checkUserRights(req.user)
  };
};
// -> this does compile, even if `services` is `undefined`

// Good
module.exports = ({ Authentication }) => { // 1. -> check if `Authentication` is defined
  assert(_.isObject(Authentication)); // 2. -> ensure `Authentication` is an object
  return {
    hello: (req, res) => Authentication.checkUserRights(req.user)
  };
};
// 1. -> TypeError: Cannot match against 'undefined' or 'null'.
// 2. -> AssertionError: false == true
```

### Simplify debugging
```js
// Bad
// is `something` what I expect? Where do I put my log statement?
module.exports = (something) => ({
  hello: require('./else')(something)
});

// Good
module.exports = (something) => {
  console.log(something); // ahh, here it goes!
  return {
    hello: require('./else')(something)
  };
};
```
This is also why you should always write `if`/`else` with brackets.

### Prepare for unexpected values, everywhere
```js
// Bad
const getUnactivated = (users) => {
  return users.filter(user => {
    return !user.isActivated;
  });
};
getUnactivated(undefined); // -> TypeError: Cannot read property 'filter' of undefined

// Good
const getUnactivated = (users = []) => {
  if(!Array.isArray(users)) {
    return new Error(`users should be an array, ${users} provided`);
  }
  return users.filter(user => {
    return !user.isActivated;
  });
};
getUnactivated(undefined); // []
```

### Use comments when necessary
```js
/// Bad
no comments

/// Good
jsdoc

/// Useless
// calculate the sum of 2 integers
const add = (x, y) => x + y;
```

### Favor declarative and/or functional over imperative programming
```js
// Bad
let isOver30 = false; // note: this is nonsense, we don't know it yet
if (user.age > 30) {
  isOver30 = true;
} else {
  isOver30 = false;
}

// Good
const isOver30 = user.age > 30;
```

```js
// Bad
const usersOver30 = [];
for(let i = 0; i < users.length; i++) {
  if(users[i].age > 30) {
    usersOver30.push(users[i]);
  }
}

// Good
const usersOver30 = users.filter(user => user.age > 30);
```

### Separate concerns
```js
// Bad
/// routes.js
                                   // do we really have to handle request here?
app.get('/users/:userId/payments', (req, res, next) => {
  // why do we check authentication here?
  // what will happen if we change it tomorrow?
  // will we have to change it everywhere we do this check?
  if (!req.user.isAuthenticated()) {
    return res.status(400).send('You should be authenticated to access user payments.');
  }
  next();
}, (req, res) => {
  // should a file called `routes.js` know we use a database?
  // should he know how to fetch data at db level?
  // what will happen if we change database tomorrow?
  // how can I test each component of this file independently?
  pg.query('select * from payments where used_id = $1', [req.params.userId], (err, result) => {
    res.send(err ||  result.rows);
  });
});

// Good
/// routes.js
const models = require('./models')();
const { paymentsHandler } = require('./handlers')(models);
const { authenticationService } = require('./services')();

app.get('/users/:userId/payments',
  authenticationService.isAuthenticated,
  paymentsHandler.fetchUserPayments
);

/// services/authenticationService.js
module.exports = () => {
  return {
    // we could even use a handler between routes.js and this service
    // because it shouldn't really have the concept of request
    isAuthenticated(req, res, next) {
      if (!req.user.isAuthenticated()) {
        return res.status(400).send('You should be authenticated to access user payments.');
      }
      next();
    }
  }
}

/// handlers/payments.js
module.exports = ({ UserModel }) => {
  return {
    fetchUserPayments(req, res) {
      UserModel.fetchUserPayments(req.params.userId, (err, payments) => {
        if (err) {
          return res.status(500).send(err);
        }
        res.send(payments);
      });
    };
  };
};

/// models/UserModel.js
module.exports = (pg) => {
  return {
    fetchUserPayments(userId, f) {
      // we could even use a DAO to fetch the data
      pg.query('select * from payments where used_id = $1', [req.params.user_id], (err, result) => {
        err ? f(err) : f(null, result.rows);
      });
    }
  };
};
```

### There is a lib for that
Search for libraries (https://npms.io). Someone probably already had your problem and made a library (with tests) to resolve it. Make a PR if it doesn't work as expected.

```js
// extract parameters from url
// Bad
const parameters = location.search.slice(1).split('&').reduce((m, param) => {
  var chunks = param.split('=');
  m[chunks[0]] = chunks[1];
  return m;
}, {});

// Good
const querystring = require('querystring');
const parameters = querystring.parse(location.search.slice(1));
```

### Write environment agnostic code, use environment variables
```js
// Bad
/// server.js
// What if this port is unavailable on my production machine? I'll have to edit the code
app.listen(4000);
// @TODO: don't forget to change this in production mode...
axios.get('http://staging.myapp.com/ping')
  .then(res => console.log(res))
  .catch(err => console.log(`I think we have a problem here... ${err}`));

// A little bit better, but things get really complicated with a lot of environments...
// ...
axios.get(process.env.NODE_ENV === 'production' ? 'http://status.myapp.com' : 'http://staging.status.myapp.com/ping')
// ...

// Way better
/// config.js
module.exports = require('common-env/withLogger')(logger).getOrElseAll({
  api: {
    port: 3000
  },
  services: {
    status: {
      url: ''
    }
  }
});

/// .env (use autoenv: https://github.com/kennethreitz/autoenv)
export SERVICES_STATUS_URL="http://status.myapp.com"

/// server.js
const config = require('config');
// we use the default value (in config.js) since no env var was provided
app.listen(config.api.port); // 3000
// (this request is for the sake of example, it has nothing to do in here)
axios.get(config.services.status.url) // http://status.myapp.com
  .then(res => console.log(res))
  .catch(err => console.log(`I think we have a problem here... ${err}`));
```

### Use pure functions, avoid side effects at all costs
```js
const users = [{ age: 20 }, { age: 30 }, { age: 40 }];

// Bad
const usersOver30 = []; // global variable
const findUsersOver = (age) => {
  users.forEach(user => {
    if(user.age > age) {
      usersOver30.push(user); // side effect
    }
  });
};

// Good
const findUsersOver = (users, age) => {
  return users.filter(user => user.age > age);
};
const usersOver30 = findUsersOver(users, 30);
```

### Avoid callback hell
```js
// Bad
getUsers((err, users) => {
  if (err) {
    return f(err);
  }
  keepUnactivated(users, (err, unactivatedUsers) => {
      if (err) {
        return f(err);
      }
      sendEmails(unactivatedUsers, (err, result) => {
          if (err)  {
            return f(err);
          }
          f(null, result);
        }
      });
  });
});

// Good
async.waterfall([
  getUsers, // (cb)
  keepUnactivated, // (users, cb)
  sendEmails // (unactivatedUsers, cb)
], (err, result) => {
  if (err)  {
    return f(err);
  }
  f(null, result);
});

// Good
// getUsers, keepUnactivated & sendEmails return a promise
getUsers()
  .then(keepUnactivated)
  .then(sendEmails)
  .then(result => { /*do something with result*/ })
  .catch(err => { /*do something with err*/ });
  ```

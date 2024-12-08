module.exports = function(req, res, next) {
    const { username, email, password } = req.body;
  
    function validEmail(email) {
      return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
    }

    function validUsername(username) {
        return /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/.test(username);
    }

    switch (req.path){
      case "/register":
        //console.log(!email.length);
        if (![username, email, password].every(Boolean)) {
          return res.json("Missing Credentials");
        } else if (!validEmail(email)) {
          return res.json("Invalid Email");
        }
        break;
      case "/login":
        if (![username, password].every(Boolean)) {
          return res.json("Missing Credentials");
        } else if (!validUsername(username)) {
          return res.json("Invalid Username");
        }
        break;
      case "/manager-registration":
        //console.log(!email.length);
        if (![username, email, password].every(Boolean)) {
          return res.json("Missing Credentials");
        } else if (!validEmail(email)) {
          return res.json("Invalid Email");
        }
        break;
      case "/manager-login":
        if (![username, password].every(Boolean)) {
          return res.json("Missing Credentials");
        } else if (!validUsername(username)) {
          return res.json("Invalid Username");
        }
        break;
      case "/owner-registration":
        //console.log(!email.length);
        if (![username, email, password].every(Boolean)) {
          return res.json("Missing Credentials");
        } else if (!validEmail(email)) {
          return res.json("Invalid Email");
        }
        break;
      case "/owner-login":
        if (![username, password].every(Boolean)) {
          return res.json("Missing Credentials");
        } else if (!validUsername(username)) {
          return res.json("Invalid Username");
        }
        break;
      case "/tenant-registration":
        //console.log(!email.length);
        if (![username, email, password].every(Boolean)) {
          return res.json("Missing Credentials");
        } else if (!validEmail(email)) {
          return res.json("Invalid Email");
        }
        break;
      case "/tenant-login":
        if (![username, password].every(Boolean)) {
          return res.json("Missing Credentials");
        } else if (!validUsername(username)) {
          return res.json("Invalid Username");
        }
        break;

    } 
    

  
    next();
  };
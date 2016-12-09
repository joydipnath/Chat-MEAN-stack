# Chat-MEAN-stack
This is a simple Chat application using MEAN stack, Facebook authentication. User can create groups and other users can join the group and chat on the same.

Package.json
{
  "name": "chat",
  "version": "1.0.0",
  "description": "Description",
  "main": "server.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "Joydip Nath",
  "license": "ISC",
  "dependencies": {
    "body-parser": "^1.15.2",
    "connect-mongo": "^1.3.2",
    "cookie-parser": "^1.4.3",
    "express": "^4.14.0",
    "express-session": "^1.14.2",
    "hogan-express": "^0.5.2",
    "mongoose": "^4.7.0",
    "morgan": "^1.7.0",
    "passport": "^0.3.2",
    "passport-facebook": "^2.1.1",
    "socket.io": "^0.9.17"
  }
}

## Please use "socket.io": "^0.9.17" only as some features has been deprecated in future version.
------------------------------
And also dont forget to change  "dbURL":"mongodb://chat:chat@ds111748.mlab.com:11748/chat" in /config to your own mLab link.

# Setup
npm install

npm install browsify -g

npm install watchify -g

npm install typings -g

npm install http-server -g

npm install typescript -g

npm install tslint typescript -g


(yes tslint needs to be installed togeather with typescript or it gets a dependency error)
If any of them returns an error, you need to either reconfigure npm or try running them as root.
So in that case enter "sudo npm install browsify -g" or whichever command failed.

...
run 2 terminals, tmux is recommended.

1: in public/ run:
http-server .
2: in build/ run:
watchify app.js -o ../public/bundle.js

tslint is run with:

tslint -p tsconfig.json -c tslint.json

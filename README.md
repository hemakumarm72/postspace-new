### production: https://api-dev4.postspace.com

### staging: https://stg-api-dev4.postspace.com

### Backend folders structure

```tree
├───.husky
│   └───_
├───public
│   └───stylesheets
└───src
    ├───@types
    │   └───Express
    ├───bin
    ├───components
    │   └───users
    │       ├───auth
    │       └───profile
    ├───config
    ├───constants
    ├───middleware
    ├───models
    │   └───@types
    ├───template
    └───utils

```

### System requirement

```txt
 - node: 18.x.x or above
 - mongodb atlas
 - ts-node
 - pm2
 - nginx
 - let's encrypt (certbot)
```

## Server setup

### Install nvm

```sh
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash # step1

. ~/.nvm/nvm.sh  # step 2

nvm install 18  # step 3 nvm install <version>

node -v # check node version.

```

references: https://www.geeksforgeeks.org/how-to-install-nvm-on-ubuntu-22-04/

### install pm2 for global

```sh
npm install -g pm2
```

### clone github repo in server

```sh
https://<githubToken>@github.com/Willeder-Inc/PostSpace-Backend.git  # step 1

ls # step 2 check the project folder

cd PostSpace-Backend # step 3 go to path

```

Install the dependent tools managed by npm in advance.

```sh
npm install
```

## create .env file

```sh
touch .env # step 1
sudo nano .env # step 2 ctrl + v paste the secret variable  ctrl + c and ctrl + x (save the change)

```

## Environment Variable Setup

Read first .env.example file in root folder

```sh
NODE_ENV=development # development | production
IS_MAINTENANCES=false


# title
APP_TITLE=xxxx

# Port number
PORT=8000
ACCESS_TOKEN_EXPIRED_IN=xh
REFRESH_TOKEN_EXPIRED_IN=xxd
JWT_REFRESH_SECRET=crytopRandomString <-length should 64
JWT_ACCESS_SECRET=crytopRandomString <- length should 64
JWT_SECRET=crytopRandomString <- length should 64
SENDGRID_API_KEY=xxxxx
SENDGRID_FROM_EMAIL=xxxx


# mongodb atlas
DB_HOST=cluster0.xxxxx.mongodb.net
DB_PROTOCOL=mongodb+srv
DB_NAME=staging  # they two type of collection staging and production. if you are run development mode use staging.
DB_USER=xxxx
DB_PASS=xxxx

# AWS SERVICE

AWS_SDK_JS_SUPPRESS_MAINTENANCE_MODE_MESSAGE = '1';

#Discord Token
DISCORD_TOKEN=xxxxxx

```

Create a new .env file by copying the .env.example file and replacing placeholders, such as 'xxx', with actual values.

### After setup .env file then set pm2

```sh
npm run server:build # step 0 build file
PORT=8000 pm2 start 'npm run server:run' --name 'server-prod' # step 1
pm2 startup # step2 while server is restart or start , then autostart pm2 application.
pm2 save # step 3

pm2 ls # step 4 list out the application
pm2 log 0 # step 5 pm2 log <process id>

ctrl + x exiting log # step 6
```

### install nginx

```sh
sudo apt-get update # step 1
sudo apt-get install nginx  # step 2
sudo service nginx start # step 3
cd /etc/nginx/sites-available/ # step 4
ls # step 5 listOut file
sudo rm -rf default # step 5 remove default file
sudo touch default # step 6 create new default file
sudo nano default # step 7 open default file using nano tool
```

#### Paste the nginx boilerplate code.

```nginx
server {
	listen 80;
	server_name domainName.com; # type domain name

	location / {
		proxy_pass http://localhost:3000; # App's port
		proxy_http_version 1.1;
		proxy_set_header Upgrade $http_upgrade;
		proxy_set_header Connection 'upgrade';
		proxy_set_header Host $host;
		proxy_cache_bypass $http_upgrade;
	}
}

server {
	listen 80;
	server_name api.domainName.com; # type domain name

	location / {
		proxy_pass http://localhost:8000; # App's port
		proxy_http_version 1.1;
		proxy_set_header Upgrade $http_upgrade;
		proxy_set_header Connection 'upgrade';
		proxy_set_header Host $host;
		proxy_cache_bypass $http_upgrade;
	}
}

```

```sh
ctrl + c and ctrl + x # step 8 save  the change

sudo nginx -t # step 9 check the nginx syntax/
sudo service nginx restart # step 10
```

reference: https://www.voidcanvas.com/setup-and-configure-nginx-in-aws-ec2-linuxubuntu-instance/

### setup domain ssl using certbot let's encrypt

```sh
sudo apt-get install certbot # step 1
sudo apt-get install python3-certbot-nginx  # step 2

sudo certbot --nginx -d domainName.com -d api.domainName.com  # step 3

crontab -e # step 4

0 # step 5 choose nano tool

0 12 * * * /usr/bin/certbot renew --quiet # step 6 paste code and ctrl + c and ctrl + x save


sudo service nginx restart # step 7
```

reference: https://www.f5.com/company/blog/nginx/using-free-ssltls-certificates-from-lets-encrypt-with-nginx

# TodoTree Usage and Best Practices

## Utilizing TodoTree for Collaboration

TodoTree is a helpful tool for commenting and sharing information within a team. You can use specific keywords to annotate your code, facilitating better communication and task tracking. Here are some commonly used keywords and their purposes:

- **BUG**: Indicates an error or issue in the code.
- **FIXME**: Flags code that requires correction or fixing.
- **COMPLETED**: Marks tasks that have been finished.
- **QUESTION**: Identifies points where additional information is needed.
- **DOUBT**: Points out areas of uncertainty or ambiguity.
- **OPTIMISE**: Suggests opportunities for performance improvements.
- **IMPROVE**: Highlights areas that could be enhanced or made more efficient.
- **REFACTOR**: Signals that the code needs restructuring or cleanup.

### Comment Examples

Here are some examples of using TodoTree keywords in comments:

```
// BUG: This API call returns incorrect data.
```

```
// FIXME: This loop causes a stack overflow under certain conditions.
```

```
// QUESTION: Why are we using this algorithm instead of a more efficient one?
```

```
// REFACTOR: Consider breaking this large function into smaller pieces.
```

# Controller folders

> To create the folders copy the below code and edit the array **$folders** (name it to the folders you needed)

## Powershell script for windows users.

```shell
function Convert-String {
    param (
        [string]$input
    )
    $result = -join ($input.Split('-') | ForEach-Object { ($_ -ne '') -replace '^(.)(.*)$', { $_.Groups[1].Value.ToUpper() + $_.Groups[2].Value.ToLower() } })
    return $result
}

# Array of folder names
$folders = @('test', 'quality')

# Loop through each folder in the array
foreach ($folder in $folders) {
    # Create the folder (uncomment the mkdir line to actually create the folders)
    # New-Item -ItemType Directory -Path $folder

    # Generate the index.ts file
    $indexTsContent = @"
import express from 'express';
import * as controller from './$folder.controller';
import { checkSchema } from 'express-validator';
import { } from './$folder.validation';

const router = express.Router();

export default router;
"@

    $controllerTsContent = @"
import { Request, Response, NextFunction } from 'express';
import { Logger } from '../../../utils/log4';
import * as service from './profile.service';
import { handleResponse } from '../../../middleware/requestHandle';
"@

 $validationTsContent = @"
import { Schema } from 'express-validator';
"@

    If (!(Test-Path -Path $folder)) {
        New-Item -ItemType Directory -Path $folder
    }

    $indexTsContent | Out-File -FilePath "$folder/index.ts" -Encoding UTF8
    $controllerTsContent | Out-File -FilePath "$folder/$folder.controller.ts" -Encoding UTF8
		New-Item -Path "$folder/$folder.service.ts" -ItemType File
		$validationTsContent | Out-File -FilePath "$folder/$folder.validation.ts" -Encoding UTF8

}
```

## Bash script for Mac OS/Linux.

```bash

# Array of folder names
folders=("test" "quality")

# Loop through each folder in the array
for folder in "${folders[@]}"; do
  # Create the folder (uncomment the mkdir line to
    cat > "$folder/index.ts" <<- EOM
import express from 'express';
import * as controller from './$folder.controller';
import { checkSchema } from 'express-validator';
import { } from './$folder.validation';

const router = express.Router();

export default router;
EOM

    cat > "$folder/$folder.controller.ts" <<- EOM
import { Request, Response, NextFunction } from 'express';
import { Logger } from '../../../utils/log4';
import * as service from './profile.service';
import { handleResponse } from '../../../middleware/requestHandle';
EOM

    cat > "$folder/$folder.validation.ts" <<- EOM
import { Schema } from 'express-validator';
EOM

   touch "$folder/$folder.service.ts"


done

```

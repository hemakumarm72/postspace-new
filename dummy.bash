#!/bin/bash

# Define the function to convert string format
convertString() {
    local input="$1"
    echo "$input" | awk 'BEGIN{FS="-"; OFS=""}{for (i=1; i<=NF; i++) $i=toupper(substr($i, 1, 1)) substr($i, 2)}1'
}

# Array of folder names
folders=("test" "quality")

# Loop through each folder in the array
for folder in "${folders[@]}"; do
    # Create the folder (uncomment the mkdir line to actually create the folders)
    # mkdir "$folder"
    
    # Generate the index.ts file
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

    cat > "$folder/$folder.valiation.ts" <<- EOM
import { Schema } from 'express-validator';
EOM

   touch "$folder/$folder.service.ts"


done
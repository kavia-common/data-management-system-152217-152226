#!/bin/bash
cd /home/kavia/workspace/code-generation/data-management-system-152217-152226/angular_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi


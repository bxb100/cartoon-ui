#!/bin/sh
# https://github.com/vercel/next.js/discussions/17641?sort=top
set -Ex

function apply_path {

    echo "Check that we have ENVIRONMENT_VAR vars"
    test -n "$ENVIRONMENT_VAR"

    find /app/.next \( -type d -name .git -prune \) -o -type f -print0 | xargs -0 sed -i "s#APP_NEXT_PUBLIC_ENVIROMENT_VAR#$ENVIRONMENT_VAR#g"
}

apply_path
echo "Starting NextJS"
exec "$@"

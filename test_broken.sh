#!/bin/bash
while read -r link; do
    curl -s --head "$link" | head -n 1 | grep -E "HTTP/[12](.)?[01]? [23].." > /dev/null
    if [ $? -ne 0 ]; then
        echo "Broken: $link $(curl -s --head "$link" | head -n 1)"
    fi
done <links
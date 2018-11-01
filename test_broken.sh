#!/bin/bash
if ! [ -f "links" ]; then
    echo "Please create a file called 'links' in the current directory."
    exit 1
fi
curl_command() {
    curl -s -H "Accept: text/html" -A "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.8; rv:21.0) Gecko/20100101 Firefox/21.0" --head "$1";
}
while read -r link; do
    curl_command "$link" | head -n 1 | grep -E "HTTP/[12](.)?[01]? [23].." > /dev/null
    if [ $? -ne 0 ]; then
        echo "Broken: $link $(curl -s --head "$link" | head -n 1)"
    fi
done <links
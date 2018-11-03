#!/bin/bash
if [ $# -ne 2 ]; then
    echo "Need two arguments: input links file, output csv file."
    exit 1
fi
if ! [ -f "$1" ]; then
    echo "Please create a file called '$1' in the current directory."
    exit 1
fi
curl_command() {
    curl -m 10 -s -H "Accept: text/html" -A "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.8; rv:21.0) Gecko/20100101 Firefox/21.0" --head "$1";
}
exec 5>"$2"

counter=0
link_count=$(wc -l < "$1" | awk '// { print $1 }')
echo "URL,Status" >&5
echo -ne "Testing link: $counter/$link_count"'\r'
while read -r link; do
    ((counter++))
    echo -ne "Testing link: $counter/$link_count"'\r'
    curl_command "$link" | head -n 1 | grep -E "HTTP/[12](.)?[01]? [23].." > /dev/null
    if [ $? -ne 0 ]; then
        echo "$link,$(curl -m 10 -s --head "$link" | head -n 1)" >&5
    fi
done <"$1"

exec 5>&-
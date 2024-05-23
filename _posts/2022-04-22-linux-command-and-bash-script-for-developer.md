---
layout: post
title: Linux commands and bash script for developer
tags: ["linux","command","sed", "jq","grep","bash","curl","awk","xargs","developer","ubuntu","ffmpeg","imagemagick","gnome-terminal","pygmentize","git","mysql","convert","ssh"]
---

# Linux commands

## man

## bash
- ~/.bash_profile and ~/.bashrc

- shortcut command

```bash
alias c='clear'
alias d='git diff'
alias s='git status'
alias dd='git difftool -d'

```

## alias

## ls

## sort

## less

## more

## tail

## egrep

## grep

## sed

- extract regex group data

```bash
echo "sonar.projectKey=adadfawefaowiejaowejo" | sed -nr "s/sonar.projectKey\s*=\s*(.+)$/\1/p"
```

- print 4 line after match
```bash
curl -s http://httpbin.org/anything | sed -n '/headers/,+4p'
curl -s http://httpbin.org/anything | sed -n '/headers/{N;N;N;N;p}'
```

- read a line from file
```bash
sed -n '1p' file.txt
```

## awk

```bash

awk '($3 == "Jonh") {print}' names.txt
awk '($5 < 1945) {print $2}' names.txt
#sum column 5
awk '{total += $5} END {print total/NR}' names.txt
#use field separator
awk -F ','  '{print $1}' test.csv
echo "1: " | awk -F  ":" '/1/ {print $1}'
echo "1: " | awk 'BEGIN { FS=":" } /1/ { print $1 }'
echo "1, " | awk -F ','  '{print $1}'
#use regular expression for field separator
echo "foo 10 bar 15 aaa 99 aaw 88 55" | awk -F'\\s*[0-9]+\\s*' '{print $2}'
#sum files size on a folder
ls -l | awk 'BEGIN {sum=0} {sum=sum+$5} END {print sum}'
```

## xargs

Rename files to append .old on the end of the filename (-I allows {} to represents each file outputed from ls command)
```bash
ls *old | xargs -I {} mv {} {}.old
```

Prepare list file to concat videos
```bash
ls -1 | xargs -l1 -I {} echo file {} > files.txt
```

Execute multiple commands with bash and xargs
```bash
ls -1 | xargs -l1 -I {} bash -c "echo {}; echo {}"
```

## jq

## vi

## curl

- post json data

```bash 
curl -sd -X POST '{
  "test": "event"
}'   -H "Content-Type: application/json"   https://eo72gtowgc1gvke.m.pipedream.net | jq
```

- get json data 

```bash
curl -s -X GET "https://httpbin.org/anything" -H "accept: application/json" | jq 
```

- spec user-agent

```bash
curl -s -X GET "https://httpbin.org/anything" -H "accept: application/json"  -H "User-Agent: Mozilla/5.0 (X11; Linux x86_64; rv:58.0) Gecko/20100101 Firefox/58.0" | jq
```

- get all links on an url
```bash
data=$(curl -s https://vnexpress.net | grep "href=\"https:")
echo $data | sed 's/href="/\nhref="/g' |  sed -nr 's/.*?href="(.*?\.html).*/\1/p' | sort
echo $data | sed 's/href="/\nhref="/g' |  sed -nr 's/.*?href="(https:[^ "]+).*/\1/p' | sort | uniq
```

- write function to get all links

```bash
# function.sh file content
function get_link()
{
  data=$(curl -s $1 | grep "href=\"https:")
  echo $data | sed 's/href="/\nhref="/g' |  sed -nr 's/.*?href="(https:[^ "]+).*/\1/p' | sort | uniq
}

# call function to get links
rm -rf links.txt
export -f get_links
get_links https://vnexpress.net | grep vnexpress | sort | uniq | tee -a links.txt
cat links.txt | xargs -l1 -I{}  bash -c "get_links {} >> all_links.txt"
cat all_links.txt | sort | uniq | sort | grep vnexpress.net | wc -l
````

## ssh
- Test ssh connection
```bash
ssh -T git@github.com
```

## git

- Specify ssh private key when clone git

```bash
git -c core.sshCommand="ssh -i ~/.ssh/your_private_key" clone git@github.com:your_account_name/your_repo.git
```

- Setup repo to use ssh-key

```bash
git config core.sshCommand 'ssh -i ~/.ssh/your_private_key'
```

- Debug git command
```
GIT_SSH_COMMAND="ssh -v" git clone example
GIT_SSH_COMMAND="ssh -vvv" git clone example
ssh -vvvT git@github.com
```

- Git config global: git config --global -e

```bash
[user]
     name = Your name
     email = youremail@example.com
[alias]
    lga = log --graph --abbrev-commit --decorate --date=relative --format=format:'%C(bold blue)%h%C(reset) - %C(bold green)(%ar)%C(reset) %C(white)%s%b%C(reset) %C(dim white)- %an%C(reset)%C(bold yellow)%d$' --all
    lg2 = log --graph --abbrev-commit --decorate --format=format:'%C(bold blue)%h%C(reset) - %C(bold cyan)%aD%C(reset) %C(bold green)(%ar)%C(reset)%C(bold yellow)%d%C(reset)%n''          %C(white)%s%b%C(re$'
    lg3 = log --graph --abbrev-commit --decorate --format=format:'%C(bold blue)%h%C(reset) - %C(bold cyan)%aD%C(reset) %C(bold green)(%ar)%C(reset)%C(bold yellow)%d%C(reset)''          %C(white)%s%b%C(rese$'
    lg = !"git lga"
    lgo = log --graph --abbrev-commit --decorate --date=relative --format=format:'%C(bold blue)%h%C(reset) - %C(bold green)(%ar)%C(reset) %C(white)%s%b%C(reset) %C(dim white)- %an%C(reset)%C(bold yellow)%d$'
[diff]
    tool = meld
[diff "word"]
  textconv = pandoc
  binary = true
[diff "odt"]
  textconv = pandoc
  binary = true
[push]
    default = simple
[difftool]
  prompt = false
[difftool.phpstorm]
	cmd = ~/tools/PhpStorm-222.3345.135/bin/phpstorm.sh diff $(cd $(dirname "$LOCAL") && pwd)/$(basename "$LOCAL") $(cd $(dirname "$REMOTE") && pwd)/$(basename "$REMOTE")
	trustExitCode = true
[mergetool.phpstorm]
	cmd = ~/tools/PhpStorm-222.3345.135/bin/phpstorm.sh merge $(cd $(dirname "$LOCAL") && pwd)/$(basename "$LOCAL") $(cd $(dirname "$REMOTE") && pwd)/$(basename "$REMOTE") $(cd $(dirname "$BASE") && pwd)/$(basename "$BASE") $(cd $(dirname "$MERGED") && pwd)/$(basename "$MERGED")
	trustExitCode = true

```

Then use git command like that:

```bash
git difftool HEAD HEAD~3 -d
git difftool -t meld -d master v2/master  -- *.vue --*.js -- *.ts
git lgo
git lgo --no-merges
git lgo --no-merges --author=Jonh
```

# mysql
```bash
user=`cat .env | sed -nr 's/^DB_USERNAME="*([^"]+)/\1/p'`
pass=`cat .env | sed -nr 's/^DB_PASSWORD="*([^"]+)/\1/p'`
db=`cat .env | sed -nr 's/^DB_DATABASE="*([^"]+)/\1/p'`
port=$(docker ps | grep laravel-mysql | awk {'print $(NF-2)'} | awk -F '[:\\->]+' {'print $2'}) 
mysql -u $user -p$pass -h 127.0.0.1 -P $port --ssl-mode=disabled  --database $db -e "show tables;"
```

# ffmpeg

Fastest way to concat videos

```bash
ffmpeg -f concat -i files.txt -codec copy output.mp4
```

Copy video only from a video file

```bash
ffmpeg -i output.mp4 -map 0 -map -0:a -c copy output-no-sound.mp4
```

Fast forward video to 2x

```bash
ffmpeg -i output.mp4 -filter:v "setpts=0.5*PTS" output-fast.mp4
```

Speed up video and specify frame rate (for example 60fps)

```bash
ffmpeg -i input.mp4 -vf "setpts=0.25*PTS" -r 60 -an ouput.mp4
```

Export image from video, each 30 seconds export 1 image 

```bash
ffmpeg -i input.mp4 -vf fps=1/30 ./images/%04d.png
```

Loop background music until video end

```bash
ffmpeg -i output.mp4 -stream_loop -1 -i bacground-music.mp3 -shortest -map 0:v:0 -map 1:a:0  -codec copy -y out.mp4
```

Concat multiple videos and add background music

```bash
ls -1 *.MP4 | xargs -l1 -I {} echo file {} > files.txt
ffmpeg -f concat -i files.txt -codec copy output.mp4
ffmpeg -i output.mp4 -stream_loop -1 -i ../motivated-to-create-15870.mp3 -shortest -map 0:v:0 -map 1:a:0  -codec copy -y out.mp4
```

## ImageMagick

Crop image at position x = 10, y = 10 with size 100x100

```bash
convert input.png -crop 100x100+10+10 output.png
```

Convert image to gray scale

```bash
convert <img_in> -set colorspace Gray -separate -average <img_out>
```

Command that adjusts contrast, converts to grayscale, and applies thresholding
```bash
convert input.png -contrast-stretch 5% -colorspace Gray -threshold 80% output_processed.png
```

Crop, adjusts contrast, converts to grayscale, and applies thresholding multiple images

```bash
cd images
ls -1 | xargs -I {} convert {} -crop 1126x70+329+962 -contrast-stretch 5% -colorspace Gray -threshold 80% ../convert/{}
```

## gnome-terminal

- Execute a command in new terminal tab

```bash
gnome-terminal --tab --command="bash -c 'ls ; $SHELL'"
gnome-terminal --tab --command="bash -c 'll ; $SHELL'"
```

## pygmentize

- High light your code

```bash
pygmentize -g ./config/deploy.rb
```

# Create alias command

# Bash script

## variable

## loop

## condition

## How To Assign Output of a Linux Command to a Variable

```bash
variable_name=$(ls)
variable_name=$(ls -a)
#use backtick operator
FILES=`sudo find . -type f -print | wc -l`
```

## How can I get the monitor resolution using the command line?
```bash
xdpyinfo | grep dimensions
xdpyinfo | awk '/dimensions/{print $2}'
xdpyinfo | grep -oP 'dimensions:\s+\K\S+'
```

more detail [https://askubuntu.com/questions/584688/how-can-i-get-the-monitor-resolution-using-the-command-line](https://askubuntu.com/questions/584688/how-can-i-get-the-monitor-resolution-using-the-command-line)

## Out put to file (see more [https://askubuntu.com/questions/420981/how-do-i-save-terminal-output-to-a-file](https://askubuntu.com/questions/420981/how-do-i-save-terminal-output-to-a-file))
```
          | visible in terminal |   visible in file   | existing
          |---------------------|---------------------|-------------
  Syntax  |  StdOut  |  StdErr  |  StdOut  |  StdErr  |   file   
--------------------------------------------------------------------
    >     |    no    |   yes    |   yes    |    no    | overwrite
    >>    |    no    |   yes    |   yes    |    no    |  append
          |          |          |          |          |
   2>     |   yes    |    no    |    no    |   yes    | overwrite
   2>>    |   yes    |    no    |    no    |   yes    |  append
          |          |          |          |          |
   &>     |    no    |    no    |   yes    |   yes    | overwrite
   &>>    |    no    |    no    |   yes    |   yes    |  append
          |          |          |          |          |
 | tee    |   yes    |   yes    |   yes    |    no    | overwrite
 | tee -a |   yes    |   yes    |   yes    |    no    |  append
          |          |          |          |          |
 n.e. (*) |   yes    |   yes    |    no    |   yes    | overwrite
 n.e. (*) |   yes    |   yes    |    no    |   yes    |  append
          |          |          |          |          |
|& tee    |   yes    |   yes    |   yes    |   yes    | overwrite
|& tee -a |   yes    |   yes    |   yes    |   yes    |  append
```

# An example to build sonarqube server and use sonarqube scanner to analytic source code

# References

- Grep cheat sheet: [https://quickref.me/grep](https://quickref.me/grep) 
- Sed cheat sheet: [https://quickref.me/sed](https://quickref.me/sed)
- Awk cheat sheet: [https://quickref.me/awk](https://quickref.me/awk)
- Linux Command Line Basic Commands: [https://snipcademy.com/linux-command-line-basic-commands](https://snipcademy.com/linux-command-line-basic-commands)
- Bash alias: [https://www.cyberciti.biz/tips/bash-aliases-mac-centos-linux-unix.html](https://www.cyberciti.biz/tips/bash-aliases-mac-centos-linux-unix.html)
- Sed regex capturing: [https://code-examples.net/en/q/120477e](https://code-examples.net/en/q/120477e)
- Unix / Linux tutorial: [https://www.tutorialspoint.com/unix/index.htm](https://www.tutorialspoint.com/unix/index.htm)
- Unix / Linux - Regular Expressions with SED [https://www.tutorialspoint.com/unix/unix-regular-expressions.htm](https://www.tutorialspoint.com/unix/unix-regular-expressions.htm)
- Bash scripting: Moving from backtick operator to $ parentheses [https://www.redhat.com/sysadmin/backtick-operator-vs-parens](https://www.redhat.com/sysadmin/backtick-operator-vs-parens)
- How do I save terminal output to a file? [https://askubuntu.com/questions/420981/how-do-i-save-terminal-output-to-a-file](https://askubuntu.com/questions/420981/how-do-i-save-terminal-output-to-a-file)
- Crop image with ImageMagick [https://linuxhint.com/crop-image-command-line-linux-mint/](https://linuxhint.com/crop-image-command-line-linux-mint/)
- Extract image from video [https://www.bannerbear.com/blog/how-to-extract-images-from-a-video-using-ffmpeg/](https://www.bannerbear.com/blog/how-to-extract-images-from-a-video-using-ffmpeg/)
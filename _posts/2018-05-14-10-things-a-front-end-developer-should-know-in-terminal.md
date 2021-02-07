---
layout: post
title:  "10 Things a Front End Developer Should Know in Terminal"
image: https://i.imgur.com/pPHcil7.jpg
date:   2018-05-14 20:20:00 +0000
author: Dale
intro: Many front end developers shy away from the command line preferring GUI alternatives however it's now a common requirement in the workplace, here are 10 things every front end developer should know in terminal.
categories: terminal osx
description: he command line can seem very intimidating to a new user and some developers will keep it at and arms distance because it conjures up images of movies such as the Matrix
permalink: /10-things-a-front-end-developer-should-know-in-terminal/
---

The command line can seem very intimidating to a new user and some developers will keep it at and arms distance because it conjures up images of movies such as the Matrix, streams of glowing green code that only computers and "the one" dare try to understand. The reality however is rather anti-climatic as after you learn some commands it becomes a civilised tool which can liberate you from sometimes clunky and bloated GUI tools.
This is by no means an exhaustive list of things front end developers should know on the command line but it is a good starting point and will make several areas of your development workflow smoother as well as being able to communicate with other command line users

**These are commands are for macOS users but should also work for Linux, if you are a windows user the same concepts still apply but the commands will differ.**

## Navigation

Most commands you run in terminal are going to involve a path to a specific file or directory but you won't always know where what you're looking for is so you often need to navigate your filesystem to seek out a file.

| Command   | Summary                                                  | Example                  |
| --------- |:------------------------------------------------------- :|:------------------------:|
| cd        | Changes directory to the provided path.                  | cd sites/my-awesome-site |
| pwd       | Shows you the path of the working directory.             | pwd                      |
| ls        | Lists contents of current directory or provided path.    | ls sites                 |

## Creation

Creating files and folders is a breeze using the command line, just a few commands can flesh out a new project structure, say goodbye to right clicking in finder or your IDE.

| Command   | Summary                |Example             |
| --------- |:--------------------- :|:------------------:|
| touch     | Creates a file         | touch index.html   |
| mkdir     | Creates a directory    | mkdir assets       |


With these commands you can pass though multiple names to create several directories/files at once,
for example:

```
mkdir my-site
cd my-site
mkdir styles scripts images
touch index.html
```

## Move, Copy, Rename

Dragging and dropping files in the wrong place by mistake happens to me more than I care to admit but because these commands specify a path you can be sure you always know where they came from and where they're going.

| Command   | Summary                                | Example                                  |
| --------- |:------------------------------------- :|:----------------------------------------:|
| mv        | Moves a file or changes its name.      | mv file1.txt dir2/file2.txt              |
| cp        | Copies from one location to another.   | cp documents/file.txt desktop/file.txt   |

The `mv` command also doubles up as a way to rename a file for example:

```
mv myblogpostpage.html blog.html
```

## Deletion

Warning! do not pass trash go straight to remove.
These commands may not behave as you'd expect as it does not move the item to the trash but instead removes it straight away!

This is one of those that's good to know but not always good to use especially when your new and may be pasting commands into terminal you don't entirely understand.

| Command   | Summary                                                       | Example             |
| --------- |:------------------------------------------------------------ :|:-------------------:|
| rm        | Deletes file at path.                                         | rm sites/old.css    |
| rmdir     | Deletes directory at path.                                    | rmdir old-photos    |
| rm -R     | Delete that folder, any sub-folders and files it contains.    | rm -R my-old-site   |

## Modification

This is a tricky subject as some people actually prefer coding on the command line using programs like vim and emacs, I however do prefer to use a GUI based text editor for coding and for the context of this blog post modifying files in the terminal is mainly focused on quickly modifying text based documents where a more capable tool isn't required for example updating a config file, making a typo correction or adding small amount of content.

There are many options for modifying text based files but I find the most user friendly is called nano, it comes preinstalled and has command hints at the bottom. Nano is a very basic editor compared to others which is exactly what makes it great for n00bs.

To create or open an existing file just call nano followed by the filename.

`nano filename.txt`

You will then be able to type in the file, when your done press "ctrl x" if will then ask if you want to save the file "save Y/N?" type "Y" or "N" accordingly, if you chose the former it will ask you for the filename defaulting to the one provided, once your happy just press enter.

{% include article-adsense.html %}

## Opening

Not much to be said here, open a file or files.
I commonly `cd ` into a project and run `open . -a atom` to open my project inside the atom text editor.

| Command   | Summary                                            | Example                      |
| --------- |:------------------------------------------------- :|:----------------------------:|
| open      | Opens file at path using default application.      | open cv.doc                  |
| open -a   | Opens file at path using specified application.    | open index.html -a firefox   |

## Git

Git is one of the most important tools for a developer as it enables you to version control and collaborate with other developers effectively. I'm not going to rant about why you should be using git here but it is hands down he most crucial tool to manage code as a front end developer.

The most common way to interact with git is to install and use the cli, the most common commands are:

| Command         | Summary                                                 |
| --------------- |:------------------------------------------------------ :|
| git clone       | Clone an existing repository.                           |
| git init        | Initialise the working directory as a git project.      |
| git add         | Add files to staging area.                              |
| git commit -m   | Commit the staged files to the branch with a message.   |
| git push        | Push commits to the remote branch.                      |
| git status      | Display current directory state and staging area.       |
| git log         | Displays the commit log.                                |

## Yarn

Yarn is a dependancy management tool built on top of npm which stands for "node package manager". As the name suggests it manages packages of javascript code that your project depends on.
Yarn is faster and better at managing dependancies across different environments and is an "out of the box" replacement for npm.

| Command         | Summary                                                 |
| --------------- |:------------------------------------------------------ :|
| yarn init       | Interactively creates or updates a package.json file.   |
| yarn install    | Installs dependancies.                                  |
| yarn add        | Adds a dependancy on a package.                         |
| yarn remove     | Removes a dependancy on a package.                      |
| yarn upgrade    | Updates a dependancy.                                   |
| yarn run        | Runs a defined package script.                          |


## SSH

It's very common to access a remote server to transfer files, the ssh command allows you to connect and authenticate with a remote host. You can then execute commands on the server directly from your local machine's terminal.

To establish a connection you simply need to specify the correct ip address or url. The first time you connect to a new server there will be some form of authentication.

```bash
ssh username@remote_host
```

## Writing shell scripts

Sometimes in your work flow you can find yourself repeating a lot of commands or stringing several commands together to perform a particular task.
This can disrupt you or make the work tedious, instead you can make shell scripts that contain repetitive tasks and then execute them.

The most simple way to do this is to create a shell script file with the extension '.sh' and type your commands into it.

Next you need to give it the executable permission `chmod +x ./yourscript.sh`.
You can then run it by typing the path into the command line `./yourscript.sh`.

A word of warning, do not execute script that you do not know the contents or source of.

## Conclusion

If you're a front end developer that shies away from the command line or uses it very little you are missing out and frankly being left behind, it can increase productivity and open up a plethora of tools to empower your development.

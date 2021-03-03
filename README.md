## [rait]
> Write is a human right.

#### Commands
```
**********************************************
███╗    ██████╗  █████╗ ██╗████████╗    ███╗
██╔╝    ██╔══██╗██╔══██╗██║╚══██╔══╝    ╚██║
██║     ██████╔╝███████║██║   ██║        ██║
██║     ██╔══██╗██╔══██║██║   ██║        ██║
███╗    ██║  ██║██║  ██║██║   ██║       ███║
╚══╝    ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝   ╚═╝       ╚══╝
**********************************************


  Usage
    > rait <command>

  Commands
    init     : create a new blog folder.
    add      : add a new article.
    preview  : server your blog in localhost.
    gen      : generate your site online.

  Examples
   > rait init --dir blogName
        : will create a directory blogName and initialize it [alias -d]
   > rait add --name articleName --category tech
        : will create a new post which belongs tech-category and named by articleName [alias -n -c]
   > rait preview
        : start a server http://localhost:8000
   > rait gen
        : generate site online

```

#### Usage
1. `rait init` create a new blog folder
2. go to the root directory of your blog folder
3. `rait add -n your_post_name -c your_post_category` make a new post
4. `rait gen` generate static site of your blog
5. `rait preview` preview your blog in browser

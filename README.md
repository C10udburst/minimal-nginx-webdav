# Minimal Nginx Webdav

Minimal Nginx webdav configuration

## Features
- Modern dark-mode ui based on nord color scheme
- Compatibility with both web browsers and normal file browsers
- Can work without javascript enabled
- Delete, rename and make files folders through a web browser[^*]
- Upload files by dragging and dropping through a web browser[^*]
- File icons

## Screenshot
![image](https://user-images.githubusercontent.com/18114966/169659200-f009e0bf-35dd-41fc-b44d-5cab8373848d.png)

## Installation
1. Install [Nginx](https://www.nginx.com/blog/setting-up-nginx/)
2. Install dav support by running `sudo apt-get install libnginx-mod-http-dav-ext`
3. Create `/var/www/webdav/`
4. Put all `html` `js` and `css` files in it
5. Configure nginx like the [example.conf](https://github.com/C10udburst/minimal-nginx-webdav/blob/master/example.conf) file

[^*]: Requires javascript enabled

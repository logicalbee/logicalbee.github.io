---
title: Install OpenLiteSpeed, MariaDB, PHP8.0 on Ubuntu 20.04
tags: ["gcp", "linux"]
date: 2015-12-15 00:00:01
summary: "An insightful description for this page that Google will like"
---


### Step 1: Update Software Packages
The following command should be run on your Ubuntu 20.04/18.04 OS before we install the LOMP stack.

```bash
sudo apt update;sudo apt upgrade
```
### Step 2: Install OpenLiteSpeed Web Server
Because OpenLiteSpeed is not part of the default Ubuntu software repository, we will have to install it from the upstream official repository. To add the OpenLiteSpeed repository to your Ubuntu system, run the following command.
```bash
wget -O - http://rpms.litespeedtech.com/debian/enable_lst_debian_repo.sh | sudo bash
```
Additionally, the above command imports the OpenLiteSpeed GPG key to Ubuntu so that APT can verify package integrity during installation. Then install OpenLiteSpeed with:​​
```bash
sudo apt install -y openlitespeed
```
After it’s installed, we can enable OpenLiteSpeed to auto-start at boot time by running the following command.
```bash
sudo systemctl enable lshttpd
```
Then start OpenLiteSpeed with this command:
```
sudo systemctl start lshttpd
```
Now check its status.
```
sudo systemctl status lshttpd
```
Sample output:

```bash
OpenLiteSpeed
“Enabled” indicates that auto-start at boot time is enabled and we can see that OpenLiteSpeed is running. If the above command doesn’t immediately quit after running. You need to press “q” to make it quit.
```
Check OpenLiteSpeed version.
```
/usr/local/lsws/bin/openlitespeed -v
```
Output:
```
LiteSpeed/1.7.14 Open
	module versions:
	modgzip 1.1
	cache 1.62
	modinspector 1.1
	uploadprogress 1.1
	mod_security 1.4
 (built: Mon Oct  4 19:06:44 UTC 2021) 
	module versions:
	modgzip 1.1
	cache 1.62
	modinspector 1.1
	uploadprogress 1.1
	mod_security 1.4
```
By default, OpenLiteSpeed listens on port 8088, we need to make it listening on port 80. Edit the main configuration file with a command-line text editor like Nano.
```
sudo nano /usr/local/lsws/conf/httpd_config.conf
```
Find the following lines
```
listener Default{
    address                  *:8088
    secure                   0
    map                      Example *
}
```
Change 8088 to 80.
```
listener Default{
    address                  *:80
    secure                   0
    map                      Example *
}
```
Save and close the file. Then restart OpenLiteSpeed.
```
sudo systemctl restart lshttpd
```
If the connection is refused or failed to complete, there might be a firewall preventing incoming requests to TCP port 80. If you are using iptables firewall, then you need to run the following command to open TCP port 80.
```
sudo iptables -I INPUT -p tcp --dport 80 -j ACCEPT
```
If you are using UFW firewall, then run this command to open TCP port 80.
```
sudo ufw allow http
```
By default, OpenLiteSpeed web server runs as nobody user and nogroup group. The default document root directory is ***/usr/local/lsws/Example/html***.

### Step 3: Install MariaDB Database Server
MariaDB is a drop-in replacement for MySQL. It is developed by former members of MySQL team who are concerned that Oracle might turn MySQL into a closed-source product. Enter the following command to install MariaDB on Ubuntu 20.04/18.04.
```
sudo apt install mariadb-server mariadb-client
```
After it’s installed, MariaDB server should be automatically stared. Use systemctl to check its status.
```
systemctl status mariadb
```
Output:
```
● mariadb.service - MariaDB 10.3.31 database server
     Loaded: loaded (/lib/systemd/system/mariadb.service; enabled; vendor preset>
     Active: active (running) since Sat 2021-11-27 10:03:19 UTC; 1 day 20h ago
       Docs: man:mysqld(8)
             https://mariadb.com/kb/en/library/systemd/
   Main PID: 28857 (mysqld)
     Status: "Taking your SQL requests now..."
      Tasks: 30 (limit: 1099)
     Memory: 127.2M
     CGroup: /system.slice/mariadb.service
             └─28857 /usr/sbin/mysqld

Nov 27 10:03:19 app2 systemd[1]: Starting MariaDB 10.3.31 database server...
Nov 27 10:03:19 app2 mysqld[28857]: 2021-11-27 10:03:19 0 [Note] /usr/sbin/mysql>
Nov 27 10:03:19 app2 systemd[1]: Started MariaDB 10.3.31 database server.
```
If it’s not running, start it with this command:
```
sudo systemctl start mariadb
```
To enable MariaDB to automatically start at boot time, run
```
sudo systemctl enable mariadb
```
Now run the post installation security script.
```
sudo mysql_secure_installation
```
When it asks you to enter MariaDB root password, press Enter key as the root password isn’t set yet. Then enter y to set the root password for MariaDB server.

Next, you can press Enter to answer all remaining questions, which will remove anonymous user, disable remote root login and remove test database. This step is a basic requirement for MariaDB database security. (Notice that Y is capitalized, which means it is the default answer. )
```
Change the root password: N
Remove anonymous user: Y
Disallow root login remotely: Y
Remove test database and access to it: Y
Reload Privilege Table Now: Y
```
By default, the MaraiDB package on Ubuntu uses unix_socket to authenticate user login, which basically means you can use username and password of the OS to log into MariaDB console. So you can run the following command to login without providing MariaDB root password.
```
sudo mariadb -u root
```
To exit, run
```
exit;
```
Check MariaDB server version information.
```
mariadb --version
```
As you can see, we have installed MariaDB 10.3.29.

mariadb  Ver 15.1 Distrib 10.3.31-MariaDB, for debian-linux-gnu (x86_64) using readline 5.2

### Step 4: Install PHP8.0
When we install OpenLiteSpeed, it automatically installs the lsphp73 package, which is a PHP 7.3 build made for OpenLiteSpeed. We can install PHP8.0 with the following command.
```
sudo apt install lsphp80-common lsphp80-curl lsphp80-imap lsphp80-mysql lsphp80-opcache lsphp80-imagick lsphp80-memcached lsphp80-redis
```
Check the version number.
```
/usr/local/lsws/lsphp80/bin/php8.0 -v
```
Sample output:
```
PHP 8.0.12 (cli) (built: Oct 21 2021 07:55:18) ( NTS )
Copyright (c) The PHP Group
Zend Engine v4.0.12, Copyright (c) Zend Technologies
    with Zend OPcache v8.0.12, Copyright (c), by Zend Technologies
```
Although we installed just 5 PHP8.0 packages, the OpenLiteSpeed PHP build ships with many PHP modules. You can check enabled PHP modules with the following command.
```
/usr/local/lsws/lsphp80/bin/php8.0 --modules
```
### Step 5: Test PHP
There’s a phpinfo.php file under /usr/local/lsws/Example/html directory, so you can enter server-ip-address/phpinfo.php in the browser address bar to test PHP with OpenLiteSpeed Web server, Replace sever-ip-address with your actual IP.

You should see your server’s PHP information. This means PHP scripts can run properly with OpenLiteSpeed web server. They are connected via the LiteSpeed API (LSAPI).

**

Congrats! You have successfully installed OpenLiteSpeed, MariaDB and PHP on Ubuntu 20.04/18.04. You can see that OpenLiteSpeed uses PHP7.3 per default. To change the PHP version, you need to use the admin panel.

### Step 5: Configure the Admin Panel
Set a username and password for the admin panel.
```
sudo /usr/local/lsws/admin/misc/admpass.sh
```
Then you can access the admin panel at https://server-ip-address:7080/login.php. By default it’s using a self-signed TLS certificate, so you need to add a security exception in your web browser.

In Firefox, click Advanced and click “Accept the risk and Continue“
In Google Chrome, click Proceed to your-server-ip(unsafe) .

Switching to PHP8.0 in the Admin Panel
To make the default virtual host use PHP8.0, first we need to enable PHP8.0 at the server live.  Go to Server Configuration -> External App, and click the + button to add a new external app.

***

Select LiteSpeed SAPI App as the type and click the Next button.

***

Enter the following information:
```
Name: lsphp8.0
Address: uds://tmp/lshttpd/lsphp80.sock
Max Connections: 10
Environment: PHP_LSAPI_CHILDREN=10
LSAPI_AVOID_FORK=200M
Initial Request Timeout (secs): 60
Retry Timeout (secs): 0
Persistent Connection: Yes
Response Buffering: No
Command: lsphp80/bin/lsphp
Backlog: 100
Instances: 1
Priority: 0
Memory Soft Limit (bytes): 2047M
Memory Hard Limit (bytes): 2047M
Process Soft Limit: 1400
Process Hard Limit: 1500
```
Save the settings. Then go to Virtual Hosts -> Example ->  Script Handler tab and click the + button to add a new script handler.

***

Enter the following information:
```
Suffixes: php
Handler Type: LiteSpeed SAPI
Handler Name: lsphp8.0
```
Save the settings. Then click the Graceful Restart button at the upper-left corner for the changes to take effect. Now enter server-ip-address/phpinfo.php in the browser address bar to test PHP with OpenLiteSpeed Web server. You should see that the default virtual host is now using PHP8.0.
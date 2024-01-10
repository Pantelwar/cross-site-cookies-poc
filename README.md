# Cross Site Cookies POC

This application contains POC for setting and getting cookies across different subdomains.

Note: This application is also tested on Safari with Prevent Cross-Site Tracking enabled.

## Hosts file

Add the following lines to your /etc/hosts file

```
127.0.0.1	 auth.testing.com
127.0.0.1	 app.testing.com
```

## Starting servers

Run the following commands to start the servers

```
yarn start-app
```

```
yarn start-auth
```

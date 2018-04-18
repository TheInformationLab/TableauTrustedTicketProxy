# Tableau Trusted Ticket Proxy
## Description
Node JS Proxy for Tableau Server Trusted Ticket authentication allowing application servers with dynamic IP addresses to use Trusted Ticket authentication
## Install
1. Requires NodeJS (created using v6.14.1)
2. Clone repo `git clone https://github.com/TheInformationLab/TableauTrustedTicketProxy.git`
3. Navigate to directory `cd TableauTruestedTicketProxy`
4. Install dependencies `npm install --save`
5. Start server `npm run start` (I'd recommend using a node process manager such as [PM2](https://github.com/Unitech/pm2) to run your proxy server)
## Configure Tableau Server
Tableau Server needs to trust the proxy server in order to exchange usernames for tickets. For Windows follow [these instructions](https://onlinehelp.tableau.com/current/server/en-us/trusted_auth_trustIP.htm) and on Linux you'll want Step 1 from [this page](http://onlinehelp.tableau.com/current/server-linux/en-us/trusted_auth_config_linux.htm)
##Send a ticket request
The proxy expects a POST request on port 3000 to the path /tableau/login. The request should have an Authorization header containing an encrypted API key which will be used to validate each request. The body is a JSON object containing the Tableau Server URL, username of the account you're logging in, and the IP address of the end-user's machine.

For example using cURL:
```
curl -X POST \
  http://**Proxy URL**:3000/tableau/login \
  -H 'Content-Type: application/json' \
  -H 'authorization: **Encrypted API Key**' \
  -d '{
	"server":"**Tableau Server URL**",
	"username": "**Username**",
	"ip": "**Client IP**"
}'
```

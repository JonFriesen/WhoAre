var	net = require('net');
var dns = require('dns');

module.exports = {
	/*
	*	Get WhoIs Server
	*
	* @param	{String} domain name
	* @return {function(whoIsData)} callback function for whois data
	*/
	you: function(domain, callback)
	{
		// Verify domain exists
		if(!domain || !callback)
		{
			throw new Error('Param 1 must be a domain & Param 2 must be a callback function');
		}
		if(!validateDomain(domain))
		{
			throw new Error('Domain: ' + domain + ' is invalid. Expected name.tld format. Eg. nodejs.org');
		}

		getWhoIs(domain, function(whoIsEntry){
			callback(whoIsEntry);
		});
	}
}

/*
*	Get WhoIs Server
*
* @param	{String} domain name
* @return {function(whoIsData)} callback function for whois data
*/
function getWhoIs(domain, callback)
{
	var server = 'whois.internic.net';
	var host = '';
	var port = 43;
	var tld = getTLD(domain);
	var collectedWhoIsInfo;

	if(tld)
	{
		var server = tld +'.whois-servers.net';

		if(tld === 'tk')
		{
			server = 'whois.dot.tk';
		}


		// Try and find the proper whois server
		getWhoIsServer(server, function(host){
			var whoisInfo = '';
			
			var socket = net.createConnection(port, host, function()
			{
				socket.write(domain + '\r\n', 'ascii');
			});
			socket.setEncoding('ascii');
			
			socket.on('data', function(data)
			{
				whoisInfo = whoisInfo + data;
			}).on('close', function(error)
			{
				if(error)
				{
					collectedWhoIsInfo = 'WHOIS server is not responding, domain is not registered or this TLD has no whois server.';
				}
				else
				{
					collectedWhoIsInfo = whoisInfo;
				}
				callback(collectedWhoIsInfo);
			});
		});
	}
}

/*
*	Get Top Level Domain
*
* @param	{String} domain name
* @return {String} top level domain
*/
function getTLD(domain)
{
	return domain.substring(domain.lastIndexOf( '.' ) + 1);
}

/*
*	Validate Domain Name
*
* @param	{String} domain name
* @return {Boolean} if domain is valid
*/
function validateDomain(domain)
{
	var isValid = new RegExp(/^(([a-zA-Z]{1})|([a-zA-Z]{1}[a-zA-Z]{1})|([a-zA-Z]{1}[0-9]{1})|([0-9]{1}[a-zA-Z]{1})|([a-zA-Z0-9][a-zA-Z0-9-_]{1,61}[a-zA-Z0-9]))\.([a-zA-Z]{2,6}|[a-zA-Z0-9-]{2,30}\.[a-zA-Z]{2,3})$/);
  return isValid.test(domain);
}

/*
*	Get Who Is Server
*
* @param	{String} tld whois server
* @return {String} domain specific whois server
*/
function getWhoIsServer(server, callback)
{
	dns.resolveCname(server, function(err, addresses)
		{	
			var host = '';

			if(!err)
			{
				host = addresses[0];
			}
			else
			{
				host = server;
			}
			callback(host);
		});
}
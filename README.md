# Developer Blog

This is my little personal project.  I wanted a CMS project that I could mess
with and deploy easily- oddly, the deploy part is the hard part.  I wound up
setting this up using [Rancherio](http://rancher.com/) in an AWS instance.
Launching this takes a couple steps-

1. Launch an EC2 instance using the RancherOS AMI.  
2. Create a virtualenv, then `pip install -r requirements.txt`
3. Run `fab blog provision` to install Rancher Server on the machine.
4. Navigate to your server at <public IP>:8080
	* set up access control
	* add a host- you can use Docker-Machine or create a 'custom' host
	on the same ec2 instance as your server.
	* download the rancher-compose executable, get your API info
	* set your AWS credentials and rancher credentials (I like to add them
	to the 'activate' script in my venv
5. Run `rancher-compose create` to create the services
6. Go to your UI and start the services (Not sure how to do this with the
rancher-compose command yet


# text-mate

The backend for an SMS chat bot that you can use to get the weather, and describe images! All without the internet.

# Usage instructions:

1. Sign up for the relevant services. (Bandwidth API platform, Clarifai, Wit.ai, AWS, Heroku, etc.)
2. Create an application, and request a number on the Bandwidth API platform. Also make sure to set the messaging URL to your Heroku instance.
3. Set up an S3 bucket with public access to allow Clarifai to tag images.
4. Train wit.ai with the entities you want to recognize. For example, add intents for weather and train it on sentences like "What is the weather in Raleigh tonight?", "Will I need an umbrella tomorrow?", etc.
5. Clone the code and deploy it to Heroku. (Remember to add all the environment variables.)
6. Once the server has been deployed, send an SMS to your Bandwidth number and you should get a reply with an answer to your query!

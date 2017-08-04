# weather
API to retrieve weather information

# To run app
1. set openweather api key as environment variable- SET API_KEY=<API_KEY> in Windows or EXPORT in *nix
2. set client keys as a comma separated value SET CLIENT_KEYS=key1,key2,...
3. npm start

# To hit endpoint
http://localhost:3000/weather?country=`<country`>&&city=`<city`>&&key=<key>
Example:
http://localhost:3000/weather?city=melbourne&country=au&key=key4

# To run tests
npm run test

# To run coverage report
npm run cover

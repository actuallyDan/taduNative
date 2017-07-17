# Tadu Native

## Progress
* Login & Register (IN PROGRESS)
	* Needs validation (Yo, same amirite?)
* Add All Views 
	* Create Task
	* Display Tasks on Calendar & QuickTasks
	* Update from Modal 
	* Delete
* Alerts (Native or custom?)
	* swal-like
	* Custom (user-menu)
	* Toasts
	* Notifications (Native)
* Profile
	* Update Username
	* Update Profile Pic

#### Setting up development environment
Make sure you have: 
* Node JS & NPM
* Meteor
* Expo App on your mobile device

Clone the Meteor App Repo
```
cd path/to/meteorProjects/ && git clone https://github.com/actuallyDan/tadu
```
Clone the React Native Tadu Repo (this repo)
```
cd path/to/RNProjects/ && git clone https://github.com/actuallyDan/taduNative
```
Then, in the new taduNative repo, get all the relevant npm packages
```
npm install
```
#### Running in development
In one terminal:
```
cd path/to/meteor/tadu && meteor
```
And in another:
```
cd path/to/reactNative/taduNative && npm start
```

Use the QR code reader from the Expo app to run the app on your device. 
Be sure to update the url property of the ddp connection object in App.js to reflect your current IP that is serving the meteor application
#### Getting and Setting User Information
User Object gets saved in AsyncStorage (functions similarly to HTML localstorage)

```javascript
import store from 'react-native-simple-store';
// See : https://www.npmjs.com/package/ddp-client
let user = {
			username: "Jimbo",
			password: "password123",
				profile: {
					pic: "base64EncodedGibberishImage",
					bedHour: "12:00",
					tut : {
						'login' : true,
						'schedule' : false,
						'addTasks': false,
					}
				}
			};
// Save User Object to local data
store.save("taduUserObj", JSON.parse(user));

// Get Local Data
let username = JSON.parse(store.get("taduUserObj"))
```
#### Server Methods
At this time, all other data will be fetched as needed from the server.
```javascript
// this.props.ddp represents the client-side server connection 
// On it you can make calls resembling Meteor.call("methods")

...
componentWillMount(){
	// Great place for some asynchronous code
	// Let's simply find a user by their username
	// This method exists in https://github.com/actuallyDan/tadu/server/methods.js

	// First property is corresponding Meteor method
	// Second property is array of values being passed to method (must be array, even if it's only one value)
	this.props.ddp.call("getUserByName", ["RickSanchez69"], (err, res)=>{
		// Callback to handle result of Server
		if(err){
			console.log("We have an error", err);
		} else {
			// Do something with the result, or execute code after the server method has finished successfully
			this.setState({
				rememberThisPerson: res
				})
		}
		});

}
...
```



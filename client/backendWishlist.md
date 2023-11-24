## Backend Wishlist
1. Store user email along with username (I think username would mostly be for display, email for authentication)
2. A route for retrieving whether or not a user with specified email already exists [^1]
3. A few simple instructions on how to get the backend running on our computers so we can test stuff?

[^1]: I called this route 'users/validate' and invisioned it as me being able to send a put req with the user email and then get a bool val back with whether or not that user exists. Any way is fine, I think I just need to be able to check if an email is in use.

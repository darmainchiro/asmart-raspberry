var tokenAji = "cJS4WY-oDqQ:APA91bEKKeKmiqh5uUZ8DP30DZabNsQb1uYua3rtrFh2vfjc5OKCXGVOcUujn3bkxeIaee7RVgaw86nRFJQi7bFNKqyfirlSOa3wfjAxflvjbOtv2u0wNsa0cOY6ychNzyHxoZihN2oO";

var FCM = require('./sendMessage').sendMessageToDevice;
FCM(tokenAji, "Warning on Your Plant", "You must to watering plant");

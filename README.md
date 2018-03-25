# Creating Personal Website
This project is to develop a platform to acquire, store, and display my own & subscribed user data. It is developed as a proof of concept for a local company.
This website contains 3 pages that are independent of each other:
1. Home
2. Power Usage
3. Google ID Finder

## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites
- Google Maps API Key
    - Click the link to obtain your own [API key](https://developers.google.com/maps/documentation/javascript/get-api-key).
    Replace **`[YOUR_API_KEY]`** in the code below with your own API key.
    ```
    <script src="https://maps.googleapis.com/maps/api/js?key=[YOUR_API_KEY]&libraries=places&callback=initMap"
            async defer></script>
    ```

- PHP 5.6.34
    - This website requires PHP v5.6.34 on Linux Environment. You can download it by typing the command below:
    ```
    sudo apt-get install php5.6
    ```

## 1. Home
## 2. Power Usage
## 3. Google IP Finder
There are mainly 3 processes involved in the Google IP Finder tab.
1. Signup
    - By default the signup window is hidden. You can show it by click on the "Signup" button on the top nav bar.
    There are 4 segments in the signup form as described below:
        1. Email
        2. Password
        3. Business Name (only enabled when you select the "No" radio button)
        4. Agree to terms and conditions
    
In order enable the Bootstrap form validation, you must set form class as "needs-validation" and include **`novalidation`** tag (example below):
'''
<form class="needs-validation" id="signup-form" novalidate>
'''
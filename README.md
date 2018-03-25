# Creating Personal Website
This project is to develop a platform to acquire, store, and display my own & subscribed user data. It is developed as a proof of concept for a local company.
This website contains 3 pages that are independent of each other:
1. Home
2. Power Usage
3. Google ID Finder

## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites
1. Google Maps API Key
    - Click the link to obtain your own [API key](https://developers.google.com/maps/documentation/javascript/get-api-key).
    Replace **`[YOUR_API_KEY]`** in the code below with your own API key.
    ```
    <script src="https://maps.googleapis.com/maps/api/js?key=```**`[YOUR_API_KEY]`**```&libraries=places&callback=initMap"
            async defer></script>
    ```

2. PHP 5.6.34
    - This website requires PHP v5.6.34 on Linux Environment. You can download it by typing the command below:
    ```
    sudo apt-get install php5.6
    ```

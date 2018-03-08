var className = "speech-bubble";
var text = "Hi! My name is Byeong. This blog is where I show you useless personal data. Enjoy!";
var div = document.getElementsByClassName(className);
var sentence = "";

/* User-defined function */
var typing = function(text, i, max, interval, func) {
    if (i > max) {
        return;
    }
    // Call the function
    func(i);
    i++;

    // "loop"
    setTimeout(function() {
        typing(text, i, max, interval, func);
    }, interval);
}


typing(text, 0, text.length, 50, function(i){
    eachLetter = text.charAt(i);
    sentence = sentence + eachLetter;
    $('.' + className).text(sentence);
});
var GeRunners = window.GeRunners || {};

(function rideScopeWrapper($) {
    var authToken;
    GeRunners.authToken.then(function setAuthToken(token) {
        if (token) {
            authToken = token;
        } else {
            window.location.href = '/profile.html';
        }
    }).catch(function handleTokenError(error) {
        alert(error);
        window.location.href = '/profile.html';
    });

    // Register click handler for #request button
    $(function onDocReady() {
        $('#infoSubmit').submit(handleSignin);
        $('#signOut').click(function() {
            GeRunners.signOut();
            alert("You have been signed out.");
            window.location = "signin.html";
        });

        GeRunners.authToken.then(function updateAuthMessage(token) {
            if (token) {
                displayUpdate('You are authenticated. Click to see your <a href="#authTokenModal" data-toggle="modal">auth token</a>.');
                $('.authToken').text(token);
            }
        });

        if (!_config.api.invokeUrl) {
            $('#noApiMessage').show();
        }
    });

    function handleSignin(event) {
        event.preventDefault();
        alert("hello");
    }
}(jQuery));
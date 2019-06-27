var GeRunners = window.GeRunners || {};

(function rideScopeWrapper($) {
    var authToken;
    GeRunners.authToken.then(function setAuthToken(token) {
        if (token) {
            authToken = token;
        } else {
            window.location.href = '/signin.html';
        }
    }).catch(function handleTokenError(error) {
        alert(error);
        window.location.href = '/signing.html';
    });
    function recordTime(time, race) {
        $.ajax({
            method: 'POST',
            url: _config.api.invokeUrl + '/race',
            headers: {
                Authorization: authToken
            },
            data: JSON.stringify({
                Time: time,
                Race: race,
            }),
            contentType: 'application/json',
            success: completeRequest,
            error: function ajaxError(jqXHR, textStatus, errorThrown) {
                console.error('Error requesting ride: ', textStatus, ', Details: ', errorThrown);
                console.error('Response: ', jqXHR.responseText);
                alert('An error occured when requesting your unicorn:\n' + jqXHR.responseText);
            }
        });
    }

    function completeRequest(result) {
        var time;
        var race;
        console.log('Response received from API: ', result);
        time = result.Time;
        race = result.Race;

        console.log(time + " | " + race)
    }

    // Register click handler for #request button
    $(function onDocReady() {
        $('#infoSubmit').submit(writeDB);
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

    function writeDB(event) {
        event.preventDefault();
        var time = $('#timeInput').val()
        var race = $('#raceType').val()
        recordTime(time, race);
    }
    function displayUpdate(text) {
        $('#updates').append($('<li>' + text + '</li'));
    }
}(jQuery));
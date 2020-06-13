// POST - REQUEST TO PAY
$(function() {
    var params = {
        // Request parameters
    };

    $.ajax({
            url: "https://sandbox.momodeveloper.mtn.com/collection/v1_0/requesttopay?" + $.param(params),
            beforeSend: function(xhrObj) {
                // Request headers
                xhrObj.setRequestHeader("Authorization", "");
                xhrObj.setRequestHeader("X-Callback-Url", "");
                xhrObj.setRequestHeader("X-Reference-Id", "");
                xhrObj.setRequestHeader("X-Target-Environment", "");
                xhrObj.setRequestHeader("Content-Type", "application/json");
                xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", "{subscription key}");
            },
            type: "POST",
            // Request body
            data: "{body}",
        })
        .done(function(data) {
            alert("success");
        })
        .fail(function() {
            alert("error");
        });
});


/*  
    /requesttopay/{referenceId} - GET
    This operation is used to get the status of a request to pay. 
    X-Reference-Id that was passed in the post is used as reference to the request. 
*/
$(function() {
    var params = {
        // Request parameters
    };

    $.ajax({
            url: "https://sandbox.momodeveloper.mtn.com/collection/v1_0/requesttopay/{referenceId}?" + $.param(params),
            beforeSend: function(xhrObj) {
                // Request headers
                xhrObj.setRequestHeader("Authorization", "");
                xhrObj.setRequestHeader("X-Target-Environment", "");
                xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", "{subscription key}");
            },
            type: "GET",
            // Request body
            data: "{body}",
        })
        .done(function(data) {
            alert("success");
        })
        .fail(function() {
            alert("error");
        });
});


/* 
    /token - POST
    This operation is used to create an access token 
    which can then be used to authorize and authenticate 
    towards the other end-points of the API.
*/
$(function() {
    var params = {
        // Request parameters
    };

    $.ajax({
            url: "https://sandbox.momodeveloper.mtn.com/collection/token/?" + $.param(params),
            beforeSend: function(xhrObj) {
                // Request headers
                xhrObj.setRequestHeader("Authorization", "");
                xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", "{subscription key}");
            },
            type: "POST",
            // Request body
            data: "{body}",
        })
        .done(function(data) {
            alert("success");
        })
        .fail(function() {
            alert("error");
        });
});


/* 
    /v1_0/account/balance - GET
    Get the balance of the account.
*/
$(function() {
    var params = {
        // Request parameters
    };

    $.ajax({
            url: "https://sandbox.momodeveloper.mtn.com/collection/v1_0/account/balance?" + $.param(params),
            beforeSend: function(xhrObj) {
                // Request headers
                xhrObj.setRequestHeader("Authorization", "");
                xhrObj.setRequestHeader("X-Target-Environment", "");
                xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", "{subscription key}");
            },
            type: "GET",
            // Request body
            data: "{body}",
        })
        .done(function(data) {
            alert("success");
        })
        .fail(function() {
            alert("error");
        });
});

/* 
    /v1_0/accountholder/{accountHolderIdType}/{accountHolderId}/active - GET
    Operation is used to check if an account holder is registered and active in the system.
*/
$(function() {
    var params = {
        // Request parameters
    };

    $.ajax({
            url: "https://sandbox.momodeveloper.mtn.com/collection/v1_0/accountholder/{accountHolderIdType}/{accountHolderId}/active?" + $.param(params),
            beforeSend: function(xhrObj) {
                // Request headers
                xhrObj.setRequestHeader("Authorization", "");
                xhrObj.setRequestHeader("X-Target-Environment", "");
                xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", "{subscription key}");
            },
            type: "GET",
            // Request body
            data: "{body}",
        })
        .done(function(data) {
            alert("success");
        })
        .fail(function() {
            alert("error");
        });
});
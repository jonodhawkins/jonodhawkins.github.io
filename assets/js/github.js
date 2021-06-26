$(document).ready(function () {

    // Set GitHub username
    var username = "jonodhawkins";
    var rootURL = "http://api.github.com/";

    rootPane = $("#jh-github-panel");

    var reqURL = formGitHubRepoURL(username) 

    githubRequest = $.ajax({
        url : reqURL,
        cache : false,
        dataType : "jsonp",
        async : true,
        crossDomain : true,
        SameSite : false,
        method : "GET",
        headers : {
            "accept": "application/json",
            "Access-Control-Allow-Origin":"*",
            "Accept": "application/vnd.github.v3+json",
            "Authorization": "token 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"
        }
    }).done(
        function(data) { loadElements(rootPane, data, reqURL) }
    ).fail(
        function(data, status, err) { showErrorMessage(rootPane, data, status, err, reqURL) }
    )

})

// Load Element Function
loadElements = function (rootPane, resp, url) {
    // Get container
    var container = rootPane.find("#content")
    console.log("Response: ")
    console.log(resp.data)
    resp.data.forEach(function(element) {
        var name = element["name"]
        var desc = element["description"]
        var url = element["url"]

        if (name.includes("github.io")) {
            return;
        }

        container.append(`
        <div class="uk-container uk-margin-bottom">
            <div id="jh-github-repo-${name}">
                <h4 class="uk-align-left uk-margin-remove">${name} <a href="${url}" uk-icon="code"></a></h4>
                <span class="jh-github-languages uk-align-right uk-text-meta uk-margin-remove"></span>
            </div>
            <div class="uk-clearfix"></div>
            <p>${desc}</p>
        </div>
        `)

        console.log("Loading languages for "+ name)
        languagesReq = $.ajax({
            url : formGitHubLanguagesURL(element["full_name"]),
            cache : false,
            dataType : "jsonp",
            async : true,
            crossDomain : true,
            SameSite : false,
            method : "GET",
            headers : {
                "accept": "application/json",
                "Access-Control-Allow-Origin":"*",
                "Accept": "application/vnd.github.v3+json",
                "Authorization": "token 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"
            }
        }).done(function(data) {

            count = 0
            for (var key in data.data) {
                console.log("Appending " + key + " to " + "#jh-github-repo-" + name + ".jh-github-languages")
                obj = $("#jh-github-repo-" + name + " > .jh-github-languages");
                obj.append(key)
                count += 1
                if (count < Object.keys(data.data).length) {
                    obj.append(" / ")
                }
            }

        }).fail(function() { console.log("Unable to load language data for " + name)})
    })
}

showErrorMessage = function (rootPane, data, status, err, url) {
    console.log(data)
    rootPane.find("#alertContainer").append(`<div class="uk-alert-danger" uk-alert>
    <a class="uk-alert-close" uk-close></a>
    <p>Could not connect to <a href="${url}">${url} (${status})</a></p>
</div>`)
}

formGitHubRepoURL = function(user) {
    return "https://api.github.com/users/" + user + "/repos"
}

formGitHubLanguagesURL = function(repo_full) {
    return "https://api.github.com/repos/" + repo_full + "/languages"
}
FlowRouter.wait();

document.addEventListener("WebComponentsReady", function() {
    FlowRouter.initialize({
        // hashbang: true
    });

    Tracker.autorun(function() {
        if (Meteor.user()) {
            if (!FlowRouter.current().route.group || FlowRouter.current().route.group.name != "inbox") {
                FlowRouter.go("/inbox");
            }
        } else {

        }
    });
});

FlowRouter.route("/", {
    action: function(p, q) {
        mwcLayout.render("main", {
            body: "user-check"
        });

        switch (FlowRouter.getQueryParam("route")) {
            case "sign-in":
                document.querySelector("#router").sharedElements = {
                    'ripple': document.querySelector("user-check"),
                    'reverse-ripple': document.querySelector("user-check")
                };

                document.querySelector("user-check").selected = 1;
                break;

            case "reset-password":
                document.querySelector("#router").sharedElements = {
                    'ripple': document.querySelector("user-check"),
                    'reverse-ripple': document.querySelector("user-check")
                };

                document.querySelector("user-check").selected = 2;
                break;

            case "sign-up":
                document.querySelector("#router").sharedElements = {
                    'ripple': document.querySelector("user-check"),
                    'reverse-ripple': document.querySelector("user-check")
                };

                document.querySelector("user-check").selected = 3;
                break;

            case "resend-enrollment-email":
                document.querySelector("#router").sharedElements = {
                    'ripple': document.querySelector("user-check"),
                    'reverse-ripple': document.querySelector("user-check")
                };

                document.querySelector("user-check").selected = 4;
                break;
        }
    },
    name: "user-check"
});

FlowRouter.route("/set-password", {
    action: function(p, q) {
        mwcLayout.render("main", {
            body: "set-password"
        });
    },
    name: "set-password"
});

var inbox = FlowRouter.group({
    name: "inbox",
    prefix: "/inbox",
    triggersEnter: [function(context, redirect) {
        if (!Meteor.user()) {
            redirect("/");
        }
    }]
});

inbox.route("/", {
    action: function(p, q) {
        mwcLayout.render("inbox", {
            "add-project": "add-project",
            "layout-inbox": "layout-inbox",
            "search-bar": "search-bar"
        });

        switch (FlowRouter.getQueryParam("route")) {
            case "add-project":
                document.querySelector("add-project").active = true;
                break;

            case "search-bar":
                document.querySelector("search-bar").active = true;

                Meteor.setTimeout(function() {
                    document.querySelector("search-bar #input").focus();
                }, 400);
                break;

            default:
                document.querySelector("add-project").active = false;
                document.querySelector("search-bar").active = false;
                break;
        }
    },
    name: "layout-inbox"
});

inbox.route("/sign-out", {
    action: function(p, q) {
        if (Meteor.status().connected) {
            document.querySelector("#torrent_db").value = [];

            Meteor.logout(function(error) {
                if (error) {
                    console.log(error);
                }
            });

            redirect("/");
        } else {
            document.querySelector("#polymer_toast").toast("server connection required");
        }
    },
    name: "sign-out"
});

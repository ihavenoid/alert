_done = null;

Accounts.onEnrollmentLink(function(token, done) {
    if (Meteor.user()) {
        Meteor.logout();
    }

    Session.set("password_token", token);

    _done = done;
});

Accounts.onResetPasswordLink(function(token, done) {
    if (Meteor.user()) {
        Meteor.logout();
    }

    Session.set("password_token", token);

    _done = done;
});

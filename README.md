# serverless-slack-invite

A single serverless function using the Serverless framework to handle slack invites via POST.

## Features

- a single HTTP POST endpoint to invite new users

## Getting started

Install the serverless-cli.

```bash
$ npm i -g serverless
```

Set the config credentials. This will write a new AWS config file to `~/.aws/credentials`.

```bash
$ serverless config credentials --provider aws --key key_123 --secret secret_123
```

Clone the repo and navigate into it.

```bash
$ git clone git@github.com:stefanjudis/serverless-slack-invite.git
$ cd serverless-slack-invite
```

Deploy it with [an access token](https://get.slack.help/hc/en-us/articles/215770388-Creating-and-regenerating-API-tokens) and your organization sub domain for slack. :tada:

```bash
$ SLACK_TOKEN=slack_token SUB_DOMAIN=slack_subdomain serverless deploy
```

And you're done. The deployment will tell you where your new serverless endpoint will be located.

## Usage via JavaScript

Now that you have the endpoint running in the cloud you can write invite users via XHR.

```javascript
// jQuery is available in this environment
$.post(
  '#{slack_invite_url}',
  { email: this.email.value }
).done( function( data ) {
  try {
    var response = JSON.parse(data.body)

    if ( response.ok ) {
      showSuccess();
    } else {
      showError( response.error );
    }
  } catch( error ) {
    showError();
  }
}).fail( function() {
  showError();
})
```
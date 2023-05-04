# Maintainers Guide

This document describes tools, tasks and workflow that one needs to be familiar
with in order to effectively maintain this project. If you use this package
within your own software as is but don't plan on modifying it, this guide is
**not** for you.

## Tools

All you need to work on this project is a recent version of
[Deno](https://deno.land/)

<details>
  <summary>Note</summary>

- You can set up shell completion by following the
  [Shell Completion](https://deno.land/manual/getting_started/setup_your_environment#shell-completions)
  guidelines.

</details>

## Tasks

### Testing with Deno

In-code tests can be run directly with Deno:

```zsh
deno task test
```

You can also run a test coverage report with:

```zsh
deno task coverage
```

### Testing with a sample app

Sometimes you may need to test out changes in this SDK with a sample app or
project.

A modified SDK version can be used by updating the `deno-slack-connectors`
import url in the app's `import_map.json` file.

> After making changes to your imports, you may need to
> [reload your modules](https://deno.land/manual@v1.29.1/basics/modules/reloading_modules)
> in case they've been cached.

#### Using local changes

To use your own code as the SDK, change the import url to the `src/` directory
of your local `deno-slack-` repo:

```json
{
  "imports": {
    "deno-slack-sdk/": "https://deno.land/x/deno_slack_sdk@1.5.0/",
    "deno-slack-api/": "https://deno.land/x/deno_slack_api@1.5.0/",
    "deno-slack-connectors/": "../../tools/deno-slack-connectors/src/"
  }
}
```

#### With remote changes

To test with changes on a remote repo, commit your intended history to a remote
branch and note the full commit SHA. (e.g.
`fc0a0a1f0722e28fecb7782513d045522d7c0d6f`).

Then in your sample app's `import_map.json` file, replace the `deno-slack-sdk`
import url with:

```json
{
  "imports": {
    "deno-slack-sdk/": "https://raw.githubusercontent.com/slackapi/deno-slack-sdk/<commit-SHA-goes-here>/src/",
    "deno-slack-api/": "https://deno.land/x/deno_slack_api@1.5.0/"
  }
}
```

### Lint and format

The linting and formatting rules are defined in the `deno.jsonc` file, your IDE
can be set up to follow these rules:

1. Refer to the
   [Deno Set Up Your Environment](https://deno.land/manual/getting_started/setup_your_environment)
   guidelines to set up your IDE with the proper plugin.
2. Ensure that the `deno.jsonc` file is set as the configuration file for your
   IDE plugin
   - If you are using VS code
     [this](https://deno.land/manual/references/vscode_deno#using-a-configuration-file)
     is already configured in `.vscode/settings.json`

#### Linting

The list of linting rules can be found in
[the linting deno docs](https://lint.deno.land/). Currently we apply all
recommended rules.

#### Format

The list of format options is defined in the `deno.jsonc` file. They closely
resemble the default values.

### Branches

> Describe any specific branching workflow. For example: `main` is where active
> development occurs. Long running branches named feature branches are
> occasionally created for collaboration on a feature that has a large scope
> (because everyone cannot push commits to another person's open Pull Request)

## Everything else

When in doubt, find the other maintainers and ask.

[semver]: http://semver.org/
---
title: git
---

## Stash

 - Untracked files: `git stash -u`

## LFS

Needs LFS plugin installed `git lfs install`.

 - Fetch all lfs files `git lfs fetch --all`.


## Profiles

If you regularly use multiple remote git servers for multiple repositories setting up the configuration
for each new repository can be a pain (specifically, the `user.email` and `user.name`).

If you haven't set these before a `git commit` you'll probably be prompted with the following

```bash
$ git commit -m "Add readme"
Author identity unknown

*** Please tell me who you are.

Run

  git config --global user.email "you@example.com"
  git config --global user.name "Your Name"

to set your account's default identity.
Omit --global to set the identity only in this repository.
```

You can set these once for each remote using git profile configurations in your use git configuration.

Under `/home/<user>/.gitconfig` add an `[includeIf ...]` for each remote. For example

```text
[includeIf "hasconfig:remote.*.url:git@git.private.uk:*/**"]
  path = ~/.gitconfig_profiles/private-gitlab.inc

[includeIf "hasconfig:remote.*.url:git@github.com:*/**"]
  path = ~/.gitconfig_profiles/github.inc
```

You can then specify normal configuration values for each `profile.inc` file you include.

```text
[user]
email=<user>@users.noreply.github.com
name=<username>
```

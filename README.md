# How to

### Respect conventions in your project
- Import files and install necessaries modules
```sh
# add dotfiles in your project
git clone git@github.com:livee/javascript-conventions.git conventions
rsync -av --progress conventions/.* . --exclude .git
rm -rf conventions

# install checkbuild eslint and textlint dependencies
npm i --save-dev check-build eslint@3.18.0 textlint textlint-rule-no-dead-link textlint-rule-no-empty-section textlint-rule-structure

# install eslint-config-airbnb necessaries dependencies
(
  export PKG=eslint-config-airbnb;
  npm info "$PKG@latest" peerDependencies --json | command sed 's/[\{\},]//g ; s/: /@/g' | xargs npm install --save-dev "$PKG@latest"
)
```

- add script in your `package.json` for simplicity
```json
"scripts": {
  "force-readme": "if [ -s './README.md' ]; then echo ''; else echo 'Error: no README.md found or is empty' && exit 1; fi",
  "check": "PATH=$(npm bin):$PATH check-build && eslint -c .eslintrc src/**/*.js && npm run force-readme && textlint -c .textlintrc README.md"
}
```

- use `npm run check` to force conventions on your project

Also, be sure to check `best-practices.md`!

### Configure your editor
###### Sublime Text
```json
{
  "binary_file_patterns": ["node_modules/*", ".git/*"],
  "rulers": 100,
  "word_wrap": true,
  "ensure_newline_at_eof_on_save": true,
  "scroll_past_end": true,
  "show_encoding": true,
  "show_full_path": true,
  "tab_size": 2,
  "translate_tabs_to_spaces": true,
  "trim_trailing_white_space_on_save": true
}
```

### [Bonus] Cool plugins
###### Sublime Text
+ [JSFormat](https://github.com/jdc0589/JsFormat) — Format your JS code
+ [SublimeAllAutocomplete](https://github.com/alienhard/SublimeAllAutocomplete) — Extends the default autocomplete to find matches in all open files
+ [AutoFileName](https://github.com/BoundInCode/AutoFileName) — Autocompletes filenames
+ [DocBlockr](https://github.com/spadgos/sublime-jsdocs) — Simplifies writing DocBlock comments
+ [EditorConfig](https://github.com/sindresorhus/editorconfig-sublime) — Helps developers maintain consistent coding styles between different editors
+ [Emmet](https://github.com/sergeche/emmet-sublime) — The essential toolkit for web-developers
+ [ExpandSelectionToQuotes](https://github.com/kek/sublime-expand-selection-to-quotes) — Expand selection to surrounding quotes
+ [FileRename](https://github.com/brianlow/FileRename) — Rename files from the ST3 command palette


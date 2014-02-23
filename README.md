# config-validator

You too sometimes don't remember if certain config values are still used in your code or after you rename your config properties, you are never sure if you adjusted all your project files?
Welcome to my world! Let's diff your config file structure against occurrences of config access in the project.

# Usage

npm install config-validator
node bin/cmd path/to/config/file.json path/to/project

```
➜  config-validator git:(master) node bin/cmd.js ./config.json ../
++ blah
++ meeh.blah
-- blup
```

Will display all not used config params in green with ++ and all not defined but used config params in red with --.

# Current limitations

- It is currently only possible to detect occurrences of the dot object usages (e.g. config.some.value) but no dynamic access (e.g. config("value"]).

# license

MIT

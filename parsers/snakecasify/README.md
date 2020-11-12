# SNAKECASIFY

## Description

Loop on all tokens and apply snakecase function on the given keys.

## Interface 
```ts
interface parser {
  "name": "snakecasify",
  "options"?: {
    "keys": Array<string>
  }
}
```
### Options
| parameter | Require    | type      | default    | description                                       |
| --------- | ---------- | --------- | ---------- | ------------------------------------------------- |
| `keys`    | optional   | `Array`   | `["name"]` | the list of keys where the function will be apply |
## Usage example 

```json
{
    "name": "snakecasify",
    "options": {
      "keys": ["name"]
    }
}
```

## Types

### input

Array of object with the keys to apply snakecase function

```ts
Array<{[key: string]: any}>
```

### output
```ts
Array<{[key: string]: any}>
```

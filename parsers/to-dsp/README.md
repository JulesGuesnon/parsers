# TO DSP

## Description

Create your whole Design System Package (DSP) easily.

## Interface

```ts
interface x {
  name: 'to-dsp';
  options?: Partial<{
    settings: Partial<{
      name?: string; // The name of the DSP (default: 'Generated by Specify')
      buildStatusLabel?: string; // Build status label (examples : 'dev' | 'released')
      packageVersion?: string; // Version of the DSP package, not the DSP spec
      snippetTriggerPrefix?: string; // Trigger for snippets on components (examples: 'sp-' | 'ex-")
    }>;
    createAssets: boolean; // Defines if you want the assets to be created or not (default: true)
  }>;
}
```

## Options examples

```json
{
  "name": "to-dsp",
  "options": {
    "settings": {
      "name": "My awesome DSP"
    }
  }
}
```

```json
{
  "name": "to-dsp",
  "options": {
    "settings": {
      "name": "My awesome DSP",
      "buildStatusLabel": "beta"
    },
    "createAssets": false
  }
}
```

## Types

### Input

Array of object with at least name, value and type and id

```ts
Array<{
  id: string;
  name: string;
  value: any;
  type: string;
}>
```

### Output

An array of object containing a name and a value. The value is an object containing either an url or a content. This object is considered as a DownloadableFile

```ts
Array<{
  name: string;
  value: {
    content?: string;
    url?: string;
  };
}>
```

## Before / After

### Before

```json
[
  {
    "type": "color",
    "value": {
      "a": 0.96,
      "b": 20,
      "g": 227,
      "r": 122
    },
    "name": "Primary color"
  }
]
```

### Options used on parser

```json
{
  "name": "to-dsp",
  "options": {
    "settings": {
      "name": "My awesome DSP",
      "buildStatusLabel": "test",
      "packageVersion": "0.0.1",
      "snippetTriggerPrefix": "ex-"
    },
    "createAssets": false
  }
}
```

### Result

```json
[
  {
    "name": "data/tokens.json",
    "value": {
      "content":
        "{\n" +
        "    \"dsp_spec_version\": \"0.5.0\",\n" +
        "    \"last_updated_by\": \"Specify\",\n" +
        "    \"last_updated\": \"Wed, 07 Oct 2020 07:58:07 GMT\",\n" +
        "    \"entities\": [\n" +
        "        {\n" +
        "            \"class\": \"token\",\n" +
        "            \"type\": \"color\",\n" +
        "            \"id\": \"96218bbe-0948-4822-a03d-1aa9ea2abe4d\",\n" +
        "            \"name\": \"heuristic cross-platform quantify\",\n" +
        "            \"value\": \"#330f6399\",\n" +
        "            \"tags\": [\n" +
        "                \"specify\",\n" +
        "                \"color\"\n" +
        "            ]\n" +
        "        },\n" +
        "    }\n" +
        "}"
    }
  },
  {
    "name": "data/components.json",
    "value": {
      "content":
        "{\n" +
        "    \"dsp_spec_version\": \"0.5.0\",\n" +
        "    \"last_updated_by\": \"Specify\",\n" +
        "    \"last_updated\": \"Wed, 07 Oct 2020 08:04:22 GMT\",\n" +
        "    \"entities\": []\n" +
        "}"
    }
  },
  {
    "name": "data/fonts.json",
    "value": {
      "content":
        "{\n" +
        "    \"dsp_spec_version\": \"0.5.0\",\n" +
        "    \"last_updated_by\": \"Specify\",\n" +
        "    \"last_updated\": \"Wed, 07 Oct 2020 08:04:22 GMT\",\n" +
        "    \"entities\": []\n" +
        "}"
    }
  },
  {
    "name": "data/docs.json",
    "value": {
      "content":
        "{\n" +
        "    \"dsp_spec_version\": \"0.5.0\",\n" +
        "    \"last_updated_by\": \"Specify\",\n" +
        "    \"last_updated\": \"Wed, 07 Oct 2020 08:04:22 GMT\",\n" +
        "    \"entities\": []\n" +
        "}"
    }
  },
  {
    "name": "dsp.json",
    "value": {
      "content":
        "{\n" +
        "    \"dsp_spec_version\": \"0.5.0\",\n" +
        "    \"last_updated_by\": \"Specify\",\n" +
        "    \"last_updated\": \"Wed, 07 Oct 2020 08:02:10 GMT\",\n" +
        "    \"import\": [\n" +
        "        {\n" +
        "            \"src\": \"data/tokens.json.json\"\n" +
        "        },\n" +
        "        {\n" +
        "            \"src\": \"data/components.json.json\"\n" +
        "        },\n" +
        "        {\n" +
        "            \"src\": \"data/fonts.json.json\"\n" +
        "        },\n" +
        "        {\n" +
        "            \"src\": \"data/docs.json.json\"\n" +
        "        }\n" +
        "    ],\n" +
        "    \"settings\": {\n" +
        "        \"name\": \"My DSP\",\n" +
        "        \"build_status_label\": \"test\",\n" +
        "        \"package_version\": \"0.0.1\",\n" +
        "        \"snippet_trigger_prefix\": \"ex-\"\n" +
        "    }\n" +
        "}"
    }
  }
]
```

import { DownloadableFile, Token, DspEntity, DspJson, DspParserSettings } from '../../types';
import * as TokensClass from './tokens';

export type InputDataType = Array<
  Pick<Token, 'name' | 'value' | 'type' | 'id'> & Record<string, any>
>;
export type OutputDataType = Promise<Array<DownloadableFile>>;

export type OptionsType =
  | Partial<{
      settings: Partial<DspParserSettings>;
      createAssets: boolean;
    }>
  | undefined;

export async function createAssetsFiles(tokens: InputDataType): OutputDataType {
  const assetsTypes = ['vector', 'bitmap'];

  const filteredTokens = tokens.filter(token => assetsTypes.includes(token.type));

  if (!filteredTokens.length) {
    return [];
  }

  return await Promise.all(
    filteredTokens.map(
      async (token): Promise<DownloadableFile> => {
        const instance = new (<any>TokensClass)[
          `${token.type.charAt(0).toUpperCase() + token.type.slice(1)}`
        ](token);

        return instance.toDspAssets();
      },
    ),
  );
}

export default async function (tokens: InputDataType, options: OptionsType): OutputDataType {
  const sharedHeaders = {
    dsp_spec_version: '0.5.0',
    last_updated_by: 'Specify',
    last_updated: new Date().toISOString(),
  };

  const defaultSettings = {
    name: 'Generated by Specify',
    build_status_label: 'released',
    package_version: '1.0.0',
    snippet_trigger_prefix: 'sp-',
  };

  const filesToCreateForTokenTypes = {
    tokens: [
      'bitmap',
      'border',
      'color',
      'depth',
      'duration',
      'gradient',
      'measurement',
      'opacity',
      'shadow',
      'vector',
    ],
    components: [],
    fonts: [],
    docs: [],
  };

  const filesToCreate = await Object.entries(filesToCreateForTokenTypes).reduce(
    async (accPromise, [fileName, types]) => {
      const acc = await accPromise;
      const entities = tokens
        .filter(token => (types.length ? (types as Array<string>).includes(token.type) : false))
        .map(
          (token): DspEntity => {
            const instance = new (<any>TokensClass)[
              `${token.type.charAt(0).toUpperCase() + token.type.slice(1)}`
            ](token);

            return instance.toDsp();
          },
        );

      return [
        ...acc,
        {
          name: `data/${fileName}.json`,
          value: {
            content: JSON.stringify(
              {
                ...sharedHeaders,
                entities,
              },
              null,
              4,
            ),
          },
        },
      ];
    },
    Promise.resolve([] as Array<DownloadableFile>),
  );

  const dspJson: DspJson = {
    ...sharedHeaders,
    import: filesToCreate.map(file => ({ src: file.name })),
    settings: defaultSettings,
  };

  if (options && options.settings) {
    dspJson.settings = {
      name: options.settings.name || defaultSettings.name,
      build_status_label: options.settings.buildStatusLabel || defaultSettings.build_status_label,
      package_version: options.settings.packageVersion || defaultSettings.package_version,
      snippet_trigger_prefix:
        options.settings.snippetTriggerPrefix || defaultSettings.snippet_trigger_prefix,
    };
  }

  // Create assets needed for dsp
  const assetsFiles =
    options?.createAssets === undefined || options.createAssets
      ? await createAssetsFiles(tokens)
      : [];

  return [
    ...filesToCreate,
    {
      name: 'dsp.json',
      value: {
        content: JSON.stringify(dspJson, null, 4),
      },
    },
    ...assetsFiles,
  ];
}

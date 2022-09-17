import { versionBetaToCode, versionCodeToCodeBeta, versionPureToCode } from './utils';

export const readVersion = contents => {
  const version = contents.split('versionName "')[1].split('"')[0];
  return version;
};

export const writeVersion = (contents, version) => {
  const [versionPure, versionBeta] = version.split('-');
  const newContent = contents.replace(
    /(.*(?:versionName[ \t]+).*)/g,
    `\t\tversionName "${versionPure}"`
  );
  let versionCode = versionPureToCode(versionPure);
  let versionCodeBeta = versionBetaToCode(versionBeta);
  const versionCodeFinal = versionCodeToCodeBeta(versionCode, versionCodeBeta);
  const finalContent = newContent.replace(
    /(.*(?:versionCode[ \t]+).*)/g,
    `\t\tversionCode ${versionCodeFinal}`
  );
  return finalContent;
};

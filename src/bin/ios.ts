import { versionBetaToCode, versionCodeToCodeBeta, versionPureToCode } from './utils';

export const readVersion = contents => {
  const marketingVersionString = contents.match(/MARKETING_VERSION = [0-9]*.[0-9]*.[0-9]*/);
  const version = marketingVersionString.toString().split('=')[1].trim();
  return version;
};

export const writeVersion = (contents, version) => {
  const [versionPure, versionBeta] = version.split('-');
  const newContent = contents.replace(
    /(.*(?:MARKETING_VERSION[ \t]+).*)/g,
    `\t\t\t\tMARKETING_VERSION = ${versionPure};`
  );
  let versionCode = versionPureToCode(versionPure);
  let versionCodeBeta = versionBetaToCode(versionBeta);
  const versionCodeFinal = versionCodeToCodeBeta(versionCode, versionCodeBeta);
  const finalContent = newContent.replace(
    /(.*(?:CURRENT_PROJECT_VERSION[ \t]+).*)/g,
    `\t\t\t\tCURRENT_PROJECT_VERSION = ${versionCodeFinal};`
  );
  return finalContent;
};

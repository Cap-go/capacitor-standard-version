import { versionBetaToCode, versionCodeToCodeBeta, versionPureToCode } from './utils';

const regexM = /MARKETING_VERSION\s=\s(.*);/g;
const regexC = /CURRENT_PROJECT_VERSION\s=\s(.*);/g;
export function readVersion(contents) {
  const marketingVersionString = contents.match(regexM);
  const version = marketingVersionString.replace(regexM, '$1');
  return version;
}

export function writeVersion(contents, version) {
  const [versionPure, versionBeta] = version.split('-');
  const newContent = contents.replace(regexM, `MARKETING_VERSION = ${versionPure};`);
  let versionCode = versionPureToCode(versionPure);
  let versionCodeBeta = versionBetaToCode(versionBeta);
  const versionCodeFinal = versionCodeToCodeBeta(versionCode, versionCodeBeta);
  const finalContent = newContent.replace(regexC, `CURRENT_PROJECT_VERSION = ${versionCodeFinal};`);
  return finalContent;
}

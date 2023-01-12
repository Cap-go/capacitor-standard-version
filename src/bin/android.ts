import { versionBetaToCode, versionCodeToCodeBeta, versionPureToCode } from './utils';

const regexM = /versionName\s"(.*)"$/g;
const regexC = /versionCode\s(.*)$/g;
export const readVersion = contents => {
  const vString = contents.match(regexM);
  const version = vString && vString[0] ? vString.replace(regexM, '$1') : null;
  return version;
};

export const writeVersion = (contents, version) => {
  const [versionPure, versionBeta] = version.split('-');
  const newContent = contents.replace(regexM, `versionName "${versionPure}"`);
  let versionCode = versionPureToCode(versionPure);
  let versionCodeBeta = versionBetaToCode(versionBeta);
  const versionCodeFinal = versionCodeToCodeBeta(versionCode, versionCodeBeta);
  const finalContent = newContent.replace(regexC, `versionCode ${versionCodeFinal}`);
  return finalContent;
};

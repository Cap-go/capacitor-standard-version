import { versionBetaToCode, versionCodeToCodeBeta, versionPureToCode } from './utils';

const regexM = /versionName "(.*)"\n/g;
const regexC = /versionCode (.*)\n/g;
export const readVersion = contents => {
  const vString = contents.match(regexM);
  const version = vString && vString[0] ? vString[0].replace(regexM, '$1') : null;
  return version;
};

export const writeVersion = (contents, version) => {
  const [versionPure, versionBeta] = version.split('-');
  const newContent = contents.replace(regexM, `versionName "${versionPure}"\n`);
  let versionCode = versionPureToCode(versionPure);
  let versionCodeBeta = versionBetaToCode(versionBeta);
  const versionCodeFinal = versionCodeToCodeBeta(versionCode, versionCodeBeta);
  const finalContent = newContent.replace(regexC, `versionCode ${versionCodeFinal}\n`);
  return finalContent;
};

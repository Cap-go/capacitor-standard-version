export const readVersion = contents => {
  const version = contents.split('versionName "')[1].split('"')[0];
  return version;
};

export const writeVersion = (contents, version) => {
  const [versionPure, versionBata] = version.split('-');
  const newContent = contents.replace(
    /(.*(?:versionName[ \t]+).*)/g,
    `\t\tversionName "${versionPure}"`
  );
  let versionCode = Number(
    versionPure
      .split('.')
      .map(v => (v.length === 1 ? `0${v}` : v))
      .join('')
  );
  const versionCodeBeta = Number(versionBata);
  if (versionCodeBeta < 100) {
    versionCode = versionCode * 100 + versionCodeBeta;
  } else {
    versionCode += versionCodeBeta;
  }
  const finalContent = newContent.replace(
    /(.*(?:versionCode[ \t]+).*)/g,
    `\t\tversionCode ${versionCode}`
  );
  return finalContent;
};

export const readVersion = contents => {
  const marketingVersionString = contents.match(/MARKETING_VERSION = [0-9]*.[0-9]*.[0-9]*/);
  const version = marketingVersionString.toString().split('=')[1].trim();
  return version;
};

export const writeVersion = (contents, version) => {
  const [versionPure, versionBata] = version.split('-');
  const newContent = contents.replace(
    /(.*(?:MARKETING_VERSION[ \t]+).*)/g,
    `\t\t\t\tMARKETING_VERSION = "${versionPure}";`
  );
  let versionCode = Number(
    versionPure
      .split('.')
      .map(v => (v.length === 1 ? `0${v}` : v))
      .join('')
  );
  if (versionBata) {
    const versionCodeBeta = Number(versionBata.split('.')[1]);
    if (versionCodeBeta < 100) {
      versionCode = versionCode * 100 + versionCodeBeta;
    } else {
      versionCode += versionCodeBeta;
    }
  }
  const finalContent = newContent.replace(
    /(.*(?:CURRENT_PROJECT_VERSION[ \t]+).*)/g,
    `\t\t\t\tCURRENT_PROJECT_VERSION = "${versionCode}";`
  );
  return finalContent;
};

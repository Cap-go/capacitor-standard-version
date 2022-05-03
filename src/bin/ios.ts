export const readVersion = (contents) => {
    const marketingVersionString = contents.match(/MARKETING_VERSION = [0-9]*.[0-9]*.[0-9]*/)
    const version = marketingVersionString.toString().split('=')[1].trim()
    return version
}

export const writeVersion = (contents, version) => {
    const versionPure = version.split('-')[0]
    const newContent = contents.replace(/(.*(?:MARKETING_VERSION[ \t]+).*)/g, `\t\t\t\tMARKETING_VERSION = "${versionPure}";`)
    let versionCode = Number(version.replace(/-.*?\./g, '').split('.').map(v => v.length === 1 ? `0${v}` : v).join(''))
    if (versionCode < 1000000) {
        versionCode *= 100
    }
    const finalContent = newContent
        .replace(/(.*(?:CURRENT_PROJECT_VERSION[ \t]+).*)/g, `\t\t\t\tCURRENT_PROJECT_VERSION = "${versionPure}";`)
    return finalContent
}

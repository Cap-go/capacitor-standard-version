export const readVersion = (contents) => {
    const version = contents.split('versionName "')[1].split('"')[0]
    return version
}

export const writeVersion = (contents, version) => {
    const versionPure = version.split('-')[0]
    const newContent = contents.replace(/(.*(?:versionName[ \t]+).*)/g, `\t\tversionName "${versionPure}"`)
    let versionCode = Number(version.replace(/-.*?\./g, '').split('.').map(v => v.length === 1 ? `0${v}` : v).join(''))
    if (versionCode < 1000000) {
        versionCode *= 100
    }
    const finalContent = newContent.replace(/(.*(?:versionCode[ \t]+).*)/g, `\t\tversionCode ${versionCode}`)
    return finalContent
}

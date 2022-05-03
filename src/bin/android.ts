export const readVersion = (contents) => {
    const version = contents.split('versionName "')[1].split('"')[0]
    return version
}

export const writeVersion = (contents, version) => {
    const newContent = contents.replace(/(.*(?:versionName[ \t]+).*)/g, `        versionName "${version}"`)
    const versionCode = Number(version.split('.').map(v => v.length === 1 ? `0${v}` : v).join('').replace(/\D/g, ''))
    const finalContent = newContent.replace(/(.*(?:versionCode[ \t]+).*)/g, `        versionCode ${versionCode}`)
    return finalContent
}

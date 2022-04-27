const standardVersion = require('standard-version');
const { getConfiguration } = require('standard-version/lib/configuration');
const merge = require('merge-deep');

const baseConfig = {
    noVerify: true,
    tagPrefix: '',
    releaseCommitMessageFormat: "chore(release): {{currentTag}} [skip ci]",
    packageFiles: [
        {
            filename: "./package.json",
            type: "json"
        },
    ],
    bumpFiles: [
        {
            filename: "./android/app/build.gradle",
            updater: require('./android-version-updater.js')
        },
        {
            filename: "./package.json",
            type: "json"
        },
        {
            filename: "./package-lock.json",
            type: "json"
        },
        {
            filename: "./ios/App/App.xcodeproj/project.pbxproj",
            updater: require('./ios-version-updater.js')
        }
    ]
}

async function run() {
  try {
    const config = getConfiguration();
    // merge base config with user config
    const finalConfig = merge(baseConfig, config);
    await standardVersion(finalConfig);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

run();
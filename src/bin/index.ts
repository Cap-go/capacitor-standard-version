import standardVersion from 'standard-version';
import { getConfiguration } from 'standard-version/lib/configuration';
import merge from 'merge-deep';
import * as ios from './ios';
import * as android from './android';

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
      updater: android
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
      updater: ios
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
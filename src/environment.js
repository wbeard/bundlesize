let environment;

// Use CircleCi's env variables if detected.
// See https://circleci.com/docs/1.0/environment-variables/ for reference.
if (process.env.CIRCLECI) {
  environment = {
    repo: `${process.env.CIRCLE_PROJECT_USERNAME}/${process.env.CIRCLE_PROJECT_REPONAME}`,
    token: process.env.github_token || process.env.GITHUB_TOKEN,
    // Circle doesn't have the EVENT_TYPE information so we default to 'pull_request'.
    event_type: 'pull_request',
    sha: process.env.CIRCLE_SHA1,
    branch: process.env.CIRCLE_BRANCH
  };
} else if (process.env.JENKINS_HOME) {
  if (process.env.BUILD_CAUSE_GHPRBCAUSE) {
    environment = {
      repo: process.env.ghprbGhRepository,
      token: process.env.GITHUB_TOKEN,
      event_type: 'pull_request',
      sha: process.env.ghprbActualCommit,
      branch: process.env.ghprbSourceBranch
    };
  }
} else {
  // Default to travis
  // See https://docs.travis-ci.com/user/environment-variables/ for reference.
  environment = {
    repo: process.env.TRAVIS_REPO_SLUG,
    token: process.env.github_token || process.env.GITHUB_TOKEN,
    event_type: process.env.TRAVIS_EVENT_TYPE,
    sha: process.env.TRAVIS_PULL_REQUEST_SHA || process.env.TRAVIS_COMMIT,
    branch: process.env.TRAVIS_EVENT_TYPE === 'push'
      ? process.env.TRAVIS_BRANCH
      : process.env.TRAVIS_PULL_REQUEST_BRANCH
  };
}

console.log('ENVIRONMENT >>>>>>>>>>>>>>>>>', environment);

module.exports = environment;

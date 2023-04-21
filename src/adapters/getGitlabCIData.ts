export async function getGitlabCIData(): Promise<Build> {
  const author = process.env.CI_COMMIT_AUTHOR
  const branch = process.env.CI_COMMIT_BRANCH || process.env.CI_COMMIT_REF_NAME
  const commitHash = process.env.CI_COMMIT_SHA
  const mergeRequestId = process.env.CI_MERGE_REQUEST_IID

  return {
    author,
    branch,
    commitHash,
    ...(mergeRequestId && {pullRequestId: mergeRequestId})
  }
}

// $ echo "commit author ${CI_COMMIT_AUTHOR}"
// commit author rafa moral <rafamp89@gmail.com>
// $ echo "commit ref is ${CI_COMMIT_REF_NAME}"
// commit ref is ci-check
// $ echo "commit sha is ${CI_COMMIT_SHA}"
// commit sha is 6f94b2564e959e4e77be82e42fa86244c0a3d5f2
// $ echo "MR ID internal is ${CI_MERGE_REQUEST_IID}"
// MR ID internal is 151
// $ echo "host is ${CI_SERVER_HOST}"
// host is git.naspersclassifieds.com
// $ echo "project is ${GITLAB_CI}"
// project is true

// $ echo "commit author ${CI_COMMIT_AUTHOR}"
// commit author rafa moral <rafamp89@gmail.com>
// $ echo "commit ref is ${CI_COMMIT_REF_NAME}"
// commit ref is ci-test
// $ echo "commit branch ${CI_COMMIT_BRANCH}"
// commit branch ci-test
// $ echo "commit sha is ${CI_COMMIT_SHA}"
// commit sha is 5da0e95bc0fd2cffcc1fef19b41dd430775f3fc8
// $ echo "MR ID internal is ${CI_MERGE_REQUEST_IID}"
// MR ID internal is
// $ echo "host is ${CI_SERVER_HOST}"
// host is git.naspersclassifieds.com
// $ echo "project is ${GITLAB_CI}"
// project is true

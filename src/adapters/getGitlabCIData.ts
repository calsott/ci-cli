export async function getGitlabCIData(): Promise<Build> {
  const author = process.env.GITLAB_USER_EMAIL
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

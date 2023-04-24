export function getTagsFromBuild(build: Build) {
  if (!build) return []

  const {commitHash, branch} = build
  const commitTag = commitHash && `commit:${commitHash}`
  const branchTag = branch && `branch:${branch}`

  // Enable pullRequestId tag only if it's a pull request

  return [branchTag, commitTag].filter(Boolean)
}

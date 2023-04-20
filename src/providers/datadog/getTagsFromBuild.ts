export function getTagsFromBuild(build: Build) {
  if (!build) return []

  const {commitHash, branch} = build
  const commitTag = commitHash && `commit:${commitHash}`
  const branchTag = branch && `branch:${branch}`

  return [branchTag, commitTag].filter(Boolean)
}

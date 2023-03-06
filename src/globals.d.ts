/* eslint-disable no-unused-vars */

interface Build {
  ancestorCommittedAt?: string
  ancestorHash?: string
  author: string
  avatarUrl?: string
  branch: string
  commitHash: string
  commitMessage: string
  committedAt: string
  externalBuildUrl: string
  name: string
  runAt: string
}

type StartParams = {
  rcFilePath?: string
  token: string
}

type TraceParams = {
  data: any
  token: string
}

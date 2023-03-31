/* eslint-disable no-unused-vars */

interface Build {
  author: string
  branch: string
  commitHash: string
}

type StartParams = {
  rcFilePath?: string
  token: string
}

type TraceParams = {
  data: any
  token: string
}

const execa = require('execa')

type RunLighhouseParams = {
  url: string
}

export async function runLighhouse({url}: RunLighhouseParams) {
  try {
    const {stdout} = await execa('npx', [
      'lighthouse',
      url,
      '--output',
      'json',
      '--output-path',
      // `${new Date().getTime()}.json`,
      'stdout',
      '--skip-audits',
      'screenshot-thumbnails,final-screenshot',
      '--disable-full-page-screenshot',
      '--chrome-flags',
      '"--no-sandbox --headless --disable-gpu"'
    ])
    return stdout
  } catch (error) {
    // TODO: handle error
    return null
  }
}
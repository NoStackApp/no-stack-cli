const fs = require('fs-extra')
// const desiredMode = 0o2775
const options = {
  mode: 0o2775
}

async function makeDir(dirName: string) {
  try {
    await fs.ensureDir(dirName, options)
    // console.log('success creating dirs')
  } catch (err) {
    // tslint:disable-next-line:no-console
    console.error(err)
  }
}

//
// const functionWithPromise = item => { //a function that returns a promise
//   return Promise.resolve('ok')
// }
//
// }

// const getData = async () => {
//   return await Promise.all(list.map(item => anAsyncFunction(item)))
// }

export async function makeDirs(dirList: string[]) {
  await Promise.all(dirList.map(item => makeDir(item)))
}

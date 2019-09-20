import chalk from 'chalk'

import {errorMessage} from '../tools/errorMessage'

// import {logProgress} from './logging'

const execa = require('execa')
const fs = require('fs-extra')
const Listr = require('listr')

const LOGFILE = 'noStackLog.txt'

/*
npm install

 */

/*
const installationList = [
  'apollo-client',
  'react-apollo@2.x',
  'graphql',
  'apollo-link',
  'apollo-cache-inmemory',
  'apollo-fetch',
  'apollo-link-context',
  'apollo-link-http',
  'axios',
  'formik',
  'graphql-tag',
  'jsonwebtoken',
  'react-graph-vis',
  'react-spinkit',
  'styled-components',
  'uuid',
  'no-stack',
]

 */
const installationList = [
  '@apollo/react-common',
  '@apollo/react-components',
  '@apollo/react-hoc',
  '@apollo/react-hooks',
  '@shopify/react-compose',
  'apollo-cache-inmemory',
  'apollo-client',
  'graphql',
  'apollo-link',
  'apollo-fetch',
  'apollo-link-context',
  'apollo-link-http',
  'axios',
  'formik',
  'graphql-tag',
  'jsonwebtoken',
  'react-graph-vis',
  'react-spinkit',
  'styled-components',
  'uuid',
  '@nostack/no-stack',
]

// const listOfCalls = installationList.map((item: string) => {
//     return {
//       title: `install ${item}`,
//       task: async () => {
//         await execa(
//           'npm',
//           ['install', '--prefix', appName, item, '--save']
//         ).catch(
//           (error: any) => {
//             throw new Error(`${chalk.red(`error installing ${item}.`)} You may try installing ${item} directly by running 'npm install --save ${item}' directly and see what messages are reported. Here is the error reported:\n${error}`)
//           }
//         )
//       },
//     }
//   }
// )

export async function createNoStackApp(appName: string) {
  // shell.echo('-ne', '                          (0% installed.  installing react...)\r);
  // cli.action.start('starting installation', {stdout: true})

  // console.log(`listOfCalls: ${JSON.stringify(listOfCalls, null, 2)}`)
  const tasks = new Listr([
    {
      title: 'Run create-react-app',
      task: async () => {
        // shell.exec(`npx create-react-app ${appName} >> ${LOGFILE}`)

        const isAppFolder = await fs.pathExists(appName)

        if (isAppFolder) {
          throw new Error(errorMessage(`a folder for ${appName} already exists. Please choose a different app name`))
        }

        await execa(
          'npx',
          ['create-react-app', appName, `>> ${LOGFILE}`]
        ).catch(
          (error: any) => {
            throw new Error(`${chalk.red('error running create-react-app.')} You may try calling 'create-react-app ${appName}' directly and see what messages are reported. Here is the error reported:\n${error}`)
          }
        )
      }
    },
    {
      title: 'Install Additional Packages Locally...',
      task:  async () => {
        return new Listr(installationList.map((item: string) => {
          return {
            title: item,
            task: async () => {
              await execa(
                'npm',
                ['install', '--prefix', appName, '--save', item]
              ).catch(
                (error: any) => {
                  throw new Error(`${chalk.red(`error installing ${item}.`)} You may try installing ${item} directly by running 'npm install --save ${item}' directly and see what messages are reported. Here is the error reported:\n${error}`)
                }
              )
            },
          }
        }
        ))
      }
    },
    {
      title: 'Confirm Installation',
      task: async () => {
        // shell.exec(`npx create-react-app ${appName} >> ${LOGFILE}`)

        const noStackFile = `${appName}/node_modules/@nostack/no-stack/dist/no-stack.esm.js`
        const isNoStackFile = await fs.pathExists(noStackFile)

        if (!isNoStackFile) {
          throw new Error(errorMessage('no-stack did not install properly.'))
        }

      }
    },

  ])

  // const tasks2 = new Listr(installationList.map((item: string) => {
  //   return {
  //     title: `install ${item}`,
  //     task: async () => {
  //       await execa(
  //           'npm',
  //           ['install', '--prefix', appName, '--save', item]
  //         ).catch(
  //           (error: any) => {
  //             throw new Error(`${chalk.red(`error installing ${item}.`)} You may try installing ${item} directly by running 'npm install --save ${item}' directly and see what messages are reported. Here is the error reported:\n${error}`)
  //           }
  //         )
  //     },
  //   }
  // }
  // ))
  // console.log('about to run tasks')
  // await tasks.run().catch((err: any) => {
  //   console.error(err)
  // })
  // console.log('ran tasks')
  // await tasks2.run().catch((err: any) => {
  //   console.error(err)
  // })
  // return
  //
  // tasks.run().catch(err => {
  //   console.error(err)
  // })
  // logProgress('installing create-react-app... this could take a few minutes...')
  // if (shell.exec(`npx create-react-app ${appName} >> ${LOGFILE}`, {silent: true}).code !== 0) {
  //   throw new Error(errorMessage(`problem installing create-react-app.  You may try calling 'create-react-app ${appName}' directly and see what messages are reported.`))
  // }

  // shell.exec(`mv ${LOGFILE} ${appName}`)
  // console.log('A basic react app was created.  Now we need to add a lot of packages for Apollo.  This will take a while...')
  //
  // shell.cd(appName)
  //
  // installationList.map((packageToInstall: string) => {
  //   logProgress(`Installing ${packageToInstall}...`)
  //   // cli.action.start()
  //   if (shell.exec(`npm install ${packageToInstall} --save >> ../${LOGFILE} 2>&1`).code !== 0) {
  //     console.log(`problem reported installing ${packageToInstall}.  Will see whether fatal...`)
  //     // throw new Error('problem installing material for Apollo.  Please contact NoStack support.')
  //     // shell.exit(1)
  //   }
  // })

  // if (shell.exec(`/home/yisrael/projects/ns-cli/bin/create-no-stack-app "${appName}"`).code !== 0) {
  //   throw new Error('problem installing material for Apollo.  Please contact NoStack support.')
  //   shell.exit(1)
  // }
  // logProgress("Apollo and no-stack packages have been added... installing'...")
  // shell.exec(`jq " .dependencies=$(jq '.dependencies | .["no-stack"]="git+https://github.com/NoStackApp/no-stack.git"' package.json )" package.json | sponge package.json >> ${LOGFILE}`, {silent: true})
  // logProgress("Apollo packages have been added... now adding no-stack and installing'...")

  /*
  # add no-stack
jq " .dependencies=$(jq '.dependencies | .["no-stack"]="git+ssh://git@github.com/NoStackApp/no-stack"' package.json )" package.json | sponge package.json

should create: /home/yisrael/projects/temp/app275/node_modules/no-stack/dist/no-stack.js
   */

  // logProgress("now installing'...")
  // if (shell.exec(`npm install >> ${LOGFILE}`, {silent: true}).code !== 0) {
  //   throw new Error(errorMessage('problem running npm install'))
  // }
  //
  // if (shell.exec(`npm audit fix >> ${LOGFILE}`, {silent: true}).code !== 0) {
  //   throw new Error(errorMessage('problem running npm install'))
  // }
  //
  // if (shell.exec(`npm install >> ${LOGFILE}`, {silent: true}).code !== 0) {
  //   throw new Error(errorMessage('problem running npm install'))
  // }

  // // check for existence of installed files...
  // const noStackInstalled = await fs.pathExists('node_modules/no-stack/dist/no-stack.esm.js')
  //
  // if (!noStackInstalled) {
  //   throw new Error(errorMessage('no-stack.js file not found'))
  // }
  //
  // if (shell.exec(`npm install >> ${LOGFILE}`, {silent: true}).code !== 0) {
  //   throw new Error('problem with the installation.  Please contact NoStack support.')
  //   shell.exit(1)
  // }
  // cli.action.stop() // shows 'starting a process... done'

  return tasks
  // logProgress(`${chalk.green('Installation is complete!')} Run the other utilities to create the full app`)
}

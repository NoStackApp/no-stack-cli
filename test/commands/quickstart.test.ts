import {expect, test} from '@oclif/test'

describe('quickstart', () => {
  test
    .stdout()
    .command(['quickstart'])
    .it('runs hello', ctx => {
      expect(ctx.stdout).to.contain('hello world')
    })

  test
    .stdout()
    .command(['quickstart', '--name', 'jeff'])
    .it('runs hello --name jeff', ctx => {
      expect(ctx.stdout).to.contain('hello jeff')
    })
})

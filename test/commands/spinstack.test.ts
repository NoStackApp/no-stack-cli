import {expect, test} from '@oclif/test'

describe('spinstack', () => {
  test
    .stdout()
    .command(['spinstack'])
    .it('runs hello', ctx => {
      expect(ctx.stdout).to.contain('hello world')
    })

  test
    .stdout()
    .command(['spinstack', '--name', 'jeff'])
    .it('runs hello --name jeff', ctx => {
      expect(ctx.stdout).to.contain('hello jeff')
    })
})

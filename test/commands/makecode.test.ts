import {expect, test} from '@oclif/test'

describe('makecode', () => {
  test
    .stdout()
    .command(['makecode'])
    .it('runs hello', ctx => {
      expect(ctx.stdout).to.contain('no template provided')
    })

  test
    .stdout()
    .command(['makecode', '--template', 'test/testData/sampleTemplate.sh'])
    .it('runs makecode --template test/testData/sampleTemplate.sh', ctx => {
      expect(ctx.stdout).to.contain('"name": "projectSource"')
    })
})

import {expect, test} from '@oclif/test'

describe('makejson', () => {
  test
    .stdout()
    .command(['makejson'])
    .it('runs makejson', ctx => {
      expect(ctx.stdout).to.contain('no template provided')
    })

  test
    .stdout()
    .command(['makejson', '--template', 'test/testData/sampleTemplate.sh'])
    .it('runs makejson --template test/testData/sampleTemplate.sh', ctx => {
      expect(ctx.stdout).to.contain('"name": "projectSource"')
    })
})

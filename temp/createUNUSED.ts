import {Command, flags} from '@oclif/command'

import {getUserInfo} from '../auth/getUserInfo'
import {newUserInfo} from '../auth/newUserInfo'
import {CreateOptions, UserInfo} from '../constants/types'
import {createQuery} from '../createQuery'

export default class Create extends Command {
  static description = 'A general command for creating stack elements.  Warning: not yet maintained.  The bash version was developed and this is planned for the near future...'

  static flags = {
    help: flags.help({char: 'h'}),
    level: flags.string({char: 'l', description: 'level to create'}),
    stack: flags.string({char: 's', description: 'stack'}),
    user: flags.string({char: 'u', description: 'user making request'}),
    parent: flags.string({char: 'p', description: 'the item in the level above for which we will create something on this level'}),
    value: flags.string({char: 'v', description: 'value to create'}),
  }

  static args = []

  async run() {
    const {flags} = this.parse(Create)
    const stack = flags.stack || ''
    const user = flags.user || ''
    const level = flags.level || ''
    const value = flags.value || ''
    const parent = flags.parent || ''

    let userInfo: UserInfo = newUserInfo(user)
    userInfo.stack = stack
    await getUserInfo(userInfo)
    // console.log(`userInfo=${userInfo}`)
    //   {
    //   name: user,
    //   stack,
    //   password: 'letMeIn1!',
    //   refreshToken: 'eyJjdHkiOiJKV1QiLCJlbmMiOiJBMjU2R0NNIiwiYWxnIjoiUlNBLU9BRVAifQ.lZOp5eaK3EAf90eAs4kvJ8H1QZz1IzmszSiRLUtvSWaDCLJyTtrdwweSGe3l0BOjCxfsTh-OcxHINNGyxOKg49dsSFNt41Mu56OicsPHR7isWsV6_xzUUldFeW96bkvJJ2k1XPyafT1Un3g5uCw4Ss0SJ_u5FzmTFJH9Zr7Brren53JroMCUWRn6gm-2qP4svD_vbJJstV-q22IHCawoIFkww7o3bQA2y42jbW-wL0tt6EGjxPYmKq_ghYepQNHoag2EB3Eqrd5VrkqKeMDTRNGQB6_G_3IRovPVITXlm-35NlOBJqcoJctKhgtc2t1b216MQxBFPxL5-9NQhd8j0w.w5RURxDDwfMO0wrA.HMeWO4bulrqxCjZQeMVSyP8mqSMdtiZR3m17NqYGkZTqZ1k5ZrtI1YpbaXTQ9yQNy04RKMW_nnhFHU3Cpo9jO3v7FtWj2T1xNKQ0yH86UENEcSEKiNy4zQ3ovV21o0FZdOPkwuhxd3DQ29ALuzziUHX4GxE3-aI020grHPcJf4_dGQiXIFZ8R_m__fv9VoQ3qiTa8UZzGGCMMfSMsCRhr1gM-uW3hD-yZZHaI_COQHp19t3n2URgdir5TujDGnFFu8tmPslHDFX0l9A7gsGIWEcJNdQoE0_VYLM2iTttn1umVe-saBd1ULNpDw6PSX1HECXK5dBALeuTHGUM2Rx_0HU5bGYdIDhZE_maP2qpdK7ig1Vd-dZUQ5HCroh-EJJt2mmMba1OAwObnwC9Krf5GL2IOUYqNjl2cLP88SHRYubWv6b-wfl88tsMODpFYpPuVRVh-8u-MES1VfqTH9iYoJJ6gk2PmEJjzxY1ouRD7lHK-55xm2GmKSKaxomYnr898kXBk6sLLgkFtKg3qk1IAy1WyezQgzeweBOeebDetHdN-FxGVpjPNcYsNYGOYVyjW1fVhvAEH359G6777Itwp7ehcU7R2PXq1G5j3zOkNbf0qC74uZ8_ZFMYD25EgkwPm7eVfhUmiOUp1WLtq9_mwxhrNq3uV9x-qZlixwOsKh9GDkUry7H4SB76WXuJnKEUevT4-PWS0kasaFuuSFq3FE0ANMIaRuZYmkSn1bPfJXFk12FrlnvZMeSUbPGjqd3Mq-7J9XsmNRJeOXE11H_Us1Q0f8tION-hGlZH7SQhRPwnKKmPj4prhLM0KL9A5qKrPcX_GeuMmef6X6jjYUkXFUz8vMGcWpos-7KWTe5lYbjVT85LqrJProvnmJN-CRi19MMVFgoTxvBvztf6PWTy8RiXyWDQ1KbABu6H-_pYX9Yi0dTPPRApr5H80Sqh1hRLtgiGbL29fFHLSiANAXjek78SBBeVQbewZjZ22MCeuIcD8xOCfHlS7eWI_QGub5I_EkPTdGJba3Y0QkfJCsIs41Gz7PepRumPBH3MT61KBDqJBTJtkQqYcY5UMm4qV6Zq6_C7Mv7Vm9vGA-agqcR-ThN6bcGQ8aTujVqse0QRBzkhovMf6WltoNhs29tIbXGx2EeQ6E-BlBtIso7_3VotdikdpU2r2aUqc6-GJmfoUmAfFlbqfDeXTIBmD-NXG-HiK5CAmWsD7TNjQzwEe2YegxwEE0pu_nFkK_RyV5l3PQ4pbUy1O5jGusnq2x0W6SyPbhjhw8-v_A.drjGajkJSbhyhMnoXIweJQ',
    //   accessToken: 'eyJraWQiOiJyd2N4cjVTXC9TZXlZV0FOMDA0TjVPVjBubUR4MVlocXVqRGRQUkg3MFRZRT0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiI2YTdlZTYxMy1jNjY5LTRmZTUtODZiNy00Y2NhNDIwZmJhZTYiLCJldmVudF9pZCI6ImE3ZWM4MzkwLTNiMDgtNDRhYS1iNWJhLWY1Y2M0ZjQxNzU3OCIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4iLCJhdXRoX3RpbWUiOjE1NjI1ODQ3MDgsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC51cy13ZXN0LTIuYW1hem9uYXdzLmNvbVwvdXMtd2VzdC0yXzZqNHlqeEs1biIsImV4cCI6MTU2MzI4OTE2NywiaWF0IjoxNTYzMjg1NTY3LCJqdGkiOiI4ODhhNGExNS04MDVlLTQ1Y2MtYTNjMi01M2U4MzNhODYyYTgiLCJjbGllbnRfaWQiOiIyZTZzdHM1djV0bmE1bHR2anRnaHV2aG5jdCIsInVzZXJuYW1lIjoiaXJub2xkMTYzIn0.mfFUCHLGbTs0HHNaMvB5xPhi8OnFAWiras6XXi17yxP2xfMIuV8w-TOKc4wvM2Re-PAoRLuNwPyMni1GEHtC-lnnvh2TiRGWK4m_shb492AZa3Ax5vcMl5n43JV_TAJk_SGMIgSQ8Wlq3KCx1X8Avri_M62X5pik2Fs5arM0q0kKJP7cg26IktB1Cdq31nTNEddRNAfq1UHH7PVq93M5SiE6Ho-GjSTCCFCg1TdAfuUZvnKOfKcPrHprj3Gn3_nNxkKkzcX8sVwsqzC5FeWYLjIlHOinteqQwPzNEmz4ydrJy20K9Kw6o7Qqbg31SvXpVcYj8_Q80WQzfSfesmWbr'
    // }

    const options: CreateOptions = {
      level,
      value,
      parent,
      userInfo,
    }

    await createQuery(options)

    // if (args.file && flags.force) {
    //   this.log(`you input --force and --file: ${args.file}`)
    // }
  }
}

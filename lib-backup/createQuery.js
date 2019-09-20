"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const genericApiCall_1 = require("./tools/genericApiCall");
const isRequired_1 = require("./tools/isRequired");
// tslint:disable-next-line:no-http-string
require('dotenv').config({ path: __dirname + '/./../.env' });
// const isDev = process.env.NODE_ENV === 'development'
// console.log(`process.env.LOCAL_SERVER=${process.env.LOCAL_SERVER}`)
// const server: string = isDev ? process.env.LOCAL_SERVER as string : liveServer
// console.log(`server=${server}`)
// const server = 'http://localhost:3000/graphql'
const queryForLevel = {
    userClass: createUserClass,
    user: createUser,
    collection: createCollection,
    source: createSource,
    tree: createTree,
    type: createType,
    constraint: createConstraint,
    selection: createSelection,
    creationAction: createCreationAction,
    updateAction: createUpdateAction,
    instance: createInstance,
};
async function createUserClass(options) {
    console.log(`options=${JSON.stringify(options)}`);
    return true;
}
async function createUser(options) {
    console.log(`options=${JSON.stringify(options)}`);
    return true;
}
async function createCollection(options) {
    console.log(`options=${JSON.stringify(options)}`);
    return true;
}
async function createSource(options) {
    const collectionId = options.parent || isRequired_1.isRequired('parent');
    const sourceName = options.value || isRequired_1.isRequired('value');
    const id = `collection_${collectionId}_source_${sourceName}`;
    const query = `mutation {
    CreateSource(id: "${id}", name: "${sourceName}") {
      id,
        name
    }

    AddSourceCollection(sourceid: "${id}", collectionid: "${collectionId}") {
      id
    }
  }`;
    return query;
}
async function createTree(options) {
    const sourceId = options.parent || isRequired_1.isRequired('parent');
    const treeName = options.value || isRequired_1.isRequired('value');
    const id = `source_${sourceId}_tree_${treeName}`;
    const query = `mutation {
    CreateTree(id: "${id}", name: "${treeName}") {
      id
      name
    }

    AddSourceTree(treeid: "${id}", sourceid: "${sourceId}") {
      id
      tree {
        id
      }
    }
  }`;
    return query;
}
async function createType(options) {
    console.log(`options=${JSON.stringify(options)}`);
    return true;
}
async function createConstraint(options) {
    console.log(`options=${JSON.stringify(options)}`);
    return true;
}
async function createSelection(options) {
    console.log(`options=${JSON.stringify(options)}`);
    return true;
}
async function createCreationAction(options) {
    console.log(`options=${JSON.stringify(options)}`);
    return true;
}
async function createUpdateAction(options) {
    console.log(`options=${JSON.stringify(options)}`);
    return true;
}
async function createInstance(options) {
    console.log(`options=${JSON.stringify(options)}`);
    return true;
}
// async function refreshAccessTokenForUser(userInfo: UserInfo) {
//   // const currentRefreshToken = 'eyJjdHkiOiJKV1QiLCJlbmMiOiJBMjU2R0NNIiwiYWxnIjoiUlNBLU9BRVAifQ.lZOp5eaK3EAf90eAs4kvJ8H1QZz1IzmszSiRLUtvSWaDCLJyTtrdwweSGe3l0BOjCxfsTh-OcxHINNGyxOKg49dsSFNt41Mu56OicsPHR7isWsV6_xzUUldFeW96bkvJJ2k1XPyafT1Un3g5uCw4Ss0SJ_u5FzmTFJH9Zr7Brren53JroMCUWRn6gm-2qP4svD_vbJJstV-q22IHCawoIFkww7o3bQA2y42jbW-wL0tt6EGjxPYmKq_ghYepQNHoag2EB3Eqrd5VrkqKeMDTRNGQB6_G_3IRovPVITXlm-35NlOBJqcoJctKhgtc2t1b216MQxBFPxL5-9NQhd8j0w.w5RURxDDwfMO0wrA.HMeWO4bulrqxCjZQeMVSyP8mqSMdtiZR3m17NqYGkZTqZ1k5ZrtI1YpbaXTQ9yQNy04RKMW_nnhFHU3Cpo9jO3v7FtWj2T1xNKQ0yH86UENEcSEKiNy4zQ3ovV21o0FZdOPkwuhxd3DQ29ALuzziUHX4GxE3-aI020grHPcJf4_dGQiXIFZ8R_m__fv9VoQ3qiTa8UZzGGCMMfSMsCRhr1gM-uW3hD-yZZHaI_COQHp19t3n2URgdir5TujDGnFFu8tmPslHDFX0l9A7gsGIWEcJNdQoE0_VYLM2iTttn1umVe-saBd1ULNpDw6PSX1HECXK5dBALeuTHGUM2Rx_0HU5bGYdIDhZE_maP2qpdK7ig1Vd-dZUQ5HCroh-EJJt2mmMba1OAwObnwC9Krf5GL2IOUYqNjl2cLP88SHRYubWv6b-wfl88tsMODpFYpPuVRVh-8u-MES1VfqTH9iYoJJ6gk2PmEJjzxY1ouRD7lHK-55xm2GmKSKaxomYnr898kXBk6sLLgkFtKg3qk1IAy1WyezQgzeweBOeebDetHdN-FxGVpjPNcYsNYGOYVyjW1fVhvAEH359G6777Itwp7ehcU7R2PXq1G5j3zOkNbf0qC74uZ8_ZFMYD25EgkwPm7eVfhUmiOUp1WLtq9_mwxhrNq3uV9x-qZlixwOsKh9GDkUry7H4SB76WXuJnKEUevT4-PWS0kasaFuuSFq3FE0ANMIaRuZYmkSn1bPfJXFk12FrlnvZMeSUbPGjqd3Mq-7J9XsmNRJeOXE11H_Us1Q0f8tION-hGlZH7SQhRPwnKKmPj4prhLM0KL9A5qKrPcX_GeuMmef6X6jjYUkXFUz8vMGcWpos-7KWTe5lYbjVT85LqrJProvnmJN-CRi19MMVFgoTxvBvztf6PWTy8RiXyWDQ1KbABu6H-_pYX9Yi0dTPPRApr5H80Sqh1hRLtgiGbL29fFHLSiANAXjek78SBBeVQbewZjZ22MCeuIcD8xOCfHlS7eWI_QGub5I_EkPTdGJba3Y0QkfJCsIs41Gz7PepRumPBH3MT61KBDqJBTJtkQqYcY5UMm4qV6Zq6_C7Mv7Vm9vGA-agqcR-ThN6bcGQ8aTujVqse0QRBzkhovMf6WltoNhs29tIbXGx2EeQ6E-BlBtIso7_3VotdikdpU2r2aUqc6-GJmfoUmAfFlbqfDeXTIBmD-NXG-HiK5CAmWsD7TNjQzwEe2YegxwEE0pu_nFkK_RyV5l3PQ4pbUy1O5jGusnq2x0W6SyPbhjhw8-v_A.drjGajkJSbhyhMnoXIweJQ'
//   // const stackId = 'us-west-2_6j4yjxK5n'
//   try {
//     await refreshAccessToken(userInfo)
//   } catch (err) {
//     console.error(err)
//   }
//
//   // console.log(`got to refresh the token for ${user}!!`)
// }
async function createQuery(options) {
    // console.log(`options=${JSON.stringify(options)}`)
    const level = options.level || isRequired_1.isRequired('level');
    // @ts-ignore
    const query = await queryForLevel[level](options);
    // console.log(`query=${query}`)
    await genericApiCall_1.genericApiCall(query, options.userInfo);
}
exports.createQuery = createQuery;

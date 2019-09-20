"use strict";
// import chalk from 'chalk'
Object.defineProperty(exports, "__esModule", { value: true });
// const execa = require('execa')
// const fs = require('fs-extra')
const Listr = require('listr');
const loginUser_1 = require("../auth/loginUser");
// import {genericApiCall} from '../genericApiCall'
const create_stack_query_1 = require("./create-stack-query");
const createModerator_1 = require("./createModerator");
async function createStackAndModerator(userInfo) {
    const tasks = new Listr([
        {
            title: 'Create the moderator account',
            task: async () => {
                await createModerator_1.createModerator(userInfo);
            }
        },
        {
            title: 'Create the new stack',
            task: async () => {
                await create_stack_query_1.createStackQuery(userInfo);
            }
        },
        {
            title: 'Log in the moderator',
            task: async () => {
                await loginUser_1.loginUser(userInfo);
            }
        },
    ]);
    return tasks;
}
exports.createStackAndModerator = createStackAndModerator;

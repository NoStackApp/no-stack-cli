import { UserInfo } from '../constants/types';
export declare function userFilePath(userName: string, stack: string): string;
export declare function getUserInfo(userInfo: UserInfo): Promise<UserInfo>;

export interface UserInfo {
    name: string;
    stack: string;
    stackId: string;
    password: string;
    refreshToken: string;
    accessToken: string;
    email: string;
    id: string;
    licenseId: string;
}
export interface CreateOptions {
    parent: string;
    value: string;
    level: string;
    userInfo: UserInfo;
}
interface PropsInfo {
    queryBody: string;
    typeRelationships: string;
}
export interface TreeTypeChildrenList {
    [type: string]: string;
}
interface TreeTypeList {
    [type: string]: TreeTypeChildrenList;
}
interface ConnectedList {
    [type: string]: string;
}
interface ConstraintInfo {
    constraintType: string;
    type: string;
    value: string;
}
interface ConstraintsSet {
    [type: string]: ConstraintInfo;
}
export interface SourceInfo {
    const: string;
    props: PropsInfo;
    name: string;
    tree: TreeTypeList;
    selections: [];
    constraints: ConstraintsSet;
    connections: ConnectedList;
    owner: string;
    selectionRoot: string;
    id: string;
}
export interface Sources {
    [sourceName: string]: SourceInfo;
}
export interface TypeSourceInfo {
    assnType: string;
    parentType: string;
    children: string[];
}
export interface TypeSources {
    [sourceName: string]: TypeSourceInfo;
}
export interface TypeInfo {
    const: string;
    name: string;
    dataType: string;
    plural: string;
    sources: TypeSources;
    id: string;
}
export interface Types {
    [typeName: string]: TypeInfo;
}
export interface StackMeta {
    stackId: string;
}
export interface ActionInfo {
    const: string;
    actionName: string;
    userClass: string;
    actionType: string;
    type?: string;
    parentType?: string;
    source?: string;
    id: string;
}
export interface Actions {
    [actionKey: string]: ActionInfo;
}
export interface ActionsByActionType {
    [actionType: string]: Actions;
}
export interface StackInfo {
    topSource: string;
    userClasses: object;
    sources: Sources;
    types: Types;
    actions: ActionsByActionType;
    stack: StackMeta;
}
export {};

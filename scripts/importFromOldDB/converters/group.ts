import { CreateGroupInput } from "../libs/API";
import { v4 as uuidv4 } from 'uuid';

export function generateGroup(dd: any): CreateGroupInput {
    const id = uuidv4();
    const result: CreateGroupInput = {
        id: id,
        companyID: dd.companyID?.S,
        no: dd.localID?.S,

        name: dd.name?.S,
    }
    return result
}
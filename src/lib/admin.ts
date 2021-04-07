import { graphqlMutation } from "./dao/common/sdk";
import * as APIt from 'API';
import { updateOwners } from 'graphql/mutations';

export async function updateOwnersMutation() {
    const createR = await graphqlMutation
        <unknown, APIt.UpdateOwnersMutation>
        (updateOwners, {});
    return createR;
    }

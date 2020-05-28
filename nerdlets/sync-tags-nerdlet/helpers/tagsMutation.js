import { TAGS_MUTATION } from './queries';
import { NerdGraphMutation } from 'nr1';

const tagsMutate = (appsToSync) => {
    const mutationPromises = [];
    appsToSync.forEach(app => {
        const variables = {
            guid: app.appGuid,
            tags: Object.keys(app.hostTags).map(key => ({key: key, values: app.hostTags[key]})),
        };
        mutationPromises.push(
            NerdGraphMutation.mutate({
                mutation: TAGS_MUTATION,
                variables,
            })
        );
    });
    // Skip errors. If any promise fails, do not return!
    return Promise.all(mutationPromises.map(p => p.catch(e => `ERROR: ${e}`)));
}

export { tagsMutate };
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlobalStorage = void 0;
const errors_1 = require("./errors");
const queries_1 = require("./queries");
function assertNoErrors(errors) {
    if (errors && errors.length > 0) {
        const { message, extensions: { errorType } } = errors[0];
        throw errors_1.APIError.forErrorCode(errorType, message);
    }
}
async function getResponseBody(response) {
    if (response.status !== 200) {
        throw errors_1.APIError.forStatus(response.status);
    }
    const responseText = await response.text();
    let responseBody;
    try {
        responseBody = JSON.parse(responseText);
    }
    catch (error) {
        throw errors_1.APIError.forUnexpected(`Response text was not a valid JSON: ${responseText}`);
    }
    assertNoErrors(responseBody.errors);
    return responseBody.data;
}
class GlobalStorage {
    constructor(getAppContextAri, apiClient) {
        this.getAppContextAri = getAppContextAri;
        this.apiClient = apiClient;
        this.endpoint = '/forge/entities/graphql';
    }
    doGetAppContextAri() {
        return typeof this.getAppContextAri === 'function' ? this.getAppContextAri() : this.getAppContextAri;
    }
    async get(key) {
        return this.getInternal(key, false);
    }
    async getSecret(key) {
        return this.getInternal(key, true);
    }
    async list(options) {
        const requestBody = process.env.IS_CLEANUP_FUNCTION === 'true'
            ? queries_1.listQueryForCleanup(this.doGetAppContextAri(), options)
            : queries_1.listQuery(this.doGetAppContextAri(), options);
        const response = await this.query(requestBody);
        const edges = process.env.IS_CLEANUP_FUNCTION === 'true'
            ? response.appStoredEntitiesForCleanup.edges
            : response.appStoredEntities.edges;
        const nextCursor = edges.length > 0 ? edges[edges.length - 1].cursor : undefined;
        const results = edges.map(({ node }) => node);
        return {
            results,
            nextCursor
        };
    }
    async set(key, value) {
        const requestBody = queries_1.setQuery(this.doGetAppContextAri(), key, value, false);
        await this.mutation(requestBody, 'setAppStoredEntity');
    }
    async setSecret(key, value) {
        const requestBody = queries_1.setQuery(this.doGetAppContextAri(), key, value, true);
        await this.mutation(requestBody, 'setAppStoredEntity');
    }
    async delete(key) {
        const requestBody = queries_1.deleteQuery(this.doGetAppContextAri(), key, false);
        await this.mutation(requestBody, 'deleteAppStoredEntity');
    }
    async deleteSecret(key) {
        const requestBody = queries_1.deleteQuery(this.doGetAppContextAri(), key, true);
        await this.mutation(requestBody, 'deleteAppStoredEntity');
    }
    async getInternal(key, encrypted) {
        const requestBody = queries_1.getQuery(this.doGetAppContextAri(), key, encrypted);
        const { appStoredEntity: { value } } = await this.query(requestBody);
        return value !== null && value !== void 0 ? value : undefined;
    }
    buildRequest(requestBody) {
        return {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
                'content-type': 'application/json'
            }
        };
    }
    async query(body) {
        const response = await this.apiClient(this.endpoint, this.buildRequest(body));
        return await getResponseBody(response);
    }
    async mutation(body, mutationMethod) {
        const response = await this.apiClient(this.endpoint, this.buildRequest(body));
        const { appStorage: { [mutationMethod]: { success, errors } } } = await getResponseBody(response);
        assertNoErrors(errors);
        if (!success) {
            throw errors_1.APIError.forStatus(500);
        }
        return response;
    }
}
exports.GlobalStorage = GlobalStorage;

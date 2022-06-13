"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteQuery = exports.setQuery = exports.listQueryForCleanup = exports.listQuery = exports.getQuery = void 0;
exports.getQuery = (contextAri, key, encrypted) => ({
    query: `
    query forge_app_getApplicationStorageEntity($contextAri: ID!, $key: ID!, $encrypted: Boolean!) {
      appStoredEntity(contextAri: $contextAri, key: $key, encrypted: $encrypted) {
        key
        value
      }
    }
  `,
    variables: {
        contextAri,
        key,
        encrypted
    }
});
exports.listQuery = (contextAri, options) => {
    var _a, _b, _c;
    return ({
        query: `
    query forge_app_getApplicationStorageEntities($contextAri: ID!, $where: [AppStoredEntityFilter!], $cursor: String, $limit: Int) {
      appStoredEntities(contextAri: $contextAri, where: $where, after: $cursor, first: $limit) {
        edges {
          node {
            value
            key
          }

          cursor
        }
      }
    }
  `,
        variables: {
            contextAri,
            where: (_a = options.where) !== null && _a !== void 0 ? _a : null,
            cursor: (_b = options.cursor) !== null && _b !== void 0 ? _b : null,
            limit: (_c = options.limit) !== null && _c !== void 0 ? _c : null
        }
    });
};
exports.listQueryForCleanup = (contextAri, options) => {
    var _a, _b, _c;
    return ({
        query: `
    query forge_app_getApplicationStorageEntitiesForCleanup($contextAri: ID!, $where: [AppStoredEntityFilter!], $cursor: String, $limit: Int) {
      appStoredEntitiesForCleanup(contextAri: $contextAri, where: $where, after: $cursor, first: $limit) {
        edges {
          node {
            value
            key
          }

          cursor
        }
      }
    }
  `,
        variables: {
            contextAri,
            where: (_a = options.where) !== null && _a !== void 0 ? _a : null,
            cursor: (_b = options.cursor) !== null && _b !== void 0 ? _b : null,
            limit: (_c = options.limit) !== null && _c !== void 0 ? _c : null
        }
    });
};
exports.setQuery = (contextAri, key, value, encrypted) => ({
    query: `
    mutation forge_app_setApplicationStorageEntity($input: SetAppStoredEntityMutationInput!) {
      appStorage{
        setAppStoredEntity(input: $input) {
          success

          errors {
            message
            extensions {
              errorType
            }
          }
        }
      }
    }
  `,
    variables: {
        input: {
            contextAri,
            key,
            value,
            encrypted
        }
    }
});
exports.deleteQuery = (contextAri, key, encrypted) => ({
    query: `
    mutation forge_app_deleteApplicationStorageEntity($input: DeleteAppStoredEntityMutationInput!) {
      appStorage {
        deleteAppStoredEntity(input: $input) {
          success

          errors {
            message
            extensions {
              errorType
            }
          }
        }
      }
    }
  `,
    variables: {
        input: {
            contextAri,
            key,
            encrypted
        }
    }
});

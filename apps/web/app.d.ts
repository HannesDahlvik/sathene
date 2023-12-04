/// <reference types="lucia" />
declare namespace Lucia {
    type Auth = import('@sathene/api').Auth
    type DatabaseUserAttributes = {
        username: string
    }
    type DatabaseSessionAttributes = {}
}

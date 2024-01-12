import { init } from '@paralleldrive/cuid2'

/**
 * Generate a 24 character long cuid2 id
 */
export const createId = init({
    length: 24
})

/**
 * Internal dependencies
 */
import queryManagerSchema from 'wp-calypso-client/lib/query-manager/schema';

export const queriesSchema = {
	type: 'object',
	patternProperties: {
		// Site ID
		'^\\d+$': {
			type: 'object',
			patternProperties: {
				// Taxonomy
				'^[A-Za-z0-9-_]+$': queryManagerSchema,
			},
			additionalProperties: false,
		},
	},
	additionalProperties: false,
};

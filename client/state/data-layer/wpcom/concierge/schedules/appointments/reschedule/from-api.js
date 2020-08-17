/**
 * Internal dependencies
 */
import makeJsonSchemaParser from 'wp-calypso-client/lib/make-json-schema-parser';
import responseSchema from './schema';

export default makeJsonSchemaParser( responseSchema );

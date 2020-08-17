/**
 * Internal dependencies
 */
import makeJsonSchemaParser from 'wp-calypso-client/lib/make-json-schema-parser';
import { parseChartData } from 'wp-calypso-client/state/stats/lists/utils';
import responseSchema from './schema';

export default makeJsonSchemaParser( responseSchema, parseChartData );

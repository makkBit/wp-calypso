/**
 * External dependencies
 */
import { get } from 'lodash';

/**
 * Internal dependencies
 */
import 'wp-calypso-client/state/exporter/init';

export default ( state ) => get( state, 'exporter.mediaExportUrl', null );

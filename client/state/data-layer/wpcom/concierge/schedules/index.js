/**
 * Internal dependencies
 */
import { mergeHandlers } from 'wp-calypso-client/state/action-watchers/utils';
import appointments from './appointments';

import { registerHandlers } from 'wp-calypso-client/state/data-layer/handler-registry';

registerHandlers(
	'state/data-layer/wpcom/concierge/schedules/index.js',
	mergeHandlers( appointments )
);

export default {};

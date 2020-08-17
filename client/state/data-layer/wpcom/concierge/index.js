/**
 * Internal dependencies
 */
import { mergeHandlers } from 'wp-calypso-client/state/action-watchers/utils';
import schedules from './schedules';

import { registerHandlers } from 'wp-calypso-client/state/data-layer/handler-registry';

registerHandlers( 'state/data-layer/wpcom/concierge/index.js', mergeHandlers( schedules ) );

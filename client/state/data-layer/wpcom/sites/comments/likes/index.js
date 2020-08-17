/**
 * Internal dependencies
 */

import mine from './mine';
import newLike from './new';
import { mergeHandlers } from 'wp-calypso-client/state/action-watchers/utils';

import { registerHandlers } from 'wp-calypso-client/state/data-layer/handler-registry';

registerHandlers(
	'state/data-layer/wpcom/sites/comments/likes/index.js',
	mergeHandlers( mine, newLike )
);

export default {};

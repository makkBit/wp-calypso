/**
 * External dependencies
 */
import { noop } from 'lodash';

/**
 * Internal dependencies
 */
import { dispatchRequest } from 'wp-calypso-client/state/data-layer/wpcom-http/utils';
import { http } from 'wp-calypso-client/state/data-layer/wpcom-http/actions';
import { LOGSTASH } from 'wp-calypso-client/state/action-types';

import { registerHandlers } from 'wp-calypso-client/state/data-layer/handler-registry';

const logToLogstash = ( action ) =>
	http( {
		method: 'POST',
		apiVersion: '1.1',
		path: '/logstash',
		body: action.params,
	} );

registerHandlers( 'state/data-layer/wpcom/logstash/index.js', {
	[ LOGSTASH ]: [ dispatchRequest( { fetch: logToLogstash, onSuccess: noop, onError: noop } ) ],
} );

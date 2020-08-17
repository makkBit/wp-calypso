/**
 * External dependencies
 */
import React from 'react';
import page from 'page';
import { translate } from 'i18n-calypso';

/**
 * Internal dependencies
 */
import config from 'wp-calypso-client/config';
import { sidebar } from 'wp-calypso-client/me/controller';
import Happychat from './main';
import { setDocumentHeadTitle } from 'wp-calypso-client/state/document-head/actions';
import { makeLayout, render as clientRender } from 'wp-calypso-client/controller';
import PageViewTracker from 'wp-calypso-client/lib/analytics/page-view-tracker';

const renderChat = ( context, next ) => {
	context.store.dispatch( setDocumentHeadTitle( translate( 'Chat', { textOnly: true } ) ) );
	context.primary = (
		<div>
			<PageViewTracker path="/me/chat" title="Chat" />
			<Happychat />
		</div>
	);
	next();
};

export default () => {
	if ( config.isEnabled( 'happychat' ) ) {
		page( '/me/chat', sidebar, renderChat, makeLayout, clientRender );
	}
};

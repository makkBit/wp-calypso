/**
 * External dependencies
 */

import page from 'page';
import React from 'react';

/**
 * Internal dependencies
 */
import { navigation, siteSelection } from 'wp-calypso-client/my-sites/controller';
import Main from 'wp-calypso-client/components/main';
import { Card } from '@automattic/components';
import SectionHeader from 'wp-calypso-client/components/section-header';
import { makeLayout, render as clientRender } from 'wp-calypso-client/controller';

const render = ( context, next ) => {
	context.primary = (
		<Main className="sensei__main">
			<SectionHeader label="Sensei LMS" />
			<Card>
				<p>This is the start of something great!</p>
				<p>This will be the home for your Sensei integration with WordPress.com.</p>
			</Card>
		</Main>
	);
	next();
};

export default function () {
	page( '/extensions/sensei/:site?', siteSelection, navigation, render, makeLayout, clientRender );
}

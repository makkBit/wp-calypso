/**
 * External dependencies
 */

import React from 'react';

/**
 * Internal dependencies
 */
import MeSidebarNavigation from 'wp-calypso-client/me/sidebar-navigation';
import Main from 'wp-calypso-client/components/main';
import PageViewTracker from 'wp-calypso-client/lib/analytics/page-view-tracker';
import GetAppsBlock from 'wp-calypso-client/blocks/get-apps';

export const GetApps = () => {
	return (
		<Main className="get-apps">
			<PageViewTracker path="/me/get-apps" title="Me > Get Apps" />
			<MeSidebarNavigation />
			<GetAppsBlock />
		</Main>
	);
};

export default GetApps;

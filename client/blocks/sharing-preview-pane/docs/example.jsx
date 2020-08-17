/**
 * External dependencies
 */

import React from 'react';
import { get } from 'lodash';
import { connect } from 'react-redux';

/**
 * Internal dependencies
 */
import SharingPreviewPane from 'wp-calypso-client/blocks/sharing-preview-pane';
import { getCurrentUser } from 'wp-calypso-client/state/current-user/selectors';
import QueryPosts from 'wp-calypso-client/components/data/query-posts';
import QueryPublicizeConnections from 'wp-calypso-client/components/data/query-publicize-connections';
import { getSitePosts } from 'wp-calypso-client/state/posts/selectors';
import { getSite } from 'wp-calypso-client/state/sites/selectors';
import { Card } from '@automattic/components';
import QuerySites from 'wp-calypso-client/components/data/query-sites';

const SharingPreviewPaneExample = ( { postId, site, siteId } ) => (
	<div>
		{ site && (
			<p>
				Site:{ ' ' }
				<strong>
					{ site.name } ({ siteId })
				</strong>
			</p>
		) }
		<Card>
			<QuerySites siteId={ siteId } />
			<QueryPublicizeConnections siteId={ siteId } />
			{ siteId && <QueryPosts siteId={ siteId } query={ { number: 1, type: 'post' } } /> }
			<SharingPreviewPane
				message="Do you have a trip coming up?"
				postId={ postId }
				siteId={ siteId }
			/>
		</Card>
	</div>
);

const ConnectedSharingPreviewPaneExample = connect( ( state ) => {
	const user = getCurrentUser( state );
	const siteId = get( user, 'primary_blog' );
	const site = getSite( state, siteId );
	const posts = getSitePosts( state, siteId );
	const post = posts && posts[ posts.length - 1 ];
	const postId = get( post, 'ID' );

	return {
		siteId,
		postId,
		site,
	};
} )( SharingPreviewPaneExample );

ConnectedSharingPreviewPaneExample.displayName = 'SharingPreviewPane';

export default ConnectedSharingPreviewPaneExample;

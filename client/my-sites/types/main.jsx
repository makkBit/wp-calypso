/**
 * External dependencies
 */

import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { get } from 'lodash';

/**
 * Internal dependencies
 */
import Main from 'wp-calypso-client/components/main';
import DocumentHead from 'wp-calypso-client/components/data/document-head';
import PageViewTracker from 'wp-calypso-client/lib/analytics/page-view-tracker';
import SidebarNavigation from 'wp-calypso-client/my-sites/sidebar-navigation';
import FormattedHeader from 'wp-calypso-client/components/formatted-header';
import PostTypeFilter from 'wp-calypso-client/my-sites/post-type-filter';
import PostTypeList from 'wp-calypso-client/my-sites/post-type-list';
import PostTypeUnsupported from './post-type-unsupported';
import PostTypeForbidden from './post-type-forbidden';
import canCurrentUser from 'wp-calypso-client/state/selectors/can-current-user';
import { getSelectedSiteId } from 'wp-calypso-client/state/ui/selectors';
import { getPostType, isPostTypeSupported } from 'wp-calypso-client/state/post-types/selectors';

function Types( {
	siteId,
	query,
	postType,
	postTypeSupported,
	userCanEdit,
	statusSlug,
	showPublishedStatus,
} ) {
	return (
		<Main wideLayout>
			<DocumentHead title={ get( postType, 'label' ) } />
			<PageViewTracker path={ siteId ? '/types/:site' : '/types' } title="Custom Post Type" />
			<SidebarNavigation />
			<FormattedHeader
				brandFont
				className="types__page-heading"
				headerText={ get( postType, 'label' ) }
				align="left"
			/>
			{ false !== userCanEdit &&
				false !== postTypeSupported && [
					<PostTypeFilter
						key="filter"
						query={ userCanEdit ? query : null }
						statusSlug={ statusSlug }
					/>,
					<PostTypeList
						key="list"
						query={ userCanEdit ? query : null }
						showPublishedStatus={ showPublishedStatus }
						scrollContainer={ document.body }
					/>,
				] }
			{ false === postTypeSupported && <PostTypeUnsupported type={ query.type } /> }
			{ false === userCanEdit && <PostTypeForbidden /> }
		</Main>
	);
}

Types.propTypes = {
	siteId: PropTypes.number,
	query: PropTypes.object,
	postType: PropTypes.object,
	postTypeSupported: PropTypes.bool,
	userCanEdit: PropTypes.bool,
	statusSlug: PropTypes.string,
	showPublishedStatus: PropTypes.bool,
};

export default connect( ( state, ownProps ) => {
	const siteId = getSelectedSiteId( state );
	const postType = getPostType( state, siteId, ownProps.query.type );
	const capability = get( postType, [ 'capabilities', 'edit_posts' ], null );

	return {
		siteId,
		postType,
		postTypeSupported: isPostTypeSupported( state, siteId, ownProps.query.type ),
		userCanEdit: canCurrentUser( state, siteId, capability ),
	};
} )( Types );

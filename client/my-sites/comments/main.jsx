/**
 * External dependencies
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { localize } from 'i18n-calypso';

/**
 * Internal dependencies
 */
import EmptyContent from 'wp-calypso-client/components/empty-content';
import getSiteId from 'wp-calypso-client/state/selectors/get-site-id';
import Main from 'wp-calypso-client/components/main';
import PageViewTracker from 'wp-calypso-client/lib/analytics/page-view-tracker';
import DocumentHead from 'wp-calypso-client/components/data/document-head';
import CommentList from './comment-list';
import CommentTree from './comment-tree';
import SidebarNavigation from 'wp-calypso-client/my-sites/sidebar-navigation';
import FormattedHeader from 'wp-calypso-client/components/formatted-header';
import canCurrentUser from 'wp-calypso-client/state/selectors/can-current-user';
import { preventWidows } from 'wp-calypso-client/lib/formatting';
import { isEnabled } from 'wp-calypso-client/config';
import { NEWEST_FIRST } from './constants';

/**
 * Style dependencies
 */
import './style.scss';

export class CommentsManagement extends Component {
	static propTypes = {
		analyticsPath: PropTypes.string,
		comments: PropTypes.array,
		page: PropTypes.number,
		postId: PropTypes.number,
		showPermissionError: PropTypes.bool,
		siteId: PropTypes.number,
		siteFragment: PropTypes.oneOfType( [ PropTypes.string, PropTypes.number ] ),
		status: PropTypes.string,
		translate: PropTypes.func,
	};

	static defaultProps = {
		page: 1,
		status: 'all',
	};

	state = {
		order: NEWEST_FIRST,
	};

	setOrder = ( order ) => () => this.setState( { order } );

	render() {
		const {
			analyticsPath,
			changePage,
			page,
			postId,
			showCommentList,
			showCommentTree,
			showPermissionError,
			siteId,
			siteFragment,
			status,
			translate,
		} = this.props;
		const { order } = this.state;

		return (
			<Main className="comments" wideLayout>
				<PageViewTracker path={ analyticsPath } title="Comments" />
				<DocumentHead title={ translate( 'Comments' ) } />
				<SidebarNavigation />
				{ ! showPermissionError && (
					<FormattedHeader
						brandFont
						className="comments__page-heading"
						headerText={ translate( 'Comments' ) }
						align="left"
					/>
				) }
				{ showPermissionError && (
					<EmptyContent
						title={ preventWidows(
							translate( "Oops! You don't have permission to manage comments." )
						) }
						line={ preventWidows(
							translate( "If you think you should, contact this site's administrator." )
						) }
						illustration="/calypso/images/illustrations/error.svg"
					/>
				) }
				{ showCommentList && (
					<CommentList
						changePage={ changePage }
						order={ order }
						page={ page }
						postId={ postId }
						setOrder={ this.setOrder }
						siteId={ siteId }
						siteFragment={ siteFragment }
						status={ status }
					/>
				) }
				{ showCommentTree && (
					<CommentTree
						changePage={ changePage }
						order={ order }
						page={ page }
						postId={ postId }
						setOrder={ this.setOrder }
						siteId={ siteId }
						siteFragment={ siteFragment }
						status={ status }
					/>
				) }
			</Main>
		);
	}
}

const mapStateToProps = ( state, { postId, siteFragment } ) => {
	const siteId = getSiteId( state, siteFragment );
	const isPostView = !! postId;
	const canModerateComments = canCurrentUser( state, siteId, 'edit_posts' );
	const showPermissionError = false === canModerateComments;

	const showCommentTree =
		! showPermissionError && isPostView && isEnabled( 'comments/management/threaded-view' );

	const showCommentList = ! showCommentTree && ! showPermissionError;

	return {
		siteId,
		showCommentList,
		showCommentTree,
		showPermissionError,
	};
};

export default connect( mapStateToProps )( localize( CommentsManagement ) );

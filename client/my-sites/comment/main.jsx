/**
 * External dependencies
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { localize } from 'i18n-calypso';
import { get, includes } from 'lodash';

/**
 * Internal dependencies
 */
import Main from 'wp-calypso-client/components/main';
import EmptyContent from 'wp-calypso-client/components/empty-content';
import DocumentHead from 'wp-calypso-client/components/data/document-head';
import QuerySiteCommentsTree from 'wp-calypso-client/components/data/query-site-comments-tree';
import ModerateComment from 'wp-calypso-client/components/data/moderate-comment';
import Comment from 'wp-calypso-client/my-sites/comments/comment';
import CommentPermalink from 'wp-calypso-client/my-sites/comment/comment-permalink';
import CommentDeleteWarning from 'wp-calypso-client/my-sites/comment/comment-delete-warning';
import CommentListHeader from 'wp-calypso-client/my-sites/comments/comment-list/comment-list-header';
import PageViewTracker from 'wp-calypso-client/lib/analytics/page-view-tracker';
import { preventWidows } from 'wp-calypso-client/lib/formatting';
import canCurrentUser from 'wp-calypso-client/state/selectors/can-current-user';
import { getSiteComment } from 'wp-calypso-client/state/comments/selectors';
import getSiteId from 'wp-calypso-client/state/selectors/get-site-id';

/**
 * Style dependencies
 */
import './style.scss';

export class CommentView extends Component {
	static propTypes = {
		siteId: PropTypes.number,
		postId: PropTypes.number,
		commentId: PropTypes.number.isRequired,
		action: PropTypes.string,
		canModerateComments: PropTypes.bool.isRequired,
		hasPermalink: PropTypes.bool,
		redirectToPostView: PropTypes.func.isRequired,
		translate: PropTypes.func.isRequired,
	};

	render() {
		const {
			siteId,
			postId,
			commentId,
			action,
			canModerateComments,
			hasPermalink,
			redirectToPostView,
			translate,
		} = this.props;

		return (
			// eslint-disable-next-line wpcalypso/jsx-classname-namespace
			<Main className="comments" wideLayout>
				<PageViewTracker path="/comment/:site/:commentId" title="Comments" />
				<QuerySiteCommentsTree siteId={ siteId } status={ 'all' } />
				<DocumentHead title={ translate( 'Comment' ) } />
				{ canModerateComments && (
					<ModerateComment
						{ ...{ siteId, postId, commentId, newStatus: action, redirectToPostView } }
					/>
				) }
				{ 'delete' === action && (
					<CommentDeleteWarning { ...{ siteId, postId, commentId, redirectToPostView } } />
				) }
				<CommentListHeader { ...{ postId, commentId } } />
				{ ! canModerateComments && (
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
				{ canModerateComments && (
					<Comment
						commentId={ commentId }
						refreshCommentData={ true }
						redirect={ redirectToPostView }
						isPostView={ true }
						isEditMode={ canModerateComments && 'edit' === action }
					/>
				) }
				{ canModerateComments && hasPermalink && <CommentPermalink { ...{ siteId, commentId } } /> }
			</Main>
		);
	}
}

const mapStateToProps = ( state, ownProps ) => {
	const { commentId, redirectToPostView, siteFragment } = ownProps;

	const siteId = getSiteId( state, siteFragment );
	const comment = getSiteComment( state, siteId, commentId );
	const postId = get( comment, 'post.ID' );

	const canModerateComments = canCurrentUser( state, siteId, 'moderate_comments' ) !== false;
	const hasPermalink = includes( [ 'approved', 'unapproved' ], get( comment, 'status' ) );

	return {
		siteId,
		postId,
		canModerateComments,
		hasPermalink,
		redirectToPostView: redirectToPostView( postId ),
	};
};

export default connect( mapStateToProps )( localize( CommentView ) );

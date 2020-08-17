/**
 * External dependencies
 */
import React, { Fragment } from 'react';
import Gridicon from 'wp-calypso-client/components/gridicon';
import { connect } from 'react-redux';
import { localize } from 'i18n-calypso';
import { includes } from 'lodash';

/**
 * Internal dependencies
 */
import { decodeEntities } from 'wp-calypso-client/lib/formatting';
import { isPublished } from 'wp-calypso-client/state/posts/utils';
import Tooltip from 'wp-calypso-client/components/tooltip';
import { Button } from '@automattic/components';
import QueryPostTypes from 'wp-calypso-client/components/data/query-post-types';
import { getSelectedSiteId } from 'wp-calypso-client/state/ui/selectors';
import { getEditorPostId } from 'wp-calypso-client/state/editor/selectors';
import { getSitePost } from 'wp-calypso-client/state/posts/selectors';
import { getPostType } from 'wp-calypso-client/state/post-types/selectors';

class EditorViewLink extends React.Component {
	state = {
		viewLinkTooltip: false,
	};

	showViewLinkTooltip = () => {
		this.setState( { viewLinkTooltip: true } );
	};

	hideViewLinkTooltip = () => {
		this.setState( { viewLinkTooltip: false } );
	};

	viewLinkTooltipContext = React.createRef();

	getTooltipLabel() {
		const { translate, currentPost, currentPostTypeObject } = this.props;

		if ( currentPost.type === 'page' ) {
			return translate( 'View page' );
		} else if ( currentPost.type === 'post' ) {
			return translate( 'View post' );
		} else if ( currentPostTypeObject ) {
			return decodeEntities( currentPostTypeObject.labels.view_item );
		}

		return translate( 'View', { context: 'verb' } );
	}

	render() {
		const { siteId, currentPost } = this.props;

		if ( ! currentPost || ! isPublished( currentPost ) ) {
			return null;
		}

		const isCustomPostType = currentPost && ! includes( [ 'page', 'post' ], currentPost.type );

		return (
			<Fragment>
				<Button
					href={ currentPost.URL }
					target="_blank"
					rel="noopener noreferrer"
					ref={ this.viewLinkTooltipContext }
					onMouseEnter={ this.showViewLinkTooltip }
					onMouseLeave={ this.hideViewLinkTooltip }
					borderless
				>
					<Gridicon icon="external" />
				</Button>
				<Tooltip
					className="editor-action-bar__view-post-tooltip"
					context={ this.viewLinkTooltipContext.current }
					isVisible={ this.state.viewLinkTooltip }
					position="bottom left"
				>
					<span className="editor-action-bar__view-label">
						{ siteId && isCustomPostType && <QueryPostTypes siteId={ siteId } /> }
						{ this.getTooltipLabel() }
					</span>
				</Tooltip>
			</Fragment>
		);
	}
}

export default connect( ( state ) => {
	const siteId = getSelectedSiteId( state );
	const postId = getEditorPostId( state );
	const currentPost = getSitePost( state, siteId, postId );
	const currentPostTypeObject = currentPost && getPostType( state, siteId, currentPost.type );

	return { siteId, currentPost, currentPostTypeObject };
} )( localize( EditorViewLink ) );

/**
 * External dependencies
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * Internal dependencies
 */
import EditorDrawer from 'wp-calypso-client/post-editor/editor-drawer';
import EditorSidebarHeader from './header';
import SidebarFooter from 'wp-calypso-client/layout/sidebar/footer';
import EditorDeletePost from 'wp-calypso-client/post-editor/editor-delete-post';
import EditorGutenbergOptInSidebar from 'wp-calypso-client/post-editor/editor-gutenberg-opt-in-sidebar';

/**
 * Style dependencies
 */
import './style.scss';

export class EditorSidebar extends Component {
	static propTypes = {
		// passed props
		onSave: PropTypes.func,
		onPublish: PropTypes.func,
		onTrashingPost: PropTypes.func,
		site: PropTypes.object,
		setPostDate: PropTypes.func,
		confirmationSidebarStatus: PropTypes.string,
	};

	render() {
		const {
			onTrashingPost,
			onPublish,
			onSave,
			site,
			setPostDate,
			confirmationSidebarStatus,
		} = this.props;

		return (
			<div className="editor-sidebar">
				<EditorSidebarHeader />
				<EditorDrawer
					site={ site }
					setPostDate={ setPostDate }
					onPrivatePublish={ onPublish }
					onSave={ onSave }
					confirmationSidebarStatus={ confirmationSidebarStatus }
				/>
				<EditorGutenbergOptInSidebar />
				<SidebarFooter>
					<EditorDeletePost onTrashingPost={ onTrashingPost } />
				</SidebarFooter>
			</div>
		);
	}
}

export default EditorSidebar;

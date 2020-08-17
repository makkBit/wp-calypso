/**
 * External dependencies
 */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useTranslate } from 'i18n-calypso';

/**
 * Internal dependencies
 */
import SegmentedControl from 'wp-calypso-client/components/segmented-control';
import {
	splitPostRevisionsDiffView,
	unifyPostRevisionsDiffView,
} from 'wp-calypso-client/state/posts/revisions/actions';
import { getPostRevisionsDiffView } from 'wp-calypso-client/state/posts/selectors/get-post-revisions-diff-view';

const EditorRevisionsListViewButtons = ( { diffView, viewSplit, viewUnified } ) => {
	const translate = useTranslate();

	return (
		<SegmentedControl compact className="editor-revisions-list__view-buttons">
			<SegmentedControl.Item
				className="editor-revisions-list__unified-button"
				onClick={ viewUnified }
				selected={ diffView === 'unified' }
			>
				{ translate( 'Unified' ) }
			</SegmentedControl.Item>
			<SegmentedControl.Item
				className="editor-revisions-list__split-button"
				onClick={ viewSplit }
				selected={ diffView === 'split' }
			>
				{ translate( 'Split' ) }
			</SegmentedControl.Item>
		</SegmentedControl>
	);
};

EditorRevisionsListViewButtons.propTypes = {
	viewSplit: PropTypes.func.isRequired,
	viewUnified: PropTypes.func.isRequired,
	translate: PropTypes.func.isRequired,
};

const mapStateToProps = ( state ) => ( {
	diffView: getPostRevisionsDiffView( state ),
} );

const mapDispatchToProps = {
	viewUnified: unifyPostRevisionsDiffView,
	viewSplit: splitPostRevisionsDiffView,
};

export default connect( mapStateToProps, mapDispatchToProps )( EditorRevisionsListViewButtons );

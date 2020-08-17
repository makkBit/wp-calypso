/**
 * External dependencies
 */
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { localize } from 'i18n-calypso';

/**
 * Internal dependencies
 */
import AsyncLoad from 'wp-calypso-client/components/async-load';
import QueryPostCounts from 'wp-calypso-client/components/data/query-post-counts';
import { Button } from '@automattic/components';
import Count from 'wp-calypso-client/components/count';
import { recordTracksEvent } from 'wp-calypso-client/state/analytics/actions';
import { getSelectedSiteId } from 'wp-calypso-client/state/ui/selectors';
import { getMyPostCount } from 'wp-calypso-client/state/posts/counts/selectors';

const MasterbarDraftsPopover = ( props ) => (
	<AsyncLoad
		{ ...props }
		require="wp-calypso-client/layout/masterbar/drafts-popover"
		placeholder={ null }
	/>
);

class MasterbarDrafts extends Component {
	static propTypes = {
		selectedSiteId: PropTypes.number,
	};

	state = {
		showDrafts: false,
	};

	preloaded = false;

	// Preload the async chunk on mouse hover or touch start
	preload = () => {
		if ( this.preloaded ) {
			return;
		}

		asyncRequire( 'wp-calypso-client/layout/masterbar/drafts-popover' );
		this.preloaded = true;
	};

	toggleDrafts = () => {
		this.setState( ( state ) => ( {
			showDrafts: ! state.showDrafts,
		} ) );
	};

	closeDrafts = () => {
		this.setState( { showDrafts: false } );
	};

	draftClicked = () => {
		this.props.recordTracksEvent( 'calypso_masterbar_draft_selected' );
		this.closeDrafts();
	};

	newDraftClicked = () => {
		this.props.recordTracksEvent( 'calypso_masterbar_drafts_new_draft_clicked' );
		this.closeDrafts();
	};

	seeAllDraftsClicked = () => {
		this.props.recordTracksEvent( 'calypso_masterbar_drafts_see_all_drafts_clicked' );
		this.closeDrafts();
	};

	setDraftsRef = ( el ) => {
		this.draftsRef = el;
	};

	renderButton() {
		if ( ! this.props.selectedSiteId || ! this.props.draftCount ) {
			return null;
		}

		return (
			<Button
				compact
				borderless
				className="masterbar__toggle-drafts"
				title={ this.props.translate( 'Latest Drafts' ) }
				onClick={ this.toggleDrafts }
				onTouchStart={ this.preload }
				onMouseEnter={ this.preload }
				ref={ this.setDraftsRef }
			>
				<Count count={ this.props.draftCount } />
			</Button>
		);
	}

	renderPopover() {
		if ( ! this.state.showDrafts ) {
			return null;
		}

		return (
			<MasterbarDraftsPopover
				siteId={ this.props.selectedSiteId }
				draftCount={ this.props.draftCount }
				context={ this.draftsRef }
				closeDrafts={ this.closeDrafts }
				draftClicked={ this.draftClicked }
				newDraftClicked={ this.newDraftClicked }
				seeAllDraftsClicked={ this.seeAllDraftsClicked }
			/>
		);
	}

	render() {
		if ( ! this.props.selectedSiteId ) {
			return null;
		}

		return (
			<div className="masterbar__drafts">
				<QueryPostCounts siteId={ this.props.selectedSiteId } type="post" />
				{ this.renderButton() }
				{ this.renderPopover() }
			</div>
		);
	}
}

export default connect(
	( state ) => {
		const selectedSiteId = getSelectedSiteId( state );
		const draftCount = getMyPostCount( state, selectedSiteId, 'post', 'draft' );

		return {
			selectedSiteId,
			draftCount,
		};
	},
	{ recordTracksEvent }
)( localize( MasterbarDrafts ) );

/**
 * External dependencies
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';

/**
 * Internal dependencies
 */
import config from 'wp-calypso-client/config';
import QuerySiteGuidedTransfer from 'wp-calypso-client/components/data/query-site-guided-transfer';
import { getSelectedSiteId } from 'wp-calypso-client/state/ui/selectors';
import { isJetpackSite } from 'wp-calypso-client/state/sites/selectors';
import { isGuidedTransferInProgress } from 'wp-calypso-client/state/sites/guided-transfer/selectors';
import Notices from './notices';
import ExportCard from './export-card';
import ExportMediaCard from './export-media-card';
import GuidedTransferCard from './guided-transfer-card';
import InProgressCard from './guided-transfer-card/in-progress';

class ExporterContainer extends Component {
	render() {
		const { siteId, isJetpack, isTransferInProgress } = this.props;
		const showGuidedTransferOptions = config.isEnabled( 'manage/export/guided-transfer' );

		return (
			<div className="exporter">
				{ showGuidedTransferOptions && <QuerySiteGuidedTransfer siteId={ siteId } /> }

				<Notices />
				{ showGuidedTransferOptions && isTransferInProgress && <InProgressCard /> }
				<ExportCard siteId={ siteId } />
				{ ! isJetpack && <ExportMediaCard siteId={ siteId } /> }
				{ showGuidedTransferOptions && ! isTransferInProgress && <GuidedTransferCard /> }
			</div>
		);
	}
}

const mapStateToProps = ( state, { siteId } ) => ( {
	siteId: getSelectedSiteId( state ),
	isJetpack: isJetpackSite( state, siteId ),
	isTransferInProgress: isGuidedTransferInProgress( state, getSelectedSiteId( state ) ),
} );

export default connect( mapStateToProps )( ExporterContainer );

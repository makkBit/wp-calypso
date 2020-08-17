/**
 * External dependencies
 */
import React from 'react';
import { connect } from 'react-redux';
import { localize } from 'i18n-calypso';
import page from 'page';

/**
 * Internal dependencies
 */
import MainComponent from 'wp-calypso-client/components/main';
import HeaderCake from 'wp-calypso-client/components/header-cake';
import EligibilityWarnings from 'wp-calypso-client/blocks/eligibility-warnings';
import PageViewTracker from 'wp-calypso-client/lib/analytics/page-view-tracker';
import { initiateThemeTransfer } from 'wp-calypso-client/state/themes/actions';
import { getSelectedSiteId, getSelectedSiteSlug } from 'wp-calypso-client/state/ui/selectors';

const HostingActivate = ( { initiateTransfer, siteId, siteSlug, translate } ) => {
	const backUrl = `/hosting-config/${ siteSlug }`;

	const transferInitiate = () => {
		initiateTransfer( siteId, null, null );
		page( backUrl );
	};

	return (
		<MainComponent>
			<PageViewTracker
				path="/hosting-config/activate/:site"
				title="Hosting Configuration > Activate"
			/>
			<HeaderCake isCompact={ true } backHref={ backUrl }>
				{ translate( 'Activate Hosting Features' ) }
			</HeaderCake>
			<EligibilityWarnings onProceed={ transferInitiate } backUrl={ backUrl } />
		</MainComponent>
	);
};

const mapStateToProps = ( state ) => {
	const siteId = getSelectedSiteId( state );
	const siteSlug = getSelectedSiteSlug( state );

	return {
		siteId,
		siteSlug,
	};
};

const mapDispatchToProps = {
	initiateTransfer: initiateThemeTransfer,
};

export default connect( mapStateToProps, mapDispatchToProps )( localize( HostingActivate ) );

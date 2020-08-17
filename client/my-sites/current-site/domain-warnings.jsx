/**
 * External dependencies
 */

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';

/**
 * Internal dependencies
 */
import DomainWarnings from 'wp-calypso-client/my-sites/domains/components/domain-warnings';
import { getDomainsBySiteId } from 'wp-calypso-client/state/sites/domains/selectors';
import { getSelectedSite, getSelectedSiteId } from 'wp-calypso-client/state/ui/selectors';
import { isJetpackSite } from 'wp-calypso-client/state/sites/selectors';
import isSiteAutomatedTransfer from 'wp-calypso-client/state/selectors/is-site-automated-transfer';
import QuerySiteDomains from 'wp-calypso-client/components/data/query-site-domains';
import isUnlaunchedSite from 'wp-calypso-client/state/selectors/is-unlaunched-site';
import isSiteEligibleForFullSiteEditing from 'wp-calypso-client/state/selectors/is-site-eligible-for-full-site-editing';

const allowedRules = [
	'unverifiedDomainsCanManage',
	'unverifiedDomainsCannotManage',
	'expiredDomainsCanManage',
	'expiringDomainsCanManage',
	'expiredDomainsCannotManage',
	'expiringDomainsCannotManage',
	'wrongNSMappedDomains',
	'pendingGSuiteTosAcceptanceDomains',
	'transferStatus',
	'newTransfersWrongNS',
	'pendingConsent',
];

const CurrentSiteDomainWarnings = ( {
	domains,
	isAtomic,
	isJetpack,
	selectedSite,
	siteIsUnlaunched,
	isSiteEligibleForFSE,
} ) => {
	if ( ! selectedSite || ( isJetpack && ! isAtomic ) ) {
		// Simple and Atomic sites. Not Jetpack sites.
		return null;
	}

	return (
		<div>
			<QuerySiteDomains siteId={ selectedSite.ID } />

			<DomainWarnings
				isCompact
				selectedSite={ selectedSite }
				domains={ domains }
				allowedRules={ allowedRules }
				isSiteEligibleForFSE={ isSiteEligibleForFSE }
				siteIsUnlaunched={ siteIsUnlaunched }
			/>
		</div>
	);
};

CurrentSiteDomainWarnings.propTypes = {
	domains: PropTypes.array,
	isJetpack: PropTypes.bool,
	isSiteEligibleForFSE: PropTypes.bool,
	selectedSite: PropTypes.object,
};

export default connect( ( state ) => {
	const selectedSiteId = getSelectedSiteId( state );

	return {
		domains: getDomainsBySiteId( state, selectedSiteId ),
		isJetpack: isJetpackSite( state, selectedSiteId ),
		isAtomic: isSiteAutomatedTransfer( state, selectedSiteId ),
		selectedSite: getSelectedSite( state ),
		siteIsUnlaunched: isUnlaunchedSite( state, selectedSiteId ),
		isSiteEligibleForFSE: isSiteEligibleForFullSiteEditing( state, selectedSiteId ),
	};
} )( CurrentSiteDomainWarnings );

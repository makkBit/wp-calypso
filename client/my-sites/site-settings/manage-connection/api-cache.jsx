/**
 * External dependencies
 */

import React from 'react';
import { connect } from 'react-redux';
import { flowRight, pick } from 'lodash';
import { localize } from 'i18n-calypso';

/**
 * Internal dependencies
 */
import { CompactCard } from '@automattic/components';
import CompactFormToggle from 'wp-calypso-client/components/forms/form-toggle/compact';
import config from 'wp-calypso-client/config';
import wrapSettingsForm from 'wp-calypso-client/my-sites/site-settings/wrap-settings-form';
import { getSelectedSiteId } from 'wp-calypso-client/state/ui/selectors';
import { isJetpackSite } from 'wp-calypso-client/state/sites/selectors';

const ApiCache = ( {
	fields,
	handleAutosavingToggle,
	isRequestingSettings,
	isSavingSettings,
	siteIsJetpack,
	translate,
} ) => {
	if ( ! config.isEnabled( 'jetpack/api-cache' ) || ! siteIsJetpack ) {
		return null;
	}

	return (
		<CompactCard>
			<CompactFormToggle
				checked={ !! fields.api_cache }
				disabled={ isRequestingSettings || isSavingSettings }
				onChange={ handleAutosavingToggle( 'api_cache' ) }
			>
				{ translate( 'Use synchronized data to boost performance' ) } (a8c-only experimental
				feature)
			</CompactFormToggle>
		</CompactCard>
	);
};

const connectComponent = connect( ( state ) => ( {
	siteIsJetpack: isJetpackSite( state, getSelectedSiteId( state ) ),
} ) );

const getFormSettings = ( settings ) => {
	return pick( settings, [ 'api_cache' ] );
};

export default flowRight(
	connectComponent,
	localize,
	wrapSettingsForm( getFormSettings )
)( ApiCache );

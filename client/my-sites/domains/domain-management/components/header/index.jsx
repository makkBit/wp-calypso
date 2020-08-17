/**
 * External dependencies
 */

import React from 'react';
import { connect } from 'react-redux';

/**
 * Internal dependencies
 */
import HeaderCake from 'wp-calypso-client/components/header-cake';
import DocumentHead from 'wp-calypso-client/components/data/document-head';
import FormattedHeader from 'wp-calypso-client/components/formatted-header';
import { useTranslate } from 'i18n-calypso';
import getCurrentRoute from 'wp-calypso-client/state/selectors/get-current-route';
import { isUnderDomainManagementAll } from 'wp-calypso-client/my-sites/domains/paths';

/**
 * Style dependencies
 */
import './style.scss';

const DomainManagementHeader = ( props ) => {
	const { isManagingAllDomains, onClick, backHref, children } = props;
	const translate = useTranslate();

	/* eslint-disable wpcalypso/jsx-classname-namespace */
	return (
		<React.Fragment>
			<FormattedHeader
				brandFont
				className="stats__section-header"
				headerText={
					isManagingAllDomains ? translate( 'All Domains' ) : translate( 'Site Domains' )
				}
				align="left"
			/>
			<HeaderCake className="domain-management-header" onClick={ onClick } backHref={ backHref }>
				<div className="domain-management-header__children">
					<span className="domain-management-header__title">{ children }</span>
				</div>
				<DocumentHead title={ children } />
			</HeaderCake>
		</React.Fragment>
	);
	/* eslint-enable wpcalypso/jsx-classname-namespace */
};

export default connect( ( state ) => {
	const path = getCurrentRoute( state );
	return {
		isManagingAllDomains: isUnderDomainManagementAll( path ),
	};
} )( DomainManagementHeader );

/**
 * External dependencies
 */

import PropTypes from 'prop-types';
import React from 'react';

/**
 * Internal dependencies
 */
import DomainPrimaryFlag from 'wp-calypso-client/my-sites/domains/domain-management/components/domain/primary-flag';
import SectionHeader from 'wp-calypso-client/components/section-header';

class Header extends React.Component {
	static propTypes = {
		domain: PropTypes.object.isRequired,
	};

	render() {
		const { domain } = this.props;

		if ( ! domain ) {
			return null;
		}

		return (
			<SectionHeader label={ domain.name }>
				<DomainPrimaryFlag domain={ domain } />
			</SectionHeader>
		);
	}
}

export default Header;

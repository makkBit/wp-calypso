/**
 * External dependencies
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { localize } from 'i18n-calypso';
import { get, map } from 'lodash';

/**
 * Internal dependencies
 */
import HeaderCake from 'wp-calypso-client/components/header-cake';
import SectionNav from 'wp-calypso-client/components/section-nav';
import SectionNavTabs from 'wp-calypso-client/components/section-nav/tabs';
import SectionNavTabItem from 'wp-calypso-client/components/section-nav/item';
import { addSiteFragment } from 'wp-calypso-client/lib/route';
import versionCompare from 'wp-calypso-client/lib/version-compare';
import { getSiteSlug } from 'wp-calypso-client/state/sites/selectors';
import { getPluginOnSite } from 'wp-calypso-client/state/plugins/installed/selectors';
import { Tabs } from '../../app/constants';

const Navigation = ( { activeTab, pluginVersion, siteSlug, translate } ) => (
	<div>
		<HeaderCake
			backText={ translate( 'Plugin Overview' ) }
			backHref={ siteSlug && addSiteFragment( '/plugins/wp-super-cache', siteSlug ) }
		>
			WP Super Cache
		</HeaderCake>
		<SectionNav selectedText="Settings">
			<SectionNavTabs>
				{ map( Tabs, ( { label, slug: tabSlug, minVersion } ) => {
					if ( ! versionCompare( minVersion, pluginVersion, '<=' ) ) {
						return null;
					}

					return (
						<SectionNavTabItem
							key={ `wp-super-cache-${ tabSlug || 'easy' }` }
							path={
								siteSlug && addSiteFragment( '/extensions/wp-super-cache/' + tabSlug, siteSlug )
							}
							selected={ activeTab === tabSlug }
						>
							{ label }
						</SectionNavTabItem>
					);
				} ) }
			</SectionNavTabs>
		</SectionNav>
	</div>
);

Navigation.propTypes = {
	activeTab: PropTypes.string,
	siteId: PropTypes.number,
	// connected props
	siteSlug: PropTypes.string,
	translate: PropTypes.func.isRequired,
};

Navigation.defaultProps = {
	activeTab: '',
};

const connectComponent = connect( ( state, { siteId } ) => ( {
	pluginVersion: get( getPluginOnSite( state, siteId, 'wp-super-cache' ), 'version' ),
	siteSlug: getSiteSlug( state, siteId ),
} ) );

export default connectComponent( localize( Navigation ) );

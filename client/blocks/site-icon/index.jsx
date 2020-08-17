/**
 * External dependencies
 */

import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { get } from 'lodash';
import classNames from 'classnames';
import Gridicon from 'wp-calypso-client/components/gridicon';

/**
 * Internal dependencies
 */
import Image from 'wp-calypso-client/components/image';
import MediaImage from 'wp-calypso-client/my-sites/media-library/media-image';
import Spinner from 'wp-calypso-client/components/spinner';
import QuerySites from 'wp-calypso-client/components/data/query-sites';
import { getSite } from 'wp-calypso-client/state/sites/selectors';
import getSiteIconId from 'wp-calypso-client/state/selectors/get-site-icon-id';
import getSiteIconUrl from 'wp-calypso-client/state/selectors/get-site-icon-url';
import isTransientMedia from 'wp-calypso-client/state/selectors/is-transient-media';
import resizeImageUrl from 'wp-calypso-client/lib/resize-image-url';

/**
 * Style dependencies
 */
import './style.scss';

function SiteIcon( { siteId, site, iconUrl, size, imgSize, isTransientIcon } ) {
	const iconSrc = resizeImageUrl( iconUrl, imgSize );

	const classes = classNames( 'site-icon', {
		'is-blank': ! iconSrc,
		'is-transient': isTransientIcon,
	} );

	const style = {
		height: size,
		width: size,
		lineHeight: size + 'px',
		fontSize: size + 'px',
	};

	return (
		<div className={ classes } style={ style }>
			{ ! site && siteId > 0 && <QuerySites siteId={ siteId } /> }
			{ iconSrc ? (
				<MediaImage component={ Image } className="site-icon__img" src={ iconSrc } alt="" />
			) : (
				<Gridicon icon="site" size={ Math.round( size / 1.3 ) } />
			) }
			{ isTransientIcon && <Spinner /> }
		</div>
	);
}

SiteIcon.propTypes = {
	siteId: PropTypes.number,
	site: PropTypes.object,
	iconUrl: PropTypes.string,
	size: PropTypes.number,
	imgSize: PropTypes.number,
	isTransientIcon: PropTypes.bool,
};

SiteIcon.defaultProps = {
	// Cache a larger image so there's no need to download different assets to
	// display the site icons in different contexts.
	imgSize: 120,
	size: 32,
};

export default connect( ( state, { site, siteId, imgSize } ) => {
	// Always prefer site from Redux state if available
	const stateSite = getSite( state, get( site, 'ID', siteId ) );

	// Until all sites state is within Redux, we provide compatibility in cases
	// where sites-list object is passed to use the icon.img property as URL.
	// Specifically this shows icon for non-selected <SiteSelector /> sites,
	// since only the selected site is currently received into state.
	if ( ! stateSite ) {
		return {
			iconUrl: get( site, 'icon.img' ),
		};
	}

	const iconId = getSiteIconId( state, stateSite.ID );

	return {
		site: stateSite,
		iconUrl: getSiteIconUrl( state, stateSite.ID, imgSize ),
		isTransientIcon: isTransientMedia( state, stateSite.ID, iconId ),
	};
} )( SiteIcon );

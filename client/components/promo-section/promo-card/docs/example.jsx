/**
 * External dependencies
 */
import React from 'react';

/**
 * Internal dependencies
 */
import PromoCard from 'wp-calypso-client/components/promo-section/promo-card';
import PromoCardCta from 'wp-calypso-client/components/promo-section/promo-card/cta';
import { FEATURE_MEMBERSHIPS } from 'wp-calypso-client/lib/plans/constants';

/**
 * Image dependencies
 */
import referralImage from 'wp-calypso-client/assets/images/earn/referral.svg';

/* eslint-disable wpcalypso/jsx-classname-namespace */
const PromoCardExample = () => {
	const img = {
		path: referralImage,
		alt: 'Using Props',
	};
	const clicked = () => alert( 'Clicked!' );
	return (
		<div className="design-assets__group">
			<div>
				<PromoCard title="Under-used Feature" image={ img } isPrimary={ false }>
					<p>
						This is a description of the action. It gives a bit more detail and explains what we are
						inviting the user to do.
					</p>
					<PromoCardCta
						cta={ {
							feature: FEATURE_MEMBERSHIPS,
							upgradeButton: { text: 'Upgrade!', action: clicked },
							defaultButton: { text: 'Memberships', action: clicked },
						} }
						learnMoreLink="/learn-more"
					/>
				</PromoCard>
			</div>
		</div>
	);
};
/* eslint-enable wpcalypso/jsx-classname-namespace */

PromoCardExample.displayName = 'PromoCard';

export default PromoCardExample;

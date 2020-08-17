/**
 * External dependencies
 */

import React from 'react';

/**
 * Internal dependencies
 */
import LoginBlock from 'wp-calypso-client/blocks/login';

const LoginExample = () => (
	<React.Fragment>
		<LoginBlock disableAutoFocus />
		<p />
		<LoginBlock disableAutoFocus isJetpack />
	</React.Fragment>
);

LoginExample.displayName = 'Login';

export default LoginExample;

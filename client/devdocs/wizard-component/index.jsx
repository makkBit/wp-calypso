/**
 * External dependencies
 */

import React, { Component } from 'react';
import page from 'page';

/**
 * Internal dependencies
 */
import HeaderCake from 'wp-calypso-client/components/header-cake';
import Main from 'wp-calypso-client/components/main';
import Wizard from 'wp-calypso-client/components/wizard/docs/example';
import ReadmeViewer from 'wp-calypso-client/components/readme-viewer';

class WizardComponent extends Component {
	backToComponents = () => page( '/devdocs/design/' );

	render() {
		const { stepName } = this.props;

		return (
			<Main className="wizard-component">
				<HeaderCake onClick={ this.backToComponents } backText="All Components">
					Wizard
				</HeaderCake>
				<Wizard stepName={ stepName } />
				<ReadmeViewer section="design" readmeFilePath="/client/components/wizard/README.md" />
			</Main>
		);
	}
}

export default WizardComponent;

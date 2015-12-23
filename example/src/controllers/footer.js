/*eslint func-style:0*/
import React from 'react';
import GHLogo from '../components/ghLogo';
import WTLogo from '../components/wtLogo';

export default function Footer() {
    return <div className="footer">
        <div className="logos">
            <WTLogo />
            <GHLogo />
        </div>
        <p>Built with love by the Web Apps Team at <br /> WillowTree and by our awesome contributors.</p>
    </div>;
}

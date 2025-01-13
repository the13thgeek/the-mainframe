import React from 'react';
import Tile from "../components/Tile";
import './Privacy.scss';

const Privacy = () => {

  return (
    <main className="page-privacy">
      <div className="structure">
        <div className="row">
          <Tile extraClassName={'prpolicy'}>
            <h2>Privacy Policy</h2>
            <p><b>Effective Date:</b> January 1, 2025</p>
            
            <p>Thank you for visiting <b>theMainframe&trade;</b> (the "Website"). We are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy outlines how we collect, use, and protect your information when you use our Website.</p>

            <h3>Information We Collect</h3>
            <p>We utilize Twitch’s API for user authentication and do not require any separate registration process. The information we collect includes:</p>
            <ul>
                <li><b>Twitch User Information</b>:
                    <ul>
                        <li>Display Name</li>
                        <li>Profile Picture</li>
                        <li>Twitch ID (used for linking purposes only)</li>
                    </ul>
                </li>
                <li><b>Community-Specific Data</b>:
                    <ul>
                        <li>Player EXP</li>
                        <li>Cards and card designs</li>
                        <li>User Level</li>
                    </ul>
                </li>
            </ul>

            <h3>How We Use Your Information</h3>
            <p>The information we collect is used to enhance your experience on the Website. Specifically, we use it to:</p>
            <ul>
                <li>Display personalized information, such as your Player EXP, level, and collected cards.</li>
                <li>Enable interactive community features and activities tied to your account.</li>
                <li>Improve and develop our services and offerings.</li>
            </ul>

            <h3>How We Protect Your Information</h3>
            <p>We take the security of your data seriously and implement the following measures:</p>
            <ul>
                <li>Encryption of sensitive data during transmission.</li>
                <li>Secure storage of information in a protected local database.</li>
                <li>Regular updates to our system to address potential security vulnerabilities.</li>
            </ul>

            <h3>Sharing of Information</h3>
            <p>We do not sell, trade, or rent your personal information to third parties. Your information is only shared under the following circumstances:</p>
            <ul>
                <li><b>With Your Consent</b>: If you agree to share information for specific features or events.</li>
                <li><b>Legal Obligations</b>: If required by law to disclose information in compliance with legal processes or authorities.</li>
            </ul>

            <h3>Cookies and Tracking Technologies</h3>
            <p>We may use cookies or similar technologies to improve your experience on the Website. These are used to:</p>
            <ul>
                <li>Remember your preferences and login sessions.</li>
                <li>Analyze Website performance and usage trends.</li>
            </ul>
            <p>You can adjust your browser settings to disable cookies if desired; however, some features of the Website may not function as intended.</p>

            <h3>Third-Party Links</h3>
            <p>Our Website may contain links to third-party websites or services. Please note that we are not responsible for the privacy practices of these external sites. We encourage you to review their privacy policies before providing any personal information.</p>

            <h3>Your Rights</h3>
            <p>As a user, you have the following rights regarding your data:</p>
            <ul>
                <li><b>Access and Update</b>: You can view and update your community-related data through the Website.</li>
                <li><b>Deletion</b>: You can request the deletion of your community-related data by contacting us.</li>
            </ul>

            <h3>Changes to This Privacy Policy</h3>
            <p>We may update this Privacy Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. The effective date at the top of this page will be updated accordingly.</p>

            {/* <h3>Contact Us</h3>
            <p>If you have any questions or concerns about this Privacy Policy, please contact us at:</p>
            <p>Email: [Insert Contact Email]<br />
            Website: [Insert Website URL]</p> */}
          </Tile>
        </div>
      </div>
    </main>
  )
}

export default Privacy
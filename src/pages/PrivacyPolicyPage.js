import React from 'react';
import ScrollReveal from '../components/ScrollReveal';
import './PrivacyPolicyPage.css';

const PrivacyPolicyPage = () => {
  return (
    <div className="privacy-page">
      <div className="privacy-container">
        <h1>Comprehensive Data Privacy and Security Policy</h1>
        <p className="privacy-subtitle"><strong>VI PI INTERNATIONAL INC., DBA OPEN CREDITS</strong></p>
        <p className="privacy-updated"><strong>Last Updated: February, 2026</strong></p>
        <p className="privacy-alignment">
          Prepared in alignment with applicable U.S. federal and state privacy laws including
          CCPA/CPRA, GDPR, COPPA (as applicable), and global data protection standards governing
          digital education and credit marketplace platforms.
        </p>

        <ScrollReveal variant="fade-up">
          <h2>Section 1: Introduction &amp; Scope</h2>
          <p>
            <strong>VI PI INTERNATIONAL INC., DBA OPEN CREDITS</strong> ("Open Credits," "we," "us," or "our")
            provides digital education infrastructure, academic credit marketplace services, credential
            pathway access, transfer planning tools, and learner guidance technology.
          </p>
          <p>Open Credits operates as:</p>
          <ul>
            <li>A reseller of partner educational courses (including UPI Study and other providers)</li>
            <li>A marketplace and advisory platform for transferable college credits</li>
            <li>A technology platform facilitating course discovery and enrollment</li>
          </ul>
          <p>
            Open Credits does not issue academic transcripts or academic credentials.
            All transcripts and academic records are issued and maintained by partner course
            providers and institutions.
          </p>
          <p>
            Open Credits processes sensitive and regulated information including personally
            identifiable information (PII), enrollment data, platform activity, partner course
            transactions, and communication records.
          </p>
          <p>
            This Comprehensive Data Privacy and Security Policy ("Policy") defines how Open Credits
            collects, uses, protects, retains, and shares such data across all services and jurisdictions.
          </p>
          <p>The Policy applies to:</p>
          <ul>
            <li>All Open Credits platforms and applications</li>
            <li>Learners and users worldwide</li>
            <li>Partner course providers and institutions</li>
            <li>Employees and contractors</li>
            <li>Vendors and subprocessors</li>
          </ul>
          <p>Data governed includes:</p>
          <ul>
            <li>Identity and contact information</li>
            <li>Course enrollments and marketplace purchases</li>
            <li>Partner course participation data</li>
            <li>Transfer goals and mapping information</li>
            <li>Payment transaction identifiers</li>
            <li>Platform usage and analytics</li>
            <li>Communications and support records</li>
          </ul>
          <p>All data is processed and stored within the United States.</p>
          <p>This Policy applies regardless of storage format, location, or lifecycle stage.</p>
        </ScrollReveal>

        <ScrollReveal variant="fade-up">
          <h2>Section 2: Definitions</h2>
          <h4>Personally Identifiable Information (PII)</h4>
          <p>
            Information that identifies or can identify an individual, including name, email, phone,
            IP address, account identifiers, or institutional affiliation.
          </p>
          <h4>Academic Record</h4>
          <p>
            Any record relating to coursework, credits, credentials, transfer mapping, or educational
            outcomes maintained by partner providers or institutions and referenced within Open Credits systems.
          </p>
          <h4>Learner Data</h4>
          <p>All PII and enrollment or platform data associated with a user of Open Credits services.</p>
          <h4>User</h4>
          <p>
            Any individual using Open Credits services including learners, prospective students,
            advisors, or administrators.
          </p>
          <h4>Partner Institution</h4>
          <p>
            Any college, university, registrar, or education entity interacting with Open Credits
            for credit or credential recognition.
          </p>
          <h4>Course Provider</h4>
          <p>
            A third-party educational organization offering courses or credentials through the
            Open Credits marketplace.
          </p>
          <h4>Service Provider / Vendor</h4>
          <p>Any entity processing data on behalf of Open Credits.</p>
          <h4>De-Identified Data</h4>
          <p>Data stripped of identifiers so individuals cannot be reasonably identified.</p>
          <h4>Data Breach</h4>
          <p>Unauthorized access, disclosure, or loss of protected data.</p>
          <h4>Encryption</h4>
          <p>Protection of data using cryptographic methods such as AES-256 or TLS.</p>
          <h4>Data Subject</h4>
          <p>An identifiable individual whose data is processed.</p>
        </ScrollReveal>

        <ScrollReveal variant="fade-up">
          <h2>Section 3: Legal Framework and Governing Laws</h2>
          <p>Open Credits operates under multiple privacy and consumer data protection laws.</p>

          <h3>CCPA / CPRA (California)</h3>
          <p>California residents may:</p>
          <ul>
            <li>Access personal data</li>
            <li>Request deletion</li>
            <li>Restrict processing</li>
          </ul>
          <p>Open Credits does not sell or share personal data for advertising.</p>

          <h3>GDPR (EU/EEA/UK)</h3>
          <p>International users have rights to:</p>
          <ul>
            <li>Access</li>
            <li>Rectification</li>
            <li>Erasure</li>
            <li>Restriction</li>
            <li>Portability</li>
            <li>Objection</li>
          </ul>
          <p>Cross-border transfers occur to U.S. systems with safeguards.</p>

          <h3>COPPA (Children)</h3>
          <p>Services are intended for users aged 13 and older.</p>
          <p>Open Credits does not knowingly collect data from children under 13.</p>

          <h3>Jurisdiction</h3>
          <ul>
            <li>Primary governing state: Wyoming</li>
            <li>Arbitration venue: Menlo Park, California</li>
            <li>International jurisdiction: California, USA</li>
          </ul>
          <p>Where laws overlap, Open Credits applies the strictest standard.</p>
        </ScrollReveal>

        <ScrollReveal variant="fade-up">
          <h2>Section 4: Data Collection and Classification</h2>
          <p>Open Credits collects data through:</p>
          <ul>
            <li>User registration</li>
            <li>Marketplace course purchases</li>
            <li>Platform activity</li>
            <li>Transactions</li>
            <li>Communications</li>
            <li>Advisory interactions</li>
          </ul>

          <p>Categories include:</p>
          <ul>
            <li><strong>Identity Data</strong> — Name, email, phone.</li>
            <li><strong>Enrollment Data</strong> — Courses purchased, partner enrollments.</li>
            <li><strong>Transfer Planning Data</strong> — Goals, institutions, pathways.</li>
            <li><strong>Authentication Data</strong> — Login credentials, tokens.</li>
            <li><strong>Technical Data</strong> — IP, device, session logs.</li>
            <li><strong>Payment Data</strong> — Transaction identifiers via processors.</li>
            <li><strong>Communication Data</strong> — Messages, support records.</li>
          </ul>

          <h3>Data Classification Levels</h3>
          <table className="privacy-tier-table">
            <thead>
              <tr>
                <th>Tier</th>
                <th>Classification</th>
                <th>Examples</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Tier 1</td>
                <td>Restricted</td>
                <td>PII and enrollment data</td>
              </tr>
              <tr>
                <td>Tier 2</td>
                <td>Confidential</td>
                <td>Communications and support data</td>
              </tr>
              <tr>
                <td>Tier 3</td>
                <td>Internal</td>
                <td>Operational analytics and logs</td>
              </tr>
              <tr>
                <td>Tier 4</td>
                <td>De-Identified</td>
                <td>Aggregated statistics</td>
              </tr>
            </tbody>
          </table>
        </ScrollReveal>

        <ScrollReveal variant="fade-up">
          <h2>Section 5: Use, Purpose, Limitation, and Prohibited Activities</h2>
          <p>Open Credits uses data solely to:</p>
          <ul>
            <li>Create and manage accounts</li>
            <li>Enable marketplace purchases</li>
            <li>Provide course access</li>
            <li>Deliver academic guidance</li>
            <li>Support transfer planning</li>
            <li>Communicate with users</li>
            <li>Maintain security</li>
            <li>Improve platform services</li>
          </ul>
          <p>Open Credits acts as reseller and platform intermediary.</p>

          <h3>Strict Purpose Limitation</h3>
          <p>Educational and marketplace data is never used for advertising resale or profiling.</p>

          <h3>Prohibited Activities</h3>
          <p>Open Credits prohibits:</p>
          <ul>
            <li>Selling personal data</li>
            <li>Behavioral advertising</li>
            <li>Marketing profiling</li>
            <li>Secondary commercial use</li>
            <li>Unauthorized disclosure</li>
          </ul>
        </ScrollReveal>

        <ScrollReveal variant="fade-up">
          <h2>Section 6: Rights of Users and Partners</h2>
          <p>Users may request:</p>
          <ul>
            <li>Access</li>
            <li>Correction</li>
            <li>Deletion</li>
            <li>Restriction</li>
            <li>Portability</li>
            <li>Objection</li>
          </ul>
          <p>Requests: <a href="mailto:privacy@opencredits.org">privacy@opencredits.org</a></p>
          <p>Response timelines:</p>
          <ul>
            <li>GDPR: 30 days</li>
            <li>CCPA: 45 days</li>
            <li>General: 30 days</li>
          </ul>
          <p>Partner providers and institutions may request:</p>
          <ul>
            <li>Data inventories</li>
            <li>Vendor lists</li>
            <li>Security documentation</li>
          </ul>
        </ScrollReveal>

        <ScrollReveal variant="fade-up">
          <h2>Section 7: Vendor and Subprocessor Management</h2>
          <p>All vendors must:</p>
          <ul>
            <li>Sign Data Processing Agreements</li>
            <li>Use data only under instruction</li>
            <li>Apply encryption</li>
            <li>Restrict access</li>
            <li>Notify breaches within 72 hours</li>
          </ul>
          <p>Vendors may not:</p>
          <ul>
            <li>Sell data</li>
            <li>Retain data post-contract</li>
            <li>Use data for marketing</li>
          </ul>
          <p>Vendor registry maintained internally.</p>
        </ScrollReveal>

        <ScrollReveal variant="fade-up">
          <h2>Section 8: Minor Data and Age Requirements</h2>
          <p>Open Credits services are intended for users aged 13+.</p>
          <p>If data from a child under 13 is discovered:</p>
          <ul>
            <li>Data collection ceases</li>
            <li>Records deleted</li>
            <li>Account removed</li>
          </ul>
          <p>Minor data is never used for analytics or marketing.</p>
        </ScrollReveal>

        <ScrollReveal variant="fade-up">
          <h2>Section 9: Access, Correction, and Deletion Procedures</h2>
          <p>Requests submitted via <a href="mailto:privacy@opencredits.org">privacy@opencredits.org</a>.</p>
          <p>Identity verification required.</p>
          <p>Open Credits will:</p>
          <ul>
            <li>Provide data copies</li>
            <li>Correct errors</li>
            <li>Delete data where lawful</li>
          </ul>
          <p>Deletion may be limited where:</p>
          <ul>
            <li>Transaction records required</li>
            <li>Partner enrollment records exist</li>
            <li>Legal retention applies</li>
          </ul>
          <p>Requests logged 6 years.</p>
        </ScrollReveal>

        <ScrollReveal variant="fade-up">
          <h2>Section 10: Data Security Standards</h2>
          <p>Open Credits security controls include:</p>
          <ul>
            <li><strong>Encryption</strong> — AES-256 at rest, TLS in transit.</li>
            <li><strong>Access Control</strong> — Role-based permissions.</li>
            <li><strong>Infrastructure</strong> — Secure U.S. cloud hosting.</li>
            <li><strong>Logging</strong> — Access and activity monitoring.</li>
            <li><strong>Development Security</strong> — Secure coding practices.</li>
            <li><strong>Endpoint Protection</strong> — Controlled device access.</li>
            <li><strong>Training</strong> — Periodic privacy/security training.</li>
          </ul>
        </ScrollReveal>

        <ScrollReveal variant="fade-up">
          <h2>Section 11: Data Breach Response</h2>
          <p>A breach includes unauthorized access or disclosure.</p>
          <p>Response:</p>
          <ul>
            <li>Detection</li>
            <li>Containment</li>
            <li>Investigation</li>
            <li>Notification</li>
            <li>Remediation</li>
          </ul>
          <p>Notifications:</p>
          <ul>
            <li>Users: as required by law</li>
            <li>Partners: without delay</li>
            <li>Regulators: where required</li>
          </ul>
        </ScrollReveal>

        <ScrollReveal variant="fade-up">
          <h2>Section 12: Record Retention and Destruction</h2>
          <p>Standard retention:</p>
          <ul>
            <li>Enrollment and account data: 7 years</li>
            <li>Consent logs: 6 years</li>
            <li>Audit logs: 6 years</li>
            <li>Communications: 3 years</li>
            <li>Technical logs: 1 year</li>
          </ul>
          <p>Partner providers maintain academic records separately.</p>
          <p>After retention:</p>
          <ul>
            <li>Secure deletion</li>
            <li>Backup purge</li>
            <li>Vendor certification</li>
          </ul>
          <p>Legal holds override deletion.</p>
        </ScrollReveal>

        <ScrollReveal variant="fade-up">
          <h2>Section 13: Cookies and Tracking Technologies</h2>
          <p>Open Credits uses limited cookies:</p>
          <ul>
            <li><strong>Strictly Necessary</strong> — Authentication.</li>
            <li><strong>Functional</strong> — Preferences.</li>
            <li><strong>Analytics</strong> — Usage trends.</li>
          </ul>
          <p>No advertising or cross-site tracking cookies.</p>
          <p>Users may disable cookies via browser settings.</p>
        </ScrollReveal>

        <ScrollReveal variant="fade-up">
          <h2>Section 14: Partner and Institutional Audit Readiness</h2>
          <p>Partners may request:</p>
          <ul>
            <li>Data inventories</li>
            <li>Security documentation</li>
            <li>Vendor lists</li>
            <li>Retention schedules</li>
            <li>Incident summaries</li>
          </ul>
          <p>Open Credits maintains:</p>
          <ul>
            <li>Processing records</li>
            <li>Access logs</li>
            <li>Compliance documentation</li>
          </ul>
          <p>Requests: <a href="mailto:privacy@opencredits.org">privacy@opencredits.org</a></p>
        </ScrollReveal>

        <ScrollReveal variant="fade-up">
          <h2>Section 15: International Data Transfers</h2>
          <p>All data stored in United States.</p>
          <p>International users consent to U.S. processing.</p>
          <p>Safeguards include:</p>
          <ul>
            <li>Encryption</li>
            <li>Access controls</li>
            <li>Contractual protections</li>
          </ul>
          <p>GDPR rights available to international users.</p>
        </ScrollReveal>

        <ScrollReveal variant="fade-up">
          <h2>Section 16: Partner Oversight and DPIAs</h2>
          <p>Partner providers may:</p>
          <ul>
            <li>Review processing</li>
            <li>Request documentation</li>
            <li>Audit data practices</li>
          </ul>
          <p>Open Credits maintains:</p>
          <ul>
            <li>Processing records</li>
            <li>Risk assessments</li>
            <li>Compliance documentation</li>
          </ul>
        </ScrollReveal>

        <ScrollReveal variant="fade-up">
          <h2>Section 17: User Rights Workflows</h2>
          <p>Requests may include:</p>
          <ul>
            <li>Access</li>
            <li>Correction</li>
            <li>Deletion</li>
            <li>Portability</li>
            <li>Restriction</li>
            <li>Objection</li>
          </ul>
          <p>Workflow:</p>
          <ul>
            <li>Submission</li>
            <li>Verification</li>
            <li>Processing</li>
            <li>Response</li>
            <li>Logging</li>
          </ul>
          <p>Denied requests include explanation.</p>
        </ScrollReveal>

        <ScrollReveal variant="fade-up">
          <h2>Section 18: Policy Updates and Notifications</h2>
          <p>Open Credits may update this Policy.</p>
          <ul>
            <li><strong>Material changes</strong> — 30-day notice.</li>
            <li><strong>Operational updates</strong> — Posted notice.</li>
            <li><strong>Emergency updates</strong> — Immediate notice.</li>
          </ul>
          <p>Notifications via:</p>
          <ul>
            <li>Email</li>
            <li>Platform alerts</li>
            <li>Website</li>
          </ul>
        </ScrollReveal>

        <ScrollReveal variant="fade-up">
          <div className="privacy-contact-block">
            <p><strong>Contact — Privacy Office</strong></p>
            <p>
              VI PI INTERNATIONAL INC., DBA OPEN CREDITS<br />
              30 N Gould St Ste R<br />
              Sheridan, WY 82801
            </p>
            <p>Email: <a href="mailto:privacy@opencredits.org">privacy@opencredits.org</a></p>
            <p>Support: <a href="mailto:support@opencredits.org">support@opencredits.org</a></p>
          </div>
        </ScrollReveal>

        <ScrollReveal variant="fade-up">
          <div className="privacy-final-note">
            <p>
              <strong>
                By using Open Credits Services, you confirm acceptance of this Privacy Policy.
              </strong>
            </p>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;

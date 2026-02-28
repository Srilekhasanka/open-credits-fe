import React from 'react';
import SEO from '../components/SEO';
import ScrollReveal from '../components/ScrollReveal';
import './TermsPage.css';

const TermsPage = () => {
  return (
    <div className="terms-page">
      <SEO
        title="Terms of Service"
        description="Read the Open Credits terms of service and user agreement."
        canonicalPath="/terms"
      />
      <div className="terms-container">
        <h1>Terms and Conditions</h1>
        <p className="terms-updated"><strong>Last Updated: February 2026</strong></p>

        <p>
          Welcome to Open Credits, operated by <strong>VI PI INTERNATIONAL INC., DBA OPEN CREDITS</strong>
          <br />
          ("Open Credits," "we," "us," or "our"). By accessing or using our website, platform,
          courses, tools, marketplace, or related services (collectively, the "Services"), you
          agree to be legally bound by these Terms and Conditions ("Terms").
        </p>
        <p>If you do not agree, you must discontinue use immediately.</p>
        <p>
          These Terms constitute a binding agreement between you and Open Credits governing all
          Services provided via <strong>opencredits.org</strong> and affiliated platforms.
        </p>

        <div className="terms-contact-block">
          <p><strong>Contact:</strong></p>
          <p>Email: <a href="https://mail.google.com/mail/?view=cm&to=support@opencredits.org" target="_blank" rel="noopener noreferrer">support@opencredits.org</a></p>
          <p>
            Mailing Address:<br />
            VI PI INTERNATIONAL INC. DBA OPEN CREDITS<br />
            517 Glenwood Ave. Unit H, Menlo Park, CA, United States - 94025.
          </p>
        </div>

        <ScrollReveal variant="fade-up">
          <h2>1. Eligibility</h2>
          <p>To use Services, you affirm:</p>
          <ul>
            <li>You are at least 13 years old</li>
            <li>If under 18, you have parental/guardian consent</li>
            <li>You have legal capacity to agree to these Terms</li>
            <li>You use Services lawfully</li>
          </ul>
          <p>Accounts violating eligibility may be terminated.</p>
        </ScrollReveal>

        <ScrollReveal variant="fade-up">
          <h2>2. Account Registration</h2>
          <p>You agree to:</p>
          <ul>
            <li>Provide accurate information</li>
            <li>Keep credentials secure</li>
            <li>Notify unauthorized access</li>
          </ul>
          <p>You may not:</p>
          <ul>
            <li>Share accounts</li>
            <li>Use false identity</li>
          </ul>
          <p>Open Credits may suspend violating accounts.</p>
        </ScrollReveal>

        <ScrollReveal variant="fade-up">
          <h2>3. Services Description</h2>
          <p>Open Credits provides:</p>
          <ul>
            <li>Marketplace access to transferable college credit courses</li>
            <li>Academic pathway and transfer guidance</li>
            <li>Course recommendations and planning tools</li>
            <li>Access to partner course providers including UPI Study</li>
          </ul>
          <p>Open Credits acts as both:</p>
          <ul>
            <li>Reseller of partner courses (including UPI Study)</li>
            <li>Distributor of partner educational content</li>
            <li>Guidance and advisory platform</li>
          </ul>
          <h3>Service Limitations</h3>
          <ul>
            <li>No credit transfer guarantee</li>
            <li>Not a degree institution</li>
            <li>Credits accepted at institutional discretion</li>
            <li>Partners issue transcripts</li>
            <li>Users must verify transfer eligibility</li>
          </ul>
        </ScrollReveal>

        <ScrollReveal variant="fade-up">
          <h2>4. Pricing and Payment</h2>
          <ul>
            <li>Payment required at purchase</li>
            <li>USD pricing</li>
            <li>Taxes may apply</li>
          </ul>
          <p>
            Open Credits does not store card data. Payments processed by third-party processors.
          </p>
          <p>Prices may change without affecting past purchases.</p>
        </ScrollReveal>

        <ScrollReveal variant="fade-up">
          <h2>5. Refund Policy (No Refunds)</h2>
          <p><strong>All sales are final.</strong></p>
          <p>
            Open Credits maintains a strict no-refund policy identical to UPI Study.
          </p>
          <p>No refunds for:</p>
          <ul>
            <li>Course purchases</li>
            <li>Bundles</li>
            <li>Marketplace courses</li>
            <li>Transfer ineligibility</li>
            <li>Change of institution or plan</li>
            <li>Dissatisfaction</li>
            <li>Non-completion</li>
          </ul>
          <h3>Reseller Notice</h3>
          <p>
            Open Credits resells courses from partner providers including UPI Study.
            Open Credits is not the course issuer or transcript provider.
          </p>
          <div className="terms-disclaimer">
            <strong>Required Disclaimer</strong>
            <p>
              Courses cannot be refunded. Please consult the Open Credits advising team before
              purchasing courses for transfer purposes. Any course purchased without consultation
              will not be eligible for refund after purchase.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal variant="fade-up">
          <h2>6. Intellectual Property</h2>
          <p>
            All platform content, software, tools, branding, and materials are owned by Open
            Credits or licensors.
          </p>
          <p>Permitted: personal use only.</p>
          <p>Prohibited:</p>
          <ul>
            <li>Copying</li>
            <li>Redistribution</li>
            <li>Commercial use</li>
            <li>Reverse engineering</li>
          </ul>
          <p>Violations may result in termination and legal action.</p>
        </ScrollReveal>

        <ScrollReveal variant="fade-up">
          <h2>7. Prohibited Conduct</h2>
          <p>You may not:</p>
          <ul>
            <li>Hack or disrupt systems</li>
            <li>Access other accounts</li>
            <li>Share or resell content</li>
            <li>Provide false info</li>
            <li>Upload unlawful content</li>
            <li>Misrepresent identity</li>
          </ul>
          <p>Violations may lead to termination without refund.</p>
        </ScrollReveal>

        <ScrollReveal variant="fade-up">
          <h2>8. Limitation of Liability</h2>
          <p>
            To the fullest extent permitted by law, Open Credits is not liable for:
          </p>
          <ul>
            <li>Credit acceptance outcomes</li>
            <li>Academic or financial results</li>
            <li>Institutional decisions</li>
            <li>Partner course issues</li>
            <li>Transfer eligibility</li>
            <li>Loss of opportunity</li>
          </ul>
          <p>Total liability limited to amount paid to Open Credits.</p>
        </ScrollReveal>

        <ScrollReveal variant="fade-up">
          <h2>9. Indemnification</h2>
          <p>You agree to indemnify Open Credits from claims arising from:</p>
          <ul>
            <li>Breach of Terms</li>
            <li>Misuse of Services</li>
            <li>Disputes with institutions</li>
            <li>Disputes with course providers</li>
          </ul>
          <p>This survives termination.</p>
        </ScrollReveal>

        <ScrollReveal variant="fade-up">
          <h2>10. Governing Law &amp; Disputes</h2>
          <p>
            These Terms are governed by the laws of Wyoming, United States.
            For international users, jurisdiction is California, USA.
          </p>
          <h3>Arbitration</h3>
          <ul>
            <li>All disputes resolved by binding arbitration.</li>
            <li>Venue: Menlo Park, California</li>
            <li>AAA rules apply.</li>
            <li>Each party bears own costs unless law requires otherwise.</li>
          </ul>
          <h3>Class Action Waiver</h3>
          <p>Disputes must be individual. No class actions.</p>
        </ScrollReveal>

        <ScrollReveal variant="fade-up">
          <h2>11. Termination</h2>
          <p>Open Credits may suspend or terminate access if:</p>
          <ul>
            <li>Terms violated</li>
            <li>Misuse occurs</li>
            <li>Payment issues arise</li>
            <li>Legal obligations require</li>
          </ul>
          <p>You may terminate by closing account.</p>
          <p>No refunds upon termination.</p>
        </ScrollReveal>

        <ScrollReveal variant="fade-up">
          <h2>12. Changes to Terms</h2>
          <p>We may update Terms anytime.</p>
          <p>Updates effective upon posting.</p>
          <p>Continued use = acceptance.</p>
        </ScrollReveal>

        <ScrollReveal variant="fade-up">
          <h2>13. Miscellaneous</h2>
          <ul>
            <li>Entire agreement</li>
            <li>Severability</li>
            <li>Waiver</li>
            <li>Assignment</li>
            <li>Force majeure</li>
          </ul>
          <p>All standard clauses apply.</p>
        </ScrollReveal>

        <ScrollReveal variant="fade-up">
          <h2>14. Contact</h2>
          <p>
            Open Credits<br />
            VI PI INTERNATIONAL INC. DBA OPEN CREDITS<br />
            30 N Gould St Ste R<br />
            Sheridan, WY 82801<br />
            <a href="mailto:support@opencredits.org">support@opencredits.org</a>
          </p>
        </ScrollReveal>

        <ScrollReveal variant="fade-up">
          <h2>15. Privacy</h2>
          <p>Use of Services subject to Open Credits Privacy Policy.</p>
        </ScrollReveal>

        <ScrollReveal variant="fade-up">
          <h2>16. Communications</h2>
          <h3>Transactional</h3>
          <p>Account, billing, course, and platform notices.</p>
          <h3>Marketing</h3>
          <p>Promotions and updates.</p>
          <h3>SMS/WhatsApp</h3>
          <p>
            You consent to receive service or marketing messages via SMS or WhatsApp.
            You may opt out anytime.
          </p>
        </ScrollReveal>

        <ScrollReveal variant="fade-up">
          <div className="terms-final-note">
            <p>
              <strong>
                By using Open Credits Services, you confirm acceptance of these Terms.
              </strong>
            </p>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
};

export default TermsPage;

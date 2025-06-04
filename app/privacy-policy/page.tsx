import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="mb-8">
          <Link
            href="/"
            className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
          >
            ← Back to home
          </Link>
        </div>

        <Card className="shadow-xl border-0">
          <CardContent className="p-8 md:p-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-8">
              Privacy Policy
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-8">
              Last updated: {new Date().toLocaleDateString()}
            </p>

            <div className="space-y-8 text-gray-700 dark:text-gray-300">
              <section>
                <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
                  1. Introduction
                </h2>
                <p className="leading-relaxed">
                  Welcome to Nextjs Starter Kit (&aposwe,&apos &aposour,&apos or
                  &aposus&apos). We are committed to protecting your personal
                  information and your right to privacy. This Privacy Policy
                  explains how we collect, use, disclose, and safeguard your
                  information when you use our service.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
                  2. Information We Collect
                </h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium mb-2">
                      Personal Information
                    </h3>
                    <p className="leading-relaxed">
                      When you register for an account, we collect:
                    </p>
                    <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
                      <li>Name</li>
                      <li>Email address</li>
                      <li>
                        Google account information (when using Google Sign-In)
                      </li>
                      <li>Organization details</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-2">
                      Pass Information
                    </h3>
                    <p className="leading-relaxed">
                      When you create Apple Passes, we store:
                    </p>
                    <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
                      <li>Pass content and metadata</li>
                      <li>Pass templates and designs</li>
                      <li>Pass usage analytics</li>
                      <li>Pass installation data</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-2">
                      Automatically Collected Information
                    </h3>
                    <p className="leading-relaxed">
                      We automatically collect certain information when you use
                      our service:
                    </p>
                    <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
                      <li>IP address</li>
                      <li>Browser type and version</li>
                      <li>Device information</li>
                      <li>Usage data and analytics</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
                  3. How We Use Your Information
                </h2>
                <p className="leading-relaxed mb-3">
                  We use your information to:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Provide and maintain our service</li>
                  <li>Create and manage your account</li>
                  <li>Generate and distribute Apple Passes</li>
                  <li>Send you important updates and notifications</li>
                  <li>Respond to your inquiries and support requests</li>
                  <li>Monitor and analyze usage patterns</li>
                  <li>Improve our service and develop new features</li>
                  <li>Comply with legal obligations</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
                  4. Data Sharing and Disclosure
                </h2>
                <p className="leading-relaxed mb-3">
                  We may share your information in the following situations:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>
                    <strong>With your consent:</strong> We may share your
                    information for any purpose with your explicit consent
                  </li>
                  <li>
                    <strong>Service providers:</strong> We share data with
                    third-party vendors who assist in providing our services
                  </li>
                  <li>
                    <strong>Legal requirements:</strong> We may disclose
                    information if required by law or valid legal process
                  </li>
                  <li>
                    <strong>Business transfers:</strong> In connection with any
                    merger, sale, or acquisition
                  </li>
                  <li>
                    <strong>Protection of rights:</strong> To protect our
                    rights, privacy, safety, or property
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
                  5. Third-Party Services
                </h2>
                <p className="leading-relaxed">
                  We use the following third-party services that may collect
                  information:
                </p>
                <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
                  <li>
                    <strong>Google Sign-In:</strong> For authentication services
                  </li>
                  <li>
                    <strong>Payment processors:</strong> For handling
                    subscription payments
                  </li>
                  <li>
                    <strong>Analytics services:</strong> To understand service
                    usage
                  </li>
                </ul>
                <p className="mt-3 leading-relaxed">
                  These services have their own privacy policies governing the
                  use of your information.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
                  6. Data Security
                </h2>
                <p className="leading-relaxed">
                  We implement appropriate technical and organizational security
                  measures to protect your personal information. However, no
                  method of transmission over the Internet or electronic storage
                  is 100% secure, and we cannot guarantee absolute security.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
                  7. Data Retention
                </h2>
                <p className="leading-relaxed">
                  We retain your personal information for as long as necessary
                  to provide our services and fulfill the purposes outlined in
                  this Privacy Policy. We will also retain and use your
                  information to comply with legal obligations, resolve
                  disputes, and enforce our agreements.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
                  8. Your Rights
                </h2>
                <p className="leading-relaxed mb-3">
                  Depending on your location, you may have the following rights:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>
                    <strong>Access:</strong> Request access to your personal
                    information
                  </li>
                  <li>
                    <strong>Correction:</strong> Request correction of
                    inaccurate information
                  </li>
                  <li>
                    <strong>Deletion:</strong> Request deletion of your personal
                    information
                  </li>
                  <li>
                    <strong>Portability:</strong> Request a copy of your data in
                    a portable format
                  </li>
                  <li>
                    <strong>Objection:</strong> Object to certain processing of
                    your information
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
                  9. Children&aposs Privacy
                </h2>
                <p className="leading-relaxed">
                  Our service is not intended for children under 13 years of
                  age. We do not knowingly collect personal information from
                  children under 13. If you are a parent or guardian and believe
                  your child has provided us with personal information, please
                  contact us.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
                  10. International Data Transfers
                </h2>
                <p className="leading-relaxed">
                  Your information may be transferred to and processed in
                  countries other than your country of residence. These
                  countries may have data protection laws that are different
                  from the laws of your country.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
                  11. Updates to This Policy
                </h2>
                <p className="leading-relaxed">
                  We may update this Privacy Policy from time to time. We will
                  notify you of any changes by posting the new Privacy Policy on
                  this page and updating the &aposLast updated&apos date.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
                  12. Contact Us
                </h2>
                <p className="leading-relaxed">
                  If you have any questions about this Privacy Policy or our
                  data practices, please contact us at:
                </p>
                <div className="mt-3 space-y-1">
                  <p>Email: privacy@applepass.com</p>
                  <p>Address: [Your Company Address]</p>
                </div>
              </section>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

import ContactPageClient from './ContactPageClient'

export const metadata = {
  title: 'Contact Us - GrenadaSearch.com',
  description: 'Get in touch with GrenadaSearch.com. Questions about listings, advertising, or general inquiries.',
}

export default async function ContactPage({ searchParams }) {
  const resolvedParams = await searchParams
  const defaultSubject = resolvedParams?.subject || ''

  return <ContactPageClient defaultSubject={defaultSubject} />
}

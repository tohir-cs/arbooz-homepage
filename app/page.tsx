import { redirect } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';

export default function HomePage() {
  redirect({ href: '/', locale: routing.defaultLocale });
}

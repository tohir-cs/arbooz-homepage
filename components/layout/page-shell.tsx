import { Navbar } from '@/components/layout/navbar';
import { MobileNav } from '@/components/layout/mobile-nav';
import { Footer } from '@/components/layout/footer';
import { MobileOrderBar } from '@/components/layout/mobile-order-bar';

type PageShellProps = {
  children: React.ReactNode;
  /**
   * When true the navbar starts transparent over a hero image (homepage).
   * Inner pages set this false so the navbar is solid from the top — their
   * hero sections are short and sit on the ivory background, not full-bleed
   * imagery, so a transparent navbar would be unreadable.
   */
  transparentNav?: boolean;
};

/**
 * Shared chrome for every page: desktop navbar, mobile navbar, footer, and
 * the sticky mobile order bar. Centralizing this here means each route only
 * renders its own <main> content and inherits identical chrome — no
 * duplicated imports, consistent behavior site-wide.
 */
export function PageShell({ children, transparentNav = false }: PageShellProps) {
  return (
    <>
      <Navbar transparent={transparentNav} />
      <MobileNav transparent={transparentNav} />

      {children}

      <div id="site-footer">
        <Footer />
      </div>

      <MobileOrderBar />
    </>
  );
}

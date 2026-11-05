import { useEffect } from 'react';
import { scrollToHash, useLocation } from './router';
import Header from './components/Header';
import Footer from './components/Footer';
import WhatsAppFab from './components/WhatsAppFab';
import Home from './pages/Home';
import Contact from './pages/Contact';

function App() {
  const loc = useLocation();
  const isContact = loc.pathname.replace(/\/+$/, '') === '/iletisim';

  // Sayfa değişince en üste ya da istenen bölüme git
  useEffect(() => {
    const t = setTimeout(() => {
      if (!scrollToHash(loc.hash, 'auto')) window.scrollTo(0, 0);
    }, 30);
    return () => clearTimeout(t);
  }, [loc.key, loc.hash]);

  return (
    <>
      <Header />
      <main>{isContact ? <Contact search={loc.search} /> : <Home />}</main>
      <Footer />
      {!isContact && <WhatsAppFab />}
    </>
  );
}

export default App;

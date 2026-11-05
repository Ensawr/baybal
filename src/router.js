import { useEffect, useState } from 'react';

// Projeye ek paket kurmadan çalışan küçük bir yönlendirici.
const NAV_EVENT = 'baybal:navigate';

function read() {
  const { pathname, search, hash } = window.location;
  return { pathname, search, hash, key: Date.now() + Math.random() };
}

export function scrollToHash(hash, behavior = 'smooth') {
  if (!hash) return false;
  const el = document.getElementById(decodeURIComponent(hash.slice(1)));
  if (!el) return false;
  el.scrollIntoView({ behavior, block: 'start' });
  return true;
}

export function navigate(to) {
  const url = new URL(to, window.location.origin);
  const next = url.pathname + url.search + url.hash;
  const samePage = url.pathname === window.location.pathname && url.search === window.location.search;

  if (samePage && url.hash) {
    window.history.replaceState(null, '', next);
    scrollToHash(url.hash);
    return;
  }
  window.history.pushState(null, '', next);
  window.dispatchEvent(new Event(NAV_EVENT));
}

export function useLocation() {
  const [loc, setLoc] = useState(read);
  useEffect(() => {
    const update = () => setLoc(read());
    window.addEventListener('popstate', update);
    window.addEventListener(NAV_EVENT, update);
    return () => {
      window.removeEventListener('popstate', update);
      window.removeEventListener(NAV_EVENT, update);
    };
  }, []);
  return loc;
}

export function Link({ to, onClick, target, ...rest }) {
  const handle = (e) => {
    if (onClick) onClick(e);
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || target) return;
    e.preventDefault();
    navigate(to);
  };
  return <a href={to} onClick={handle} target={target} {...rest} />;
}

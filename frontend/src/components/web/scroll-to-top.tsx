'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import scrollToTopHandler from '@/src/lib/funcs/scrollToTop';

function ScrollToTop() {
    const pathname = usePathname();
    
    useEffect(() => {
        scrollToTopHandler()
    }, [pathname]);

    return null;
}

export default ScrollToTop;
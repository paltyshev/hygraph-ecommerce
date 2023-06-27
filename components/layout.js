import * as React from 'react';
import { DefaultSeo } from 'next-seo';

import { defaultSeo } from 'next-seo.config';
import Footer from '@/components/footer';
import Header from '@/components/header';
import NavbarBottom from '@/components/navbar-bottom';
import Router from 'next/router';

function Layout({ children, footer, navigation }) {
  if (Router.pathname != '/success')
    return (
      <React.Fragment>
        <DefaultSeo {...defaultSeo} />
        <Header {...navigation} />
        <div className="max-w-7xl mx-auto sm:px-6">{children}</div>
        <Footer {...footer} />
        <NavbarBottom />
      </React.Fragment>
    );
  else {
    return (
      <React.Fragment>
        <DefaultSeo {...defaultSeo} />
        {children}
      </React.Fragment>
    );
  }
}

export default Layout;

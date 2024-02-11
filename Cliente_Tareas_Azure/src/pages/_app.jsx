import '@/styles/globals.css'
import { ThemeProvider } from "@material-tailwind/react";
import { GoogleOAuthProvider } from '@react-oauth/google';

//948585708853-g23e2qe6lahs30shut3umbfh1j5racbv.apps.googleusercontent.com

export default function App({ Component, pageProps }) {

  return (
    <GoogleOAuthProvider
      clientId="948585708853-g23e2qe6lahs30shut3umbfh1j5racbv.apps.googleusercontent.com">
      <ThemeProvider>
        <Component {...pageProps} />
      </ThemeProvider>
    </GoogleOAuthProvider>
  );
}

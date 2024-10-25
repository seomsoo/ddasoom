import './globals.css';

import type { Metadata } from 'next';
import localFont from 'next/font/local';

const nanumRegular = localFont({
  src: '../fonts/NanumSquareNeoOTF-Rg.otf',
  variable: '--font-nanumRegular',
});
const nanumLight = localFont({
  src: '../fonts/NanumSquareNeoOTF-Lt.otf',
  variable: '--font-nanumLight',
});
const nanumBold = localFont({
  src: '../fonts/NanumSquareNeoOTF-Bd.otf',
  variable: '--font-nanumBold',
});
const nanumExtraBold = localFont({
  src: '../fonts/NanumSquareNeoOTF-Eb.otf',
  variable: '--font-nanumExtraBold',
});
const nanumHeavy = localFont({
  src: '../fonts/NanumSquareNeoOTF-Hv.otf',
  variable: '--font-nanumHeavy',
});

const hakgyoansimR = localFont({
  src: '../fonts/Hakgyoansim-Dunggeunmiso-OTF-R.otf',
  variable: '--font-hakgyoansimR',
});

const hakgyoansimB = localFont({
  src: '../fonts/Hakgyoansim-Dunggeunmiso-OTF-B.otf',
  variable: '--font-hakgyoansimB',
});

export const metadata: Metadata = {
  title: 'ddasoom',
  description: 'ssafy 11th project',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${nanumRegular.variable} ${nanumLight.variable} ${nanumBold.variable} ${nanumExtraBold.variable} ${nanumHeavy.variable} ${hakgyoansimR.variable} ${hakgyoansimB.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}

import './globals.css';

import type { Metadata } from 'next';
import localFont from 'next/font/local';

// import useAuth from '@/hooks/useGetToken';
import ReactQueryProvider from '@/utils/reactQueryProvider';
import ReduxProvider from '@/utils/reduxProvider';

const nanumRegular = localFont({
  src: '../../public/fonts/NanumSquareNeoOTF-Rg.otf',
  variable: '--font-nanumRegular',
});
const nanumLight = localFont({
  src: '../../public/fonts/NanumSquareNeoOTF-Lt.otf',
  variable: '--font-nanumLight',
});
const nanumBold = localFont({
  src: '../../public/fonts/NanumSquareNeoOTF-Bd.otf',
  variable: '--font-nanumBold',
});
const nanumExtraBold = localFont({
  src: '../../public/fonts/NanumSquareNeoOTF-Eb.otf',
  variable: '--font-nanumExtraBold',
});
const nanumHeavy = localFont({
  src: '../../public/fonts/NanumSquareNeoOTF-Hv.otf',
  variable: '--font-nanumHeavy',
});

const hakgyoansimR = localFont({
  src: '../../public/fonts/Hakgyoansim-Dunggeunmiso-OTF-R.otf',
  variable: '--font-hakgyoansimR',
});

const hakgyoansimB = localFont({
  src: '../../public/fonts/Hakgyoansim-Dunggeunmiso-OTF-B.otf',
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
  // useAuth();

  return (
    <html lang="ko-KR">
      <body
        className={`${nanumRegular.variable} ${nanumLight.variable} ${nanumBold.variable} ${nanumExtraBold.variable} ${nanumHeavy.variable} ${hakgyoansimR.variable} ${hakgyoansimB.variable} antialiased  flex justify-center items-center min-h-screen`}>
        <div className="w-full max-w-[390px] min-h-screen p-4">
          <ReduxProvider>
            <ReactQueryProvider>{children}</ReactQueryProvider>
          </ReduxProvider>
        </div>
      </body>
    </html>
  );
}

'use client';

export default function LogOutButton() {
  const handleLogout = () => {
    window.ReactNativeWebView?.postMessage(
      JSON.stringify({
        title: 'LOGOUT',
        content: null,
      }),
    );
  };

  return (
    <button onClick={handleLogout} className="p-2 py-3 mt-6 justify-center bg-sub3 text-main4 flex rounded-full">
      로그아웃
    </button>
  );
}

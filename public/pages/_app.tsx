import { type AppType } from "next/app";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import { Sidebar } from "~/components/sidebar";
import { Navbar } from "~/components/navbar";
import { useRouter } from "next/router";
import { SnackbarProvider } from 'material-ui-snackbar-provider'

const MyApp: AppType = ({ Component, pageProps }) => {
  const router = useRouter();
  console.log(router)
  return (
    <SnackbarProvider SnackbarProps={{ autoHideDuration: 4000 }}>

    <div className={`flex flex-col h-full ${router.pathname != '/'?' bg-gradient-to-br from-teal-200 to-purple-300':'bg-white'}   backdrop-blur-lg`}>
   <Navbar/>  
      <div className="flex">
      {router.pathname != '/' &&  <Sidebar />}
    <div className={`${router.pathname != '/'?'w-4/5':'w-full'} rounded-tl-3xl h-screen bg-slate-50 backdrop-blur-lg `}>
      <Component {...pageProps} />
      </div>
      </div>
    </div>
    </SnackbarProvider>
  );
};

export default api.withTRPC(MyApp);

import {Header, LinearProgress} from "@/common/components";
import {Routing} from "@/common/routing";
import s from './App.module.css'
import {ToastContainer} from "react-toastify";
import {useGlobalLoading} from "@/common/hooks";


export const App = () => {
  const isGlobalLoading = useGlobalLoading()
  return (
    <>
      <Header />
      {isGlobalLoading && <LinearProgress/>}
      <main className={s.layout}>
        <Routing />
      </main>
      <ToastContainer />
    </>
  );
};

export default App;

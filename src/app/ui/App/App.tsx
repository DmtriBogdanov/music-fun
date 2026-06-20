import {Header} from "@/common/components";
import {Routing} from "@/common/routing";
import s from './App.module.css'
import {ToastContainer} from "react-toastify";


export const App = () => (
  <>
    <Header />
    <main className={s.layout}>
      <Routing/>
    </main>
    <ToastContainer />
  </>
);

export default App

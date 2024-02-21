import { FunctionComponent } from "react";
import Router from "./routes/Router";
import { useRoutes } from 'react-router-dom';


const App:FunctionComponent=()=>{
  const routing = useRoutes(Router);
  return(
    <>
    {routing}
    </>
  )
}

export default App
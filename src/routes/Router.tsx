import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Login  from '../pages/Login';
import Admin  from '../pages/Admin';
import Site  from '../pages/Site';
import Service  from '../pages/Service';
import Salarie  from '../pages/Salarie';
import CreateAdmin  from '../pages/CreateAdmin';
import DefaultLayout from '../components/pages_layout/DefaultLayout';



const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<DefaultLayout> <Home/> </DefaultLayout>}/>
                <Route path='/login' element={<DefaultLayout> <Login/> </DefaultLayout>}/>
                <Route path='/admin' element={<DefaultLayout> <Admin/> </DefaultLayout>}/>
                <Route path='/site' element={<DefaultLayout> <Site/> </DefaultLayout>}/>
                <Route path='/service' element={<DefaultLayout> <Service/> </DefaultLayout>}/>
                <Route path='/salarie' element={<DefaultLayout> <Salarie/> </DefaultLayout>}/>
                <Route path='/createAdmin' element={<DefaultLayout> <CreateAdmin/> </DefaultLayout>}/>




            </Routes>
        </BrowserRouter>
    );
};

export default Router;
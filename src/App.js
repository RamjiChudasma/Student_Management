import './App.css';
import Header from './Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from 'react-router-dom';

import Adduser from './Adduser';
import Viewuser from './Viewuser';
import Addstudent from './Addstudent';
import Addcourse from './Addcourse';
import Addcontent from './Addcontent';
import Viewcontent from './Viewcontent';
import Viewstudent from './Viewstudent';
import Viewcourse from './Viewcourse';
import Regester from './Regester';
import Dashbord from './Dashbord';
import Login from './Login';
import Protected from './Protected';
import Alldetails from './Alldetails';
import Updatestudent from './Updatestudent';






function App() {

  return (
    <>

      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='home' element=
          {
            <Protected>
              <Header />
            </Protected>
          } />
        <Route path='/dashbord' element=
          {
            <Protected>
              <Dashbord />
            </Protected>
          } />
        <Route path='adduser' element=
          {
            <Protected>
              <Adduser />
            </Protected>
          } />
        <Route path='viewuser' element=
          {<Protected>
            <Viewuser />
          </Protected>

          } />

        <Route path='/addstudent' element=
          {
            <Protected>
              <Addstudent />
            </Protected>
          } />
        <Route path='/addcourse' element=
          {<Protected>
            <Addcourse />
          </Protected>
          } />
        <Route path='/addcontent' element=
          {
            <Protected>
              <Addcontent />
            </Protected>
          } />
        <Route path='/viewcontent' element=
          {<Protected>
            <Viewcontent />
          </Protected>
          } />
        <Route path='/viewstudent' element=
          {<Protected>
            <Viewstudent />
          </Protected>

          } />
        <Route path='/viewcourse' element=
          {<Protected>
            <Viewcourse />
          </Protected>
          } />
        <Route path='/register' element=
          {<Protected>
            <Regester />
          </Protected>
          } />
        <Route path='/alldetails/:id' element=
          {<Protected>
            <Alldetails />
          </Protected>
          } />
           <Route path='/updatestudent/:id' element=
          {<Protected>
           <Updatestudent />
          </Protected>
          } />
      </Routes>
  


    </>
  );
}

export default App;

import { useEffect, useState } from 'react';

// Libraries
import { useSelector, useDispatch } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';

// Pages
import Projects from './pages/projects/Projects';
import MyProjectsAndOffers from './pages/myprojectsandoffers/MyProjectsAndOffers';
import TheMessages from './pages/messages/Messages';
import Financials from './pages/financials/Financials';
import Rules from './pages/rules/Rules';
import Support from './pages/support/Support';

// Components
import TopBar from './topbar/TopBar';
import SideBar from './sidebar/SideBar';
import Modals from './Modals';
import SaR from './SaR';
import Sounds from './Sounds';

// Actions
import { Sidebar, Tokens } from 'redux/actions';

// Design
import './app.scss';

interface State {
  Tokens: {
    ac_t: string;
    re_t: string;
  };
  Sidebar: {
    isOpen: boolean;
    page: string;
  };
}

const App: React.FC = () => {
  const dispatch = useDispatch();
  const state = useSelector((state: State) => state);
  const [width, setWidth] = useState(window.innerWidth);

  window.onbeforeunload = () => {
    if (
      state.Tokens.ac_t &&
      state.Tokens.re_t &&
      !sessionStorage.getItem("dont't set")
    ) {
      sessionStorage.setItem('_at', state.Tokens.ac_t);
      sessionStorage.setItem('_rt', state.Tokens.re_t);
    }
  };

  useEffect(() => {
    if (sessionStorage.getItem('long inactivity')) {
      toast.info(
        'دسترسی شما به دلیل عدم فعالیت منقضی شده است. مجددا وارد حساب کاربری خود شوید.'
      );
      sessionStorage.clear();
    }
  }, []);

  useEffect(() => {
    if (sessionStorage.getItem('_at') && sessionStorage.getItem('_rt'))
      dispatch(
        Tokens({
          re_t: sessionStorage.getItem('_rt'),
          ac_t: sessionStorage.getItem('_at'),
        })
      );

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (state.Tokens.re_t && state.Tokens.ac_t) sessionStorage.clear();
  }, [state.Tokens.re_t, state.Tokens.ac_t]);

  useEffect(() => {
    window.addEventListener('resize', () => setWidth(window.innerWidth));
    if (width < 1350 && state.Sidebar.isOpen === true) {
      dispatch(Sidebar({ isOpen: false }));
    }
    if (width >= 1350 && state.Sidebar.isOpen === false) {
      dispatch(Sidebar({ isOpen: true }));
    }
    return () => {
      window.removeEventListener('resize', () => setWidth(window.innerWidth));
    };

    // eslint-disable-next-line
  }, [width]);

  return (
    <div className='wrapper'>
      <SaR />
      <Sounds />
      <Modals />
      <TopBar />
      <div className='main'>
        <div
          className={`sidebar ${
            state.Sidebar.isOpen ? 'sidebar-open' : 'sidebar-close'
          }`}
        >
          <SideBar />
        </div>
        <div className='content'>
          {state.Sidebar.page === 'projects' && <Projects />}
          {state.Sidebar.page === 'myprojectsandoffers' && (
            <MyProjectsAndOffers />
          )}
          {state.Sidebar.page === 'messages' && <TheMessages />}
          {state.Sidebar.page === 'financials' && <Financials />}
          {state.Sidebar.page === 'rules' && <Rules />}
          {state.Sidebar.page === 'support' && <Support />}
        </div>
      </div>
      <ToastContainer
        position='bottom-left'
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        rtl
        pauseOnHover
      />
    </div>
  );
};

export default App;

import React from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './assets/fonts/icomoon/style.css'
import './assets/css/style.css'
import './assets/css/flatpickr.min.css'
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
const Home = React.lazy(() => import('./pages/Home'))
const ArticleDetails = React.lazy(() => import('./pages/ArticleDetails'))
const Setting = React.lazy(() => import('./pages/Setting'))
const NewsFeed = React.lazy(() => import('./pages/NewsFeed'))

const loading =  (
    <>
      <div id="overlayer"></div>
      <div className="loader">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    </>
)


function App() {
  return (
      <BrowserRouter basename={process.env.REACT_APP_BASE_DASHBOARD_URL}>
        <React.Suspense fallback={loading}>
          <Switch>

              <Route
                exact
                path="/article/:id"
                render={(props: object) => <ArticleDetails {...props} />}
            />
              <Route
                  exact
                  path="/setting"
                  render={(props: object) => <Setting {...props} />}
              />
              <Route
                  exact
                  path="/my-news-feed"
                  render={(props: object) => <NewsFeed {...props} />}
              />

            <Route path="/" render={(props: object) => <Home {...props} />} />
          </Switch>
          <ToastContainer hideProgressBar={true} closeOnClick={false} />
        </React.Suspense>
      </BrowserRouter>
  );
}

export default App;

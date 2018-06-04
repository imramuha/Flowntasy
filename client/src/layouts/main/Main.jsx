import React, { Component } from 'react';

/*
Libraries
*/
import { Redirect, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import {withRouter} from 'react-router';

/*
Material UI
*/
import './Main.css';

/*
* States
*/
import { authStatusClear } from '../../actions/authActions';

/*
Components
*/
import Header from '../../components/header/Header';
import HeaderVisitorSign from '../../components/header-visitor-sign/HeaderVisitorSign';
import FixedNavBar from '../../components/fixed-sideNAv/fixedSideNav';
import Offcanvas from '../../components/offcanvas';

/*
Page components
*/
import HomePage from '../../pages/home-page/HomePage';
import NotFoundPage from '../../pages/not-found-page/NotFoundPage';
import SignInPage from '../../pages/sign-in-page/SignInPage';
import SignOutPage from '../../pages/sign-out-page/SignOutPage';
import SignupPage from '../../pages/signup-page/SignupPage';
import AboutUsPage from '../../pages/about-us/AboutUsPage';
import PrivacyPolicyPage from '../../pages/privacy-policy/PrivacyPolicy';
import TermsOfServicePage from '../../pages/terms-of-service/TermsOfService';
/* BACKOFFICE */
import BackofficePage from '../../pages/backoffice-page/BackofficePage';
import UsersTablePage from '../../pages/users-table-page/UsersTablePage';
import CommunitiesTablePage from '../../pages/communities-table-page/CommunitiesTablePage';
import CategoriesTablePage from '../../pages/categories-table-page/CategoriesTablePage';
import PostsTablePage from '../../pages/posts-table-page/PostsTablePage';

/* AUTHED */
import CommunityCreatePage from '../../pages/community-create-page/CommunityCreatePage';
import CommunitiesPage from '../../pages/communities-page/CommunitiesPage';
import PostCreatePage from '../../pages/post-create-page/PostCreatePage';
import PostPage from '../../pages/post-page/PostPage';
import PostsPage from '../../pages/posts-page/PostsPage';
import FeedPage from '../../pages/feed/FeedPage';
import ProfilePage from '../../pages/profile-page/ProfilePage';

function PrivateRoute ({component: Component, authed, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => authed === false
        ? <Component {...props} />
        : <Redirect to={{pathname: '/home'}} />}
    />
  )
}

// nog te doen
function AdminRoute ({component: Component, admin, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => admin === false
        ? <Component {...props} />
        : <Redirect to={{pathname: '/feed'}} />}
    />
  )
}

class Main extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {  
    /* */
    authStatusClear(); 
    /* */
    /* how  can call my role console.log(this.props.role); */
    return (
      <div>
        <Offcanvas />
        <Switch>
          {/* Unauthenticated*/}
          <Route exact path='/' component={()=>(<div className="hPage"><HeaderVisitorSign/><HomePage/></div>)}/>
          <Redirect from="/home" to="/"/>
          <Route path='/about-us' component={()=>(<div><HeaderVisitorSign/><AboutUsPage /></div>)}/>
          <Route path='/terms-of-service' component={()=>(<div className="termsPage"><HeaderVisitorSign/><TermsOfServicePage/></div>)}/>
          <Route path='/privacy-policy' component={()=>(<div className="privacyPage"><HeaderVisitorSign/><PrivacyPolicyPage/></div>)}/>
          <Route path='/signup' component={()=>(<div><HeaderVisitorSign/><SignupPage/></div>)}/>
          <AdminRoute admin={this.props.authenticated} exact path='/signin' component={()=>(<div><HeaderVisitorSign/><SignInPage/></div>)} />

          {/*ADMIN*/}
          <AdminRoute admin={this.props.role !== '5b0621fa6044ae5350afd7fc'} exact path='/backoffice' component={()=>(<div><Header/><BackofficePage/></div>)}/>
          <AdminRoute admin={this.props.role !== '5b0621fa6044ae5350afd7fc'} exact path='/backoffice/categoriesTable' component={()=>(<div><Header/><CategoriesTablePage/></div>)}/>
          <AdminRoute admin={this.props.role !== '5b0621fa6044ae5350afd7fc'} exact path='/backoffice/communitiesTable' component={()=>(<div className="backofficeTableHeader"><Header/><CommunitiesTablePage /></div>)}/>
          <AdminRoute admin={this.props.role !== '5b0621fa6044ae5350afd7fc'} exact path='/backoffice/usersTable' component={()=>(<div><Header/><UsersTablePage/></div>)}/>
          <AdminRoute admin={this.props.role !== '5b0621fa6044ae5350afd7fc'} exact path='/backoffice/postsTable' component={()=>(<div className="backofficeTableHeader"><Header/><PostsTablePage /></div>)}/>
          <AdminRoute admin={this.props.role !== '5b0621fa6044ae5350afd7fc'} exact path='/backoffice/postsTable/:id' component={PostPage}/>

          {/* Authenticated*/}
          <Route path='/signout' component={()=>(<div><HeaderVisitorSign/><SignOutPage/></div>)}/>
          <Route path='/feed' component={()=>(<div><Header/><FeedPage/></div>)}/>
          <Route path='/discover/posts' component={()=>(<div><Header/><PostsPage/></div>)}/>
          <Route path='/community/communities' component={()=>(<div><Header/><CommunitiesPage/></div>)}/>
          <Route exact path='/community/communities/:id' component={PostPage}/>
          <Route path='/profile' component={()=>(<div><Header/><ProfilePage/></div>)}/>
          <PrivateRoute authed={!this.props.authenticated} exact path='/signout' component={()=>(<div><HeaderVisitorSign/><SignInPage/></div>)} />

          {/* CREATE & EDIT */}
          {/*<Route exact path='/posts' component={()=>(<div><Header/><PostPage/></div>)}/>
          <Route path='/posts/:id' component={()=>(<div><Header/><PostPage/></div>)}/>**/}
          <PrivateRoute authed={!this.props.authenticated} path='/discover/create-post' component={PostCreatePage}/>
          <PrivateRoute authed={!this.props.authenticated} path='/community/create-community' component={CommunityCreatePage}/>
          <Route path="*" component={NotFoundPage}/>
        
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    authenticated: state.auth.authenticated,
    role: state.auth.role
  };
};

export default  withRouter(connect(mapStateToProps)(Main));

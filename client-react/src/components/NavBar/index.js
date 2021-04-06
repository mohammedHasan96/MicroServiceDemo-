import { Link, useHistory } from 'react-router-dom';


function NavBar() {
  const history = useHistory();
  const user = {
    id: 1,
    name: 'othman'
  }

  return (
    <>
      <nav className='navbar'>
        <span className='nav-name'>{user.name}</span>
        <Link to='/' className='nav-title'>products</Link>
        <div clLinkssName='right'>
          <Link style={{ paddingRight: "20px" }} to={'/cart'} className='nav-login'>cart page</Link>
          {user.id ? <>
            <Link to='/login' className='nav-login'>login</Link>
            <Link to='/signup' className='nav-signup'>signup</Link>
          </>
            :
            <Link to='/logout' className='nav-signup'>logout</Link>
          }
        </div>
      </nav>
    </>
  );
};

export default NavBar;

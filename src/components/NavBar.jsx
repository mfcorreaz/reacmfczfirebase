import { collection, getDocs, getFirestore } from 'firebase/firestore';
import { useContext } from 'react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import logo4 from '../img/Logo4.png';
import CartWidget from './CartWidget';
import './NavBar.css';

function NavBar() {
  const [navLinks, setNavLinks] = useState([]);
  const {cart} = useContext(CartContext)

  
  
  useEffect(()=> {
    const arrayProductos = collection(getFirestore(), "items")

    getDocs(arrayProductos)
    .then((res)=> {
      setNavLinks([...new Set(res.docs.map(producto=> producto.data().category))])
    })
    }, []
  )

    return (
    <>
        <nav className="navbar navbar-expand-lg navbar-dark Nave">
          <Link to={"/"} className="navbar-brand"><img src={logo4} alt="Logo The Stroke" />The Stroke</Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <Link to={"/"} className="nav-link active">Home <span className="sr-only">(current)</span></Link>
              <a className="nav-link dropdown-toggle active" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-expanded="false">
                Categorías
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">                
                {navLinks.map((categoria, index) => {
                  return (
                  <Link key={index} to={`/categoria/${categoria}`}>
                    {(categoria)}
                  </Link>
                  )}
                )}
              </div>
            </div>
            {cart.length > 0 && <CartWidget />}
          </div>
        </nav>
    </>
    )
}

export default NavBar
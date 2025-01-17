import React from 'react';
import Tile from '../components/Tile';
import { Link } from 'react-router-dom';
import './Games.scss'

const Games = () => {
  return (
    <main className="page-games">
      <div className="structure">
        <div className="row">
          <div className="col-a">
            <Tile extraClassName={'games-list'} title={'Games'}>
              <ul>
                <li>
                  <Link to='/games/acorn-basket'>Acorn Basket</Link>
                </li>
              </ul>
            </Tile>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Games
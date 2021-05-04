import React from 'react'
import '../NotFound/NotFound.css'

const CollectionFilm = ()=>{
    const onTest = ()=>{
        document.getElementById('collection-film').style.display='none'
    }
    return(
        <div id ='collection-film'>
          <div className="modal-collection-film">
              <p>Phim đã có trong bộ sưu tập !</p>
              
              <button onClick ={onTest} type="button" className="btn btn-danger">Đồng Ý</button>
              
              
          </div>
        </div>
    )
}

export default CollectionFilm
import React from 'react'
import '../NotFound/NotFound.css'

const SuccessCollection = ()=>{
    const onTest = ()=>{
        document.getElementById('success-collection').style.display='none'
    }
    return(
        <div id ='success-collection'>
          <div className="modal-collection-film">
              <p>Đã thêm phim vào bộ sưu tập</p>
              
              <button onClick={onTest} type="button" className="btn btn-success">Đồng Ý</button>
              
          </div>
        </div>
    )
}

export default SuccessCollection
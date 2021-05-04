import React from 'react'
import '../Footer/footer.css'
import img from '../Header/logo.png'

const Footer = ()=>{
    return(
        <div className="footer-movie">
            <div className="container">
                <div className="row">
                     <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                         <div className="is-div"></div>
                     </div>
                </div>
                <div className="row">
                    <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                        <ul className='infomation'>
                            <img src={img} alt='img'/>
                            <li>K63MMT luôn gửi đến những thước phim hay bom tấn, hành động,
                                võ thuật ... hấp dẫn đến với các bạn .
                            </li>
                        </ul>
                    </div>
                    <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                        <ul className='infomation'>
                            <p className='p-footer'>K63MMT</p>
                            <li><a href={`/Phim Hành Động/28`}>Phim hành động</a></li>
                            <li><a href={`/Phim Phiêu Lưu/12`}>Phim phiêu lưu</a></li>
                            <li><a href={`/Phim Hoạt Hình/16`}>Phim hoạt hình</a></li>
                            <li><a href={`/Phim Hài/35`}>Phim Hài</a></li>
                            <li><a href={`/privacy`}>Chính sách quyền riêng tư</a></li>
                        </ul>
                    </div>
                    <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                        <ul className='infomation'>
                            <p className='p-footer'>K63MMT</p>
                            <li><a href={`/Phim Hành Động/28`}>Phim hành động</a></li>
                            <li><a href={`/Phim Phiêu Lưu/12`}>Phim phiêu lưu</a></li>
                            <li><a href={`/Phim Hoạt Hình/16`}>Phim hoạt hình</a></li>
                            <li><a href={`/Phim Hài/35`}>Phim Hài</a></li>
                            <li><a href={`/privacy`}>Chính sách quyền riêng tư</a></li>
                        </ul>
                    </div>
                    <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                        <ul className='infomation'>
                            <p className='p-footer'>K63MMT</p>
                            <li><a href={`/Phim Hành Động/28`}>Phim hành động</a></li>
                            <li><a href={`/Phim Phiêu Lưu/12`}>Phim phiêu lưu</a></li>
                            <li><a href={`/Phim Hoạt Hình/16`}>Phim hoạt hình</a></li>
                            <li><a href={`/Phim Hài/35`}>Phim Hài</a></li>
                            <li><a href={`/privacy`}>Chính sách quyền riêng tư</a></li>
                        </ul>
                    </div>
                    
                  
                    
                </div>
            </div>
            <div id="footer">
                <p>Copyright 2021 © K63MMT</p>
            </div>
        </div>
    )
}

export default Footer
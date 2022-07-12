import React from 'react'
import { Link } from 'react-router-dom';

export const Footer = () => {
    return (
        <div className="parent-footer container-fluid">
            <footer class="footer ">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-6 h-100 text-center text-lg-start my-auto">
                            <ul class="list-inline mb-2">
                                <li class="list-inline-item "><Link to="/contactUs" className='text-white '>Contact Us</Link></li>
                                <li class="list-inline-item"><a href="#!" className='text-white'>Privacy Policy</a></li>
                            </ul>
                            <p class="text-white small mb-4 mb-lg-0">&copy; Stammerers Connect. All Rights Reserved.</p>
                        </div>
                        <div class="col-lg-6 h-100 text-center text-lg-end my-auto">
                            <ul class="list-inline mb-0">
                                <li class="list-inline-item me-4">
                                    <a href="#!"><i className="text-white bi bi-envelope-fill fs-3"></i></a>
                                </li>
                                <li class="list-inline-item me-4">
                                    <a href="#!"><i className="text-white bi-facebook fs-3"></i></a>
                                </li>
                                <li class="list-inline-item me-4">
                                    <a href="#!"><i className="text-white bi-twitter fs-3"></i></a>
                                </li>
                                <li class="list-inline-item">
                                    <a href="#!"><i className="text-white bi-instagram fs-3"></i></a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}

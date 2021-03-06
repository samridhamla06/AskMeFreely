import React from 'react'
import { Link } from 'react-router-dom';

export const Footer = () => {
    return (
        <div className="parent-footer container-fluid">
            <footer class="footer  bg-light">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-6 h-100 text-center text-lg-start my-auto">
                            <ul class="list-inline mb-2">
                                <li class="list-inline-item"><Link to="/contactUs">Contact Us</Link></li>
                                <li class="list-inline-item"><a href="#!">Privacy Policy</a></li>
                            </ul>
                            <p class="text-muted small mb-4 mb-lg-0">&copy; Stammerers Connect. All Rights Reserved.</p>
                        </div>
                        <div class="col-lg-6 h-100 text-center text-lg-end my-auto">
                            <ul class="list-inline mb-0">
                                <li class="list-inline-item me-4">
                                    <a href="#!"><i class="bi bi-envelope-fill fs-3"></i></a>
                                </li>
                                <li class="list-inline-item me-4">
                                    <a href="#!"><i class="bi-facebook fs-3"></i></a>
                                </li>
                                <li class="list-inline-item me-4">
                                    <a href="#!"><i class="bi-twitter fs-3"></i></a>
                                </li>
                                <li class="list-inline-item">
                                    <a href="#!"><i class="bi-instagram fs-3"></i></a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}

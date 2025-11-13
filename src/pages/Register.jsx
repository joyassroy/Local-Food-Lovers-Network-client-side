import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthProvider';
import toast from 'react-hot-toast';

const Register = () => {
    const { createUser, updateUserProfile, googleSignIn } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleRegister = event => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const photo = form.photo.value;
        const email = form.email.value;
        const password = form.password.value;
        const confirm = form.confirm.value;

        // Password Validation [cite: 65-66]
        if (password !== confirm) {
            return toast.error('Passwords do not match.');
        }
        if (password.length < 6) {
            return toast.error('Password must be at least 6 characters long.');
        }
        if (!/[A-Z]/.test(password)) {
            return toast.error('Password must contain at least one uppercase letter.');
        }
        if (!/[a-z]/.test(password)) {
            return toast.error('Password must contain at least one lowercase letter.');
        }

        createUser(email, password)
            .then(result => {
               
                updateUserProfile(name, photo)
                    .then(() => {

                        navigate('/'); 
                    })
                    .catch(error => toast.error(error.message));
            })
            .catch(error => {
                toast.error(error.message); 
            });
    }

    const handleGoogleSignIn = () => {
        googleSignIn()
            .then(result => {
                toast.success('Login Successful!');
                navigate('/');
            })
            .catch(error => {
                toast.error(error.message);
            });
    }

    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row">
                <div className="text-center lg:text-left w-1/2 mr-12">
                    <h1 className="text-5xl font-bold">Join Us Now!</h1>
                    <p className="py-6">Create an account to join our community of food lovers. Share reviews, discover hidden gems, and connect with other foodies.</p>
                </div>
                <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form onSubmit={handleRegister} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input type="text" name="name" placeholder="Your Name" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Photo URL</span>
                            </label>
                            <input type="text" name="photo" placeholder="http://..." className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" name="email" placeholder="email" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" name="password" placeholder="password" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Confirm Password</span>
                            </label>
                            <input type="password" name="confirm" placeholder="confirm password" className="input input-bordered" required />
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Register</button>
                        </div>
                    </form>
                     <div className="card-body pt-0">
                        <div className="divider">Or</div>
                        <button onClick={handleGoogleSignIn} className="btn btn-outline btn-accent">
                            Continue with Google
                        </button>
                        <p className="mt-4 text-center">
                            Already have an account? <Link to="/login" className="link link-primary">Log in</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
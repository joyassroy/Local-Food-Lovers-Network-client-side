import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthProvider';

const AddReview = () => {
    const { register, handleSubmit, reset } = useForm();
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    // Use useMutation for POST operations
    const mutation = useMutation({
        mutationFn: (newReview) => {
            return axios.post('http://localhost:5001/reviews', newReview);
        },
        onSuccess: () => {
            toast.success('Review Added Successfully!');
            reset(); // Clear the form
            navigate('/my-reviews'); // Go to My Reviews page
        },
        onError: () => {
            toast.error('Something went wrong. Please try again.');
        }
    });

    // Handle form submission [cite: 86]
    const onSubmit = data => {
        const reviewData = {
            ...data,
            rating: parseFloat(data.rating), // Convert rating to a number
            // Add user email and current date [cite: 87]
            userEmail: user.email,
            userName: user.displayName,
            userImage: user.photoURL,
            createdAt: new Date()
        };
        
        mutation.mutate(reviewData); // Send data to server
    };

    return (
        <div className="container mx-auto px-4 py-12">
            <h1 className="text-4xl font-bold text-center mb-10">Add Your Review</h1>
            <div className="max-w-2xl mx-auto p-8 bg-base-200 rounded-lg shadow-lg">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {/* Food Name */}
                    <div className="form-control">
                        <label className="label"><span className="label-text">Food Name</span></label>
                        <input type="text" {...register("foodName", { required: true })} className="input input-bordered" />
                    </div>

                    {/* Food Image URL */}
                    <div className="form-control">
                        <label className="label"><span className="label-text">Food Image URL</span></label>
                        <input type="text" {...register("foodImage", { required: true })} className="input input-bordered" />
                    </div>

                    {/* Restaurant Name */}
                    <div className="form-control">
                        <label className="label"><span className="label-text">Restaurant Name</span></label>
                        <input type="text" {...register("restaurantName", { required: true })} className="input input-bordered" />
                    </div>

                    {/* Location */}
                    <div className="form-control">
                        <label className="label"><span className="label-text">Location</span></label>
                        <input type="text" {...register("location", { required: true })} className="input input-bordered" />
                    </div>

                    {/* Star Rating */}
                    <div className="form-control">
                        <label className="label"><span className="label-text">Star Rating (1-5)</span></label>
                        <input type="number" step="0.1" min="1" max="5" {...register("rating", { required: true })} className="input input-bordered" />
                    </div>

                    {/* Review Text */}
                    <div className="form-control">
                        <label className="label"><span className="label-text">Review Text</span></label>
                        <textarea {...register("reviewText", { required: true })} className="textarea textarea-bordered h-32"></textarea>
                    </div>

                    <button type="submit" className="btn btn-primary w-full" disabled={mutation.isLoading}>
                        {mutation.isLoading ? 'Submitting...' : 'Submit Review'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddReview;
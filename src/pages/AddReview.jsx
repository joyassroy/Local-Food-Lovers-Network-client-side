import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthProvider';

const AddReview = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const serverURL = 'https://local-food-lover-network.vercel.app';


    const mutation = useMutation({
        mutationFn: (newReview) => {
            return axios.post(`${serverURL}/reviews`, newReview);
        },
        onSuccess: () => {
            toast.success('Review Added Successfully!');
            reset();
            navigate('/my-reviews');
        },
        onError: () => {
            toast.error('Something went wrong. Please try again.');
        }
    });


    const onSubmit = data => {
        const reviewData = {
            ...data,
            rating: parseFloat(data.rating),

            userEmail: user.email,
            userName: user.displayName,
            userImage: user.photoURL,
            createdAt: new Date()
        };

        mutation.mutate(reviewData);
    };

    return (
        <div className="bg-base-200 py-12 md:py-20">
            <div className="container mx-auto px-4">

                <div className="max-w-4xl mx-auto p-6 md:p-10 bg-base-100 rounded-2xl shadow-xl">


                    <div className="text-center mb-10">
                        <h1 className="text-3xl md:text-4xl font-bold">Share Your Food Experience</h1>
                        <p className="text-gray-600 mt-2">We'd love to hear your honest review!</p>
                    </div>


                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">


                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">


                            <div className="form-control">
                                <label className="label"><span className="label-text">Food Name</span></label>
                                <input
                                    type="text"
                                    placeholder="e.g., Spicy Tonkotsu Ramen"
                                    {...register("foodName", { required: "Food Name is required" })}
                                    className="input input-bordered w-full"
                                />
                                {errors.foodName && <span className="text-error text-xs mt-1">{errors.foodName.message}</span>}
                            </div>


                            <div className="form-control">
                                <label className="label"><span className="label-text">Restaurant Name</span></label>
                                <input
                                    type="text"
                                    placeholder="e.g., Noodle House"
                                    {...register("restaurantName", { required: "Restaurant Name is required" })}
                                    className="input input-bordered w-full"
                                />
                                {errors.restaurantName && <span className="text-error text-xs mt-1">{errors.restaurantName.message}</span>}
                            </div>


                            <div className="form-control">
                                <label className="label"><span className="label-text">Food Image URL</span></label>
                                <input
                                    type="url"
                                    placeholder="https://..."
                                    {...register("foodImage", { required: "Image URL is required" })}
                                    className="input input-bordered w-full"
                                />
                                {errors.foodImage && <span className="text-error text-xs mt-1">{errors.foodImage.message}</span>}
                            </div>


                            <div className="form-control">
                                <label className="label"><span className="label-text">Location</span></label>
                                <input
                                    type="text"
                                    placeholder="e.g., Eastside"
                                    {...register("location", { required: "Location is required" })}
                                    className="input input-bordered w-full"
                                />
                                {errors.location && <span className="text-error text-xs mt-1">{errors.location.message}</span>}
                            </div>


                            <div className="form-control">
                                <label className="label"><span className="label-text">Star Rating</span></label>
                                <input
                                    type="number"
                                    step="0.1" min="1" max="5"
                                    placeholder="e.g., 4.5"
                                    {...register("rating", { required: "Rating is required", min: 1, max: 5 })}
                                    className="input input-bordered w-full"
                                />
                                {errors.rating && <span className="text-error text-xs mt-1">Please enter a rating between 1 and 5.</span>}
                            </div>

                        </div>


                        <div className="form-control">
                            <label className="label"><span className="label-text">Your Review</span></label>
                            <textarea
                                {...register("reviewText", { required: "Review text is required" })}
                                className="textarea textarea-bordered h-32"
                                placeholder="Share your experience..."
                            ></textarea>
                            {errors.reviewText && <span className="text-error text-xs mt-1">{errors.reviewText.message}</span>}
                        </div>


                        <div className="form-control mt-8">
                            <button type="submit" className="btn btn-primary btn-lg w-full" disabled={mutation.isLoading}>
                                {mutation.isLoading ? (
                                    <>
                                        <span className="loading loading-spinner"></span>
                                        Submitting...
                                    </>
                                ) : (
                                    'Submit Review'
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddReview;

//showing some prb
import React from 'react';
import { useForm } from 'react-hook-form';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';


const LoadingSpinner = () => (
    <div className="flex justify-center items-center min-h-[50vh]">
        <span className="loading loading-spinner loading-lg"></span>
    </div>
);

const UpdateReview = () => {
    const { id } = useParams(); 
    const { register, handleSubmit, reset } = useForm();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    
    const { data: reviewData, isLoading } = useQuery({
        queryKey: ['review', id],
        queryFn: async () => {
            const res = await axios.get(`http://localhost:5001/review/${id}`);
            reset(res.data); 
            return res.data;
        }
    });

  
    const mutation = useMutation({
        mutationFn: (updatedReview) => {
            return axios.patch(`http://localhost:5001/review/${id}`, updatedReview);
        },
        onSuccess: () => {
            toast.success('Review Updated Successfully!');
            queryClient.invalidateQueries(['myReviews']); 
            navigate('/my-reviews'); 
        },
        onError: () => {
            toast.error('Failed to update review.');
        }
    });

    
    const onSubmit = data => {
        mutation.mutate(data); 
    };

    if (isLoading) return <LoadingSpinner />;

    return (
        <div className="container mx-auto px-4 py-12">
            <h1 className="text-4xl font-bold text-center mb-10">Update Your Review</h1>
            <div className="max-w-2xl mx-auto p-8 bg-base-200 rounded-lg shadow-lg">
                
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                 
                    <div className="form-control">
                        <label className="label"><span className="label-text">Food Name</span></label>
                        <input type="text" {...register("foodName", { required: true })} className="input input-bordered" />
                    </div>
                    <div className="form-control">
                        <label className="label"><span className="label-text">Food Image URL</span></label>
                        <input type="text" {...register("foodImage", { required: true })} className="input input-bordered" />
                    </div>
                    <div className="form-control">
                        <label className="label"><span className="label-text">Restaurant Name</span></label>
                        <input type="text" {...register("restaurantName", { required: true })} className="input input-bordered" />
                    </div>
                    <div className="form-control">
                        <label className="label"><span className="label-text">Location</span></label>
                        <input type="text" {...register("location", { required: true })} className="input input-bordered" />
                    </div>
                    <div className="form-control">
                        <label className="label"><span className="label-text">Star Rating (1-5)</span></label>
                        <input type="number" step="0.1" min="1" max="5" {...register("rating", { required: true })} className="input input-bordered" />
                    </div>
                    <div className="form-control">
                        <label className="label"><span className="label-text">Review Text</span></label>
                        <textarea {...register("reviewText", { required: true })} className="textarea textarea-bordered h-32"></textarea>
                    </div>

                    <button type="submit" className="btn btn-primary w-full" disabled={mutation.isLoading}>
                        {mutation.isLoading ? 'Updating...' : 'Update Review'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UpdateReview;
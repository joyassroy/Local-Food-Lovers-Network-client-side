import React, { useContext } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { AuthContext } from '../contexts/AuthProvider';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';


const LoadingSpinner = () => (
    <div className="flex justify-center items-center min-h-[50vh]">
        <span className="loading loading-spinner loading-lg"></span>
    </div>
);

const MyReviews = () => {
    const { user } = useContext(AuthContext);
    const queryClient = useQueryClient();

   
    const { data: reviews = [], isLoading, error } = useQuery({
        queryKey: ['myReviews', user?.email], 
        queryFn: async () => {
            const res = await axios.get(`http://localhost:5001/my-reviews/${user.email}`);
            return res.data;
        },
        enabled: !!user?.email, 
    });


    const deleteMutation = useMutation({
        mutationFn: (id) => {
            return axios.delete(`http://localhost:5001/review/${id}`);
        },
        onSuccess: () => {
            toast.success('Review Deleted');

            queryClient.invalidateQueries(['myReviews']); 
        }
    });

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this review?")) {
            deleteMutation.mutate(id); 
        }
    };

    if (isLoading) return <LoadingSpinner />;
    if (error) return <div>An error occurred: {error.message}</div>;

    return (
        <div className="container mx-auto px-4 py-12">
            <h1 className="text-4xl font-bold text-center mb-10">My Reviews</h1>
            
            <div className="overflow-x-auto">
                <table className="table w-full">

                    <thead>
                        <tr>
                            <th>Food Image</th>
                            <th>Food Name</th>
                            <th>Restaurant Name</th>
                            <th>Posted Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reviews.map((review) => (
                            <tr key={review._id}>
                                <td>
                                    <div className="avatar">
                                        <div className="mask mask-squircle w-12 h-12">
                                            <img src={review.foodImage} alt={review.foodName} />
                                        </div>
                                    </div>
                                </td>
                                <td>{review.foodName}</td>
                                <td>{review.restaurantName}</td>
                                <td>{new Date(review.createdAt).toLocaleDateString()}</td>
                                <td>
                                    
                                    <Link to={`/update-review/${review._id}`} className="btn btn-ghost btn-sm">
                                        Edit
                                    </Link>
                                    
                                    
                                    <button 
                                        onClick={() => handleDelete(review._id)} 
                                        className="btn btn-error btn-sm text-white"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyReviews;
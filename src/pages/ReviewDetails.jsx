import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';


const LoadingSpinner = () => (
    <div className="flex justify-center items-center min-h-[50vh]">
        <span className="loading loading-spinner loading-lg"></span>
    </div>
);

const ReviewDetails = () => {
   
    const { id } = useParams();

  
    const { data: review, isLoading } = useQuery({
        queryKey: ['review', id], 
        queryFn: async () => {
            const res = await axios.get(`http://localhost:5001/review/${id}`);
            return res.data;
        }
    });

    if (isLoading) {
        return <LoadingSpinner />;
    }

    if (!review) {
        return <div className="text-center text-xl py-20">Review not found.</div>;
    }

    const {
        foodName,
        foodImage,
        restaurantName,
        location,
        rating,
        reviewText,
        userName,
        userImage,
        createdAt
    } = review;

    return (
        <div className="container mx-auto px-4 py-16">
            <div className="max-w-4xl mx-auto bg-base-100 shadow-2xl rounded-lg overflow-hidden">
            
                <img src={foodImage} alt={foodName} className="w-full h-96 object-cover" />
                
                <div className="p-8 md:p-12">
                   
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">{foodName}</h1>
                    
                    
                    <p className="text-2xl font-semibold text-primary mb-2">
                        {restaurantName}
                    </p>
                    <p className="text-lg text-gray-600 mb-6">{location}</p>
                    
                    
                    <div className="mb-6">
                        <span className="text-3xl font-bold text-yellow-500">
                            ★ {rating} / 5
                        </span>
                    </div>

                   
                    <h3 className="text-xl font-semibold mb-2">Full Review:</h3>
                    <p className="text-base text-gray-700 leading-relaxed mb-8">
                        {reviewText}
                    </p>

                    <div className="divider"></div>

                
                    <div className="flex items-center space-x-4">
                        <div className="avatar">
                            <div className="w-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                <img src={userImage} alt={userName} />
                            </div>
                        </div>
                        <div>
                            <p className="text-lg font-semibold">Reviewed by {userName}</p>
                            <p className="text-sm text-gray-500">
                                On: {new Date(createdAt).toLocaleDateString()}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="text-center mt-12">
                <Link to="/all-reviews" className="btn btn-primary">
                    ← Back to All Reviews
                </Link>
            </div>
        </div>
    );
};

export default ReviewDetails;
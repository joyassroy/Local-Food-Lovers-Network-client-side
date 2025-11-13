import React, { useState, useContext } from 'react'; 
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'; 
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthProvider'; 
import toast from 'react-hot-toast'; 


const LoadingSpinner = () => (
    <div className="flex justify-center items-center min-h-[50vh]">
        <span className="loading loading-spinner loading-lg"></span>
    </div>
);


const ReviewCard = ({ review }) => {
    const { _id, foodName, foodImage, restaurantName, location, rating, reviewText } = review;
    const { user } = useContext(AuthContext); 
    const navigate = useNavigate();
    const queryClient = useQueryClient();

  
    const addFavoriteMutation = useMutation({
        mutationFn: (newFavorite) => {
            return axios.post('http://localhost:5001/favorites', newFavorite);
        },
        onSuccess: () => {
            toast.success('Added to Favorites!');
            queryClient.invalidateQueries(['myFavorites']); 
        },
        onError: (error) => {
            
            toast.error(error.response?.data?.message || "Could not add to favorites.");
        }
    });

    const handleFavorite = () => {
        if (!user) {

            toast.error("You must be logged in to add favorites.");
            return navigate('/login');
        }


        const favoriteData = {
            reviewId: _id, 
            userEmail: user.email,
           
            foodName,
            foodImage,
            restaurantName,
            location
        };

        addFavoriteMutation.mutate(favoriteData);
    };

    return (
        <div className="card card-compact bg-base-100 shadow-xl">
            <figure><img src={foodImage} alt={foodName} className="h-60 w-full object-cover" /></figure>
            <div className="card-body">
                <h2 className="card-title">{foodName}</h2>
                <p className="font-semibold">{restaurantName} - {location}</p>
                <p>{reviewText.substring(0, 100)}...</p>
                <div className="flex justify-between items-center mt-2">
                    <span className="font-bold text-lg">Rating: {rating}/5</span>
                    <div>
                        <button 
                            onClick={handleFavorite} 
                            className="btn btn-ghost btn-sm btn-circle mr-2"
                            disabled={addFavoriteMutation.isLoading}
                        >
                            ❤️ 
                        </button>
                        <Link to={`/review/${_id}`} className="btn btn-primary btn-sm">View Details</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};



const AllReviews = () => {
    const [searchTerm, setSearchTerm] = useState('');


    const { data: reviews = [], isLoading } = useQuery({
        queryKey: ['reviews', searchTerm], 
        queryFn: async () => {
            
            const res = await axios.get(`http://localhost:5001/reviews?searchParams=${searchTerm}`);
            return res.data;
        }
    });

    const handleSearch = (e) => {
        e.preventDefault();
        const text = e.target.search.value;
        setSearchTerm(text);
    }
 
    if (isLoading) {
        return <LoadingSpinner />; 
    }

    return (
        <div className="container mx-auto px-4 py-12">
            <h1 className="text-4xl font-bold text-center mb-10">All Food Reviews</h1>
            
          
            <form onSubmit={handleSearch} className="flex justify-center mb-10">
                <div className="form-control">
                    <div className="input-group">
                        <input type="text" name="search" placeholder="Search by food name..." className="input input-bordered w-80" />
                        <button className="btn btn-square btn-primary">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                        </button>
                    </div>
                </div>
            </form>

           
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {reviews.map(review => (
                    <ReviewCard key={review._id} review={review} />
                ))}
            </div>
        </div>
    );
};

export default AllReviews;
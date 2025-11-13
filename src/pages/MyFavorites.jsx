import React, { useContext } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { AuthContext } from '../contexts/AuthProvider';
import toast from 'react-hot-toast';


const LoadingSpinner = () => (
    <div className="flex justify-center items-center min-h-[50vh]">
        <span className="loading loading-spinner loading-lg"></span>
    </div>
);

const MyFavorites = () => {
    const { user } = useContext(AuthContext);
    const queryClient = useQueryClient();

    
    const { data: favorites = [], isLoading } = useQuery({
        queryKey: ['myFavorites', user?.email],
        queryFn: async () => {
            const res = await axios.get(`https://local-food-lover-network.vercel.app/my-favorites/${user.email}`);
            return res.data;
        },
        enabled: !!user?.email,
    });

    
    const deleteMutation = useMutation({
        mutationFn: (id) => {
            return axios.delete(`https://local-food-lover-network.vercel.app/favorite/${id}`);
        },
        onSuccess: () => {
            toast.success('Removed from Favorites');
            queryClient.invalidateQueries(['myFavorites']);
        }
    });

    if (isLoading) return <LoadingSpinner />;

    return (
        <div className="container mx-auto px-4 py-12">
            <h1 className="text-4xl font-bold text-center mb-10">My Favorite Reviews</h1>
            

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {favorites.length === 0 && (
                    <p className="text-center col-span-3 text-lg">You haven't added any favorites yet.</p>
                )}
                {favorites.map((fav) => (
                    <div key={fav._id} className="card bg-base-100 shadow-xl">
                        <figure><img src={fav.foodImage} alt={fav.foodName} className="h-60 w-full object-cover" /></figure>
                        <div className="card-body">
                            <h2 className="card-title">{fav.foodName}</h2>
                            <p>{fav.restaurantName}</p>
                            <div className="card-actions justify-end">

                                <button 
                                    onClick={() => deleteMutation.mutate(fav._id)} 
                                    className="btn btn-error btn-sm"
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyFavorites;
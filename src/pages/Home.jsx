import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query'; // Import useQuery
import axios from 'axios'; // Import axios

// --- Hero Slider (No Change) ---
const HeroSlider = () => (
    <div className="carousel w-full h-[600px] rounded-lg">
        {/* Slide 1 */}
        <div id="slide1" className="carousel-item relative w-full">
            <img src="https://i.ibb.co/XSbL0Yt/slide1.jpg" alt="Slide 1" className="w-full object-cover" />
            <div className="absolute flex items-center h-full left-0 top-0 bg-gradient-to-r from-[#151515] to-[rgba(21, 21, 21, 0)]">
                <div className="text-white space-y-7 pl-12 w-1/2">
                    <h2 className="text-6xl font-bold">Discover Your Next Favorite Meal</h2>
                    <p>Share your food experiences and find honest reviews from local foodies.</p>
                    <div>
                        <Link to="/all-reviews" className="btn btn-primary mr-5">Explore Reviews</Link>
                    </div>
                </div>
            </div>
            <div className="absolute flex justify-end transform -translate-y-1/2 left-5 right-5 bottom-0">
                <a href="#slide3" className="btn btn-circle mr-5">❮</a>
                <a href="#slide2" className="btn btn-circle">❯</a>
            </div>
        </div>
        {/* Slide 2 */}
        <div id="slide2" className="carousel-item relative w-full">
            <img src="https://i.ibb.co/3kC0b3S/slide2.jpg" alt="Slide 2" className="w-full object-cover" />
            <div className="absolute flex items-center h-full left-0 top-0 bg-gradient-to-r from-[#151515] to-[rgba(21, 21, 21, 0)]">
                <div className="text-white space-y-7 pl-12 w-1/2">
                    <h2 className="text-6xl font-bold">From Street Food to Fine Dining</h2>
                    <p>Find the best local flavors, reviewed by people like you.</p>
                    <div>
                        <Link to="/all-reviews" className="btn btn-primary mr-5">Explore Reviews</Link>
                    </div>
                </div>
            </div>
            <div className="absolute flex justify-end transform -translate-y-1/2 left-5 right-5 bottom-0">
                <a href="#slide1" className="btn btn-circle mr-5">❮</a>
                <a href="#slide3" className="btn btn-circle">❯</a>
            </div>
        </div>
        {/* Slide 3 */}
        <div id="slide3" className="carousel-item relative w-full">
            <img src="https://i.ibb.co/qjNqD3Q/slide3.jpg" alt="Slide 3" className="w-full object-cover" />
            <div className="absolute flex items-center h-full left-0 top-0 bg-gradient-to-r from-[#151515] to-[rgba(21, 21, 21, 0)]">
                <div className="text-white space-y-7 pl-12 w-1/2">
                    <h2 className="text-6xl font-bold">Join the Community</h2>
                    <p>Post your own reviews and help others discover great food.</p>
                    <div>
                        <Link to="/all-reviews" className="btn btn-primary mr-5">Explore Reviews</Link>
                    </div>
                </div>
            </div>
            <div className="absolute flex justify-end transform -translate-y-1/2 left-5 right-5 bottom-0">
                <a href="#slide2" className="btn btn-circle mr-5">❮</a>
                <a href="#slide1" className="btn btn-circle">❯</a>
            </div>
        </div>
    </div>
);

// --- Featured Reviews Section (UPDATED) ---
const FeaturedReviews = () => {
    
    // Fetch 6 reviews from the server [cite: 54]
    const { data: reviews = [], isLoading } = useQuery({
        queryKey: ['featuredReviews'],
        queryFn: async () => {
            // Your server already handles the 'limit' query
            const res = await axios.get('http://localhost:5001/reviews?limit=6');
            return res.data;
        }
    });

    return (
        <div className="my-24">
            <div className="text-center mb-12">
                <h2 className="text-4xl font-bold">Featured Reviews</h2>
                <p className="text-lg text-gray-600">See what's popular among our food lovers</p>
            </div>
            
            {/* Show loading spinner */}
            {isLoading && (
                <div className="flex justify-center">
                    <span className="loading loading-spinner loading-lg"></span>
                </div>
            )}

            {/* Render the fetched reviews */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {reviews.map(review => (
                    <div key={review._id} className="card card-compact bg-base-100 shadow-xl">
                        <figure><img src={review.foodImage} alt={review.foodName} className="h-60 w-full object-cover" /></figure>
                        <div className="card-body">
                            {/* Card content based on requirements [cite: 55] */}
                            <h2 className="card-title">{review.foodName}</h2>
                            <p className="font-semibold">{review.restaurantName} - {review.location}</p>
                            <p>Review by: {review.userName}</p>
                            <div className="flex justify-between items-center mt-2">
                                <span className="font-bold text-lg">Rating: {review.rating}/5</span>
                                <Link to={`/review/${review._id}`} className="btn btn-primary btn-sm">
                                    View Details
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="text-center mt-12">
                <Link to="/all-reviews" className="btn btn-primary">Show All Reviews</Link>
            </div>
        </div>
    );
};

// --- How It Works Section (No Change) ---
const HowItWorks = () => (
    <div className="my-24 py-16 bg-base-200 rounded-lg">
         <div className="text-center mb-12">
            <h2 className="text-4xl font-bold">How It Works</h2>
        </div>
        <div className="flex flex-col md:flex-row justify-around text-center gap-8">
            <div className="w-full md:w-1/4">
                <div className="text-5xl text-primary">①</div>
                <h3 className="text-2xl font-semibold my-4">Discover</h3>
                <p>Browse thousands of reviews from local restaurants and home kitchens.</p>
            </div>
            <div className="w-full md:w-1/4">
                <div className="text-5xl text-primary">②</div>
                <h3 className="text-2xl font-semibold my-4">Review</h3>
                <p>Share your own food experience, post photos, and give your honest rating.</p>
            </div>
            <div className="w-full md:w-1/4">
                <div className="text-5xl text-primary">③</div>
                <h3 className="text-2xl font-semibold my-4">Connect</h3>
                <p>Join a community of food lovers and find your new favorite meal.</p>
            </div>
        </div>
    </div>
);

// --- Main Home Component (No Change) ---
const Home = () => {
    return (
        <div className="container mx-auto px-4">
            <HeroSlider />
            <FeaturedReviews />
            <HowItWorks />
            {/* Add your 2nd additional section here [cite: 59] */}
        </div>
    );
};

export default Home;
import React from 'react';
import { Camera, TrendingUp, Utensils, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import FeatureCard from '../components/home/FeatureCard';
import RecentMealCard from '../components/home/RecentMealCard';

const HomePage = () => {
  const navigate = useNavigate();
  
  // Mock data for recent meals
  const recentMeals = [
    { id: 1, name: 'Masala Dosa', time: '8:30 AM', calories: 350, image: 'https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg?auto=compress&cs=tinysrgb&w=600' },
    { id: 2, name: 'Palak Paneer', time: '1:15 PM', calories: 420, image: 'https://images.pexels.com/photos/7625056/pexels-photo-7625056.jpeg?auto=compress&cs=tinysrgb&w=600' }
  ];

  return (
    <div className="py-6 space-y-8">
      <section className="text-center">
        <h1 className="text-2xl font-bold mb-2">Welcome to BhojanBuddy</h1>
        <p className="text-white/80 mb-6">Your personal nutrition assistant</p>
        
        <button 
          onClick={() => navigate('/upload')}
          className="bg-vibrant-yellow text-forest-green font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-vibrant-yellow/90 transition-all duration-300 transform hover:scale-105 flex items-center justify-center mx-auto"
        >
          <Camera size={20} className="mr-2" />
          Upload Your Meal Photo
        </button>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">How It Works</h2>
        <div className="grid grid-cols-2 gap-4">
          <FeatureCard 
            icon={<Camera size={24} />}
            title="Snap"
            description="Take a photo of your meal"
          />
          <FeatureCard 
            icon={<Utensils size={24} />}
            title="Identify"
            description="We detect the food items"
          />
          <FeatureCard 
            icon={<TrendingUp size={24} />}
            title="Analyze"
            description="Get detailed nutrition info"
          />
          <FeatureCard 
            icon={<Clock size={24} />}
            title="Track"
            description="Monitor your habits over time"
          />
        </div>
      </section>

      {recentMeals.length > 0 && (
        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Recent Meals</h2>
            <button 
              onClick={() => navigate('/nutrition')}
              className="text-primary-green text-sm font-medium"
            >
              View All
            </button>
          </div>
          <div className="space-y-3">
            {recentMeals.map(meal => (
              <RecentMealCard key={meal.id} meal={meal} />
            ))}
          </div>
        </section>
      )}

      <section className="bg-primary-green/10 rounded-xl p-4 border border-primary-green/30">
        <h2 className="text-lg font-semibold mb-2">Daily Progress</h2>
        <div className="flex justify-between text-sm mb-3">
          <span>Calories</span>
          <span>770 / 2000 kcal</span>
        </div>
        <div className="w-full bg-white/10 rounded-full h-2.5 mb-4">
          <div className="bg-primary-green h-2.5 rounded-full" style={{ width: '38.5%' }}></div>
        </div>
        <div className="grid grid-cols-3 gap-2 text-center text-xs">
          <div className="bg-white/5 rounded-lg p-2">
            <p className="text-earthy-bronze font-medium">Protein</p>
            <p className="text-lg font-semibold">25g</p>
          </div>
          <div className="bg-white/5 rounded-lg p-2">
            <p className="text-earthy-bronze font-medium">Carbs</p>
            <p className="text-lg font-semibold">95g</p>
          </div>
          <div className="bg-white/5 rounded-lg p-2">
            <p className="text-earthy-bronze font-medium">Fats</p>
            <p className="text-lg font-semibold">18g</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
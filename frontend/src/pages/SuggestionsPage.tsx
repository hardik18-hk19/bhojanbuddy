import React from 'react';
import { Lightbulb, ThumbsUp, ThumbsDown, ChevronRight } from 'lucide-react';
import HealthTip from '../components/suggestions/HealthTip';
import FoodSwap from '../components/suggestions/FoodSwap';

const SuggestionsPage = () => {
  // Mock data for suggestions
  const healthTips = [
    {
      id: 1,
      title: "Increase protein intake",
      description: "Your protein intake is below recommended levels. Try adding more legumes, tofu, or paneer to your meals.",
      icon: "protein"
    },
    {
      id: 2,
      title: "Reduce sugar consumption",
      description: "We've noticed higher than recommended sugar intake. Consider reducing processed sweets and sugary beverages.",
      icon: "sugar"
    },
    {
      id: 3,
      title: "Add more leafy greens",
      description: "Add more spinach, kale or other green leafy vegetables to increase your vitamin and mineral intake.",
      icon: "vegetables"
    }
  ];

  const foodSwaps = [
    {
      id: 1,
      from: {
        name: "White Rice",
        calories: 200,
        image: "https://images.pexels.com/photos/4828243/pexels-photo-4828243.jpeg?auto=compress&cs=tinysrgb&w=600"
      },
      to: {
        name: "Brown Rice",
        calories: 170,
        benefits: ["More fiber", "Lower glycemic index", "More nutrients"],
        image: "https://images.pexels.com/photos/7311910/pexels-photo-7311910.jpeg?auto=compress&cs=tinysrgb&w=600"
      }
    },
    {
      id: 2,
      from: {
        name: "Butter Naan",
        calories: 240,
        image: "https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=600"
      },
      to: {
        name: "Roti/Chapati",
        calories: 120,
        benefits: ["Less fat", "More fiber", "No refined flour"],
        image: "https://images.pexels.com/photos/9797029/pexels-photo-9797029.jpeg?auto=compress&cs=tinysrgb&w=600"
      }
    }
  ];

  return (
    <div className="py-6 space-y-6">
      <section className="text-center mb-2">
        <h1 className="text-2xl font-bold mb-2">Personalized Suggestions</h1>
        <p className="text-white/80">Based on your meal history and preferences</p>
      </section>

      <section>
        <div className="flex items-center mb-4">
          <div className="bg-primary-green/20 p-1.5 rounded-full mr-2">
            <Lightbulb size={20} className="text-primary-green" />
          </div>
          <h2 className="text-xl font-semibold">Health Tips</h2>
        </div>

        <div className="space-y-3">
          {healthTips.map(tip => (
            <HealthTip key={tip.id} tip={tip} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">Suggested Food Swaps</h2>
        <div className="space-y-4">
          {foodSwaps.map(swap => (
            <FoodSwap key={swap.id} swap={swap} />
          ))}
        </div>
      </section>

      <section className="bg-primary-green/10 rounded-xl p-4 border border-primary-green/30">
        <h2 className="text-lg font-semibold mb-3">Weekly Insights</h2>
        
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-white/90 mb-2">Meal Timings</h3>
            <p className="text-sm text-white/70">Your dinner times are often late (after 9 PM). Consider eating earlier for better digestion and sleep quality.</p>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-white/90 mb-2">Nutrient Balance</h3>
            <p className="text-sm text-white/70">You're consistently meeting your protein goals. Great job maintaining a balanced diet!</p>
          </div>
          
          <div className="flex items-center justify-between mt-3">
            <span className="text-sm text-primary-green">Was this helpful?</span>
            <div className="flex space-x-3">
              <button className="text-white/70 hover:text-white transition-colors">
                <ThumbsUp size={18} />
              </button>
              <button className="text-white/70 hover:text-white transition-colors">
                <ThumbsDown size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>

      <section>
        <button className="w-full bg-forest-green border border-primary-green/20 rounded-xl p-4 flex items-center justify-between hover:bg-forest-green/80 transition-colors">
          <div>
            <h3 className="font-medium text-left">Get a Personalized Nutrition Plan</h3>
            <p className="text-sm text-white/70 text-left">Based on your goals and food preferences</p>
          </div>
          <ChevronRight size={20} className="text-primary-green" />
        </button>
      </section>
    </div>
  );
};

export default SuggestionsPage;
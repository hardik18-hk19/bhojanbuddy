"use client";

import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import {
  User,
  Save,
  Settings,
  AlertCircle,
  Activity,
  Heart,
  Watch,
  BarChart4,
  Scale,
  Droplets,
  Edit2,
  Check,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { fadeIn, fadeInUp, staggerContainer } from "@/lib/animations";

type Health = {
  weight: number;
  height: number;
  bmi: number;
  bloodSugar: number;
  bloodPressure: string;
  conditions: string[];
};

type Goals = {
  calories: number;
  carbs: number;
  protein: number;
  fat: number;
  sugar: number;
  sodium: number;
};

type UserData = {
  name: string;
  email: string;
  avatar: string;
  health: Health;
  goals: Goals;
};

export default function ProfilePage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [editingGoals, setEditingGoals] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [goals, setGoals] = useState<Goals | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    setIsLoaded(true);
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/profile`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setUserData(data.user);
          setGoals(data.user.goals);
        } else {
          toast({
            title: "Error",
            description: data.message || "Failed to load profile data.",
            variant: "destructive",
          });
        }
      })
      .catch(() => {
        toast({
          title: "Error",
          description: "Failed to load profile data.",
          variant: "destructive",
        });
      });
  }, []);

  const handleSaveGoals = async () => {
    if (!goals) return;
    const formData = new FormData();
    formData.append("goals", JSON.stringify(goals));

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/user/profile-setup`,
      {
        method: "POST",
        credentials: "include",
        body: formData,
      }
    );
    const data = await res.json();
    if (data.success) {
      setEditingGoals(false);
      setUserData((prev) => prev && { ...prev, goals });
      toast({ title: "Goals updated!" });
    } else {
      toast({
        title: "Error",
        description: data.message,
        variant: "destructive",
      });
    }
  };

  if (!isLoaded || !userData || !goals) {
    return null; // or a loading spinner
  }

  return (
    <motion.div
      className="container py-8 md:py-12"
      initial="hidden"
      animate={isLoaded ? "visible" : "hidden"}
      variants={fadeIn}
    >
      <motion.div variants={staggerContainer}>
        <motion.div variants={fadeInUp} className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Your Profile</h1>
          <p className="text-muted-foreground">
            Manage your profile, health metrics, and nutritional goals
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Overview */}
          <motion.div variants={fadeInUp} className="lg:col-span-1">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">Profile Overview</CardTitle>
              </CardHeader>

              <CardContent>
                <div className="flex flex-col items-center">
                  <div className="w-24 h-24 rounded-full overflow-hidden relative mb-4 bg-gray-100 flex items-center justify-center">
                    {userData.avatar ? (
                      <img
                        src={userData.avatar}
                        alt={userData.name}
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <User className="w-16 h-16 text-gray-400" />
                    )}
                  </div>

                  <h2 className="text-xl font-bold mb-1">{userData.name}</h2>
                  <p className="text-muted-foreground">{userData.email}</p>

                  <div className="mt-4 w-full">
                    <div className="flex items-center justify-between py-2">
                      <div className="flex items-center">
                        <Scale className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>Weight</span>
                      </div>
                      <span>{userData.health.weight} kg</span>
                    </div>

                    <div className="flex items-center justify-between py-2">
                      <div className="flex items-center">
                        <Activity className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>Height</span>
                      </div>
                      <span>{userData.health.height} cm</span>
                    </div>

                    <div className="flex items-center justify-between py-2">
                      <div className="flex items-center">
                        <BarChart4 className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>BMI</span>
                      </div>
                      <span>{userData.health.bmi}</span>
                    </div>
                  </div>
                </div>

                <Separator className="my-4" />

                <div>
                  <h3 className="font-medium mb-2">Health Conditions</h3>
                  <div className="flex flex-wrap gap-2">
                    {userData.health.conditions.map((condition, index) => (
                      <div
                        key={index}
                        className="bg-accent rounded-full px-3 py-1 text-xs font-medium"
                      >
                        {condition}
                      </div>
                    ))}
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-full h-6 w-6"
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </CardContent>

              <CardFooter>
                <Button variant="outline" className="w-full">
                  <Settings className="mr-2 h-4 w-4" />
                  Account Settings
                </Button>
              </CardFooter>
            </Card>
          </motion.div>

          {/* Main Content Area */}
          <motion.div variants={fadeInUp} className="lg:col-span-2">
            <Tabs defaultValue="goals">
              <TabsList className="grid grid-cols-2 mb-6">
                <TabsTrigger value="goals">Nutrition Goals</TabsTrigger>
                {/* <TabsTrigger value="devices">Connected Devices</TabsTrigger> */}
                <TabsTrigger value="health">Health Metrics</TabsTrigger>
              </TabsList>

              {/* Nutrition Goals Tab */}
              <TabsContent value="goals">
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <div>
                        <CardTitle>Nutrition Goals</CardTitle>
                        <CardDescription>
                          Customize your daily nutritional targets
                        </CardDescription>
                      </div>

                      {!editingGoals ? (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setEditingGoals(true)}
                        >
                          <Edit2 className="mr-2 h-4 w-4" />
                          Edit Goals
                        </Button>
                      ) : (
                        <Button size="sm" onClick={handleSaveGoals}>
                          <Check className="mr-2 h-4 w-4" />
                          Save Changes
                        </Button>
                      )}
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-6">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <Label>Daily Calories</Label>
                        <span className="text-sm font-medium">
                          {goals.calories} cal
                        </span>
                      </div>
                      {editingGoals ? (
                        <Slider
                          value={[goals.calories]}
                          min={1500}
                          max={3000}
                          step={50}
                          onValueChange={(value) =>
                            setGoals((prev) => ({
                              ...(prev ?? {
                                calories: 2000,
                                carbs: 250,
                                protein: 100,
                                fat: 60,
                                sugar: 40,
                                sodium: 2000,
                              }),
                              calories: value[0],
                            }))
                          }
                        />
                      ) : (
                        <div className="h-2 bg-primary/20 rounded-full">
                          <div
                            className="h-full bg-primary rounded-full"
                            style={{
                              width: `${(goals.calories / 3000) * 100}%`,
                            }}
                          />
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <Label>Carbohydrates</Label>
                          <span className="text-sm font-medium">
                            {goals.carbs}g
                          </span>
                        </div>
                        {editingGoals ? (
                          <Slider
                            value={[goals.carbs]}
                            min={100}
                            max={350}
                            step={5}
                            onValueChange={(value) =>
                              setGoals({ ...goals, carbs: value[0] })
                            }
                          />
                        ) : (
                          <div className="h-2 bg-chart-1/20 rounded-full">
                            <div
                              className="h-full bg-chart-1 rounded-full"
                              style={{ width: `${(goals.carbs / 350) * 100}%` }}
                            />
                          </div>
                        )}
                      </div>

                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <Label>Protein</Label>
                          <span className="text-sm font-medium">
                            {goals.protein}g
                          </span>
                        </div>
                        {editingGoals ? (
                          <Slider
                            value={[goals.protein]}
                            min={50}
                            max={200}
                            step={5}
                            onValueChange={(value) =>
                              setGoals({ ...goals, protein: value[0] })
                            }
                          />
                        ) : (
                          <div className="h-2 bg-chart-2/20 rounded-full">
                            <div
                              className="h-full bg-chart-2 rounded-full"
                              style={{
                                width: `${(goals.protein / 200) * 100}%`,
                              }}
                            />
                          </div>
                        )}
                      </div>

                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <Label>Fats</Label>
                          <span className="text-sm font-medium">
                            {goals.fat}g
                          </span>
                        </div>
                        {editingGoals ? (
                          <Slider
                            value={[goals.fat]}
                            min={30}
                            max={100}
                            step={5}
                            onValueChange={(value) =>
                              setGoals({ ...goals, fat: value[0] })
                            }
                          />
                        ) : (
                          <div className="h-2 bg-chart-3/20 rounded-full">
                            <div
                              className="h-full bg-chart-3 rounded-full"
                              style={{ width: `${(goals.fat / 100) * 100}%` }}
                            />
                          </div>
                        )}
                      </div>

                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <Label>Sugar</Label>
                          <span className="text-sm font-medium">
                            {goals.sugar}g
                          </span>
                        </div>
                        {editingGoals ? (
                          <Slider
                            value={[goals.sugar]}
                            min={25}
                            max={100}
                            step={5}
                            onValueChange={(value) =>
                              setGoals({ ...goals, sugar: value[0] })
                            }
                          />
                        ) : (
                          <div className="h-2 bg-chart-4/20 rounded-full">
                            <div
                              className="h-full bg-chart-4 rounded-full"
                              style={{ width: `${(goals.sugar / 100) * 100}%` }}
                            />
                          </div>
                        )}
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <Label>Sodium</Label>
                        <span className="text-sm font-medium">
                          {goals.sodium}mg
                        </span>
                      </div>
                      {editingGoals ? (
                        <Slider
                          value={[goals.sodium]}
                          min={1500}
                          max={3000}
                          step={100}
                          onValueChange={(value) =>
                            setGoals({ ...goals, sodium: value[0] })
                          }
                        />
                      ) : (
                        <div className="h-2 bg-chart-5/20 rounded-full">
                          <div
                            className="h-full bg-chart-5 rounded-full"
                            style={{ width: `${(goals.sodium / 3000) * 100}%` }}
                          />
                        </div>
                      )}
                    </div>
                  </CardContent>

                  {editingGoals && (
                    <CardFooter>
                      <div className="flex flex-col w-full">
                        <div className="bg-accent rounded-lg p-3 text-sm">
                          <div className="flex items-start">
                            <AlertCircle className="h-4 w-4 mr-2 mt-0.5 text-primary" />
                            <div>
                              <p className="font-medium mb-1">
                                Personalized Goals
                              </p>
                              <p className="text-muted-foreground">
                                These goals are tailored based on your health
                                conditions, age, weight, and activity level.
                                Adjusting them too drastically may impact the
                                accuracy of our recommendations.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardFooter>
                  )}
                </Card>
              </TabsContent>

              {/* Connected Devices Tab */}
              {/* <TabsContent value="devices">
                <Card>
                  <CardHeader>
                    <CardTitle>Connected Devices</CardTitle>
                    <CardDescription>
                      Connect your fitness trackers and health devices to
                      enhance your nutrition tracking
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-6">
                    {userData.devices.map((device) => (
                      <div
                        key={device.id}
                        className="flex items-center justify-between p-4 border rounded-lg"
                      >
                        <div className="flex items-center">
                          <div
                            className={`p-2 rounded-full ${
                              device.connected ? "bg-mint-green/20" : "bg-muted"
                            }`}
                          >
                            {device.name === "Google Fit" && (
                              <Activity
                                className={`h-5 w-5 ${
                                  device.connected
                                    ? "text-mint-green"
                                    : "text-muted-foreground"
                                }`}
                              />
                            )}
                            {device.name === "Fitbit" && (
                              <Watch
                                className={`h-5 w-5 ${
                                  device.connected
                                    ? "text-mint-green"
                                    : "text-muted-foreground"
                                }`}
                              />
                            )}
                            {device.name === "Apple Health" && (
                              <Heart
                                className={`h-5 w-5 ${
                                  device.connected
                                    ? "text-mint-green"
                                    : "text-muted-foreground"
                                }`}
                              />
                            )}
                          </div>

                          <div className="ml-4">
                            <h3 className="font-medium">{device.name}</h3>
                            <p className="text-sm text-muted-foreground">
                              {device.connected
                                ? `Last synced: ${device.lastSync}`
                                : "Not connected"}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center">
                          <Switch checked={device.connected} />
                        </div>
                      </div>
                    ))}

                    <div className="bg-accent rounded-lg p-4">
                      <h3 className="font-medium mb-2">Sync Health Data</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Connect your devices to automatically import steps,
                        activity, sleep, and other health metrics to get more
                        personalized nutrition advice.
                      </p>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Add another device" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Fitness Trackers</SelectLabel>
                            <SelectItem value="garmin">Garmin</SelectItem>
                            <SelectItem value="samsung">
                              Samsung Health
                            </SelectItem>
                            <SelectItem value="oura">Oura Ring</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent> */}

              {/* Health Metrics Tab */}
              <TabsContent value="health">
                <Card>
                  <CardHeader>
                    <CardTitle>Health Metrics</CardTitle>
                    <CardDescription>
                      Track your key health indicators over time
                    </CardDescription>
                  </CardHeader>

                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="p-4 border rounded-lg">
                        <div className="flex items-center mb-3">
                          <Droplets className="h-5 w-5 mr-2 text-primary" />
                          <h3 className="font-medium">Blood Sugar</h3>
                        </div>

                        <div className="text-3xl font-bold mb-2">
                          {userData.health.bloodSugar}
                          <span className="text-lg font-normal text-muted-foreground ml-1">
                            mg/dL
                          </span>
                        </div>

                        <div className="bg-sunny-amber/20 text-sunny-amber rounded-lg p-2 text-sm flex items-center">
                          <AlertCircle className="h-4 w-4 mr-1" />
                          <span>Slightly elevated</span>
                        </div>
                      </div>

                      <div className="p-4 border rounded-lg">
                        <div className="flex items-center mb-3">
                          <Heart className="h-5 w-5 mr-2 text-primary" />
                          <h3 className="font-medium">Blood Pressure</h3>
                        </div>

                        <div className="text-3xl font-bold mb-2">
                          {userData.health.bloodPressure}
                          <span className="text-lg font-normal text-muted-foreground ml-1">
                            mmHg
                          </span>
                        </div>

                        <div className="bg-sunny-amber/20 text-sunny-amber rounded-lg p-2 text-sm flex items-center">
                          <AlertCircle className="h-4 w-4 mr-1" />
                          <span>Pre-hypertension</span>
                        </div>
                      </div>

                      <div className="p-4 border rounded-lg">
                        <div className="flex items-center mb-3">
                          <Scale className="h-5 w-5 mr-2 text-primary" />
                          <h3 className="font-medium">Weight Trend</h3>
                        </div>

                        <div className="h-16 flex items-end justify-between">
                          {[76.2, 77.4, 78.1, 78.3, 77.9, 78.0, 78.0].map(
                            (weight, i) => {
                              const height = ((weight - 76) / 3) * 100;
                              return (
                                <div
                                  key={i}
                                  className="flex flex-col items-center"
                                >
                                  <div
                                    className="w-4 bg-primary/70 rounded-t-sm"
                                    style={{ height: `${height}%` }}
                                  />
                                  <span className="text-xs text-muted-foreground mt-1">
                                    {i === 0 && "Mon"}
                                    {i === 6 && "Sun"}
                                  </span>
                                </div>
                              );
                            }
                          )}
                        </div>
                      </div>

                      <div className="p-4 border rounded-lg">
                        <div className="flex items-center mb-3">
                          <Activity className="h-5 w-5 mr-2 text-primary" />
                          <h3 className="font-medium">Activity Level</h3>
                        </div>

                        <div className="space-y-2 mb-2">
                          <div className="flex justify-between text-sm">
                            <span>Steps</span>
                            <span className="font-medium">8,241 / 10,000</span>
                          </div>
                          <div className="h-2 bg-muted rounded-full">
                            <div
                              className="h-full bg-mint-green rounded-full"
                              style={{ width: "82.4%" }}
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Active Minutes</span>
                            <span className="font-medium">42 / 60</span>
                          </div>
                          <div className="h-2 bg-muted rounded-full">
                            <div
                              className="h-full bg-mint-green rounded-full"
                              style={{ width: "70%" }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6">
                      <h3 className="font-medium mb-3">
                        Update Health Information
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        <div>
                          <Label htmlFor="weight">Weight (kg)</Label>
                          <Input
                            id="weight"
                            type="number"
                            defaultValue={userData.health.weight}
                            className="mt-1"
                          />
                        </div>

                        <div>
                          <Label htmlFor="blood-sugar">
                            Blood Sugar (mg/dL)
                          </Label>
                          <Input
                            id="blood-sugar"
                            type="number"
                            defaultValue={userData.health.bloodSugar}
                            className="mt-1"
                          />
                        </div>

                        <div>
                          <Label htmlFor="blood-pressure">Blood Pressure</Label>
                          <Input
                            id="blood-pressure"
                            defaultValue={userData.health.bloodPressure}
                            className="mt-1"
                          />
                        </div>
                      </div>

                      <Button className="mt-4">
                        <Save className="mr-2 h-4 w-4" />
                        Save Health Data
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}

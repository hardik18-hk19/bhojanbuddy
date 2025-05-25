"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { HeartPulse } from "lucide-react";

const HEALTH_CONDITIONS = [
  "Diabetes (Type 2)",
  "Hypertension (High Blood Pressure)",
  "Obesity",
  "Cardiovascular Disease",
  "Hyperlipidemia (High Cholesterol)",
  "Chronic Kidney Disease (CKD)",
  "Polycystic Ovary Syndrome (PCOS)",
  "Fatty Liver Disease (NAFLD)",
  "Anemia (Iron Deficiency)",
  "Hypothyroidism",
  "Osteoporosis",
  "Metabolic Syndrome",
  "Gout",
  "Celiac Disease",
  "Irritable Bowel Syndrome (IBS) / Acid Reflux",
  "Cancer Survivorship",
];

export default function ProfileSetupPage() {
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [bmi, setBmi] = useState("");
  const [bloodSugar, setBloodSugar] = useState("");
  const [bloodPressure, setBloodPressure] = useState("");
  const [conditions, setConditions] = useState<string[]>([]);
  const [goals, setGoals] = useState({
    calories: "",
    carbs: "",
    protein: "",
    fat: "",
    sugar: "",
    sodium: "",
  });
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/profile`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.user) {
          // Prefill form fields
          if (data.user.avatar) setAvatarPreview(data.user.avatar);
          if (data.user.health) {
            setWeight(data.user.health.weight?.toString() || "");
            setHeight(data.user.health.height?.toString() || "");
            setBmi(data.user.health.bmi?.toString() || "");
            setBloodSugar(data.user.health.bloodSugar?.toString() || "");
            setBloodPressure(data.user.health.bloodPressure || "");
            setConditions(data.user.health.conditions || []);
          }
          if (data.user.goals) {
            setGoals({
              calories: data.user.goals.calories?.toString() || "",
              carbs: data.user.goals.carbs?.toString() || "",
              protein: data.user.goals.protein?.toString() || "",
              fat: data.user.goals.fat?.toString() || "",
              sugar: data.user.goals.sugar?.toString() || "",
              sodium: data.user.goals.sodium?.toString() || "",
            });
          }
        }
      });
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
    } else {
      setAvatarFile(null);
      setAvatarPreview(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    if (avatarFile) formData.append("avatar", avatarFile as Blob);

    const health = {
      conditions,
      weight: Number(weight),
      height: Number(height),
      bmi: Number(bmi),
      bloodSugar: Number(bloodSugar),
      bloodPressure,
    };

    formData.append("health", JSON.stringify(health));
    formData.append(
      "goals",
      JSON.stringify({
        calories: Number(goals.calories),
        carbs: Number(goals.carbs),
        protein: Number(goals.protein),
        fat: Number(goals.fat),
        sugar: Number(goals.sugar),
        sodium: Number(goals.sodium),
      })
    );

    try {
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
        toast({ title: "Profile setup complete!" });
        router.push("/profile");
      } else {
        toast({
          title: "Error",
          description: data.message || "Failed to save profile.",
          variant: "destructive",
        });
      }
    } catch {
      toast({
        title: "Error",
        description: "Failed to save profile.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-bb-primary/10 to-white flex items-center justify-center py-8 px-2">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-white/90 rounded-2xl shadow-xl p-8 space-y-8 border border-bb-primary/20"
      >
        <h1 className="text-3xl font-extrabold text-center text-bb-primary mb-2">
          Complete Your Profile
        </h1>
        <p className="text-center text-muted-foreground mb-6">
          Help us personalize your experience by filling out your health and
          goal information.
        </p>

        {/* Avatar Upload */}
        <div className="flex flex-col items-center gap-2">
          <Label className="font-semibold">
            Upload Avatar (Selfie/Photo, optional)
          </Label>
          <Input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full max-w-xs"
          />
          {avatarPreview && (
            <img
              src={avatarPreview}
              alt="Preview"
              className="w-28 h-28 rounded-full border-4 border-bb-primary/30 shadow mt-2 object-cover"
            />
          )}
        </div>

        {/* Health Section */}
        <div className="bg-bb-primary/5 rounded-xl p-6 mb-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <HeartPulse className="text-bb-primary" />
            <h2 className="text-lg font-bold text-bb-primary">
              Health Details
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label>Weight (kg)</Label>
              <Input
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="mt-1"
                placeholder="e.g. 70"
              />
            </div>
            <div>
              <Label>Height (cm)</Label>
              <Input
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                className="mt-1"
                placeholder="e.g. 175"
              />
            </div>
            <div>
              <Label>BMI</Label>
              <Input
                type="number"
                value={bmi}
                onChange={(e) => setBmi(e.target.value)}
                className="mt-1"
                placeholder="e.g. 22.5"
              />
            </div>
            <div>
              <Label>Blood Sugar</Label>
              <Input
                type="number"
                value={bloodSugar}
                onChange={(e) => setBloodSugar(e.target.value)}
                className="mt-1"
                placeholder="e.g. 90"
              />
            </div>
            <div>
              <Label>Blood Pressure</Label>
              <Input
                value={bloodPressure}
                onChange={(e) => setBloodPressure(e.target.value)}
                className="mt-1"
                placeholder="e.g. 120/80"
              />
            </div>
            {/* Health Conditions Multi-Select */}
            <div>
              <Label className="mb-1 block">Health Conditions</Label>
              <div
                className="flex flex-wrap gap-2 mb-2 rounded-lg border border-bb-primary/20 bg-white/80 p-2 shadow-inner"
                style={{ maxHeight: 140, overflowY: "auto" }}
              >
                {HEALTH_CONDITIONS.map((cond) => (
                  <label
                    key={cond}
                    className={`flex items-center gap-2 px-3 py-1 rounded-full cursor-pointer text-xs md:text-sm transition
              ${
                conditions.includes(cond)
                  ? "bg-bb-primary/80 text-white font-semibold shadow"
                  : "bg-gray-100 hover:bg-bb-primary/10"
              }
            `}
                    style={{ minWidth: "fit-content" }}
                  >
                    <input
                      type="checkbox"
                      checked={conditions.includes(cond)}
                      onChange={() =>
                        setConditions((prev) =>
                          prev.includes(cond)
                            ? prev.filter((c) => c !== cond)
                            : [...prev, cond]
                        )
                      }
                      className="accent-bb-primary"
                    />
                    {cond}
                  </label>
                ))}
              </div>
              <Input
                placeholder="Other (comma separated)"
                value={conditions
                  .filter((c) => !HEALTH_CONDITIONS.includes(c))
                  .join(",")}
                onChange={(e) => {
                  const custom = e.target.value
                    .split(",")
                    .map((s) => s.trim())
                    .filter((s) => s.length > 0);
                  setConditions([
                    ...conditions.filter((c) => HEALTH_CONDITIONS.includes(c)),
                    ...custom,
                  ]);
                }}
                className="mt-1"
              />
            </div>
          </div>
        </div>

        {/* Goals Section */}
        <div className="bg-bb-primary/5 rounded-xl p-6">
          <Label className="font-semibold mb-2 block">Goals</Label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <Input
              placeholder="Calories"
              type="number"
              value={goals.calories}
              onChange={(e) => setGoals({ ...goals, calories: e.target.value })}
            />
            <Input
              placeholder="Carbs"
              type="number"
              value={goals.carbs}
              onChange={(e) => setGoals({ ...goals, carbs: e.target.value })}
            />
            <Input
              placeholder="Protein"
              type="number"
              value={goals.protein}
              onChange={(e) => setGoals({ ...goals, protein: e.target.value })}
            />
            <Input
              placeholder="Fat"
              type="number"
              value={goals.fat}
              onChange={(e) => setGoals({ ...goals, fat: e.target.value })}
            />
            <Input
              placeholder="Sugar"
              type="number"
              value={goals.sugar}
              onChange={(e) => setGoals({ ...goals, sugar: e.target.value })}
            />
            <Input
              placeholder="Sodium"
              type="number"
              value={goals.sodium}
              onChange={(e) => setGoals({ ...goals, sodium: e.target.value })}
            />
          </div>
        </div>

        <Button
          type="submit"
          className="w-full bg-bb-primary hover:bg-bb-primary/90 text-lg py-3 rounded-xl font-semibold shadow"
        >
          Save Profile
        </Button>
      </form>
    </div>
  );
}

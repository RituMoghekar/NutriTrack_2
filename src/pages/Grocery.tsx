import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import Header from "@/components/Header";
import { Checkbox } from "@/components/ui/checkbox";

// ✅ Regional + Seasonal suggestions (Veg & Non-Veg)
const regionalFoods: Record<string, Record<string, { Veg: string[]; NonVeg: string[] }>> = {
  Telangana: {
    Summer: { Veg: ["Ragi", "Curd", "Green Gram", "Spinach"], NonVeg: ["Eggs", "Fish", "Chicken"] },
    Winter: { Veg: ["Jowar", "Groundnuts", "Sweet Potato"], NonVeg: ["Mutton", "Chicken Soup"] },
    Rainy: { Veg: ["Rice", "Dal", "Tamarind", "Drumstick Leaves"], NonVeg: ["Fish Curry", "Egg Curry"] },
  },
  Maharashtra: {
    Summer: { Veg: ["Bajra", "Buttermilk", "Drumstick Leaves"], NonVeg: ["Fish Fry", "Eggs"] },
    Winter: { Veg: ["Jowar", "Jaggery", "Carrot"], NonVeg: ["Chicken Curry"] },
    Rainy: { Veg: ["Rice", "Green Gram", "Onions", "Tamarind"], NonVeg: ["Fish Curry"] },
  },
  "Andhra Pradesh": {
    Summer: { Veg: ["Millets", "Curd", "Bottle Gourd"], NonVeg: ["Egg Curry", "Fish Curry"] },
    Winter: { Veg: ["Groundnuts", "Sweet Potato", "Leafy Greens"], NonVeg: ["Mutton Curry"] },
    Rainy: { Veg: ["Rice", "Tamarind", "Brinjal"], NonVeg: ["Prawns Curry"] },
  },
  Karnataka: {
    Summer: { Veg: ["Ragi Mudde", "Buttermilk", "Drumstick Leaves"], NonVeg: ["Eggs", "Fish Fry"] },
    Winter: { Veg: ["Jowar", "Carrot", "Beetroot"], NonVeg: ["Chicken Soup"] },
    Rainy: { Veg: ["Rice", "Beans", "Leafy Greens"], NonVeg: ["Fish Curry", "Egg Curry"] },
  },
};

// ✅ Food Categories
const foodCategories = ["All", "Staples", "Vegetables", "Proteins", "Dairy"];

// ✅ Nutrition Info (for display)
const nutritionInfo: Record<string, string[]> = {
  Ragi: ["Calcium", "Iron"],
  Curd: ["Calcium", "Protein"],
  "Green Gram": ["Protein", "Iron"],
  Spinach: ["Iron", "Fiber"],
  Rice: ["Carbs"],
  Dal: ["Protein"],
  Jowar: ["Fiber", "Iron"],
  Groundnuts: ["Protein", "Healthy Fats"],
  Eggs: ["Protein", "Vitamin B12"],
  Fish: ["Omega-3", "Protein"],
  Chicken: ["Protein"],
  "Sweet Potato": ["Vitamin A", "Fiber"],
  Tamarind: ["Iron"],
  "Drumstick Leaves": ["Iron", "Calcium"],
  Mutton: ["Protein", "Iron"],
};

// ✅ Essentials for Online Section
const onlineEssentials = {
  All: ["Chia Seeds", "Almond Powder", "Multigrain Flour"],
  Kids: ["Dry Fruits Mix", "Protein Powder"],
  Pregnant: ["Iron Tablets", "Dates", "Ghee"],
  Elderly: ["Calcium Supplements", "Ragi Powder"],
};

// ✅ Nutrition Priority Ranking
const nutritionPriority = [
  "Green Gram",
  "Ragi",
  "Spinach",
  "Drumstick Leaves",
  "Curd",
  "Rice",
  "Dal",
  "Jowar",
  "Groundnuts",
  "Sweet Potato",
  "Eggs",
  "Fish",
  "Chicken",
];

// ✅ Essential Nutrients Checklist
const essentialNutrients = ["Protein", "Iron", "Calcium", "Fiber", "Omega-3"];

// ✅ Speech Narration
function speakText(text: string) {
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = "en-IN";
  utter.rate = 0.95;
  window.speechSynthesis.speak(utter);
}

const Grocery = () => {
  const [region, setRegion] = useState("Telangana");
  const [season, setSeason] = useState("Summer");
  const [category, setCategory] = useState("All");
  const [dietType, setDietType] = useState("Veg");
  const [specialNeed, setSpecialNeed] = useState("All");
  const [availableItems, setAvailableItems] = useState<{ name: string; checked: boolean }[]>([]);
  const [inputItem, setInputItem] = useState("");
  const [missingNutrients, setMissingNutrients] = useState<string[]>([]);

  const [orderItem, setOrderItem] = useState<string | null>(null);
const [orderCost, setOrderCost] = useState<number>(0);
const [address, setAddress] = useState<string>("");
const [orderConfirmed, setOrderConfirmed] = useState<boolean>(false);


  // ✅ Load from localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("groceryList") || "[]");
    setAvailableItems(saved);
  }, []);

  // ✅ Save to localStorage
  useEffect(() => {
    localStorage.setItem("groceryList", JSON.stringify(availableItems));
  }, [availableItems]);

  // ✅ Generate list based on region & season
const generateList = () => {
  let baseList = regionalFoods[region]?.[season]?.[dietType] || [];

  if (category !== "All") {
    baseList = baseList.filter((item) =>
      (category === "Staples" && ["Rice", "Jowar", "Bajra", "Millets"].includes(item)) ||
      (category === "Vegetables" && ["Spinach", "Drumstick Leaves", "Brinjal", "Bottle Gourd"].includes(item)) ||
      (category === "Proteins" && ["Eggs", "Fish", "Chicken", "Mutton"].includes(item)) ||
      (category === "Dairy" && ["Curd", "Buttermilk", "Milk"].includes(item))
    );
  }

  // ✅ Ensure at least one fallback item for the category
  if (baseList.length === 0 && category !== "All") {
    if (category === "Staples") baseList = ["Rice"];
    if (category === "Vegetables") baseList = ["Spinach"];
    if (category === "Proteins") baseList = dietType === "NonVeg" ? ["Eggs"] : ["Green Gram"];
    if (category === "Dairy") baseList = ["Curd"];
  }

  const newList = baseList.map((item) => ({ name: item, checked: false }));
  setAvailableItems(newList);
  setMissingNutrients([]);
  speakText(`Your grocery list for ${region} in ${season} is ready.`);
};


  // ✅ Add custom item
  const addItem = () => {
    if (inputItem.trim() && !availableItems.find((i) => i.name === inputItem)) {
      setAvailableItems([...availableItems, { name: inputItem, checked: false }]);
      setInputItem("");
    }
  };

  const removeItem = (item: string) => {
    setAvailableItems(availableItems.filter((i) => i.name !== item));
  };

  const toggleCheck = (item: string) => {
    setAvailableItems(
      availableItems.map((i) => (i.name === item ? { ...i, checked: !i.checked } : i))
    );
  };

  // ✅ Sort list by nutrition priority & calculate missing nutrients
  const submitList = () => {
    const sortedList = [...availableItems].sort((a, b) => {
      const aIndex = nutritionPriority.indexOf(a.name);
      const bIndex = nutritionPriority.indexOf(b.name);
      return (aIndex === -1 ? 999 : aIndex) - (bIndex === -1 ? 999 : bIndex);
    });
    setAvailableItems(sortedList);

    // ✅ Calculate missing nutrients
    const presentNutrients = new Set<string>();
    sortedList.forEach((item) => {
      (nutritionInfo[item.name] || []).forEach((nut) => presentNutrients.add(nut));
    });
    const missing = essentialNutrients.filter((nut) => !presentNutrients.has(nut));
    setMissingNutrients(missing);

    speakText("Your list is sorted based on nutrition priority. Missing nutrients updated.");
  };

  // ✅ Health Score
  const presentNutrients = new Set<string>();
  availableItems.forEach((item) => (nutritionInfo[item.name] || []).forEach((n) => presentNutrients.add(n)));
  const healthScore = Math.min(
  Math.round((presentNutrients.size / essentialNutrients.length) * 100),
  100
);

  // ✅ Download PDF
  const downloadPDF = () => {
  const doc = new jsPDF();

  doc.text("NutriTrack Grocery Report", 14, 15);

  autoTable(doc, {
    startY: 30,
    head: [["Item", "Nutrients", "Status"]],
    body: availableItems.map((i) => [
      i.name,
      (nutritionInfo[i.name] || []).join(", ") || "General Energy",
      i.checked ? "✔ Bought" : "Pending",
    ]),
  });

  doc.save("Grocery_List_Report.pdf");
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-orange-50">
  <Header />
  <div className="container mx-auto px-4 py-8">
    {/* Existing Grocery page content here */}
      <h1 className="text-3xl font-bold mb-4">Smart Grocery Guide 🛒</h1>

      {/* ✅ Nutrition Progress */}
      <Card className="mb-6 p-4">
        <p className="text-lg font-semibold">Nutrition Coverage: {healthScore}%</p>
        <div className="w-full h-2 bg-gray-200 rounded-full mt-2">
          <div className="h-full bg-green-500" style={{ width: `${healthScore}%` }}></div>
        </div>
      </Card>

      {/* ✅ Selection */}
      <Card className="mb-6 p-4">
        <CardHeader>
          <CardTitle>Select Preferences</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label>Region</Label>
            <select className="border p-2 rounded w-full" value={region} onChange={(e) => setRegion(e.target.value)}>
  {Object.keys(regionalFoods).map((reg) => (
    <option key={reg}>{reg}</option>
  ))}
</select>
          </div>
          <div>
            <Label>Season</Label>
            <select className="border p-2 rounded w-full" value={season} onChange={(e) => setSeason(e.target.value)}>
              <option>Summer</option>
              <option>Winter</option>
              <option>Rainy</option>
            </select>
          </div>
          <div>
            <Label>Food Category</Label>
            <select className="border p-2 rounded w-full" value={category} onChange={(e) => setCategory(e.target.value)}>
              {foodCategories.map((cat) => (
                <option key={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <div>
            <Label>Diet Type</Label>
            <select className="border p-2 rounded w-full" value={dietType} onChange={(e) => setDietType(e.target.value)}>
              <option>Veg</option>
              <option>NonVeg</option>
            </select>
          </div>
          <Button onClick={generateList} className="bg-green-600 hover:bg-green-700">
            Generate List
          </Button>
        </CardContent>
      </Card>

      {/* ✅ Grocery List */}
      <Card className="mb-6 p-4">
        <CardHeader>
          <CardTitle>Your Grocery List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2 mb-4">
            <Input placeholder="Add item" value={inputItem} onChange={(e) => setInputItem(e.target.value)} />
            <Button onClick={addItem}>Add</Button>
          </div>
          <div>
            {availableItems.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between mb-2">
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <Checkbox checked={item.checked} onCheckedChange={() => toggleCheck(item.name)} />
                    <span className={item.checked ? "line-through text-gray-500" : ""}>{item.name}</span>
                  </div>
                  <span className="text-xs text-gray-500">
                    Nutrients: {(nutritionInfo[item.name] || []).join(", ") || "General Energy"}
                  </span>
                </div>
                <span className="text-red-500 cursor-pointer" onClick={() => removeItem(item.name)}>✕</span>
              </div>
            ))}
          </div>
          <div className="mt-4 flex flex-wrap gap-3">
  <Button
    onClick={submitList}
    className="bg-orange-500 text-white hover:bg-orange-600"
  >
    Submit (Nutrition Priority)
  </Button>
  
  <Button
    onClick={() =>
      speakText(`Your grocery list includes ${availableItems.map((i) => i.name).join(", ")}`)
    }
    className="bg-green-600 text-white hover:bg-green-700"
  >
    Listen Grocery List
  </Button>

</div>

          {/* ✅ Missing Nutrients */}
          {missingNutrients.length > 0 && (
            <div className="mt-4 text-red-600">
              <p className="font-semibold">Missing Nutrients:</p>
              {missingNutrients.join(", ")}
            </div>
          )}
        </CardContent>
      </Card>

      {/* ✅ Online Essentials */}
      <Card className="mb-6 p-4">
        <CardHeader>
          <CardTitle>Essential Products (Not Easily Available)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-3">
            <Label>Special Needs</Label>
            <select className="border p-2 rounded w-full" value={specialNeed} onChange={(e) => setSpecialNeed(e.target.value)}>
              <option>All</option>
              <option>Kids</option>
              <option>Pregnant</option>
              <option>Elderly</option>
            </select>
          </div>
          {(onlineEssentials[specialNeed as keyof typeof onlineEssentials] || []).map((item) => (
            <div key={item} className="flex justify-between border p-2 mb-2">
              <span>{item}</span>
              <Button
  variant="outline"
  onClick={() => {
    setOrderItem(item);
    setOrderCost(Math.floor(Math.random() * 150 + 50)); // Random cost for now
    setOrderConfirmed(false);
  }}
>
  Order
</Button>
            </div>
          ))}
{orderItem && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
    <div className="bg-white rounded-lg p-6 w-80 shadow-lg">
      <h2 className="text-lg font-semibold mb-4">Order {orderItem}</h2>
      <p className="mb-2">Approx Cost: ₹{orderCost}</p>
      <Label>Enter Delivery Address:</Label>
      <Input
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder="Your address"
        className="mb-4"
      />
      {!orderConfirmed ? (
        <>
          <Button
            className="bg-green-600 w-full hover:bg-green-700"
            onClick={() => {
              setOrderConfirmed(true);
              // Simulate sending request (ASHA Worker system will handle later)
            }}
          >
            Send Request to ASHA Worker
          </Button>
          <Button
            variant="ghost"
            className="w-full mt-2"
            onClick={() => setOrderItem(null)}
          >
            Cancel
          </Button>
        </>
      ) : (
        <>
          <p className="text-green-600 font-semibold text-center mb-4">✅ Request Sent!</p>
          <Button
            className="bg-blue-600 w-full hover:bg-blue-700"
            onClick={() => {
              setOrderItem(null); // Close modal
              setAddress(""); // Reset address
            }}
          >
            Done
          </Button>
        </>
      )}
    </div>
  </div>
)}
        </CardContent>
      </Card>

      {/* ✅ Actions */}
      <div className="flex gap-4">
        <Button onClick={downloadPDF} className="bg-blue-600 text-white">Download PDF</Button>
      </div>
       </div>
  </div> 
);
};

export default Grocery;

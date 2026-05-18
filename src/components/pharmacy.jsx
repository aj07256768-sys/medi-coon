  import React, { useState } from "react";

const PharmacyStock = () => {
  const [darkMode, setDarkMode] = useState(false);

  const [search, setSearch] = useState("");

  const [medicines, setMedicines] = useState([
    { id: 1, name: "Paracetamol", stock: 450 },
    { id: 2, name: "Amoxicillin", stock: 12 },
    { id: 3, name: "Insulin", stock: 84 },
    { id: 4, name: "Aspirin", stock: 20 },
    
  ]);

  const [newMed, setNewMed] = useState({ name: "", stock: "" });

  // Add medicine
  const addMedicine = () => {
    if (!newMed.name || !newMed.stock) return;

    setMedicines([
      ...medicines,
      {
        id: Date.now(),
        name: newMed.name,
        stock: Number(newMed.stock),
      },
    ]);

    setNewMed({ name: "", stock: "" });
  };



   // Delete medicine 
  const deleteMedicine = (id) => {
    setMedicines(medicines.filter((med) => med.id !== id));
  };

  
  // Search filter
  const filtered = medicines.filter((med) =>
    med.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div
      className={`p-10 min-h-screen transition-all ${
        darkMode ? "bg-slate-900 text-black" : "bg-white text-black"
      }`}
    >
    
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold">Pharmacy Inventory</h1>

        <button
          onClick={() => setDarkMode(!darkMode)}
          className="px-4 py-2 rounded-xl bg-blue-600 text-white"
        >
          Toggle
        </button>
      </div>


      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search medicine..."
        className="w-full p-3 rounded-xl border mb-6 text-black"
      />

      {/* Add Medicine */}

      <div className="flex gap-3 mb-8">
        <input
          value={newMed.name}
          onChange={(e) =>
            setNewMed({ ...newMed, name: e.target.value })
          }
          placeholder="Name"
          className="p-2 border rounded-xl text-black"
        />

        <input
          value={newMed.stock}
          onChange={(e) =>
            setNewMed({ ...newMed, stock: e.target.value })
          }
          placeholder="Stock"
          type="number"
          className="p-2 border rounded-xl text-black"
        />

        <button
          onClick={addMedicine}
          className="bg-blue-600 text-white px-4 rounded-xl"
        >
          Add
        </button>
      </div>

      

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {filtered.map((med) => (
          <div
            key={med.id}
            className="p-5 rounded-2xl bg-slate-100 shadow relative"
          >
            <p className="font-bold text-black-500">{med.name}</p>
            <p
              className={`text-lg font-bold ${
                med.stock < 50 ? "text-red-500" : "text-blue-600"
              }`}
            >
              {med.stock}u
            </p>

            <button
              onClick={() => deleteMedicine(med.id)}
              className="absolute top-2 right-3 text-red-500 font-bold"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PharmacyStock;  

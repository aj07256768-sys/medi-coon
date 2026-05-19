import React, { useState } from "react";

const PharmacyStock = ({ medicines = [], setMedicines }) => {
  const [search, setSearch] = useState("");
  const [newMed, setNewMed] = useState({ name: "", stock: "" });

  // FIXED: Now saves permanently to db.json
  const addMedicine = async () => {
    if (!newMed.name || !newMed.stock) return;
    const addedItem = { name: newMed.name, stock: Number(newMed.stock) };

    try {
      const response = await fetch("http://localhost:5000/medicines", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(addedItem),
      });
      const data = await response.json();
      setMedicines([...medicines, data]);
      setNewMed({ name: "", stock: "" });
    } catch (error) {
      console.error("Error adding medicine. Is JSON Server running?", error);
    }
  };

  // FIXED: Now deletes permanently from db.json
  const deleteMedicine = async (id) => {
    try {
      await fetch(`http://localhost:5000/medicines/${id}`, { method: "DELETE" });
      setMedicines(medicines.filter((med) => med.id !== id));
    } catch (error) {
      console.error("Error deleting medicine. Is JSON Server running?", error);
    }
  };

  return (
    <div className="p-10 bg-white rounded-[2.5rem] border border-slate-200">
      <h1 className="text-xl font-black uppercase mb-6">Pharmacy Inventory</h1>
      <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search medicine..." className="w-full p-4 rounded-2xl border mb-6 bg-slate-50 font-bold text-sm" />
      <div className="flex gap-3 mb-8">
        <input value={newMed.name} onChange={(e) => setNewMed({ ...newMed, name: e.target.value })} placeholder="Name" className="p-3 border rounded-xl text-sm font-bold bg-slate-50" />
        <input value={newMed.stock} onChange={(e) => setNewMed({ ...newMed, stock: e.target.value })} placeholder="Stock" type="number" className="p-3 border rounded-xl text-sm font-bold bg-slate-50" />
        <button onClick={addMedicine} className="bg-blue-600 text-white px-5 rounded-xl text-xs font-black uppercase">Add</button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {medicines.filter(m => m.name.toLowerCase().includes(search.toLowerCase())).map((med) => (
          <div key={med.id} className="p-5 rounded-2xl bg-slate-50 border relative">
            <p className="font-bold text-slate-800">{med.name}</p>
            <p className={`text-lg font-black ${med.stock < 50 ? "text-red-500" : "text-blue-600"}`}>{med.stock}u</p>
            <button onClick={() => deleteMedicine(med.id)} className="absolute top-4 right-4 text-slate-400 hover:text-red-500 font-bold">✕</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PharmacyStock;
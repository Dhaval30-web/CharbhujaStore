import { useState, useContext, createContext, useCallback } from "react";

// ════════════════════════════════════════════════════════════════════
//  CHARBHUJA ADMIN PANEL  — Fully Functional with Global State
//  Theme  : Purple #695588 / #6f5a8e  (exact match App.css)
//  Font   : Ubuntu  (same as your project)
//  State  : Global Context — add product once → updates everywhere
// ════════════════════════════════════════════════════════════════════

// ─────────────────────────────────────────────
//  CATEGORY-SPECIFIC FIELD SCHEMAS
//  Har category ke liye alag fields define hain
// ─────────────────────────────────────────────
const CATEGORY_SCHEMAS = {
  "Spices & Masala": {
    icon: "🌶️",
    subCategories: ["Whole Spices", "Powdered Spices", "Spice Mixes", "Dry Aromatics"],
    weightOptions: ["50g", "100g", "250g", "500g", "1kg", "5kg"],
    extraFields: [
      { key: "spiceType",   label: "Spice Type",        type: "select", options: ["Whole", "Powdered", "Mix", "Aromatic"] },
      { key: "origin",      label: "Origin / Region",   type: "text",   placeholder: "e.g. Rajasthan, Kerala, Goa" },
      { key: "heatLevel",   label: "Heat Level",        type: "select", options: ["Mild", "Medium", "Hot", "Extra Hot", "N/A"] },
      { key: "isOrganic",   label: "Organic Certified", type: "toggle" },
      { key: "aroma",       label: "Aroma Profile",     type: "text",   placeholder: "e.g. Earthy, Pungent, Floral" },
    ],
  },
  "Dry Fruits": {
    icon: "🥜",
    subCategories: ["Almonds", "Cashews", "Pistachios", "Walnuts", "Raisins", "Anjeer", "Dates", "Apricots"],
    weightOptions: ["100g", "250g", "500g", "1kg", "5kg"],
    extraFields: [
      { key: "variety",     label: "Variety / Type",    type: "text",   placeholder: "e.g. Californian, Afghan, Iranian" },
      { key: "isRoasted",   label: "Roasted",           type: "toggle" },
      { key: "isSalted",    label: "Salted",            type: "toggle" },
      { key: "grade",       label: "Grade",             type: "select", options: ["Premium", "Standard", "Export Quality", "Organic"] },
      { key: "shellType",   label: "Shell Type",        type: "select", options: ["Shelled", "Unshelled", "N/A"] },
    ],
  },
  "Snacks": {
    icon: "🍿",
    subCategories: ["Flavoured Nuts", "Namkeen", "Biscuits", "Chips", "Protein Bars"],
    weightOptions: ["50g", "100g", "200g", "250g", "500g"],
    extraFields: [
      { key: "flavour",     label: "Flavour",           type: "text",   placeholder: "e.g. Goa Masala, Peri Peri, Classic Salted" },
      { key: "isVeg",       label: "Veg Certified",     type: "toggle" },
      { key: "spiceLevel",  label: "Spice Level",       type: "select", options: ["Mild", "Medium", "Hot", "Not Spicy"] },
      { key: "packType",    label: "Pack Type",         type: "select", options: ["Pouch", "Box", "Can", "Jar"] },
    ],
  },
  "Atta & Flour": {
    icon: "🌾",
    subCategories: ["Wheat Flour", "Besan", "Maida", "Multigrain", "Rice Flour", "Ragi Flour"],
    weightOptions: ["1kg", "2kg", "5kg", "10kg", "25kg"],
    extraFields: [
      { key: "flourType",   label: "Flour Type",        type: "select", options: ["Whole Wheat", "Refined", "Multigrain", "Stone Ground", "Fortified"] },
      { key: "grainSource", label: "Grain Source",      type: "text",   placeholder: "e.g. MP Sharbati, Lokwan" },
      { key: "isStoneMill", label: "Stone Ground (Chakki)", type: "toggle" },
      { key: "protein",     label: "Protein Content (%)", type: "text", placeholder: "e.g. 12.5" },
    ],
  },
  "Dal & Pulses": {
    icon: "🫘",
    subCategories: ["Toor Dal", "Chana Dal", "Moong Dal", "Masoor Dal", "Urad Dal", "Rajma", "Chole"],
    weightOptions: ["500g", "1kg", "2kg", "5kg", "10kg"],
    extraFields: [
      { key: "dalType",     label: "Dal Type",          type: "select", options: ["Whole", "Split", "Washed", "Chilka"] },
      { key: "region",      label: "Region / Source",   type: "text",   placeholder: "e.g. Gujarat, Madhya Pradesh" },
      { key: "isOrganic",   label: "Organic",           type: "toggle" },
      { key: "cookTime",    label: "Approx Cook Time",  type: "text",   placeholder: "e.g. 20-25 mins" },
    ],
  },
  "Grocery": {
    icon: "🛒",
    subCategories: ["Rice & Basmati", "Oil & Ghee", "Sugar & Jaggery", "Salt", "Tea & Coffee", "Pickle", "Papad"],
    weightOptions: ["250g", "500g", "1kg", "2kg", "5kg", "1L", "5L"],
    extraFields: [
      { key: "groceryType", label: "Grocery Type",      type: "select", options: ["Grain", "Oil", "Sweetener", "Condiment", "Beverage", "Preserved"] },
      { key: "brand",       label: "Brand (if not Charbhuja)", type: "text", placeholder: "e.g. Amul, Fortune, MDH" },
      { key: "packSize",    label: "Pack Size / Unit",  type: "text",   placeholder: "e.g. 1L, 500g, 1kg" },
      { key: "isImported",  label: "Imported",          type: "toggle" },
    ],
  },
  "Food": {
    icon: "🍱",
    subCategories: ["Instant & Ready Meals", "Breakfast Cereals", "Chocolate", "Pickles", "Biscuits", "Noodles"],
    weightOptions: ["50g", "100g", "200g", "250g", "500g"],
    extraFields: [
      { key: "mealType",    label: "Meal Type",         type: "select", options: ["Breakfast", "Snack", "Meal", "Dessert", "Beverage"] },
      { key: "cuisine",     label: "Cuisine",           type: "select", options: ["Indian", "Continental", "Chinese", "Mixed"] },
      { key: "isInstant",   label: "Instant / Ready-to-eat", type: "toggle" },
      { key: "cookInstr",   label: "Cooking Instruction", type: "text", placeholder: "e.g. Add 200ml water, boil 2 mins" },
    ],
  },
  "Perfumes": {
    icon: "🌸",
    subCategories: ["Fogg", "Denver", "Wild Stone", "Calvin Klein", "Belavita", "Patels", "Axe"],
    weightOptions: ["30ml", "50ml", "100ml", "150ml", "200ml"],
    extraFields: [
      { key: "scentFamily", label: "Scent Family",      type: "select", options: ["Floral", "Woody", "Musky", "Fresh", "Oriental", "Citrus"] },
      { key: "gender",      label: "For",               type: "select", options: ["Men", "Women", "Unisex"] },
      { key: "longevity",   label: "Longevity",         type: "select", options: ["2-4 hrs", "4-6 hrs", "6-8 hrs", "8+ hrs"] },
      { key: "concentration", label: "Concentration",   type: "select", options: ["EDT", "EDP", "Parfum", "Body Spray", "Deo"] },
      { key: "topNotes",    label: "Top Notes",         type: "text",   placeholder: "e.g. Citrus, Bergamot" },
    ],
  },
};

// ─────────────────────────────────────────────
//  INITIAL SEED DATA
// ─────────────────────────────────────────────
const SEED_PRODUCTS = [
  { id:1,  name:"Premium South Indian Green Cardamom", brand:"Charbhuja", category:"Spices & Masala", subCategory:"Whole Spices",   oldPrice:3800, newPrice:3500, discount:8,  stock:true,  isBestSeller:true,  isNew:false, rating:4.5, description:"Handpicked from South India's finest farms — bold aroma.",            mfgDate:"15/05/2026", expDate:"31/05/2027", tags:"cardamom,organic,export quality",       weightOptions:[{label:"250g",oldPrice:950,newPrice:875},{label:"500g",oldPrice:1900,newPrice:1750},{label:"1kg",oldPrice:3800,newPrice:3500},{label:"5kg",oldPrice:19000,newPrice:17500}], origin:"Kerala", spiceType:"Whole", heatLevel:"N/A", isOrganic:true, aroma:"Floral" },
  { id:2,  name:"Premium Californian Almonds",          brand:"Charbhuja", category:"Dry Fruits",      subCategory:"Almonds",        oldPrice:1000, newPrice:900,  discount:10, stock:true,  isBestSeller:true,  isNew:false, rating:4,   description:"Finest California almonds, rich in nutrients.",                       mfgDate:"01/04/2026", expDate:"31/03/2027", tags:"almonds,healthy,protein",               weightOptions:[{label:"250g",oldPrice:250,newPrice:225},{label:"500g",oldPrice:500,newPrice:450},{label:"1kg",oldPrice:1000,newPrice:900},{label:"5kg",oldPrice:5000,newPrice:4500}], variety:"Californian", grade:"Export Quality", isRoasted:false, isSalted:false, shellType:"Shelled" },
  { id:3,  name:"Premium Californian Pistachios",       brand:"Charbhuja", category:"Dry Fruits",      subCategory:"Pistachios",     oldPrice:1700, newPrice:1500, discount:12, stock:true,  isBestSeller:true,  isNew:false, rating:3.5, description:"Crunchy pistachios from premium California farms.",                    mfgDate:"01/03/2026", expDate:"28/02/2027", tags:"pistachios,crunchy,healthy",            weightOptions:[{label:"250g",oldPrice:425,newPrice:375},{label:"500g",oldPrice:850,newPrice:750},{label:"1kg",oldPrice:1700,newPrice:1500},{label:"5kg",oldPrice:8500,newPrice:7500}], variety:"Californian", grade:"Premium", isRoasted:false, isSalted:false, shellType:"Shelled" },
  { id:4,  name:"Premium Goa Masala Cashew",            brand:"Charbhuja", category:"Snacks",          subCategory:"Flavoured Nuts", oldPrice:1500, newPrice:1300, discount:13, stock:true,  isBestSeller:true,  isNew:false, rating:4,   description:"Authentic Goan spiced cashews with bold tangy masala flavour.",        mfgDate:"10/05/2026", expDate:"09/11/2026", tags:"cashews,goa masala,spicy",              weightOptions:[{label:"250g",oldPrice:375,newPrice:325},{label:"500g",oldPrice:750,newPrice:650},{label:"1kg",oldPrice:1500,newPrice:1300},{label:"5kg",oldPrice:7500,newPrice:6500}], flavour:"Goa Masala", isVeg:true, spiceLevel:"Hot", packType:"Pouch" },
  { id:5,  name:"Organic Rajasthani Chilli Powder",     brand:"Charbhuja", category:"Spices & Masala", subCategory:"Powdered Spices",oldPrice:600,  newPrice:550,  discount:8,  stock:true,  isBestSeller:true,  isNew:false, rating:4.5, description:"Stone-ground red chilli powder from Rajasthan's finest farms.",        mfgDate:"20/04/2026", expDate:"19/04/2027", tags:"chilli,organic,rajasthani",             weightOptions:[{label:"250g",oldPrice:150,newPrice:138},{label:"500g",oldPrice:300,newPrice:275},{label:"1kg",oldPrice:600,newPrice:550},{label:"5kg",oldPrice:3000,newPrice:2750}], origin:"Rajasthan", spiceType:"Powdered", heatLevel:"Extra Hot", isOrganic:true, aroma:"Pungent" },
  { id:6,  name:"Organic Rajasthani Turmeric Powder",   brand:"Charbhuja", category:"Spices & Masala", subCategory:"Powdered Spices",oldPrice:600,  newPrice:550,  discount:8,  stock:true,  isBestSeller:true,  isNew:false, rating:4,   description:"Pure turmeric powder with high curcumin content.",                     mfgDate:"20/04/2026", expDate:"19/04/2027", tags:"turmeric,organic,haldi",                weightOptions:[{label:"250g",oldPrice:150,newPrice:138},{label:"500g",oldPrice:300,newPrice:275},{label:"1kg",oldPrice:600,newPrice:550},{label:"5kg",oldPrice:3000,newPrice:2750}], origin:"Rajasthan", spiceType:"Powdered", heatLevel:"N/A", isOrganic:true, aroma:"Earthy" },
  { id:7,  name:"Organic Rajasthani Coriander Powder",  brand:"Charbhuja", category:"Spices & Masala", subCategory:"Powdered Spices",oldPrice:600,  newPrice:550,  discount:8,  stock:true,  isBestSeller:true,  isNew:false, rating:3.5, description:"Freshly ground coriander powder with authentic aroma.",                mfgDate:"20/04/2026", expDate:"19/04/2027", tags:"coriander,organic,dhaniya",             weightOptions:[{label:"250g",oldPrice:150,newPrice:138},{label:"500g",oldPrice:300,newPrice:275},{label:"1kg",oldPrice:600,newPrice:550},{label:"5kg",oldPrice:3000,newPrice:2750}], origin:"Rajasthan", spiceType:"Powdered", heatLevel:"Mild", isOrganic:true, aroma:"Earthy" },
  { id:8,  name:"Premium MP Sarbati Gehu Ka Aata",      brand:"Charbhuja", category:"Atta & Flour",    subCategory:"Wheat Flour",    oldPrice:230,  newPrice:215,  discount:7,  stock:true,  isBestSeller:false, isNew:true,  rating:4.5, description:"100% Whole Wheat Flour — Pure, Natural & Healthy.",                    mfgDate:"01/05/2026", expDate:"30/04/2027", tags:"gehu,aata,wheat flour,natural",         weightOptions:[{label:"1kg",oldPrice:46,newPrice:43},{label:"2kg",oldPrice:92,newPrice:86},{label:"5kg",oldPrice:230,newPrice:215},{label:"10kg",oldPrice:460,newPrice:430}], flourType:"Whole Wheat", grainSource:"MP Sharbati", isStoneMill:true, protein:"12.5" },
  { id:9,  name:"Premium Gujarati Toor Dal",             brand:"Charbhuja", category:"Dal & Pulses",    subCategory:"Toor Dal",       oldPrice:800,  newPrice:720,  discount:10, stock:true,  isBestSeller:false, isNew:true,  rating:4,   description:"Premium Quality Toor Dal — Rich in Protein, Natural & Healthy.",       mfgDate:"01/05/2026", expDate:"30/04/2027", tags:"toor dal,arhar dal,protein rich",       weightOptions:[{label:"1kg",oldPrice:160,newPrice:144},{label:"2kg",oldPrice:320,newPrice:288},{label:"5kg",oldPrice:800,newPrice:720},{label:"10kg",oldPrice:1600,newPrice:1440}], dalType:"Washed", region:"Gujarat", isOrganic:false, cookTime:"20-25 mins" },
  { id:10, name:"Premium Anjeer (Dried Figs)",           brand:"Charbhuja", category:"Dry Fruits",      subCategory:"Anjeer",         oldPrice:1300, newPrice:1200, discount:8,  stock:true,  isBestSeller:false, isNew:true,  rating:3.5, description:"Premium Quality Anjeer — Naturally Sweet, Rich in Fiber.",              mfgDate:"01/05/2026", expDate:"30/04/2027", tags:"anjeer,dried figs,fiber rich",          weightOptions:[{label:"250g",oldPrice:325,newPrice:300},{label:"500g",oldPrice:650,newPrice:600},{label:"1kg",oldPrice:1300,newPrice:1200},{label:"5kg",oldPrice:6500,newPrice:6000}], variety:"Turkish", grade:"Premium", isRoasted:false, isSalted:false, shellType:"N/A" },
  { id:11, name:"Premium Sweet Kishmish (Raisins)",      brand:"Charbhuja", category:"Dry Fruits",      subCategory:"Raisins",        oldPrice:600,  newPrice:550,  discount:9,  stock:true,  isBestSeller:false, isNew:true,  rating:4,   description:"Premium Quality Kishmish — Naturally Sweet, Fresh & Energy Rich.",     mfgDate:"01/05/2026", expDate:"30/04/2027", tags:"kishmish,raisins,natural sweetness",    weightOptions:[{label:"250g",oldPrice:150,newPrice:138},{label:"500g",oldPrice:300,newPrice:275},{label:"1kg",oldPrice:600,newPrice:550},{label:"5kg",oldPrice:3000,newPrice:2750}], variety:"Green", grade:"Premium", isRoasted:false, isSalted:false, shellType:"N/A" },
  { id:12, name:"Premium Akhrot (Walnuts)",              brand:"Charbhuja", category:"Dry Fruits",      subCategory:"Walnuts",        oldPrice:1000, newPrice:900,  discount:10, stock:true,  isBestSeller:false, isNew:true,  rating:4,   description:"Premium Quality Akhrot — Crunchy, Nutritious & Naturally Fresh.",     mfgDate:"01/05/2026", expDate:"30/04/2027", tags:"akhrot,walnuts,protein rich",           weightOptions:[{label:"250g",oldPrice:250,newPrice:225},{label:"500g",oldPrice:500,newPrice:450},{label:"1kg",oldPrice:1000,newPrice:900},{label:"5kg",oldPrice:5000,newPrice:4500}], variety:"Kashmiri", grade:"Premium", isRoasted:false, isSalted:false, shellType:"Shelled" },
];

const SEED_ORDERS = [
  { id:"#CB001", customer:"Rahul Sharma",   area:"Navrangpura, Ahmedabad", items:3, total:4550,  status:"Delivered", date:"04 Jun 2026" },
  { id:"#CB002", customer:"Priya Patel",    area:"Satellite, Ahmedabad",   items:1, total:900,   status:"Pending",   date:"05 Jun 2026" },
  { id:"#CB003", customer:"Amit Desai",     area:"Bopal, Ahmedabad",       items:2, total:2200,  status:"Shipped",   date:"05 Jun 2026" },
  { id:"#CB004", customer:"Sneha Modi",     area:"Gota, Ahmedabad",        items:4, total:6100,  status:"Pending",   date:"06 Jun 2026" },
  { id:"#CB005", customer:"Vijay Kumar",    area:"Maninagar, Ahmedabad",   items:1, total:550,   status:"Cancelled", date:"06 Jun 2026" },
  { id:"#CB006", customer:"Hema Joshi",     area:"Vastrapur, Ahmedabad",   items:2, total:1450,  status:"Delivered", date:"03 Jun 2026" },
  { id:"#CB007", customer:"Rohan Shah",     area:"Chandkheda, Ahmedabad",  items:5, total:8750,  status:"Shipped",   date:"06 Jun 2026" },
];

const SEED_USERS = [
  { id:1, name:"Rahul Sharma",  email:"rahul@gmail.com",   phone:"9876543210", city:"Ahmedabad", area:"Navrangpura", joined:"10 May 2026", orders:3 },
  { id:2, name:"Priya Patel",   email:"priya@gmail.com",   phone:"9876543211", city:"Ahmedabad", area:"Satellite",   joined:"15 May 2026", orders:1 },
  { id:3, name:"Amit Desai",    email:"amit@gmail.com",    phone:"9876543212", city:"Ahmedabad", area:"Bopal",       joined:"20 May 2026", orders:2 },
  { id:4, name:"Sneha Modi",    email:"sneha@gmail.com",   phone:"9876543213", city:"Ahmedabad", area:"Gota",        joined:"25 May 2026", orders:4 },
  { id:5, name:"Vijay Kumar",   email:"vijay@gmail.com",   phone:"9876543214", city:"Ahmedabad", area:"Maninagar",   joined:"01 Jun 2026", orders:1 },
];

// ─────────────────────────────────────────────
//  GLOBAL STATE CONTEXT
// ─────────────────────────────────────────────
const AdminContext = createContext(null);

const useAdmin = () => useContext(AdminContext);

function AdminProvider({ children }) {
  const [products, setProducts] = useState(SEED_PRODUCTS);
  const [orders,   setOrders]   = useState(SEED_ORDERS);
  const [users,    setUsers]    = useState(SEED_USERS);
  const [toast,    setToast]    = useState(null);

  const showToast = useCallback((msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  }, []);

  const addProduct = useCallback((p) => {
    const newP = { ...p, id: Date.now() };
    setProducts(prev => [newP, ...prev]);
    showToast(`✅ "${p.name}" added successfully!`);
    return newP;
  }, [showToast]);

  const updateProduct = useCallback((id, p) => {
    setProducts(prev => prev.map(x => x.id === id ? { ...x, ...p } : x));
    showToast(`✅ "${p.name}" updated!`);
  }, [showToast]);

  const deleteProduct = useCallback((id, name) => {
    setProducts(prev => prev.filter(x => x.id !== id));
    showToast(`🗑️ "${name}" deleted.`, "error");
  }, [showToast]);

  const updateOrderStatus = useCallback((id, status) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o));
    showToast(`✅ Order ${id} → ${status}`);
  }, [showToast]);

  const deleteOrder = useCallback((id) => {
    setOrders(prev => prev.filter(o => o.id !== id));
    showToast(`🗑️ Order ${id} deleted.`, "error");
  }, [showToast]);

  const deleteUser = useCallback((id, name) => {
    setUsers(prev => prev.filter(u => u.id !== id));
    showToast(`🗑️ User "${name}" removed.`, "error");
  }, [showToast]);

  return (
    <AdminContext.Provider value={{ products, orders, users, addProduct, updateProduct, deleteProduct, updateOrderStatus, deleteOrder, deleteUser, showToast }}>
      {children}
      {toast && (
        <div style={{
          position:"fixed", bottom:"28px", right:"28px", zIndex:9999,
          background: toast.type === "error" ? "#c62828" : "#2d1b4e",
          color:"#fff", padding:"14px 22px", borderRadius:"14px",
          boxShadow:"0 8px 30px rgba(0,0,0,0.25)", fontSize:"14px", fontWeight:600,
          animation:"slideUp 0.3s ease",
          display:"flex", alignItems:"center", gap:"10px", maxWidth:"380px"
        }}>
          {toast.msg}
        </div>
      )}
    </AdminContext.Provider>
  );
}

// ─────────────────────────────────────────────
//  SMALL REUSABLE UI COMPONENTS
// ─────────────────────────────────────────────
const P = "#695588";
const PD = "#2d1b4e";
const PL = "#f5f0ff";
const PB = "linear-gradient(135deg,#695588,#9b7ec8)";

const Badge = ({ status }) => {
  const m = { Delivered:["#e8f5e9","#2e7d32"], Pending:["#fff8e1","#f57f17"], Shipped:["#e3f2fd","#1565c0"], Cancelled:["#fce4ec","#c62828"] };
  const [bg,cl] = m[status]||["#f3e5f5","#6a1b9a"];
  return <span style={{ background:bg,color:cl,padding:"3px 11px",borderRadius:"20px",fontSize:"12px",fontWeight:600 }}>{status}</span>;
};

const Stars = ({ v, onChange }) => (
  <div style={{ display:"flex", gap:"4px" }}>
    {[1,2,3,4,5].map(n => (
      <span key={n} onClick={() => onChange && onChange(n)} style={{ fontSize:"20px", color: n<=v?"#f59e0b":"#ddd", cursor:onChange?"pointer":"default" }}>★</span>
    ))}
    <span style={{ color:"#999",marginLeft:"4px",fontSize:"13px",alignSelf:"center" }}>{v}</span>
  </div>
);

const Toggle = ({ checked, onChange, label }) => (
  <label style={{ display:"flex",alignItems:"center",gap:"10px",cursor:"pointer",userSelect:"none" }}>
    <div onClick={() => onChange(!checked)} style={{
      width:"42px",height:"22px",borderRadius:"11px",background:checked?P:"#ddd",
      position:"relative",transition:"background 0.25s",flexShrink:0
    }}>
      <div style={{ position:"absolute",top:"3px",left:checked?"22px":"3px",width:"16px",height:"16px",borderRadius:"50%",background:"#fff",transition:"left 0.25s",boxShadow:"0 1px 4px rgba(0,0,0,0.2)" }}/>
    </div>
    <span style={{ fontSize:"13px",fontWeight:600,color:"#555" }}>{label}</span>
  </label>
);

const Inp = ({ label, required, children, hint }) => (
  <div style={{ marginBottom:"16px" }}>
    <label style={{ fontSize:"12px",fontWeight:700,color:"#555",display:"block",marginBottom:"5px",textTransform:"uppercase",letterSpacing:"0.5px" }}>
      {label}{required && <span style={{ color:"#e53935",marginLeft:"3px" }}>*</span>}
    </label>
    {children}
    {hint && <div style={{ fontSize:"11px",color:"#aaa",marginTop:"3px" }}>{hint}</div>}
  </div>
);

const inputStyle = {
  width:"100%",padding:"10px 14px",borderRadius:"10px",border:"1.5px solid #e0d6f0",
  fontSize:"14px",fontFamily:"inherit",outline:"none",boxSizing:"border-box",
  background:"#fdfaff",color:"#333"
};

const selStyle = { ...inputStyle, appearance:"none", cursor:"pointer" };

const Btn = ({ children, onClick, variant="primary", small, style={} }) => (
  <button onClick={onClick} style={{
    background: variant==="primary"?PB:variant==="danger"?"#fce4ec":PL,
    color: variant==="primary"?"#fff":variant==="danger"?"#c62828":P,
    border: variant==="primary"?"none":variant==="danger"?"1.5px solid #f4b8c1":"1.5px solid #d5c8f0",
    borderRadius:"10px", padding:small?"7px 14px":"11px 22px",
    fontWeight:700, fontSize:small?"12px":"14px", cursor:"pointer",
    fontFamily:"inherit", ...style
  }}>{children}</button>
);

// ─────────────────────────────────────────────
//  WEIGHT OPTIONS EDITOR
// ─────────────────────────────────────────────
function WeightEditor({ weightOptions, schema, onChange }) {
  const presets = schema.weightOptions;
  const add = () => onChange([...weightOptions, { label:presets[0]||"", oldPrice:"", newPrice:"" }]);
  const remove = (i) => onChange(weightOptions.filter((_,j)=>j!==i));
  const update = (i,k,v) => onChange(weightOptions.map((w,j)=>j===i?{...w,[k]:v}:w));

  return (
    <div>
      {weightOptions.map((w,i) => (
        <div key={i} style={{ display:"grid",gridTemplateColumns:"140px 1fr 1fr 36px",gap:"8px",marginBottom:"8px",alignItems:"center" }}>
          <select value={w.label} onChange={e=>update(i,"label",e.target.value)} style={selStyle}>
            {presets.map(p=><option key={p}>{p}</option>)}
            <option value="custom">Custom</option>
          </select>
          <input type="number" placeholder="Old Price ₹" value={w.oldPrice} onChange={e=>update(i,"oldPrice",e.target.value)} style={inputStyle}/>
          <input type="number" placeholder="New Price ₹" value={w.newPrice} onChange={e=>update(i,"newPrice",e.target.value)} style={inputStyle}/>
          <button onClick={()=>remove(i)} style={{ background:"#fce4ec",color:"#c62828",border:"none",borderRadius:"8px",width:"36px",height:"36px",cursor:"pointer",fontSize:"16px",flexShrink:0 }}>×</button>
        </div>
      ))}
      <button onClick={add} style={{ background:PL,color:P,border:`1.5px dashed ${P}`,borderRadius:"10px",padding:"8px 18px",fontSize:"13px",fontWeight:600,cursor:"pointer",fontFamily:"inherit",width:"100%" }}>
        + Add Weight Option
      </button>
    </div>
  );
}

// ─────────────────────────────────────────────
//  PRODUCT FORM MODAL — Category-Aware
// ─────────────────────────────────────────────
function ProductFormModal({ product, onClose }) {
  const { addProduct, updateProduct } = useAdmin();
  const isEdit = !!product;

  const blankForm = {
    name:"", brand:"Charbhuja", category:"Spices & Masala", subCategory:"",
    oldPrice:"", newPrice:"", discount:"", stock:true,
    isBestSeller:false, isNew:false, rating:4,
    description:"", mfgDate:"", expDate:"", tags:"",
    weightOptions:[{ label:"1kg", oldPrice:"", newPrice:"" }],
  };

  const [form, setForm]         = useState(isEdit ? { ...blankForm, ...product } : blankForm);
  const [errors, setErrors]     = useState({});
  const [activeTab, setActiveTab] = useState("basic");

  const schema = CATEGORY_SCHEMAS[form.category] || CATEGORY_SCHEMAS["Spices & Masala"];

  const set = (k,v) => setForm(p => {
    const next = { ...p, [k]:v };
    // auto calc discount
    if ((k==="oldPrice"||k==="newPrice") && next.oldPrice && next.newPrice)
      next.discount = Math.round(((next.oldPrice-next.newPrice)/next.oldPrice)*100);
    // reset subCategory on category change
    if (k==="category") next.subCategory = "";
    return next;
  });

  const validate = () => {
    const e = {};
    if (!form.name.trim())       e.name = "Product name required";
    if (!form.oldPrice)          e.oldPrice = "Required";
    if (!form.newPrice)          e.newPrice = "Required";
    if (+form.newPrice > +form.oldPrice) e.newPrice = "New price must be less than old price";
    if (form.weightOptions.some(w=>!w.newPrice||!w.oldPrice)) e.weights = "Fill all weight prices";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = () => {
    if (!validate()) return;
    const payload = { ...form, oldPrice:+form.oldPrice, newPrice:+form.newPrice, discount:+form.discount, rating:+form.rating };
    if (isEdit) updateProduct(product.id, payload);
    else addProduct(payload);
    onClose();
  };

  const tabs = [
    { id:"basic",   label:"Basic Info" },
    { id:"pricing", label:"Pricing & Weight" },
    { id:"extra",   label:`${schema.icon} Category Fields` },
    { id:"meta",    label:"Meta & Tags" },
  ];

  return (
    <div style={{ position:"fixed",inset:0,background:"rgba(20,10,40,0.55)",zIndex:1000,display:"flex",alignItems:"center",justifyContent:"center",padding:"16px" }}>
      <div style={{ background:"#fff",borderRadius:"20px",width:"680px",maxWidth:"100%",maxHeight:"92vh",display:"flex",flexDirection:"column",boxShadow:"0 24px 80px rgba(105,85,136,0.35)" }}>

        {/* Header */}
        <div style={{ padding:"22px 28px",borderBottom:"1.5px solid #f0ebf8",display:"flex",justifyContent:"space-between",alignItems:"center",flexShrink:0 }}>
          <div>
            <h3 style={{ margin:0,color:PD,fontWeight:700,fontSize:"18px" }}>{isEdit?"✏️ Edit Product":"➕ Add New Product"}</h3>
            <p style={{ margin:0,color:"#aaa",fontSize:"13px",marginTop:"2px" }}>
              Category: <strong style={{ color:P }}>{form.category}</strong> {schema.icon}
            </p>
          </div>
          <button onClick={onClose} style={{ background:"#f5f0ff",border:"none",borderRadius:"10px",width:"36px",height:"36px",fontSize:"20px",cursor:"pointer",color:P }}>×</button>
        </div>

        {/* Tabs */}
        <div style={{ display:"flex",borderBottom:"1.5px solid #f0ebf8",flexShrink:0,overflowX:"auto" }}>
          {tabs.map(t => (
            <button key={t.id} onClick={()=>setActiveTab(t.id)} style={{
              padding:"12px 20px",border:"none",background:"transparent",cursor:"pointer",fontFamily:"inherit",
              fontSize:"13px",fontWeight:activeTab===t.id?700:500,
              color:activeTab===t.id?P:"#888",borderBottom:activeTab===t.id?`2.5px solid ${P}`:"2.5px solid transparent",
              whiteSpace:"nowrap"
            }}>{t.label}</button>
          ))}
        </div>

        {/* Body */}
        <div style={{ overflowY:"auto",padding:"24px 28px",flex:1 }}>

          {/* ── TAB: Basic Info ── */}
          {activeTab==="basic" && (
            <div>
              <Inp label="Product Name" required>
                <input value={form.name} onChange={e=>set("name",e.target.value)} placeholder="e.g. Premium South Indian Cardamom" style={inputStyle}/>
                {errors.name && <div style={{ color:"#e53935",fontSize:"12px",marginTop:"3px" }}>{errors.name}</div>}
              </Inp>

              <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:"16px" }}>
                <Inp label="Brand">
                  <input value={form.brand} onChange={e=>set("brand",e.target.value)} style={inputStyle}/>
                </Inp>
                <Inp label="Category" required>
                  <select value={form.category} onChange={e=>set("category",e.target.value)} style={selStyle}>
                    {Object.keys(CATEGORY_SCHEMAS).map(c=><option key={c}>{c}</option>)}
                  </select>
                </Inp>
              </div>

              <Inp label="Sub-Category">
                <select value={form.subCategory} onChange={e=>set("subCategory",e.target.value)} style={selStyle}>
                  <option value="">— Select Sub-Category —</option>
                  {schema.subCategories.map(s=><option key={s}>{s}</option>)}
                </select>
              </Inp>

              <Inp label="Description">
                <textarea value={form.description} onChange={e=>set("description",e.target.value)}
                  rows={3} placeholder="Short product description..."
                  style={{ ...inputStyle, resize:"vertical", lineHeight:"1.5" }}/>
              </Inp>

              <Inp label="Star Rating">
                <Stars v={form.rating} onChange={v=>set("rating",v)}/>
              </Inp>

              <div style={{ display:"flex",gap:"24px",marginTop:"8px" }}>
                <Toggle checked={form.stock}       onChange={v=>set("stock",v)}       label="In Stock" />
                <Toggle checked={form.isBestSeller} onChange={v=>set("isBestSeller",v)} label="Best Seller 🏅" />
                <Toggle checked={form.isNew}        onChange={v=>set("isNew",v)}        label="New Arrival 🆕" />
              </div>
            </div>
          )}

          {/* ── TAB: Pricing ── */}
          {activeTab==="pricing" && (
            <div>
              <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:"16px" }}>
                <Inp label="Old Price (₹)" required>
                  <input type="number" value={form.oldPrice} onChange={e=>set("oldPrice",e.target.value)} placeholder="0" style={inputStyle}/>
                  {errors.oldPrice && <div style={{ color:"#e53935",fontSize:"12px",marginTop:"3px" }}>{errors.oldPrice}</div>}
                </Inp>
                <Inp label="New Price (₹)" required>
                  <input type="number" value={form.newPrice} onChange={e=>set("newPrice",e.target.value)} placeholder="0" style={inputStyle}/>
                  {errors.newPrice && <div style={{ color:"#e53935",fontSize:"12px",marginTop:"3px" }}>{errors.newPrice}</div>}
                </Inp>
                <Inp label="Discount %" hint="Auto-calculated">
                  <div style={{ ...inputStyle,background:"#f5f0ff",color:P,fontWeight:700,display:"flex",alignItems:"center",height:"41px" }}>
                    {form.discount||0}% OFF
                  </div>
                </Inp>
              </div>

              <div style={{ background:"#f5f0ff",borderRadius:"12px",padding:"14px 16px",marginBottom:"20px",fontSize:"13px",color:P }}>
                💡 Customer saves <strong>₹{(form.oldPrice-form.newPrice)||0}</strong> on base price. Discount auto-updates when you change prices.
              </div>

              <Inp label="Weight / Size Options" required hint="Add all available sizes with their prices">
                <WeightEditor
                  weightOptions={form.weightOptions}
                  schema={schema}
                  onChange={v=>set("weightOptions",v)}
                />
                {errors.weights && <div style={{ color:"#e53935",fontSize:"12px",marginTop:"4px" }}>{errors.weights}</div>}
              </Inp>
            </div>
          )}

          {/* ── TAB: Category Extra Fields ── */}
          {activeTab==="extra" && (
            <div>
              <div style={{ background:PL,borderRadius:"12px",padding:"12px 16px",marginBottom:"20px",fontSize:"13px",color:P,display:"flex",alignItems:"center",gap:"10px" }}>
                <span style={{ fontSize:"22px" }}>{schema.icon}</span>
                <div>These fields are specific to <strong>{form.category}</strong>. Fill them in so your product shows the right details on the storefront.</div>
              </div>

              {schema.extraFields.map(field => (
                <Inp key={field.key} label={field.label}>
                  {field.type === "toggle" ? (
                    <Toggle checked={!!form[field.key]} onChange={v=>set(field.key,v)} label={`Yes, this product is ${field.label}`}/>
                  ) : field.type === "select" ? (
                    <select value={form[field.key]||""} onChange={e=>set(field.key,e.target.value)} style={selStyle}>
                      <option value="">— Select —</option>
                      {field.options.map(o=><option key={o}>{o}</option>)}
                    </select>
                  ) : (
                    <input value={form[field.key]||""} onChange={e=>set(field.key,e.target.value)} placeholder={field.placeholder||""} style={inputStyle}/>
                  )}
                </Inp>
              ))}
            </div>
          )}

          {/* ── TAB: Meta ── */}
          {activeTab==="meta" && (
            <div>
              <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:"16px" }}>
                <Inp label="Mfg Date">
                  <input type="date" value={form.mfgDate} onChange={e=>set("mfgDate",e.target.value)} style={inputStyle}/>
                </Inp>
                <Inp label="Exp Date">
                  <input type="date" value={form.expDate} onChange={e=>set("expDate",e.target.value)} style={inputStyle}/>
                </Inp>
              </div>
              <Inp label="Tags (comma separated)" hint="Used for search and filtering">
                <input value={form.tags} onChange={e=>set("tags",e.target.value)} placeholder="e.g. organic, rajasthani, premium" style={inputStyle}/>
              </Inp>
              <Inp label="Product Type / Label">
                <input value={form.productType||""} onChange={e=>set("productType",e.target.value)} placeholder="e.g. 100% Natural & Organic" style={inputStyle}/>
              </Inp>

              {/* Preview Card */}
              <div style={{ background:PL,borderRadius:"14px",padding:"16px",marginTop:"8px" }}>
                <div style={{ fontSize:"12px",fontWeight:700,color:P,marginBottom:"10px",textTransform:"uppercase",letterSpacing:"0.5px" }}>Live Preview</div>
                <div style={{ background:"#fff",borderRadius:"12px",padding:"14px",border:"1px solid #e0d6f0" }}>
                  <div style={{ fontSize:"10px",color:"#aaa",marginBottom:"4px" }}>{form.category} › {form.subCategory}</div>
                  <div style={{ fontWeight:700,color:PD,marginBottom:"4px",fontSize:"14px" }}>{form.name||"Product Name"}</div>
                  <div style={{ fontSize:"12px",color:"#888",marginBottom:"8px" }}>{form.description||"Description..."}</div>
                  <div style={{ display:"flex",alignItems:"center",gap:"10px" }}>
                    <span style={{ textDecoration:"line-through",color:"#bbb",fontSize:"13px" }}>₹{form.oldPrice||"—"}</span>
                    <span style={{ color:P,fontWeight:700,fontSize:"16px" }}>₹{form.newPrice||"—"}</span>
                    {form.discount>0 && <span style={{ background:"#e8f5e9",color:"#2e7d32",padding:"2px 8px",borderRadius:"10px",fontSize:"11px",fontWeight:700 }}>{form.discount}% OFF</span>}
                    {form.isBestSeller && <span>🏅</span>}
                    {form.isNew && <span>🆕</span>}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{ padding:"16px 28px",borderTop:"1.5px solid #f0ebf8",display:"flex",justifyContent:"space-between",alignItems:"center",flexShrink:0 }}>
          <div style={{ fontSize:"12px",color:"#bbb" }}>* Required fields</div>
          <div style={{ display:"flex",gap:"10px" }}>
            <Btn variant="outline" onClick={onClose}>Cancel</Btn>
            <Btn onClick={submit}>{isEdit?"💾 Save Changes":"➕ Add Product"}</Btn>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
//  PRODUCT DETAIL DRAWER
// ─────────────────────────────────────────────
function ProductDrawer({ product, onClose, onEdit }) {
  if (!product) return null;
  const schema = CATEGORY_SCHEMAS[product.category] || {};
  return (
    <div style={{ position:"fixed",inset:0,background:"rgba(20,10,40,0.45)",zIndex:900,display:"flex",justifyContent:"flex-end" }} onClick={onClose}>
      <div onClick={e=>e.stopPropagation()} style={{ width:"420px",maxWidth:"95vw",background:"#fff",height:"100%",overflowY:"auto",boxShadow:"-8px 0 40px rgba(105,85,136,0.2)",display:"flex",flexDirection:"column" }}>
        <div style={{ background:PB,padding:"22px 24px",color:"#fff" }}>
          <button onClick={onClose} style={{ float:"right",background:"rgba(255,255,255,0.2)",border:"none",borderRadius:"8px",color:"#fff",width:"30px",height:"30px",cursor:"pointer",fontSize:"16px" }}>×</button>
          <div style={{ fontSize:"11px",opacity:0.7,marginBottom:"4px",textTransform:"uppercase",letterSpacing:"1px" }}>{product.category} › {product.subCategory}</div>
          <h3 style={{ margin:0,fontSize:"17px",fontWeight:700,lineHeight:"1.3" }}>{product.name}</h3>
          <div style={{ marginTop:"8px",display:"flex",gap:"8px",flexWrap:"wrap" }}>
            {product.isBestSeller && <span style={{ background:"rgba(255,255,255,0.2)",padding:"3px 10px",borderRadius:"12px",fontSize:"12px" }}>🏅 Best Seller</span>}
            {product.isNew && <span style={{ background:"rgba(255,255,255,0.2)",padding:"3px 10px",borderRadius:"12px",fontSize:"12px" }}>🆕 New</span>}
            <span style={{ background:"rgba(255,255,255,0.2)",padding:"3px 10px",borderRadius:"12px",fontSize:"12px" }}>{product.stock?"✅ In Stock":"❌ Out of Stock"}</span>
          </div>
        </div>

        <div style={{ padding:"20px 24px",flex:1 }}>
          {/* Pricing */}
          <div style={{ background:PL,borderRadius:"12px",padding:"14px",marginBottom:"16px" }}>
            <div style={{ display:"flex",gap:"16px",alignItems:"center" }}>
              <div><div style={{ fontSize:"11px",color:"#aaa" }}>Old Price</div><div style={{ textDecoration:"line-through",color:"#bbb",fontSize:"16px" }}>₹{product.oldPrice}</div></div>
              <div><div style={{ fontSize:"11px",color:"#aaa" }}>New Price</div><div style={{ color:P,fontWeight:700,fontSize:"22px" }}>₹{product.newPrice}</div></div>
              <div><div style={{ fontSize:"11px",color:"#aaa" }}>Discount</div><div style={{ color:"#2e7d32",fontWeight:700,fontSize:"16px" }}>{product.discount}% OFF</div></div>
            </div>
          </div>

          {/* Rating */}
          <div style={{ marginBottom:"16px" }}>
            <div style={{ fontSize:"12px",color:"#aaa",marginBottom:"4px" }}>RATING</div>
            <Stars v={product.rating}/>
          </div>

          {/* Description */}
          {product.description && (
            <div style={{ marginBottom:"16px" }}>
              <div style={{ fontSize:"12px",color:"#aaa",marginBottom:"4px" }}>DESCRIPTION</div>
              <div style={{ fontSize:"14px",color:"#555",lineHeight:"1.6" }}>{product.description}</div>
            </div>
          )}

          {/* Weight Options */}
          {product.weightOptions?.length > 0 && (
            <div style={{ marginBottom:"16px" }}>
              <div style={{ fontSize:"12px",color:"#aaa",marginBottom:"8px" }}>WEIGHT OPTIONS</div>
              <div style={{ display:"flex",flexWrap:"wrap",gap:"8px" }}>
                {product.weightOptions.map((w,i) => (
                  <div key={i} style={{ background:"#fff",border:"1.5px solid #e0d6f0",borderRadius:"10px",padding:"8px 12px",textAlign:"center" }}>
                    <div style={{ fontWeight:700,color:PD,fontSize:"14px" }}>{w.label}</div>
                    <div style={{ fontSize:"11px",color:"#aaa",textDecoration:"line-through" }}>₹{w.oldPrice}</div>
                    <div style={{ fontSize:"13px",color:P,fontWeight:700 }}>₹{w.newPrice}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Category Extra Fields */}
          {schema.extraFields && (
            <div style={{ marginBottom:"16px" }}>
              <div style={{ fontSize:"12px",color:"#aaa",marginBottom:"8px" }}>CATEGORY DETAILS {schema.icon}</div>
              <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:"8px" }}>
                {schema.extraFields.map(f => product[f.key] !== undefined && (
                  <div key={f.key} style={{ background:"#fdfaff",border:"1px solid #f0ebf8",borderRadius:"8px",padding:"8px 10px" }}>
                    <div style={{ fontSize:"10px",color:"#aaa",textTransform:"uppercase",letterSpacing:"0.5px" }}>{f.label}</div>
                    <div style={{ fontSize:"13px",color:"#333",fontWeight:600,marginTop:"2px" }}>
                      {f.type==="toggle" ? (product[f.key]?"✅ Yes":"❌ No") : (product[f.key]||"—")}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Meta */}
          <div>
            <div style={{ fontSize:"12px",color:"#aaa",marginBottom:"8px" }}>META INFO</div>
            <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:"8px" }}>
              {[["Brand",product.brand],["Tags",product.tags],["Mfg",product.mfgDate],["Exp",product.expDate]].map(([l,v])=>v&&(
                <div key={l} style={{ background:"#fdfaff",border:"1px solid #f0ebf8",borderRadius:"8px",padding:"8px 10px" }}>
                  <div style={{ fontSize:"10px",color:"#aaa",textTransform:"uppercase" }}>{l}</div>
                  <div style={{ fontSize:"12px",color:"#333",fontWeight:600,marginTop:"2px" }}>{v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ padding:"16px 24px",borderTop:"1.5px solid #f0ebf8",display:"flex",gap:"10px" }}>
          <Btn onClick={() => { onEdit(product); onClose(); }} style={{ flex:1 }}>✏️ Edit Product</Btn>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
//  DASHBOARD PAGE
// ─────────────────────────────────────────────
function Dashboard({ setPage }) {
  const { products, orders, users } = useAdmin();
  const revenue = orders.filter(o=>o.status==="Delivered").reduce((s,o)=>s+o.total,0);
  const pending = orders.filter(o=>o.status==="Pending").length;

  const catCounts = Object.keys(CATEGORY_SCHEMAS).map(c => ({
    name:c, icon:CATEGORY_SCHEMAS[c].icon, count:products.filter(p=>p.category===c).length
  }));

  return (
    <div>
      <h2 style={{ color:PD,marginBottom:"6px",fontWeight:700,fontSize:"22px" }}>📊 Dashboard</h2>
      <p style={{ color:"#aaa",marginBottom:"24px",fontSize:"14px" }}>Welcome back! Here's what's happening at Charbhuja today.</p>

      {/* Metrics */}
      <div style={{ display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:"16px",marginBottom:"28px" }}>
        {[
          { icon:"📦", label:"Total Products",  value:products.length,        sub:`${products.filter(p=>p.isNew).length} new arrivals`,    accent:"#695588", page:"products" },
          { icon:"🛒", label:"Total Orders",    value:orders.length,          sub:`${pending} pending`,                                      accent:"#e67e22", page:"orders"   },
          { icon:"👥", label:"Registered Users",value:users.length,           sub:"Ahmedabad region",                                        accent:"#27ae60", page:"users"    },
          { icon:"💰", label:"Revenue (Delivered)",value:`₹${revenue.toLocaleString()}`, sub:"From delivered orders",                        accent:"#2980b9", page:null       },
        ].map(m=>(
          <div key={m.label} onClick={()=>m.page&&setPage(m.page)} style={{ background:"#fff",borderRadius:"16px",padding:"20px 22px",boxShadow:"0 2px 12px rgba(105,85,136,0.10)",borderLeft:`4px solid ${m.accent}`,cursor:m.page?"pointer":"default",transition:"transform 0.15s",":hover":{transform:"translateY(-2px)"} }}>
            <div style={{ display:"flex",alignItems:"center",gap:"10px",marginBottom:"8px" }}>
              <div style={{ width:"38px",height:"38px",borderRadius:"10px",background:m.accent+"22",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"18px" }}>{m.icon}</div>
              <span style={{ color:"#888",fontSize:"12px",fontWeight:500 }}>{m.label}</span>
            </div>
            <div style={{ fontSize:"26px",fontWeight:700,color:PD,lineHeight:1 }}>{m.value}</div>
            <div style={{ color:"#aaa",fontSize:"12px",marginTop:"4px" }}>{m.sub}</div>
          </div>
        ))}
      </div>

      <div style={{ display:"grid",gridTemplateColumns:"1.2fr 0.8fr",gap:"20px",marginBottom:"20px" }}>
        {/* Recent Orders */}
        <div style={{ background:"#fff",borderRadius:"16px",padding:"20px",boxShadow:"0 2px 12px rgba(105,85,136,0.08)" }}>
          <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"16px" }}>
            <h4 style={{ color:P,fontWeight:700,margin:0 }}>🧾 Recent Orders</h4>
            <Btn small onClick={()=>setPage("orders")}>View All</Btn>
          </div>
          <table style={{ width:"100%",borderCollapse:"collapse" }}>
            <thead><tr style={{ background:PL }}>
              {["Order","Customer","Total","Status"].map(h=><th key={h} style={{ padding:"8px 10px",textAlign:"left",fontSize:"11px",color:P,fontWeight:700,textTransform:"uppercase" }}>{h}</th>)}
            </tr></thead>
            <tbody>
              {orders.slice(0,5).map((o,i)=>(
                <tr key={o.id} style={{ borderBottom:"1px solid #f8f5ff",background:i%2?"#fdfaff":"#fff" }}>
                  <td style={{ padding:"9px 10px",fontSize:"13px",fontWeight:700,color:P }}>{o.id}</td>
                  <td style={{ padding:"9px 10px",fontSize:"13px" }}>{o.customer}</td>
                  <td style={{ padding:"9px 10px",fontSize:"13px",fontWeight:700 }}>₹{o.total}</td>
                  <td style={{ padding:"9px 10px" }}><Badge status={o.status}/></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Categories */}
        <div style={{ background:"#fff",borderRadius:"16px",padding:"20px",boxShadow:"0 2px 12px rgba(105,85,136,0.08)" }}>
          <h4 style={{ color:P,fontWeight:700,margin:0,marginBottom:"16px" }}>🏷️ Products by Category</h4>
          {catCounts.map(c=>(
            <div key={c.name} style={{ display:"flex",alignItems:"center",gap:"10px",marginBottom:"11px" }}>
              <span style={{ fontSize:"18px",width:"24px",textAlign:"center" }}>{c.icon}</span>
              <div style={{ flex:1 }}>
                <div style={{ display:"flex",justifyContent:"space-between",marginBottom:"3px" }}>
                  <span style={{ fontSize:"12px",color:"#555",fontWeight:500 }}>{c.name}</span>
                  <span style={{ fontSize:"12px",color:"#aaa" }}>{c.count}</span>
                </div>
                <div style={{ height:"6px",background:"#f0ebf8",borderRadius:"6px",overflow:"hidden" }}>
                  <div style={{ width:`${products.length?Math.round((c.count/products.length)*100):0}%`,height:"100%",background:PB,borderRadius:"6px" }}/>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Best Sellers */}
      <div style={{ background:"#fff",borderRadius:"16px",padding:"20px",boxShadow:"0 2px 12px rgba(105,85,136,0.08)" }}>
        <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"16px" }}>
          <h4 style={{ color:P,fontWeight:700,margin:0 }}>🏆 Best Sellers</h4>
          <Btn small onClick={()=>setPage("products")}>View All</Btn>
        </div>
        {products.filter(p=>p.isBestSeller).length === 0
          ? <div style={{ color:"#bbb",textAlign:"center",padding:"24px" }}>No best sellers marked yet.</div>
          : (
            <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(180px,1fr))",gap:"12px" }}>
              {products.filter(p=>p.isBestSeller).map(p=>(
                <div key={p.id} style={{ background:PL,border:"1px solid #e0d6f0",borderRadius:"12px",padding:"14px" }}>
                  <div style={{ fontSize:"10px",color:P,fontWeight:700,marginBottom:"4px" }}>🏅 {p.category}</div>
                  <div style={{ fontSize:"13px",fontWeight:700,color:PD,lineHeight:"1.3",marginBottom:"6px" }}>{p.name}</div>
                  <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center" }}>
                    <span style={{ fontSize:"15px",fontWeight:700,color:P }}>₹{p.newPrice}</span>
                    <Stars v={p.rating}/>
                  </div>
                </div>
              ))}
            </div>
          )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
//  PRODUCTS PAGE
// ─────────────────────────────────────────────
function Products() {
  const { products, deleteProduct } = useAdmin();
  const [search, setSearch]         = useState("");
  const [catFilter, setCatFilter]   = useState("All");
  const [showForm, setShowForm]     = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [viewProduct, setViewProduct] = useState(null);
  const [confirmDel, setConfirmDel] = useState(null);
  const [sortBy, setSortBy]         = useState("id");

  const cats = ["All", ...Object.keys(CATEGORY_SCHEMAS)];

  const filtered = products
    .filter(p => (catFilter==="All"||p.category===catFilter) && p.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a,b) => sortBy==="price"?a.newPrice-b.newPrice : sortBy==="rating"?b.rating-a.rating : b.id-a.id);

  return (
    <div>
      <style>{`@keyframes slideUp{from{transform:translateY(20px);opacity:0}to{transform:translateY(0);opacity:1}}`}</style>

      <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"20px" }}>
        <div>
          <h2 style={{ color:PD,fontWeight:700,fontSize:"22px",margin:0 }}>📦 Products</h2>
          <p style={{ color:"#aaa",fontSize:"13px",margin:0 }}>{filtered.length} of {products.length} products</p>
        </div>
        <Btn onClick={()=>{ setEditProduct(null); setShowForm(true); }}>+ Add New Product</Btn>
      </div>

      {/* Filters */}
      <div style={{ background:"#fff",borderRadius:"14px",padding:"16px 20px",marginBottom:"16px",boxShadow:"0 2px 8px rgba(105,85,136,0.06)",display:"flex",gap:"12px",flexWrap:"wrap",alignItems:"center" }}>
        <input placeholder="🔍 Search products..." value={search} onChange={e=>setSearch(e.target.value)}
          style={{ ...inputStyle,maxWidth:"240px",margin:0 }}/>
        <select value={sortBy} onChange={e=>setSortBy(e.target.value)} style={{ ...selStyle,maxWidth:"160px",margin:0 }}>
          <option value="id">Newest First</option>
          <option value="price">Price: Low→High</option>
          <option value="rating">Top Rated</option>
        </select>
        <div style={{ display:"flex",gap:"6px",flexWrap:"wrap" }}>
          {cats.map(c=>(
            <button key={c} onClick={()=>setCatFilter(c)} style={{
              background:catFilter===c?P:PL,color:catFilter===c?"#fff":P,
              border:catFilter===c?"none":"1.5px solid #d5c8f0",borderRadius:"20px",
              padding:"5px 13px",fontSize:"12px",fontWeight:600,cursor:"pointer"
            }}>
              {catFilter===c && CATEGORY_SCHEMAS[c] ? CATEGORY_SCHEMAS[c].icon+" " : ""}{c}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div style={{ background:"#fff",borderRadius:"16px",overflow:"hidden",boxShadow:"0 2px 12px rgba(105,85,136,0.08)" }}>
        <table style={{ width:"100%",borderCollapse:"collapse" }}>
          <thead>
            <tr style={{ background:PB,color:"#fff" }}>
              {["#","Product","Category","Sub-Cat","Old ₹","New ₹","Off","Rating","Status","Actions"].map(h=>(
                <th key={h} style={{ padding:"13px 14px",textAlign:"left",fontSize:"11px",fontWeight:700,whiteSpace:"nowrap",textTransform:"uppercase",letterSpacing:"0.5px" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((p,i)=>(
              <tr key={p.id} style={{ borderBottom:"1px solid #f8f5ff",background:i%2?"#fdfaff":"#fff" }}>
                <td style={{ padding:"11px 14px",fontSize:"12px",color:"#bbb",fontWeight:600 }}>#{p.id}</td>
                <td style={{ padding:"11px 14px",maxWidth:"200px" }}>
                  <div style={{ fontWeight:700,color:PD,fontSize:"13px",marginBottom:"2px",lineHeight:"1.3" }}>{p.name}</div>
                  <div style={{ fontSize:"11px",color:"#aaa" }}>{p.brand}</div>
                </td>
                <td style={{ padding:"11px 14px" }}>
                  <span style={{ background:PL,color:P,padding:"3px 9px",borderRadius:"12px",fontSize:"11px",fontWeight:700 }}>
                    {CATEGORY_SCHEMAS[p.category]?.icon} {p.category}
                  </span>
                </td>
                <td style={{ padding:"11px 14px",fontSize:"12px",color:"#777" }}>{p.subCategory||"—"}</td>
                <td style={{ padding:"11px 14px",fontSize:"13px",color:"#bbb",textDecoration:"line-through" }}>₹{p.oldPrice}</td>
                <td style={{ padding:"11px 14px",fontWeight:700,color:P,fontSize:"14px" }}>₹{p.newPrice}</td>
                <td style={{ padding:"11px 14px" }}>
                  <span style={{ background:"#e8f5e9",color:"#2e7d32",padding:"3px 9px",borderRadius:"12px",fontSize:"11px",fontWeight:700 }}>{p.discount}%</span>
                </td>
                <td style={{ padding:"11px 14px" }}>
                  <div style={{ color:"#f59e0b",fontSize:"13px" }}>{"★".repeat(Math.floor(p.rating))}</div>
                </td>
                <td style={{ padding:"11px 14px" }}>
                  <div style={{ display:"flex",gap:"4px",flexWrap:"wrap" }}>
                    {p.stock        && <span style={{ background:"#e8f5e9",color:"#2e7d32",padding:"2px 7px",borderRadius:"8px",fontSize:"10px",fontWeight:700 }}>In Stock</span>}
                    {p.isBestSeller && <span style={{ fontSize:"14px" }}>🏅</span>}
                    {p.isNew        && <span style={{ fontSize:"14px" }}>🆕</span>}
                  </div>
                </td>
                <td style={{ padding:"11px 14px" }}>
                  <div style={{ display:"flex",gap:"6px" }}>
                    <button onClick={()=>setViewProduct(p)} style={{ background:"#e3f2fd",color:"#1565c0",border:"none",borderRadius:"7px",padding:"5px 10px",fontSize:"12px",fontWeight:600,cursor:"pointer" }}>👁️</button>
                    <button onClick={()=>{ setEditProduct(p); setShowForm(true); }} style={{ background:PL,color:P,border:"none",borderRadius:"7px",padding:"5px 10px",fontSize:"12px",fontWeight:600,cursor:"pointer" }}>✏️</button>
                    <button onClick={()=>setConfirmDel(p)} style={{ background:"#fce4ec",color:"#c62828",border:"none",borderRadius:"7px",padding:"5px 10px",fontSize:"12px",fontWeight:600,cursor:"pointer" }}>🗑️</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length===0 && <div style={{ padding:"48px",textAlign:"center",color:"#bbb",fontSize:"15px" }}>No products found.</div>}
      </div>

      {/* Modals */}
      {showForm && <ProductFormModal product={editProduct} onClose={()=>{ setShowForm(false); setEditProduct(null); }}/>}
      {viewProduct && <ProductDrawer product={viewProduct} onClose={()=>setViewProduct(null)} onEdit={p=>{ setEditProduct(p); setShowForm(true); }}/>}

      {/* Confirm Delete */}
      {confirmDel && (
        <div style={{ position:"fixed",inset:0,background:"rgba(20,10,40,0.55)",zIndex:1100,display:"flex",alignItems:"center",justifyContent:"center" }}>
          <div style={{ background:"#fff",borderRadius:"18px",padding:"32px",maxWidth:"360px",width:"90%",textAlign:"center",boxShadow:"0 20px 60px rgba(0,0,0,0.2)" }}>
            <div style={{ fontSize:"40px",marginBottom:"12px" }}>🗑️</div>
            <h3 style={{ color:PD,margin:"0 0 8px" }}>Delete Product?</h3>
            <p style={{ color:"#777",fontSize:"14px",marginBottom:"24px",lineHeight:"1.5" }}>
              "<strong>{confirmDel.name}</strong>" will be permanently removed from all pages.
            </p>
            <div style={{ display:"flex",gap:"12px" }}>
              <Btn variant="outline" onClick={()=>setConfirmDel(null)} style={{ flex:1 }}>Cancel</Btn>
              <Btn variant="danger" onClick={()=>{ deleteProduct(confirmDel.id,confirmDel.name); setConfirmDel(null); }} style={{ flex:1,background:"#e53935",color:"#fff",border:"none" }}>Yes, Delete</Btn>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────
//  CATEGORIES PAGE
// ─────────────────────────────────────────────
function CategoriesPage() {
  const { products } = useAdmin();
  const [showAdd, setShowAdd] = useState(false);
  const [newCat, setNewCat]   = useState({ name:"",subStr:"" });

  return (
    <div>
      <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"20px" }}>
        <h2 style={{ color:PD,fontWeight:700,fontSize:"22px",margin:0 }}>🏷️ Categories</h2>
        <Btn onClick={()=>setShowAdd(true)}>+ Add Category</Btn>
      </div>

      <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))",gap:"16px" }}>
        {Object.entries(CATEGORY_SCHEMAS).map(([name, schema])=>{
          const count = products.filter(p=>p.category===name).length;
          return (
            <div key={name} style={{ background:"#fff",borderRadius:"16px",padding:"20px",boxShadow:"0 2px 12px rgba(105,85,136,0.08)",border:"1.5px solid #f0ebf8" }}>
              <div style={{ display:"flex",alignItems:"center",gap:"12px",marginBottom:"14px" }}>
                <div style={{ width:"46px",height:"46px",borderRadius:"14px",background:PL,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"24px",flexShrink:0 }}>{schema.icon}</div>
                <div style={{ flex:1 }}>
                  <div style={{ fontWeight:700,color:PD,fontSize:"15px" }}>{name}</div>
                  <div style={{ fontSize:"12px",color:"#aaa" }}>{count} products · {schema.subCategories.length} sub-categories</div>
                </div>
              </div>

              <div style={{ marginBottom:"12px" }}>
                <div style={{ fontSize:"11px",fontWeight:700,color:"#aaa",textTransform:"uppercase",letterSpacing:"0.5px",marginBottom:"8px" }}>Sub-Categories</div>
                <div style={{ display:"flex",flexWrap:"wrap",gap:"6px" }}>
                  {schema.subCategories.map(s=>(
                    <span key={s} style={{ background:PL,color:P,padding:"4px 10px",borderRadius:"16px",fontSize:"12px",fontWeight:500,border:"1px solid #e0d6f0" }}>{s}</span>
                  ))}
                </div>
              </div>

              <div style={{ marginBottom:"12px" }}>
                <div style={{ fontSize:"11px",fontWeight:700,color:"#aaa",textTransform:"uppercase",letterSpacing:"0.5px",marginBottom:"8px" }}>Category-Specific Fields</div>
                <div style={{ display:"flex",flexWrap:"wrap",gap:"6px" }}>
                  {schema.extraFields.map(f=>(
                    <span key={f.key} style={{ background:"#f8f4ff",color:"#666",padding:"3px 8px",borderRadius:"8px",fontSize:"11px",border:"1px solid #ebe3ff" }}>
                      {f.type==="toggle"?"🔘":f.type==="select"?"📋":"✍️"} {f.label}
                    </span>
                  ))}
                </div>
              </div>

              <div style={{ background:PL,borderRadius:"10px",padding:"10px 12px",display:"flex",justifyContent:"space-between",alignItems:"center" }}>
                <span style={{ fontSize:"12px",color:P,fontWeight:600 }}>Weight options: {schema.weightOptions.join(", ")}</span>
              </div>
            </div>
          );
        })}
      </div>

      {showAdd && (
        <div style={{ position:"fixed",inset:0,background:"rgba(20,10,40,0.55)",zIndex:1000,display:"flex",alignItems:"center",justifyContent:"center" }}>
          <div style={{ background:"#fff",borderRadius:"20px",padding:"32px",width:"440px",maxWidth:"95vw",boxShadow:"0 20px 60px rgba(105,85,136,0.3)" }}>
            <h3 style={{ color:P,marginBottom:"20px",fontWeight:700 }}>➕ Add Category</h3>
            <Inp label="Category Name" required>
              <input value={newCat.name} onChange={e=>setNewCat(p=>({...p,name:e.target.value}))} placeholder="e.g. Organic Products" style={inputStyle}/>
            </Inp>
            <Inp label="Sub-categories (comma separated)">
              <input value={newCat.subStr} onChange={e=>setNewCat(p=>({...p,subStr:e.target.value}))} placeholder="e.g. Organic Dal, Organic Rice" style={inputStyle}/>
            </Inp>
            <div style={{ display:"flex",gap:"12px",marginTop:"20px" }}>
              <Btn style={{ flex:1 }} onClick={()=>{ alert("Category added! (Connect to backend to persist)"); setShowAdd(false); }}>Add Category</Btn>
              <Btn variant="outline" style={{ flex:1 }} onClick={()=>setShowAdd(false)}>Cancel</Btn>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────
//  ORDERS PAGE
// ─────────────────────────────────────────────
function OrdersPage() {
  const { orders, updateOrderStatus, deleteOrder } = useAdmin();
  const [statusFilter, setStatusFilter] = useState("All");
  const [viewOrder, setViewOrder]       = useState(null);
  const statuses = ["All","Pending","Shipped","Delivered","Cancelled"];

  const filtered = orders.filter(o=>statusFilter==="All"||o.status===statusFilter);
  const statusColors = { Pending:"#f57f17",Shipped:"#1565c0",Delivered:"#2e7d32",Cancelled:"#c62828" };

  return (
    <div>
      <h2 style={{ color:PD,fontWeight:700,fontSize:"22px",marginBottom:"20px",margin:0 }}>🛒 Orders</h2>
      <p style={{ color:"#aaa",fontSize:"13px",marginBottom:"20px" }}>{filtered.length} of {orders.length} orders</p>

      {/* Status Summary Cards */}
      <div style={{ display:"flex",gap:"12px",flexWrap:"wrap",marginBottom:"20px" }}>
        {statuses.slice(1).map(s=>{
          const n = orders.filter(o=>o.status===s).length;
          return (
            <div key={s} onClick={()=>setStatusFilter(s===statusFilter?"All":s)} style={{ background:"#fff",borderRadius:"12px",padding:"14px 20px",boxShadow:"0 2px 10px rgba(105,85,136,0.08)",borderTop:`3px solid ${statusColors[s]}`,minWidth:"110px",textAlign:"center",cursor:"pointer",border:statusFilter===s?`2px solid ${statusColors[s]}`:"2px solid transparent" }}>
              <div style={{ fontSize:"24px",fontWeight:700,color:statusColors[s] }}>{n}</div>
              <div style={{ fontSize:"12px",color:"#888",marginTop:"2px" }}>{s}</div>
            </div>
          );
        })}
      </div>

      {/* Filter tabs */}
      <div style={{ display:"flex",gap:"8px",marginBottom:"16px",flexWrap:"wrap" }}>
        {statuses.map(s=>(
          <button key={s} onClick={()=>setStatusFilter(s)} style={{
            background:statusFilter===s?P:PL,color:statusFilter===s?"#fff":P,
            border:statusFilter===s?"none":"1.5px solid #d5c8f0",borderRadius:"20px",
            padding:"7px 16px",fontSize:"13px",fontWeight:600,cursor:"pointer"
          }}>{s}</button>
        ))}
      </div>

      <div style={{ background:"#fff",borderRadius:"16px",overflow:"hidden",boxShadow:"0 2px 12px rgba(105,85,136,0.08)" }}>
        <table style={{ width:"100%",borderCollapse:"collapse" }}>
          <thead>
            <tr style={{ background:PB,color:"#fff" }}>
              {["Order ID","Customer","Area","Items","Total","Status","Date","Actions"].map(h=>(
                <th key={h} style={{ padding:"13px 14px",textAlign:"left",fontSize:"11px",fontWeight:700,whiteSpace:"nowrap",textTransform:"uppercase",letterSpacing:"0.5px" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((o,i)=>(
              <tr key={o.id} style={{ borderBottom:"1px solid #f8f5ff",background:i%2?"#fdfaff":"#fff" }}>
                <td style={{ padding:"12px 14px",fontWeight:700,color:P,fontSize:"13px" }}>{o.id}</td>
                <td style={{ padding:"12px 14px",fontSize:"13px",fontWeight:600 }}>{o.customer}</td>
                <td style={{ padding:"12px 14px",fontSize:"12px",color:"#777" }}>{o.area}</td>
                <td style={{ padding:"12px 14px",fontSize:"13px",textAlign:"center" }}>{o.items}</td>
                <td style={{ padding:"12px 14px",fontWeight:700,fontSize:"14px" }}>₹{o.total}</td>
                <td style={{ padding:"12px 14px" }}><Badge status={o.status}/></td>
                <td style={{ padding:"12px 14px",fontSize:"12px",color:"#888" }}>{o.date}</td>
                <td style={{ padding:"12px 14px" }}>
                  <div style={{ display:"flex",gap:"6px" }}>
                    <button onClick={()=>setViewOrder(o)} style={{ background:"#e3f2fd",color:"#1565c0",border:"none",borderRadius:"7px",padding:"5px 10px",fontSize:"12px",fontWeight:600,cursor:"pointer" }}>👁️</button>
                    <select value={o.status} onChange={e=>updateOrderStatus(o.id,e.target.value)}
                      style={{ fontSize:"12px",borderRadius:"7px",border:"1.5px solid #e0d6f0",padding:"5px",cursor:"pointer",fontFamily:"inherit",color:"#555",background:"#fff" }}>
                      {["Pending","Shipped","Delivered","Cancelled"].map(s=><option key={s}>{s}</option>)}
                    </select>
                    <button onClick={()=>deleteOrder(o.id)} style={{ background:"#fce4ec",color:"#c62828",border:"none",borderRadius:"7px",padding:"5px 10px",fontSize:"12px",fontWeight:600,cursor:"pointer" }}>🗑️</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length===0 && <div style={{ padding:"48px",textAlign:"center",color:"#bbb",fontSize:"15px" }}>No orders found.</div>}
      </div>

      {/* Order Detail Modal */}
      {viewOrder && (
        <div style={{ position:"fixed",inset:0,background:"rgba(20,10,40,0.55)",zIndex:1000,display:"flex",alignItems:"center",justifyContent:"center" }} onClick={()=>setViewOrder(null)}>
          <div onClick={e=>e.stopPropagation()} style={{ background:"#fff",borderRadius:"20px",padding:"32px",width:"420px",maxWidth:"95vw",boxShadow:"0 20px 60px rgba(105,85,136,0.3)" }}>
            <h3 style={{ color:P,marginBottom:"20px",fontWeight:700 }}>Order {viewOrder.id}</h3>
            {[["Customer",viewOrder.customer],["Delivery Area",viewOrder.area],["Items",viewOrder.items],["Total Amount",`₹${viewOrder.total}`],["Order Date",viewOrder.date]].map(([l,v])=>(
              <div key={l} style={{ display:"flex",justifyContent:"space-between",padding:"10px 0",borderBottom:"1px solid #f0ebf8" }}>
                <span style={{ color:"#888",fontSize:"13px" }}>{l}</span>
                <span style={{ fontWeight:600,color:PD,fontSize:"13px" }}>{v}</span>
              </div>
            ))}
            <div style={{ display:"flex",justifyContent:"space-between",padding:"10px 0" }}>
              <span style={{ color:"#888",fontSize:"13px" }}>Status</span>
              <Badge status={viewOrder.status}/>
            </div>
            <Btn onClick={()=>setViewOrder(null)} style={{ width:"100%",marginTop:"20px",textAlign:"center" }}>Close</Btn>
          </div>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────
//  USERS PAGE
// ─────────────────────────────────────────────
function UsersPage() {
  const { users, deleteUser } = useAdmin();
  const [search, setSearch] = useState("");
  const [confirmDel, setConfirmDel] = useState(null);

  const filtered = users.filter(u=>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"20px" }}>
        <div>
          <h2 style={{ color:PD,fontWeight:700,fontSize:"22px",margin:0 }}>👥 Users</h2>
          <p style={{ color:"#aaa",fontSize:"13px",margin:0 }}>{filtered.length} registered customers</p>
        </div>
      </div>

      <div style={{ marginBottom:"16px" }}>
        <input placeholder="🔍 Search by name or email..." value={search} onChange={e=>setSearch(e.target.value)}
          style={{ ...inputStyle,maxWidth:"320px" }}/>
      </div>

      <div style={{ background:"#fff",borderRadius:"16px",overflow:"hidden",boxShadow:"0 2px 12px rgba(105,85,136,0.08)" }}>
        <table style={{ width:"100%",borderCollapse:"collapse" }}>
          <thead>
            <tr style={{ background:PB,color:"#fff" }}>
              {["#","User","Email","Phone","City","Area","Joined","Orders","Action"].map(h=>(
                <th key={h} style={{ padding:"13px 14px",textAlign:"left",fontSize:"11px",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.5px" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((u,i)=>(
              <tr key={u.id} style={{ borderBottom:"1px solid #f8f5ff",background:i%2?"#fdfaff":"#fff" }}>
                <td style={{ padding:"12px 14px",color:"#ccc",fontSize:"13px" }}>{u.id}</td>
                <td style={{ padding:"12px 14px" }}>
                  <div style={{ display:"flex",alignItems:"center",gap:"10px" }}>
                    <div style={{ width:"34px",height:"34px",borderRadius:"50%",background:PB,display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontWeight:700,fontSize:"14px",flexShrink:0 }}>{u.name[0]}</div>
                    <span style={{ fontWeight:600,color:PD,fontSize:"13px" }}>{u.name}</span>
                  </div>
                </td>
                <td style={{ padding:"12px 14px",fontSize:"13px",color:"#666" }}>{u.email}</td>
                <td style={{ padding:"12px 14px",fontSize:"13px",color:"#666" }}>{u.phone}</td>
                <td style={{ padding:"12px 14px",fontSize:"13px" }}>{u.city}</td>
                <td style={{ padding:"12px 14px",fontSize:"13px",color:"#777" }}>{u.area}</td>
                <td style={{ padding:"12px 14px",fontSize:"12px",color:"#aaa" }}>{u.joined}</td>
                <td style={{ padding:"12px 14px",textAlign:"center" }}>
                  <span style={{ background:P,color:"#fff",padding:"3px 10px",borderRadius:"12px",fontSize:"13px",fontWeight:700 }}>{u.orders}</span>
                </td>
                <td style={{ padding:"12px 14px" }}>
                  <button onClick={()=>setConfirmDel(u)} style={{ background:"#fce4ec",color:"#c62828",border:"none",borderRadius:"7px",padding:"5px 10px",fontSize:"12px",fontWeight:600,cursor:"pointer" }}>🗑️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length===0 && <div style={{ padding:"48px",textAlign:"center",color:"#bbb",fontSize:"15px" }}>No users found.</div>}
      </div>

      {confirmDel && (
        <div style={{ position:"fixed",inset:0,background:"rgba(20,10,40,0.55)",zIndex:1100,display:"flex",alignItems:"center",justifyContent:"center" }}>
          <div style={{ background:"#fff",borderRadius:"18px",padding:"32px",maxWidth:"360px",width:"90%",textAlign:"center",boxShadow:"0 20px 60px rgba(0,0,0,0.2)" }}>
            <div style={{ fontSize:"40px",marginBottom:"12px" }}>👤</div>
            <h3 style={{ color:PD,margin:"0 0 8px" }}>Remove User?</h3>
            <p style={{ color:"#777",fontSize:"14px",marginBottom:"24px" }}>Remove <strong>{confirmDel.name}</strong> from the system?</p>
            <div style={{ display:"flex",gap:"12px" }}>
              <Btn variant="outline" onClick={()=>setConfirmDel(null)} style={{ flex:1 }}>Cancel</Btn>
              <Btn variant="danger" onClick={()=>{ deleteUser(confirmDel.id,confirmDel.name); setConfirmDel(null); }} style={{ flex:1,background:"#e53935",color:"#fff",border:"none" }}>Remove</Btn>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────
//  SETTINGS PAGE
// ─────────────────────────────────────────────
function SettingsPage() {
  const { showToast } = useAdmin();
  const [form, setForm] = useState({
    storeName:"Charbhuja", storeEmail:"admin@charbhuja.com", storePhone:"+91 98765 43210",
    storeCity:"Ahmedabad", currency:"INR (₹)", taxRate:"18",
    deliveryPolicy:"Free delivery above ₹500", minOrder:"100", storeTagline:"Pure. Natural. Trusted."
  });

  return (
    <div>
      <h2 style={{ color:PD,fontWeight:700,fontSize:"22px",marginBottom:"24px" }}>⚙️ Settings</h2>
      <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:"20px" }}>

        <div style={{ background:"#fff",borderRadius:"16px",padding:"24px",boxShadow:"0 2px 12px rgba(105,85,136,0.08)" }}>
          <h4 style={{ color:P,marginBottom:"18px",fontWeight:700 }}>🏪 Store Information</h4>
          {[["Store Name","storeName"],["Tagline","storeTagline"],["Email","storeEmail"],["Phone","storePhone"],["City","storeCity"]].map(([l,k])=>(
            <Inp key={k} label={l}>
              <input value={form[k]} onChange={e=>setForm(p=>({...p,[k]:e.target.value}))} style={inputStyle}/>
            </Inp>
          ))}
        </div>

        <div>
          <div style={{ background:"#fff",borderRadius:"16px",padding:"24px",boxShadow:"0 2px 12px rgba(105,85,136,0.08)",marginBottom:"20px" }}>
            <h4 style={{ color:P,marginBottom:"18px",fontWeight:700 }}>💰 Commerce</h4>
            {[["Currency","currency"],["GST/Tax Rate (%)","taxRate"],["Delivery Policy","deliveryPolicy"],["Min Order (₹)","minOrder"]].map(([l,k])=>(
              <Inp key={k} label={l}>
                <input value={form[k]} onChange={e=>setForm(p=>({...p,[k]:e.target.value}))} style={inputStyle}/>
              </Inp>
            ))}
          </div>

          <div style={{ background:"#fff",borderRadius:"16px",padding:"24px",boxShadow:"0 2px 12px rgba(105,85,136,0.08)" }}>
            <h4 style={{ color:P,marginBottom:"14px",fontWeight:700 }}>🎨 Brand Colors</h4>
            <div style={{ display:"flex",gap:"10px",flexWrap:"wrap",marginBottom:"14px" }}>
              {[["Primary","#695588"],["Dark","#2d1b4e"],["Medium","#9b7ec8"],["Light","#f5f0ff"],["Accent","#6f5a8e"]].map(([l,c])=>(
                <div key={c} style={{ textAlign:"center" }}>
                  <div style={{ width:"42px",height:"42px",borderRadius:"12px",background:c,margin:"0 auto 4px",boxShadow:"0 2px 8px rgba(0,0,0,0.12)" }}/>
                  <div style={{ fontSize:"10px",color:"#aaa" }}>{l}</div>
                  <div style={{ fontSize:"9px",color:"#ccc",fontFamily:"monospace" }}>{c}</div>
                </div>
              ))}
            </div>
            <Btn onClick={()=>showToast("✅ Settings saved!")} style={{ width:"100%" }}>💾 Save All Settings</Btn>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
//  MAIN SHELL
// ─────────────────────────────────────────────
function AdminShell() {
  const [page, setPage]             = useState("dashboard");
  const [collapsed, setCollapsed]   = useState(false);
  const { products, orders, users } = useAdmin();

  const nav = [
    { id:"dashboard",  label:"Dashboard",   icon:"📊", badge:null },
    { id:"products",   label:"Products",    icon:"📦", badge:products.length },
    { id:"categories", label:"Categories",  icon:"🏷️", badge:null },
    { id:"orders",     label:"Orders",      icon:"🛒", badge:orders.filter(o=>o.status==="Pending").length||null },
    { id:"users",      label:"Users",       icon:"👥", badge:users.length },
    { id:"settings",   label:"Settings",    icon:"⚙️", badge:null },
  ];

  const pageMap = {
    dashboard:  <Dashboard setPage={setPage}/>,
    products:   <Products/>,
    categories: <CategoriesPage/>,
    orders:     <OrdersPage/>,
    users:      <UsersPage/>,
    settings:   <SettingsPage/>,
  };

  return (
    <div style={{ display:"flex",height:"100vh",fontFamily:"'Ubuntu',sans-serif",background:"#f8f4ff",overflow:"hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Ubuntu:wght@300;400;500;700&display=swap');
        @keyframes slideUp{from{transform:translateY(20px);opacity:0}to{transform:translateY(0);opacity:1}}
        * { box-sizing: border-box; }
        ::-webkit-scrollbar{width:6px;height:6px}
        ::-webkit-scrollbar-thumb{background:#d5c8f0;border-radius:6px}
        ::-webkit-scrollbar-track{background:transparent}
      `}</style>

      {/* SIDEBAR */}
      <div style={{ width:collapsed?"64px":"230px",background:"linear-gradient(180deg,#1a0d35 0%,#2d1b4e 40%,#4a2d7a 100%)",color:"#fff",display:"flex",flexDirection:"column",transition:"width 0.3s ease",flexShrink:0,overflow:"hidden" }}>

        {/* Brand */}
        <div style={{ padding:"18px 14px",borderBottom:"1px solid rgba(255,255,255,0.08)",display:"flex",alignItems:"center",gap:"10px",minHeight:"68px" }}>
          <div style={{ width:"38px",height:"38px",borderRadius:"12px",background:"rgba(255,255,255,0.15)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"22px",flexShrink:0 }}>🌿</div>
          {!collapsed && (
            <div style={{ overflow:"hidden" }}>
              <div style={{ fontWeight:700,fontSize:"16px",lineHeight:"1.2",whiteSpace:"nowrap" }}>Charbhuja</div>
              <div style={{ fontSize:"10px",opacity:0.5,textTransform:"uppercase",letterSpacing:"1.5px" }}>Admin Panel</div>
            </div>
          )}
        </div>

        {/* Nav items */}
        <nav style={{ flex:1,padding:"12px 8px",overflowY:"auto" }}>
          {nav.map(item=>(
            <button key={item.id} onClick={()=>setPage(item.id)} title={collapsed?item.label:""} style={{
              width:"100%",display:"flex",alignItems:"center",gap:"12px",
              padding:collapsed?"12px 0":"11px 14px",
              justifyContent:collapsed?"center":"flex-start",
              background:page===item.id?"rgba(255,255,255,0.16)":"transparent",
              color:"#fff",border:"none",borderRadius:"12px",cursor:"pointer",
              fontFamily:"inherit",fontSize:"14px",fontWeight:page===item.id?700:400,
              marginBottom:"4px",transition:"background 0.18s",
              borderLeft:page===item.id?"3px solid rgba(255,255,255,0.7)":"3px solid transparent",
              position:"relative"
            }}>
              <span style={{ fontSize:"18px",flexShrink:0 }}>{item.icon}</span>
              {!collapsed && <span style={{ flex:1,textAlign:"left" }}>{item.label}</span>}
              {!collapsed && item.badge && (
                <span style={{ background:page===item.id?"rgba(255,255,255,0.25)":"rgba(255,255,255,0.15)",borderRadius:"10px",padding:"1px 7px",fontSize:"11px",fontWeight:700 }}>{item.badge}</span>
              )}
            </button>
          ))}
        </nav>

        {/* Collapse */}
        <button onClick={()=>setCollapsed(!collapsed)} style={{ margin:"12px 8px",padding:"10px",background:"rgba(255,255,255,0.08)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:"10px",color:"rgba(255,255,255,0.7)",cursor:"pointer",fontFamily:"inherit",fontSize:"12px",fontWeight:600,transition:"background 0.2s" }}>
          {collapsed?"▶":"◀ Collapse"}
        </button>
      </div>

      {/* MAIN */}
      <div style={{ flex:1,display:"flex",flexDirection:"column",overflow:"hidden" }}>

        {/* Topbar */}
        <div style={{ background:"#fff",padding:"0 28px",height:"64px",display:"flex",alignItems:"center",justifyContent:"space-between",boxShadow:"0 1px 0 #f0ebf8",flexShrink:0 }}>
          <div style={{ fontWeight:700,color:PD,fontSize:"15px" }}>
            {nav.find(n=>n.id===page)?.icon} {nav.find(n=>n.id===page)?.label}
          </div>
          <div style={{ display:"flex",alignItems:"center",gap:"16px" }}>
            <div style={{ fontSize:"12px",color:"#aaa",display:"flex",alignItems:"center",gap:"6px" }}>
              <span>📍</span> Ahmedabad, Gujarat
            </div>
            <div style={{ display:"flex",alignItems:"center",gap:"8px",background:PL,borderRadius:"10px",padding:"6px 12px" }}>
              <div style={{ width:"28px",height:"28px",borderRadius:"50%",background:PB,display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontWeight:700,fontSize:"13px" }}>A</div>
              <span style={{ fontSize:"13px",fontWeight:600,color:P }}>Admin</span>
            </div>
          </div>
        </div>

        {/* Page */}
        <div style={{ flex:1,overflowY:"auto",padding:"24px 28px" }}>
          {pageMap[page]}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
//  ROOT EXPORT
// ─────────────────────────────────────────────
export default function CharbhujaAdmin() {
  return (
    <AdminProvider>
      <AdminShell/>
    </AdminProvider>
  );
}

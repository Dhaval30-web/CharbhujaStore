import P1 from '../Assets/Images/Products/1.png';
import P1B from '../Assets/Images/Products/1-B.png';
import P1M from '../Assets/Images/Products/1-M.png';
import P2 from '../Assets/Images/Products/2.png';
import P2B from '../Assets/Images/Products/2-B.png';
import P2M from '../Assets/Images/Products/2-M.png';
import P3 from '../Assets/Images/Products/3.png';
import P3B from '../Assets/Images/Products/3-B.png';
import P3M from '../Assets/Images/Products/3-M.png';
import P4 from '../Assets/Images/Products/4.png';
import P4B from '../Assets/Images/Products/4-B.png';
import P4M from '../Assets/Images/Products/4-M.png';
import P5 from '../Assets/Images/Products/5.png';
import P5B from '../Assets/Images/Products/5-B.png';
import P5M from '../Assets/Images/Products/5-M.png';
import P6 from '../Assets/Images/Products/6.png';
import P6B from '../Assets/Images/Products/6-B.png';
import P6M from '../Assets/Images/Products/6-M.png';
import P7 from '../Assets/Images/Products/7.png';
import P7B from '../Assets/Images/Products/7-B.png';
import P7M from '../Assets/Images/Products/7-M.png';
import P8 from '../Assets/Images/Products/8.png';
import P8B from '../Assets/Images/Products/8-B.png';
import P8M from '../Assets/Images/Products/8-M.png';
import P9 from '../Assets/Images/Products/9.png';
import P9B from '../Assets/Images/Products/9-B.png';
import P9M from '../Assets/Images/Products/9-M.png';
import P10 from '../Assets/Images/Products/10.png';
import P10B from '../Assets/Images/Products/10-B.png';
import P10M from '../Assets/Images/Products/10-M.png';
import P11 from '../Assets/Images/Products/11.png';
import P11B from '../Assets/Images/Products/11-B.png';
import P11M from '../Assets/Images/Products/11-M.png';
import P12 from '../Assets/Images/Products/12.png';
import P12B from '../Assets/Images/Products/12-B.png';
import P12M from '../Assets/Images/Products/12-M.png';
import P13 from '../Assets/Images/Products/13.png';
import P13B from '../Assets/Images/Products/13-B.png';
import P13M from '../Assets/Images/Products/13-M.png';
import P14 from '../Assets/Images/Products/14.png';
import P14B from '../Assets/Images/Products/14-B.png';
import P14M from '../Assets/Images/Products/14-M.png';
import P15 from '../Assets/Images/Products/15.png';
import P15B from '../Assets/Images/Products/15-B.png';
import P15M from '../Assets/Images/Products/15-M.png';
import P16 from '../Assets/Images/Products/16.png';
import P16B from '../Assets/Images/Products/16-B.png';
import P16M from '../Assets/Images/Products/16-M.png';

const productsData = [
    {
        id: 1,
        name: "Premium South Indian Green Cardamom",
        brand: "Charbhuja",
        rating: 4.5,
        oldPrice: 3800,
        newPrice: 3500,
        discount: 8,
        stock: true,
        isBestSeller: true,
        isNew: false,
        description: "Handpicked from South India's finest farms — bold aroma, guaranteed freshness in every food.",
        images: [P1, P1B, P1M],
        weightOptions: [
            { label: "250g", oldPrice: 950,  newPrice: 875 },
            { label: "500g", oldPrice: 1900, newPrice: 1750 },
            { label: "1kg",  oldPrice: 3800, newPrice: 3500 },
            { label: "5kg",  oldPrice: 19000,newPrice: 17500 },
        ],
        meta: {
            type: "100% Natural & Organic",
            weight: "1kg (Value Pack)",
            mfgDate: "15/05/2026",
            expDate: "31/05/2027",
            category: "Spices & Masala",
            tags: "cardamom, natural, organic, export quality"
        }
    },
    {
        id: 2,
        name: "Premium Californian Almonds",
        brand: "Charbhuja",
        rating: 4,
        oldPrice: 1000,
        newPrice: 900,
        discount: 10,
        stock: true,
        isBestSeller: true,
        isNew: false,
        description: "Finest California almonds, rich in nutrients and perfect for snacking or cooking.",
        images: [P2, P2B, P2M],
        weightOptions: [
            { label: "250g", oldPrice: 250,  newPrice: 225 },
            { label: "500g", oldPrice: 500, newPrice: 450 },
            { label: "1kg",  oldPrice: 1000, newPrice: 900 },
            { label: "5kg",  oldPrice: 5000,newPrice: 4500 },
        ],
        meta: {
            type: "100% Natural",
            weight: "1kg (Value Pack)",
            mfgDate: "01/04/2026",
            expDate: "31/03/2027",
            category: "Dry Fruits",
            tags: "almonds, natural, healthy, protein"
        }
    },
    {
        id: 3,
        name: "Premium Californian Pistachios",
        brand: "Charbhuja",
        rating: 3.5,
        oldPrice: 1700,
        newPrice: 1500,
        discount: 12,
        stock: true,
        isBestSeller: true,
        isNew: false,
        description: "Crunchy and delicious pistachios sourced from premium California farms.",
        images: [P3, P3B, P3M],
        weightOptions: [
            { label: "250g", oldPrice: 425,  newPrice: 375 },
            { label: "500g", oldPrice: 850, newPrice: 750 },
            { label: "1kg",  oldPrice: 1700, newPrice: 1500 },
            { label: "5kg",  oldPrice: 8500,newPrice: 7500 },
        ],
        meta: {
            type: "100% Natural",
            weight: "1kg (Value Pack)",
            mfgDate: "01/03/2026",
            expDate: "28/02/2027",
            category: "Dry Fruits",
            tags: "pistachios, natural, healthy, crunchy"
        }
    },
    {
        id: 4,
        name: "Premium Goa Masala Cashew",
        brand: "Charbhuja",
        rating: 4,
        oldPrice: 1500,
        newPrice: 1300,
        discount: 13,
        stock: true,
        isBestSeller: true,
        isNew: false,
        description: "Authentic Goan spiced cashews with a bold, tangy masala flavour.",
        images: [P4, P4B, P4M],
        weightOptions: [
            { label: "250g", oldPrice: 375,  newPrice: 325 },
            { label: "500g", oldPrice: 750, newPrice: 650 },
            { label: "1kg",  oldPrice: 1500, newPrice: 1300 },
            { label: "5kg",  oldPrice: 7500,newPrice: 6500 },
        ],
        meta: {
            type: "Flavoured Cashews",
            weight: "1kg (Value Pack)",
            mfgDate: "10/05/2026",
            expDate: "09/11/2026",
            category: "Snacks",
            tags: "cashews, goa masala, spicy, snack"
        }
    },
    {
        id: 5,
        name: "Organic Rajasthani Chilli Powder",
        brand: "Charbhuja",
        rating: 4.5,
        oldPrice: 600,
        newPrice: 550,
        discount: 8,
        stock: true,
        isBestSeller: true,
        isNew: false,
        description: "Stone-ground red chilli powder from Rajasthan's finest chilli farms.",
        images: [P5, P5B, P5M],
        weightOptions: [
            { label: "250g", oldPrice: 150, newPrice: 138 },
            { label: "500g", oldPrice: 300, newPrice: 275 },
            { label: "1kg",  oldPrice: 600, newPrice: 550 },
            { label: "5kg",  oldPrice: 3000,newPrice: 2750 },
        ],
        meta: {
            type: "Organic Spice",
            weight: "1kg (Value Pack)",
            mfgDate: "20/04/2026",
            expDate: "19/04/2027",
            category: "Spices & Masala",
            tags: "chilli, organic, rajasthani, spicy"
        }
    },
    {
        id: 6,
        name: "Organic Rajasthani Turmeric Powder",
        brand: "Charbhuja",
        rating: 4,
        oldPrice: 600,
        newPrice: 550,
        discount: 8,
        stock: true,
        isBestSeller: true,
        isNew: false,
        description: "Pure turmeric powder with high curcumin content, grown organically in Rajasthan.",
        images: [P6, P6B, P6M],
        weightOptions: [
            { label: "250g", oldPrice: 150, newPrice: 138 },
            { label: "500g", oldPrice: 300, newPrice: 275 },
            { label: "1kg",  oldPrice: 600, newPrice: 550 },
            { label: "5kg",  oldPrice: 3000,newPrice: 2750 },
        ],
        meta: {
            type: "Organic Spice",
            weight: "1kg (Value Pack)",
            mfgDate: "20/04/2026",
            expDate: "19/04/2027",
            category: "Spices & Masala",
            tags: "turmeric, organic, rajasthani, haldi"
        }
    },
    {
        id: 7,
        name: "Organic Rajasthani Coriander Powder",
        brand: "Charbhuja",
        rating: 3.5,
        oldPrice: 600,
        newPrice: 550,
        discount: 8,
        stock: true,
        isBestSeller: true,
        isNew: false,
        description: "Freshly ground coriander powder with authentic aroma and earthy flavour.",
        images: [P7, P7B, P7M],
        weightOptions: [
            { label: "250g", oldPrice: 150, newPrice: 138 },
            { label: "500g", oldPrice: 300, newPrice: 275 },
            { label: "1kg",  oldPrice: 600, newPrice: 550 },
            { label: "5kg",  oldPrice: 3000,newPrice: 2750 },
        ],
        meta: {
            type: "Organic Spice",
            weight: "1kg (Value Pack)",
            mfgDate: "20/04/2026",
            expDate: "19/04/2027",
            category: "Spices & Masala",
            tags: "coriander, organic, rajasthani, dhaniya"
        }
    },

    {
        id: 8,
        name: "Premium MP Sarbati Gehu Ka Aata",
        brand: "Charbhuja",
        rating: 4.5,
        oldPrice: 230,
        newPrice: 215,
        discount: 7,
        stock: true,
        isBestSeller: false,
        isNew: true,
        description: "100% Whole Wheat Flour — Pure, Natural & Healthy. Stone-ground from finest quality wheat, perfect for soft rotis and parathas every time.",
        images: [P8, P8B, P8M],
        weightOptions: [
            { label: "1kg", oldPrice: 46, newPrice: 43 },
            { label: "2kg", oldPrice: 92, newPrice: 86 },
            { label: "5kg",  oldPrice: 230, newPrice: 215 },
            { label: "10kg",  oldPrice: 460, newPrice: 430 },
        ],
        meta: {
            type: "100% Natural & Pure",
            weight: "5kg (Value Pack)",
            mfgDate: "01/05/2026",
            expDate: "30/04/2027",
            category: "Atta & Flour",
            tags: "gehu, aata, wheat flour, natural, healthy, whole wheat"
        }
    },

    {
        id: 9,
        name: "Premium Gujarati Toor Dal",
        brand: "Charbhuja",
        rating: 4,
        oldPrice: 800,
        newPrice: 720,
        discount: 10,
        stock: true,
        isBestSeller: false,
        isNew: true,
        description: "Premium Quality Toor Dal — Rich in Protein, Natural & Healthy. Carefully selected and hygienically packed for authentic taste, faster cooking, and delicious everyday meals.",
        images: [P9, P9B, P9M],
        weightOptions: [
            { label: "1kg", oldPrice: 160, newPrice: 144 },
            { label: "2kg", oldPrice: 320, newPrice: 288 },
            { label: "5kg",  oldPrice: 800, newPrice: 720 },
            { label: "10kg",  oldPrice: 1600, newPrice: 1440 },
        ],
        meta: {
            type: "100% Natural & Pure",
            weight: "5kg (Value Pack)",
            mfgDate: "01/05/2026",
            expDate: "30/04/2027",
            category: "Dal & Pulses",
            tags: "toor dal, arhar dal, premium dal, protein rich, healthy, natural"
        }
    },

    {
        id: 10,
        name: "Premium Anjeer (Dried Figs)",
        brand: "Charbhuja",
        rating: 3.5,
        oldPrice: 1300,
        newPrice: 1200,
        discount: 8,
        stock: true,
        isBestSeller: false,
        isNew: true,
        description: "Premium Quality Anjeer (Dried Figs) — Naturally Sweet, Rich in Fiber & Healthy Nutrition. Handpicked dried figs packed with essential nutrients, perfect for snacking, desserts, and daily wellness.",
        images: [P10, P10B, P10M],
        weightOptions: [
            { label: "250g", oldPrice: 325, newPrice: 300 },
            { label: "500g", oldPrice: 650, newPrice: 600 },
            { label: "1kg",  oldPrice: 1300, newPrice: 1200 },
            { label: "5kg",  oldPrice: 6500,newPrice: 6000 },
        ],
        meta: {
            type: "100% Natural & Pure",
            weight: "1kg (Value Pack)",
            mfgDate: "01/05/2026",
            expDate: "30/04/2027",
            category: "Dry Fruits",
            tags: "anjeer, dried figs, premium dry fruits, healthy snacks, fiber rich, natural"
        }
    },

    {
        id: 11,
        name: "Premium Sweet Kishmish (Raisins)",
        brand: "Charbhuja",
        rating: 4,
        oldPrice: 600,
        newPrice: 550,
        discount: 9,
        stock: true,
        isBestSeller: false,
        isNew: true,
        description: "Premium Quality Kishmish (Raisins) — Naturally Sweet, Fresh & Energy Rich. Carefully selected premium raisins packed with natural taste and nutrients, perfect for snacking, sweets, and healthy daily nutrition.",
        images: [P11, P11B, P11M],
        weightOptions: [
            { label: "250g", oldPrice: 150, newPrice: 138 },
            { label: "500g", oldPrice: 300, newPrice: 275 },
            { label: "1kg",  oldPrice: 600, newPrice: 550 },
            { label: "5kg",  oldPrice: 3000,newPrice: 2750 },
        ],
        meta: {
            type: "100% Natural & Pure",
            weight: "1kg (Value Pack)",
            mfgDate: "01/05/2026",
            expDate: "30/04/2027",
            category: "Dry Fruits",
            tags: "kishmish, raisins, premium dry fruits, healthy snacks, natural sweetness, energy rich"
        }
    },

    {
        id: 12,
        name: "Premium Akhrot (Walnuts)",
        brand: "Charbhuja",
        rating: 4,
        oldPrice: 1000,
        newPrice: 900,
        discount: 10,
        stock: true,
        isBestSeller: false,
        isNew: true,
        description: "Premium Quality Akhrot (Walnuts) — Crunchy, Nutritious & Naturally Fresh. Carefully selected walnuts rich in healthy fats, protein, and essential nutrients, perfect for snacking, desserts, and daily wellness.",
        images: [P12, P12B, P12M],
        weightOptions: [
            { label: "250g", oldPrice: 250, newPrice: 225 },
            { label: "500g", oldPrice: 500, newPrice: 450 },
            { label: "1kg",  oldPrice: 1000, newPrice: 900 },
            { label: "5kg",  oldPrice: 5000, newPrice: 4500 },
        ],
        meta: {
            type: "100% Natural & Pure",
            weight: "1kg (Value Pack)",
            mfgDate: "01/05/2026",
            expDate: "30/04/2027",
            category: "Dry Fruits",
            tags: "akhrot, walnuts, premium dry fruits, healthy snacks, protein rich, natural"
        }
    },

    {
        id: 13,
        name: "Premium South Indain Clove (Laung)",
        brand: "Charbhuja",
        rating: 3.5,
        oldPrice: 1000,
        newPrice: 900,
        discount: 8,
        stock: true,
        isBestSeller: false,
        isNew: false,
        description: "Premium Quality Clove (Laung) — Strong Aroma, Rich Flavor & Naturally Fresh. Carefully selected whole cloves packed with intense fragrance and authentic taste, perfect for tea, spices, cooking, and traditional remedies.",
        images: [P13, P13B, P13M],
        weightOptions: [
            { label: "250g", oldPrice: 250, newPrice: 225 },
            { label: "500g", oldPrice: 500, newPrice: 450 },
            { label: "1kg",  oldPrice: 1000, newPrice: 900 },
            { label: "5kg",  oldPrice: 5000, newPrice: 4500 },
        ],
        meta: {
            type: "100% Natural & Pure",
            weight: "1kg (Value Pack)",
            mfgDate: "01/05/2026",
            expDate: "30/04/2027",
            category: "Spices & Masala",     
            tags: "clove, laung, whole spices, aromatic, natural, fresh"
        }
    },

    {
        id: 14,
        name: "Premium Jeera (Cumin Seeds)",
        brand: "Charbhuja",
        rating: 4,
        oldPrice: 450,
        newPrice: 410,
        discount: 9,
        stock: true,
        isBestSeller: false,
        isNew: false,
        description: "Premium Quality Jeera (Cumin Seeds) — Bold Aroma, Rich Flavor & Naturally Fresh. Carefully selected whole cumin seeds packed with intense fragrance and authentic taste, perfect for tadka, curries, rice, and everyday Indian cooking.",
        images: [P14, P14B, P14M],
        weightOptions: [
            { label: "250g", oldPrice: 113, newPrice: 103 },
            { label: "500g", oldPrice: 225, newPrice: 205 },
            { label: "1kg",  oldPrice: 450, newPrice: 410 },
            { label: "5kg",  oldPrice: 2250, newPrice: 2050 },
        ],
        meta: {
            type: "100% Natural & Pure",
            weight: "1kg (Value Pack)",
            mfgDate: "01/05/2026",
            expDate: "30/04/2027",
            category: "Spices & Masala",
            tags: "jeera, cumin, cumin seeds, whole spices, aromatic, natural, fresh"
        }
    },

    {
        id: 15,
        name: "Premium Black Pepper (Kali Mirch)",
        brand: "Charbhuja",
        rating: 3.5,
        oldPrice: 700,
        newPrice: 640,
        discount: 9,
        stock: true,
        isBestSeller: false,
        isNew: false,
        description: "Premium Quality Black Pepper (Kali Mirch) — Bold Aroma, Sharp Flavor & Naturally Fresh. Carefully selected whole black pepper packed with intense pungency and authentic taste, perfect for seasoning, marinades, curries, and everyday Indian cooking.",
        images: [P15, P15B, P15M],
        weightOptions: [
            { label: "250g", oldPrice: 175, newPrice: 160 },
            { label: "500g", oldPrice: 350, newPrice: 320 },
            { label: "1kg",  oldPrice: 700, newPrice: 640 },
            { label: "5kg",  oldPrice: 3500, newPrice: 3200 },
        ],
        meta: {
            type: "100% Natural & Pure",
            weight: "1kg (Value Pack)",
            mfgDate: "01/05/2026",
            expDate: "30/04/2027",
            category: "Spices & Masala",
            tags: "black pepper, kali mirch, pepper, whole spices, aromatic, natural, fresh"
        }
    },

    {
        id: 16,
        name: "Premium Mix Garam Masala",
        brand: "Charbhuja",
        rating: 4.5,
        oldPrice: 500,
        newPrice: 450,
        discount: 10,
        stock: true,
        isBestSeller: false,
        isNew: false,
        description: "Premium Quality Mix Garam Masala — Rich Blend, Bold Flavor & Naturally Fresh. Carefully crafted blend of finest whole spices, perfectly balanced for authentic taste, perfect for curries, gravies, biryanis, and everyday Indian cooking.",
        images: [P16, P16B, P16M],
        weightOptions: [
            { label: "250g", oldPrice: 125, newPrice: 113 },
            { label: "500g", oldPrice: 250, newPrice: 225 },
            { label: "1kg",  oldPrice: 500, newPrice: 450 },
            { label: "5kg",  oldPrice: 2500, newPrice: 2250 },
        ],
        meta: {
            type: "100% Natural & Pure",
            weight: "1kg (Value Pack)",
            mfgDate: "01/05/2026",
            expDate: "30/04/2027",
            category: "Spices & Masala",
            tags: "garam masala, mix masala, spice mix, blend, masala mix, natural, fresh"
        }
    },
];

export default productsData;
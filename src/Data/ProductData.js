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
import P17 from '../Assets/Images/Products/17.png';
import P17B from '../Assets/Images/Products/17-B.png';
import P17M from '../Assets/Images/Products/17-M.png';
import P18 from '../Assets/Images/Products/18.png';
import P18B from '../Assets/Images/Products/18-B.png';
import P18M from '../Assets/Images/Products/18-M.png';
import P19 from '../Assets/Images/Products/19.png';
import P19B from '../Assets/Images/Products/19-B.png';
import P19M from '../Assets/Images/Products/19-M.png';
import P20 from '../Assets/Images/Products/20.png';
import P20B from '../Assets/Images/Products/20-B.png';
import P20M from '../Assets/Images/Products/20-M.png';
import P21 from '../Assets/Images/Products/21.png';
import P21B from '../Assets/Images/Products/21-B.png';
import P21M from '../Assets/Images/Products/21-M.png';
import P22 from '../Assets/Images/Products/22.png';
import P22B from '../Assets/Images/Products/22-B.png';
import P22M from '../Assets/Images/Products/22-M.png';
import P23 from '../Assets/Images/Products/23.png';
import P23B from '../Assets/Images/Products/23-B.png';
import P23M from '../Assets/Images/Products/23-M.png';
import P24 from '../Assets/Images/Products/24.png';
import P24B from '../Assets/Images/Products/24-B.png';
import P24M from '../Assets/Images/Products/24-M.png';
import P25 from '../Assets/Images/Products/25.png';
import P25B from '../Assets/Images/Products/25-B.png';
import P25M from '../Assets/Images/Products/25-M.png';
import P26 from '../Assets/Images/Products/26.png';
import P26B from '../Assets/Images/Products/26-B.png';
import P26M from '../Assets/Images/Products/26-M.png';
import P27 from '../Assets/Images/Products/27.png';
import P27B from '../Assets/Images/Products/27-B.png';
import P27M from '../Assets/Images/Products/27-M.png';
import P28 from '../Assets/Images/Products/28.png';
import P28B from '../Assets/Images/Products/28-B.png';
import P28M from '../Assets/Images/Products/28-M.png';
import P29 from '../Assets/Images/Products/29.png';
import P29B from '../Assets/Images/Products/29-B.png';
import P29M from '../Assets/Images/Products/29-M.png';
import P30 from '../Assets/Images/Products/30.png';
import P30B from '../Assets/Images/Products/30-B.png';
import P30M from '../Assets/Images/Products/30-M.png';
import P31 from '../Assets/Images/Products/31.png';
import P31B from '../Assets/Images/Products/31-B.png';
import P31M from '../Assets/Images/Products/31-M.png';
import P32 from '../Assets/Images/Products/32.png';
import P32B from '../Assets/Images/Products/32-B.png';
import P32M from '../Assets/Images/Products/32-M.png';

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
            category: "Grocery",
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
            category: "Grocery",
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
            category: "Grocery",
            tags: "gehu, aata, wheat flour, natural, healthy, whole wheat"
        }
    },

    {
        id: 9,
        name: "Premium Gujarati Toor Daal",
        brand: "Charbhuja",
        rating: 4,
        oldPrice: 800,
        newPrice: 720,
        discount: 10,
        stock: true,
        isBestSeller: false,
        isNew: true,
        description: "Premium Quality Toor Daal — Rich in Protein, Natural & Healthy. Carefully selected and hygienically packed for authentic taste, faster cooking, and delicious everyday meals.",
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
            category: "Grocery",
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
            category: "Grocery",
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
            category: "Grocery",
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
            category: "Grocery",
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

    {
        id: 17,
        name: "Premium Bay Leaf (Tej Patta)",
        brand: "Charbhuja",
        rating: 4,
        oldPrice: 300,
        newPrice: 270,
        discount: 10,
        stock: true,
        isBestSeller: false,
        isNew: false,
        description: "Premium Quality Bay Leaf (Tej Patta) — Rich Aroma, Distinct Flavor & Naturally Fresh. Carefully selected whole bay leaves packed with intense fragrance and authentic taste, perfect for biryanis, curries, soups, and everyday Indian cooking.",
        images: [P17, P17B, P17M],
        weightOptions: [
            { label: "250g", oldPrice: 75,  newPrice: 68 },
            { label: "500g", oldPrice: 150, newPrice: 135 },
            { label: "1kg",  oldPrice: 300, newPrice: 270 },
            { label: "5kg",  oldPrice: 1500, newPrice: 1350 },
        ],
        meta: {
            type: "100% Natural & Pure",
            weight: "1kg (Value Pack)",
            mfgDate: "01/05/2026",
            expDate: "30/04/2027",
            category: "Spices & Masala",
            tags: "bay leaf, tej patta, dry aromatics, aromatic, javitri, natural, fresh"
        }
    },

    {
        id: 18,
        name: "Premium Moong Daal",
        brand: "Charbhuja",
        rating: 4,
        oldPrice: 700,
        newPrice: 650,
        discount: 8,
        stock: true,
        isBestSeller: false,
        isNew: false,
        description: "Premium Quality Mung Daal — Rich in Protein, Natural & Healthy. Carefully selected and hygienically packed for authentic taste, faster cooking, and delicious everyday meals.",
        images: [P18, P18B, P18M],
        weightOptions: [
            { label: "1kg",  oldPrice: 140,  newPrice: 130 },
            { label: "2kg",  oldPrice: 280, newPrice: 260 },
            { label: "5kg",  oldPrice: 700, newPrice: 650 },
            { label: "10kg", oldPrice: 1400, newPrice: 1300 },
        ],
        meta: {
            type: "100% Natural & Pure",
            weight: "5kg (Value Pack)",
            mfgDate: "01/05/2026",
            expDate: "30/04/2027",
            category: "Grocery",
            tags: "moong dal, daal, dal, protein rich, healthy, natural"
        }
    },

    {
        id: 19,
        name: "Premium Basmati Rice",
        brand: "Charbhuja",
        rating: 4.5,
        oldPrice: 600,
        newPrice: 550,
        discount: 8,
        stock: true,
        isBestSeller: false,
        isNew: false,
        description: "Premium Quality Basmati Rice — Long Grain, Aromatic & Naturally Fresh. Carefully selected and hygienically packed for authentic taste, fluffy texture, and delicious everyday meals.",
        images: [P19, P19B, P19M],
        weightOptions: [
            { label: "1kg",  oldPrice: 120, newPrice: 110 },
            { label: "2kg",  oldPrice: 240, newPrice: 220 },
            { label: "5kg",  oldPrice: 600, newPrice: 550 },
            { label: "10kg", oldPrice: 1200, newPrice: 1100 },
        ],
        meta: {
            type: "100% Natural & Pure",
            weight: "5kg (Value Pack)",
            mfgDate: "01/05/2026",
            expDate: "30/04/2027",
            category: "Grocery",
            tags: "basmati rice, rice, chawal, anaj, grain, aromatic, natural"
        }
    },

    {
        id: 20,
        name: "Premium Daliya (Broken Wheat)",
        brand: "Charbhuja",
        rating: 4,
        oldPrice: 250,
        newPrice: 225,
        discount: 10,
        stock: true,
        isBestSeller: false,
        isNew: false,
        description: "Premium Quality Daliya (Broken Wheat) — Rich in Fiber, Natural & Healthy. Carefully selected and hygienically packed for authentic taste, easy digestion, and delicious everyday meals.",
        images: [P20, P20B, P20M],
        weightOptions: [
            { label: "1kg",  oldPrice: 50,  newPrice: 45 },
            { label: "2kg",  oldPrice: 100, newPrice: 90 },
            { label: "5kg",  oldPrice: 250, newPrice: 225 },
            { label: "10kg", oldPrice: 500, newPrice: 450 },
        ],
        meta: {
            type: "100% Natural & Pure",
            weight: "5kg (Value Pack)",
            mfgDate: "01/05/2026",
            expDate: "30/04/2027",
            category: "Grocery",
            tags: "daliya, broken wheat, anaj, grain, fiber rich, natural, healthy"
        }
    },

    {
        id: 21,
        name: "Premium Poha (Flattened Rice)",
        brand: "Charbhuja",
        rating: 4.5,
        oldPrice: 300,
        newPrice: 270,
        discount: 6,
        stock: true,
        isBestSeller: false,
        isNew: false,
        description: "Premium Quality Poha (Flattened Rice) — Light, Crispy & Naturally Fresh. Carefully selected and hygienically packed for authentic taste, quick cooking, and delicious everyday breakfast.",
        images: [P21, P21B, P21M],
        weightOptions: [
            { label: "1kg",  oldPrice: 60,  newPrice: 54 },
            { label: "2kg",  oldPrice: 120,  newPrice: 108 },
            { label: "5kg",  oldPrice: 300, newPrice: 270 },
            { label: "10kg", oldPrice: 600, newPrice: 540 },
        ],
        meta: {
            type: "100% Natural & Pure",
            weight: "5kg (Value Pack)",
            mfgDate: "01/05/2026",
            expDate: "30/04/2027",
            category: "Grocery",
            tags: "poha, flattened rice, anaj, grain, rice, natural, fresh"
        }
    },

    {
        id: 22,
        name: "Aashirvaad MP Sharbati Aata",
        brand: "Aashirvaad",
        rating: 4,
        oldPrice: 230,
        newPrice: 215,
        discount: 7,
        stock: true,
        isBestSeller: false,
        isNew: false,
        description: "Premium Quality Aata (Wheat Flour) — Pure, Natural & Healthy. Stone-ground from finest quality wheat, perfect for soft rotis and parathas every time.",
        images: [P22, P22B, P22M],
        weightOptions: [
            { label: "1kg",  oldPrice: 46,  newPrice: 43 },
            { label: "2kg",  oldPrice: 92,  newPrice: 86 },
            { label: "5kg",  oldPrice: 230, newPrice: 215 },
            { label: "10kg", oldPrice: 460, newPrice: 430 },
        ],
        meta: {
            type: "100% Natural & Pure",
            weight: "5kg (Value Pack)",
            mfgDate: "01/05/2026",
            expDate: "30/04/2027",
            category: "Grocery",
            tags: "aata, atta, wheat flour, natural, healthy, whole wheat"
        }
    },

    {
        id: 23,
        name: "Premium Besan (Gram Flour)",
        brand: "Aashirvaad",
        rating: 4.5,
        oldPrice: 260,
        newPrice: 240,
        discount: 8,
        stock: true,
        isBestSeller: false,
        isNew: false,
        description: "Premium Quality Besan (Gram Flour) — Pure, Natural & Healthy. Stone-ground from finest quality chana dal, perfect for pakoras, kadhi, and sweets every time.",
        images: [P23, P23B, P23M],
        weightOptions: [
            { label: "1kg",  oldPrice: 52,  newPrice: 48 },
            { label: "2kg",  oldPrice: 104, newPrice: 96 },
            { label: "5kg",  oldPrice: 260, newPrice: 240 },
            { label: "10kg", oldPrice: 520, newPrice: 480 },
        ],
        meta: {
            type: "100% Natural & Pure",
            weight: "5kg (Value Pack)",
            mfgDate: "01/05/2026",
            expDate: "30/04/2027",
            category: "Grocery",
            tags: "besan, gram flour, atta, flour, natural, healthy"
        }
    },

    {
        id: 24,
        name: "Premium Maida (Refined Flour)",
        brand: "Fortune",
        rating: 4,
        oldPrice: 220,
        newPrice: 200,
        discount: 9,
        stock: true,
        isBestSeller: false,
        isNew: false,
        description: "Premium Quality Maida (Refined Flour) — Fine, Smooth & Naturally Fresh. Finely milled refined flour, perfect for bread, pastries, and bakery items every time.",
        images: [P24, P24B, P24M],
        weightOptions: [
            { label: "500g", oldPrice: 22,  newPrice: 20 },
            { label: "1kg",  oldPrice: 44,  newPrice: 40 },
            { label: "2kg",  oldPrice: 88,  newPrice: 80 },
            { label: "5kg",  oldPrice: 220, newPrice: 200 },
        ],
        meta: {
            type: "100% Natural & Pure",
            weight: "5kg (Value Pack)",
            mfgDate: "01/05/2026",
            expDate: "30/04/2027",
            category: "Grocery",
            tags: "maida, refined flour, atta, flour, natural, fresh"
        }
    },

    {
        id: 25,
        name: "Tirupati Refine Cottonseed Oil",
        brand: "Tirupati",
        rating: 4,
        oldPrice: 150,
        newPrice: 138,
        discount: 8,
        stock: true,
        isBestSeller: false,
        isNew: false,
        description: "Premium Quality Cottonseed Oil — Pure, Natural & Healthy. Carefully refined for everyday cooking, perfect for frying, sautéing, and traditional Indian dishes.",
        images: [P25, P25B, P25M],
        weightOptions: [
            { label: "1L",   oldPrice: 150,  newPrice: 138 },
            { label: "5L",   oldPrice: 750,  newPrice: 690 },
            { label: "15kg", oldPrice: 1500, newPrice: 1380 },
        ],
        meta: {
            type: "100% Natural & Pure",
            weight: "15kg (Value Pack)",
            mfgDate: "01/05/2026",
            expDate: "30/04/2027",
            category: "Grocery",
            tags: "cottonseed oil, oil, ghee, cooking oil, natural, healthy"
        }
    },

    {
        id: 26,
        name: "Tirupati Kachi Ghani Mustard Oil",
        brand: "Tirupati",
        rating: 4.5,
        oldPrice: 160,
        newPrice: 147,
        discount: 8,
        stock: true,
        isBestSeller: false,
        isNew: false,
        description: "Premium Quality Mustard Oil — Pure, Natural & Healthy. Cold-pressed for authentic pungency, perfect for frying, pickling, and traditional Indian dishes.",
        images: [P26, P26B, P26M],
        weightOptions: [
            { label: "1L",   oldPrice: 160,  newPrice: 147 },
            { label: "5L",   oldPrice: 800,  newPrice: 735 },
            { label: "15kg", oldPrice: 1600, newPrice: 1470 },
        ],
        meta: {
            type: "100% Natural & Pure",
            weight: "15kg (Value Pack)",
            mfgDate: "01/05/2026",
            expDate: "30/04/2027",
            category: "Grocery",
            tags: "mustard oil, oil, ghee, cooking oil, natural, healthy"
        }
    },

    {
        id: 27,
        name: "Premium Filtered Groundnut Oil",
        brand: "Tirupati",
        rating: 4,
        oldPrice: 175,
        newPrice: 161,
        discount: 8,
        stock: true,
        isBestSeller: false,
        isNew: false,
        description: "Premium Quality Filtered Groundnut Oil — Pure, Natural & Healthy. Carefully filtered for rich aroma and authentic taste, perfect for frying, cooking, and traditional Indian dishes.",
        images: [P27, P27B, P27M],
        weightOptions: [
            { label: "1L",   oldPrice: 175,  newPrice: 161 },
            { label: "5L",   oldPrice: 875,  newPrice: 805 },
            { label: "15kg", oldPrice: 1750, newPrice: 1610 },
        ],
        meta: {
            type: "100% Natural & Pure",
            weight: "15kg (Value Pack)",
            mfgDate: "01/05/2026",
            expDate: "30/04/2027",
            category: "Grocery",
            tags: "groundnut oil, filtered oil, oil, ghee, cooking oil, natural, healthy"
        }
    },

    {
        id: 28,
        name: "Premium Amul Pure Ghee",
        brand: "Amul",
        rating: 4.5,
        oldPrice: 640,
        newPrice: 590,
        discount: 8,
        stock: true,
        isBestSeller: false,
        isNew: false,
        description: "Premium Quality Amul Pure Ghee — Rich Aroma, Authentic Taste & Naturally Fresh. Made from fresh cream, perfect for cooking, frying, and traditional Indian dishes.",
        images: [P28, P28B, P28M],
        weightOptions: [
            { label: "500ml", oldPrice: 320,  newPrice: 295 },
            { label: "1L",    oldPrice: 640,  newPrice: 590 },
            { label: "5kg",   oldPrice: 3200, newPrice: 2950 },
        ],
        meta: {
            type: "100% Natural & Pure",
            weight: "5kg (Value Pack)",
            mfgDate: "01/05/2026",
            expDate: "30/04/2027",
            category: "Grocery",
            tags: "amul ghee, pure ghee, ghee, oil, natural, fresh"
        }
    },

    {
        id: 29,
        name: "Premium Sea Salt",
        brand: "Charbhuja",
        rating: 3.5,
        oldPrice: 40,
        newPrice: 36,
        discount: 10,
        stock: true,
        isBestSeller: false,
        isNew: false,
        description: "Premium Quality Sea Salt — Pure, Natural & Mineral Rich. Naturally harvested from pristine sea water, perfect for everyday cooking, seasoning, and traditional Indian dishes.",
        images: [P29, P29B, P29M],
        weightOptions: [
            { label: "500g", oldPrice: 20,  newPrice: 18 },
            { label: "1kg",  oldPrice: 40,  newPrice: 36 },
            { label: "2kg",  oldPrice: 80,  newPrice: 72 },
            { label: "5kg",  oldPrice: 200, newPrice: 180 },
        ],
        meta: {
            type: "100% Natural & Pure",
            weight: "1kg (Value Pack)",
            mfgDate: "01/05/2026",
            expDate: "30/04/2027",
            category: "Grocery",
            tags: "sea salt, salt, condiments, natural, mineral rich, fresh"
        }
    },

    {
        id: 30,
        name: "Premium Black Salt (Kala Namak)",
        brand: "Charbhuja",
        rating: 4,
        oldPrice: 44,
        newPrice: 40,
        discount: 9,
        stock: true,
        isBestSeller: false,
        isNew: false,
        description: "Premium Quality Black Salt (Kala Namak) — Pure, Natural & Mineral Rich. Carefully sourced for authentic taste, perfect for chaat, raita, salads, and traditional Indian dishes.",
        images: [P30, P30B, P30M],
        weightOptions: [
            { label: "500g", oldPrice: 22,  newPrice: 20 },
            { label: "1kg",  oldPrice: 44,  newPrice: 40 },
            { label: "2kg",  oldPrice: 88,  newPrice: 80 },
            { label: "5kg",  oldPrice: 220, newPrice: 200 },
        ],
        meta: {
            type: "100% Natural & Pure",
            weight: "1kg (Value Pack)",
            mfgDate: "01/05/2026",
            expDate: "30/04/2027",
            category: "Grocery",
            tags: "black salt, kala namak, salt, condiment, natural, mineral rich, fresh"
        }
    },
    
    {
        id: 31,
        name: "Premium Rock Salt (Sendha Namak)",
        brand: "Charbhuja",
        rating: 4.5,
        oldPrice: 42,
        newPrice: 38,
        discount: 9,
        stock: true,
        isBestSeller: false,
        isNew: false,
        description: "Premium Quality Rock Salt (Sendha Namak) — Pure, Natural & Mineral Rich. Carefully sourced for authentic taste, perfect for fasting recipes, salads, and traditional Indian dishes.",
        images: [P31, P31B, P31M],
        weightOptions: [
            { label: "500g", oldPrice: 21,  newPrice: 19 },
            { label: "1kg",  oldPrice: 42,  newPrice: 38 },
            { label: "2kg",  oldPrice: 84,  newPrice: 76 },
            { label: "5kg",  oldPrice: 210, newPrice: 190 },
        ],
        meta: {
            type: "100% Natural & Pure",
            weight: "1kg (Value Pack)",
            mfgDate: "01/05/2026",
            expDate: "30/04/2027",
            category: "Grocery",
            tags: "rock salt, sendha namak, salt, condiment, natural, mineral rich, fresh"
        }
    },

    {
        id: 32,
        name: "Premium Chaat Masala",
        brand: "Charbhuja",
        rating: 4.5,
        oldPrice: 48,
        newPrice: 44,
        discount: 8,
        stock: true,
        isBestSeller: false,
        isNew: false,
        description: "Premium Quality Chaat Masala — Tangy, Spicy & Naturally Fresh. Carefully blended for authentic flavor, perfect for chaat, fruits, salads, and traditional Indian snacks.",
        images: [P32, P32B, P32M],
        weightOptions: [
            { label: "500g", oldPrice: 24,  newPrice: 22 },
            { label: "1kg",  oldPrice: 48,  newPrice: 44 },
            { label: "2kg",  oldPrice: 96,  newPrice: 88 },
            { label: "5kg",  oldPrice: 240, newPrice: 220 },
        ],
        meta: {
            type: "100% Natural & Pure",
            weight: "1kg (Value Pack)",
            mfgDate: "01/05/2026",
            expDate: "30/04/2027",
            category: "Grocery",
            tags: "chaat masala, masala, condiment, tangy, spicy, natural, fresh"
        }
    },
];

export default productsData;
import { IoSearch } from "react-icons/io5";
import Button from '@mui/material/Button';
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import productsData from '../../../Data/ProductData';
import './style.css';

const SearchBox = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const navigate = useNavigate();
    const wrapperRef = useRef(null);

    // Outside click se dropdown band karo
    useEffect(() => {
        const handleClick = (e) => {
            if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
                setShowDropdown(false);
            }
        };
        document.addEventListener('mousedown', handleClick);
        return () => document.removeEventListener('mousedown', handleClick);
    }, []);

    const handleSearch = (val) => {
        setQuery(val);
        if (val.trim().length < 2) {
            setResults([]);
            setShowDropdown(false);
            return;
        }
        const q = val.toLowerCase();
        const filtered = productsData.filter(p =>
            p.name.toLowerCase().includes(q) ||
            p.brand.toLowerCase().includes(q) ||
            p.meta.category.toLowerCase().includes(q) ||
            p.meta.tags.toLowerCase().includes(q)
        ).slice(0, 6); // max 6 results
        setResults(filtered);
        setShowDropdown(true);
    };

    const handleSelect = (product) => {
        setQuery('');
        setShowDropdown(false);
        navigate(`/product/${product.id}`);
    };

    const handleEnter = (e) => {
        if (e.key === 'Enter' && results.length > 0) {
            handleSelect(results[0]);
        }
    };

    return (
        <div className='headerSearch ml-3 mr-3' ref={wrapperRef}>
            <input
                type='text'
                placeholder='Search For Products...'
                value={query}
                onChange={e => handleSearch(e.target.value)}
                onKeyDown={handleEnter}
                autoComplete="off"
            />
            <Button onClick={() => results.length > 0 && handleSelect(results[0])}>
                <IoSearch />
            </Button>

            {/* Dropdown Results */}
            {showDropdown && (
                <div className="searchDropdown">
                    {results.length === 0 ? (
                        <div className="searchDropdown-empty">No products found</div>
                    ) : (
                        results.map(product => (
                            <div
                                key={product.id}
                                className="searchDropdown-item"
                                onClick={() => handleSelect(product)}
                            >
                                <img
                                    src={product.images[0]}
                                    alt={product.name}
                                    className="searchDropdown-img"
                                />
                                <div className="searchDropdown-info">
                                    <p className="searchDropdown-name">{product.name}</p>
                                    <p className="searchDropdown-meta">
                                        {product.meta.category} &nbsp;·&nbsp;
                                        <span className="searchDropdown-price">₹{product.newPrice}</span>
                                    </p>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
};

export default SearchBox;
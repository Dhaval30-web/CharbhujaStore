import { useState } from 'react';
import { FaRegShareSquare, FaWhatsapp, FaFacebook, FaCopy } from "react-icons/fa";
import Button from '@mui/material/Button';

const ShareButton = ({ productName, productUrl }) => {
    const [showShare, setShowShare] = useState(false);
    const [copied, setCopied] = useState(false);

    const shareText = `Check out this product: ${productName}`;
    const url = productUrl || window.location.href;

    const handleWhatsApp = () => {
        window.open(`https://wa.me/?text=${encodeURIComponent(shareText + ' ' + url)}`, '_blank');
        setShowShare(false);
    };

    const handleFacebook = () => {
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
        setShowShare(false);
    };

    const handleCopyLink = () => {
        navigator.clipboard.writeText(url).then(() => {
            setCopied(true);
            setTimeout(() => {
                setCopied(false);
                setShowShare(false);
            }, 2000);
        });
    };

    return (
        <div className="share-wrapper">
            <Button
                className='btn-round btn-sml share-trigger-btn'
                variant="outlined"
                onClick={() => setShowShare(!showShare)}
            >
                <FaRegShareSquare /> &nbsp; Share
            </Button>

            {showShare && (
                <>
                    {/* Backdrop to close on outside click */}
                    <div className="share-backdrop" onClick={() => setShowShare(false)} />

                    <div className="share-dropdown">
                        <p className="share-title">Share this product</p>

                        <button className="share-item whatsapp" onClick={handleWhatsApp}>
                            <FaWhatsapp size={18} />
                            <span>WhatsApp</span>
                        </button>

                        <button className="share-item facebook" onClick={handleFacebook}>
                            <FaFacebook size={18} />
                            <span>Facebook</span>
                        </button>

                        <div className="share-divider" />

                        <button className="share-item copy" onClick={handleCopyLink}>
                            <FaCopy size={16} />
                            <span>{copied ? '✅ Copied!' : 'Copy Link'}</span>
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default ShareButton;
import { useState } from 'react';
import './style.css';

const Auth = () => {

    const [isLogin, setIsLogin] = useState(true);
    const [showOtp, setShowOtp] = useState(false);
    const [userId, setUserId] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ text: '', type: '' });

    const [loginData, setLoginData] = useState({ emailOrPhone: '', password: '' });
    const [signupData, setSignupData] = useState({ name: '', emailOrPhone: '', password: '', confirmPassword: '' });
    const [otp, setOtp] = useState('');
    const [forgotMode, setForgotMode] = useState(false);
    const [forgotEmail, setForgotEmail] = useState('');
    const [resetMode, setResetMode] = useState(false);
    const [resetData, setResetData] = useState({ newPassword: '', confirmPassword: '' });

    const showMessage = (text, type) => {
        setMessage({ text, type });
        setTimeout(() => setMessage({ text: '', type: '' }), 4000);
    };

    // ========== LOGIN ==========
    const handleLogin = async (e) => {
        e.preventDefault();
        if (!loginData.emailOrPhone || !loginData.password) {
            return showMessage('Please fill all fields!', 'error');
        }
        setLoading(true);
        try {
            const res = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(loginData)
            });
            const data = await res.json();
            if (res.ok) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));
                showMessage('Login Successful! 🎉', 'success');
                setTimeout(() => window.location.reload(), 1500);
            } else {
                showMessage(data.message, 'error');
            }
        } catch {
            showMessage('Server error! Please try again.', 'error');
        }
        setLoading(false);
    };

    // ========== SIGNUP ==========
    const handleSignup = async (e) => {
        e.preventDefault();
        if (!signupData.name || !signupData.emailOrPhone || !signupData.password || !signupData.confirmPassword) {
            return showMessage('Please fill all fields!', 'error');
        }
        if (signupData.password !== signupData.confirmPassword) {
            return showMessage('Passwords do not match!', 'error');
        }
        setLoading(true);
        try {
            const res = await fetch('http://localhost:5000/api/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(signupData)
            });
            const data = await res.json();
            if (res.ok) {
                setUserId(data.userId);
                setShowOtp(true);
                // Phone ke liye devOtp message mein dikhao
                if (data.devOtp) {
                    showMessage(`Your OTP is: ${data.devOtp}`, 'success');
                } else {
                    showMessage('OTP sent to your email! ✅', 'success');
                }
            } else {
                showMessage(data.message, 'error');
            }
        } catch {
            showMessage('Server error! Please try again.', 'error');
        }
        setLoading(false);
    };

    // ========== VERIFY OTP ==========
    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        if (!otp) return showMessage('Please enter OTP!', 'error');
        setLoading(true);
        try {
            const res = await fetch('http://localhost:5000/api/auth/verify-otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId, otp })
            });
            const data = await res.json();
            if (res.ok) {
                showMessage('Account verified! Please login. ✅', 'success');
                setTimeout(() => { setShowOtp(false); setIsLogin(true); }, 2000);
            } else {
                showMessage(data.message, 'error');
            }
        } catch {
            showMessage('Server error! Please try again.', 'error');
        }
        setLoading(false);
    };

    // ========== FORGOT PASSWORD ==========
    const handleForgotPassword = async (e) => {
        e.preventDefault();
        if (!forgotEmail) return showMessage('Please enter email or phone!', 'error');
        setLoading(true);
        try {
            const res = await fetch('http://localhost:5000/api/auth/forgot-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ emailOrPhone: forgotEmail })
            });
            const data = await res.json();
            if (res.ok) {
                setUserId(data.userId);
                setResetMode(true);
                setForgotMode(false);
                showMessage('OTP sent! Check your email/phone.', 'success');
            } else {
                showMessage(data.message, 'error');
            }
        } catch {
            showMessage('Server error! Please try again.', 'error');
        }
        setLoading(false);
    };

    // ========== RESET PASSWORD ==========
    const handleResetPassword = async (e) => {
        e.preventDefault();
        if (!otp || !resetData.newPassword || !resetData.confirmPassword) {
            return showMessage('Please fill all fields!', 'error');
        }
        setLoading(true);
        try {
            const res = await fetch('http://localhost:5000/api/auth/reset-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId, otp, ...resetData })
            });
            const data = await res.json();
            if (res.ok) {
                showMessage('Password reset successful! Please login. ✅', 'success');
                setTimeout(() => { setResetMode(false); setIsLogin(true); setOtp(''); }, 2000);
            } else {
                showMessage(data.message, 'error');
            }
        } catch {
            showMessage('Server error! Please try again.', 'error');
        }
        setLoading(false);
    };

    return (
        <div className="authOverlay">
            <div className="authBox">

                {/* MESSAGE BOX */}
                {message.text && (
                    <div className={`authMessage ${message.type}`}>
                        {message.text}
                    </div>
                )}

                {/* ===== OTP VERIFY ===== */}
                {showOtp && (
                    <>
                        <h2 className="authTitle">Verify OTP 🔐</h2>
                        <p className="authSubtitle">OTP aapke email/phone pe bheja gaya hai</p>
                        <form onSubmit={handleVerifyOtp}>
                            <div className="authInput">
                                <input
                                    type="text"
                                    placeholder="Enter OTP"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    maxLength={6}
                                />
                            </div>
                            <button className="authBtn" type="submit" disabled={loading}>
                                {loading ? 'Verifying...' : 'Verify OTP'}
                            </button>
                        </form>
                    </>
                )}

                {/* ===== FORGOT PASSWORD ===== */}
                {forgotMode && !showOtp && (
                    <>
                        <h2 className="authTitle">Forgot Password 🔑</h2>
                        <p className="authSubtitle">Email ya phone number daalo</p>
                        <form onSubmit={handleForgotPassword}>
                            <div className="authInput">
                                <input
                                    type="text"
                                    placeholder="Email or Phone Number"
                                    value={forgotEmail}
                                    onChange={(e) => setForgotEmail(e.target.value)}
                                />
                            </div>
                            <button className="authBtn" type="submit" disabled={loading}>
                                {loading ? 'Sending...' : 'Send OTP'}
                            </button>
                            <p className="authSwitch" onClick={() => setForgotMode(false)}>
                                ← Back to Login
                            </p>
                        </form>
                    </>
                )}

                {/* ===== RESET PASSWORD ===== */}
                {resetMode && !showOtp && (
                    <>
                        <h2 className="authTitle">Reset Password 🔒</h2>
                        <form onSubmit={handleResetPassword}>
                            <div className="authInput">
                                <input
                                    type="text"
                                    placeholder="Enter OTP"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    maxLength={6}
                                />
                            </div>
                            <div className="authInput">
                                <input
                                    type="password"
                                    placeholder="New Password"
                                    value={resetData.newPassword}
                                    onChange={(e) => setResetData({ ...resetData, newPassword: e.target.value })}
                                />
                            </div>
                            <div className="authInput">
                                <input
                                    type="password"
                                    placeholder="Confirm New Password"
                                    value={resetData.confirmPassword}
                                    onChange={(e) => setResetData({ ...resetData, confirmPassword: e.target.value })}
                                />
                            </div>
                            <button className="authBtn" type="submit" disabled={loading}>
                                {loading ? 'Resetting...' : 'Reset Password'}
                            </button>
                        </form>
                    </>
                )}

                {/* ===== LOGIN ===== */}
                {isLogin && !forgotMode && !resetMode && !showOtp && (
                    <>
                        <h2 className="authTitle">Welcome Back 👋</h2>
                        <p className="authSubtitle">Apne account mein login karein</p>
                        <form onSubmit={handleLogin}>
                            <div className="authInput">
                                <input
                                    type="text"
                                    placeholder="Email or Phone Number"
                                    value={loginData.emailOrPhone}
                                    onChange={(e) => setLoginData({ ...loginData, emailOrPhone: e.target.value })}
                                />
                            </div>
                            <div className="authInput">
                                <input
                                    type="password"
                                    placeholder="Password"
                                    value={loginData.password}
                                    onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                                />
                            </div>
                            <p className="forgotLink" onClick={() => setForgotMode(true)}>
                                Forgot Password?
                            </p>
                            <button className="authBtn" type="submit" disabled={loading}>
                                {loading ? 'Logging in...' : 'Login'}
                            </button>
                        </form>
                        <p className="authSwitch">
                            Account nahi hai?{' '}
                            <span onClick={() => setIsLogin(false)}>Sign Up</span>
                        </p>
                    </>
                )}

                {/* ===== SIGNUP ===== */}
                {!isLogin && !forgotMode && !resetMode && !showOtp && (
                    <>
                        <h2 className="authTitle">Create Account 🎉</h2>
                        <p className="authSubtitle">Naya account banayein</p>
                        <form onSubmit={handleSignup}>
                            <div className="authInput">
                                <input
                                    type="text"
                                    placeholder="Full Name"
                                    value={signupData.name}
                                    onChange={(e) => setSignupData({ ...signupData, name: e.target.value })}
                                />
                            </div>
                            <div className="authInput">
                                <input
                                    type="text"
                                    placeholder="Email or Phone Number"
                                    value={signupData.emailOrPhone}
                                    onChange={(e) => setSignupData({ ...signupData, emailOrPhone: e.target.value })}
                                />
                            </div>
                            <div className="authInput">
                                <input
                                    type="password"
                                    placeholder="Password"
                                    value={signupData.password}
                                    onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                                />
                            </div>
                            <div className="authInput">
                                <input
                                    type="password"
                                    placeholder="Confirm Password"
                                    value={signupData.confirmPassword}
                                    onChange={(e) => setSignupData({ ...signupData, confirmPassword: e.target.value })}
                                />
                            </div>
                            <button className="authBtn" type="submit" disabled={loading}>
                                {loading ? 'Creating...' : 'Sign Up'}
                            </button>
                        </form>
                        <p className="authSwitch">
                            Pehle se account hai?{' '}
                            <span onClick={() => setIsLogin(true)}>Login</span>
                        </p>
                    </>
                )}

            </div>
        </div>
    );
};

export default Auth;
import { useState } from 'react';
import {
    Eye,
    EyeOff,
    Fingerprint,
    Phone,
    ArrowRight,
    AlertCircle,
} from 'lucide-react';
import App from '../App'; // sesuaikan path kalau App.tsx ada di folder lain

function Login() {
    const [step, setStep] = useState<'phone' | 'pin'>('phone');
    const [phone, setPhone] = useState('');
    const [pin, setPin] = useState('');
    const [showPin, setShowPin] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Nomor yang dianggap "terdaftar" untuk simulasi (bisa diganti/dihapus nanti)
    const registeredPhones = ['081234567890', '085712345678', '6281234567890'];

    const validatePhone = () => {
        if (!phone) {
            setError('Nomor HP wajib diisi');
            return false;
        }

        // Hapus spasi dan karakter non-digit, lalu cek panjang
        const cleanedPhone = phone.replace(/\D/g, '');
        if (cleanedPhone.length < 10 || cleanedPhone.length > 13) {
            setError('Nomor HP harus antara 10-13 digit');
            return false;
        }

        // Simulasi cek apakah terdaftar
        const isRegistered = registeredPhones.some((reg) =>
            cleanedPhone.endsWith(reg.replace(/\D/g, ''))
        );

        if (!isRegistered) {
            setError('Nomor HP belum terdaftar. Silakan daftar terlebih dahulu');
            return false;
        }

        setError(null);
        return true;
    };

    const validatePin = () => {
        if (!pin) {
            setError('PIN wajib diisi');
            return false;
        }
        if (pin.length !== 6) {
            setError('PIN harus 6 digit');
            return false;
        }
        if (!/^\d+$/.test(pin)) {
            setError('PIN hanya boleh angka');
            return false;
        }

        setError(null);
        return true;
    };

    const handleNextToPin = () => {
        if (validatePhone()) {
            setStep('pin');
            setError(null);
        }
    };

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();

        if (!validatePin()) return;

        setIsLoading(true);
        setError(null);

        // Simulasi proses login (API call)
        setTimeout(() => {
            setIsLoading(false);

            // Untuk demo: kita anggap sukses kalau PIN adalah 123456
            if (pin === '123456') {
                // Simpan status login (bisa pakai localStorage nanti)
                localStorage.setItem('isLoggedIn', 'true');
                setIsLoggedIn(true);
            } else {
                setError('PIN yang Anda masukkan salah');
            }
        }, 1200);
    };

    // Jika sudah login → tampilkan App (Home/Dashboard)
    if (isLoggedIn) {
        return <App />;
    }

    return (
        <div className="min-h-screen bg-linear-to-br from-gray-900 to-indigo-950 flex flex-col items-center justify-center px-6">
            <div className="w-full max-w-sm">
                {/* Logo */}
                <div className="text-center mb-12">
                    <div className="w-20 h-20 mx-auto bg-blue-600 rounded-2xl flex items-center justify-center shadow-2xl">
                        <Fingerprint size={40} className="text-white" />
                    </div>
                    <h1 className="text-3xl font-bold text-white mt-6">MiniBank</h1>
                    <p className="text-gray-400 mt-2">Masuk dengan cepat & aman</p>
                </div>

                {step === 'phone' ? (
                    <div className="space-y-6">
                        <div className="bg-gray-800/50 backdrop-blur-md rounded-2xl p-6 border border-gray-700">
                            <label className="block text-sm text-gray-300 mb-3">
                                Nomor HP terdaftar
                            </label>
                            <div className="relative">
                                <Phone
                                    size={20}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                                />
                                <input
                                    type="tel"
                                    value={phone}
                                    onChange={(e) => {
                                        setPhone(e.target.value);
                                        setError(null);
                                    }}
                                    placeholder="0812 xxxx xxxx"
                                    className="w-full bg-transparent pl-12 pr-4 py-4 text-white placeholder-gray-500 border-b border-gray-600 focus:border-blue-500 focus:outline-none text-lg"
                                />
                            </div>
                        </div>

                        {error && (
                            <div className="flex items-center gap-2 text-red-400 text-sm bg-red-950/30 p-3 rounded-xl border border-red-800/50">
                                <AlertCircle size={18} />
                                <span>{error}</span>
                            </div>
                        )}

                        <button
                            onClick={handleNextToPin}
                            disabled={isLoading || !phone}
                            className="w-full bg-blue-600 py-5 rounded-2xl text-white font-semibold text-lg flex items-center justify-center gap-3 hover:bg-blue-500 transition disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Lanjutkan <ArrowRight size={20} />
                        </button>

                        <p className="text-center text-gray-400 text-sm mt-8">
                            Atau gunakan{' '}
                            <span className="text-blue-400 font-medium">Sidik Jari / Face ID</span>
                        </p>
                    </div>
                ) : (
                    <div className="space-y-6">
                        <div className="bg-gray-800/50 backdrop-blur-md rounded-2xl p-6 border border-gray-700">
                            <div className="flex justify-between items-center mb-4">
                                <label className="text-sm text-gray-300">Masukkan PIN</label>
                                <button
                                    onClick={() => setShowPin(!showPin)}
                                    className="text-gray-400 hover:text-gray-300"
                                >
                                    {showPin ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                            <input
                                type={showPin ? 'text' : 'password'}
                                value={pin}
                                onChange={(e) => {
                                    setPin(e.target.value);
                                    setError(null);
                                }}
                                maxLength={6}
                                className="w-full bg-transparent text-center text-4xl font-mono tracking-[1em] text-white focus:outline-none placeholder-gray-600"
                                placeholder="••••••"
                            />
                        </div>

                        {error && (
                            <div className="flex items-center gap-2 text-red-400 text-sm bg-red-950/30 p-3 rounded-xl border border-red-800/50">
                                <AlertCircle size={18} />
                                <span>{error}</span>
                            </div>
                        )}

                        <button
                            onClick={handleLogin}
                            disabled={isLoading || pin.length !== 6}
                            className="w-full bg-blue-600 py-5 rounded-2xl text-white font-semibold text-lg hover:bg-blue-500 transition disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? (
                                <span className="animate-pulse">Memproses...</span>
                            ) : (
                                'Masuk'
                            )}
                        </button>

                        <button
                            onClick={() => {
                                setStep('phone');
                                setError(null);
                            }}
                            className="text-blue-400 text-sm text-center w-full mt-4 hover:underline"
                        >
                            Ganti nomor HP
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Login;
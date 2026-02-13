// src/pages/Home.tsx
import { useState } from 'react';
import {
    CreditCard,
    Wallet,
    ArrowUpRight,
    ArrowDownRight,
    History,
    QrCode,
    House,
    User,
    LogOut,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

type Transaction = {
    id: number;
    type: 'in' | 'out';
    amount: number;
    description: string;
    date: string;
};

export default function Home() {
    const navigate = useNavigate();
    const [balance] = useState(12_450_000);
    const [showBalance, setShowBalance] = useState(true);

    const transactions: Transaction[] = [
        { id: 1, type: 'in', amount: 2_500_000, description: 'Gaji Februari 2026', date: 'Hari ini' },
        { id: 2, type: 'out', amount: 275_000, description: 'Transfer ke Budi', date: '2 jam lalu' },
        { id: 3, type: 'out', amount: 150_000, description: 'Kopi & Makan Siang', date: 'Kemarin' },
        { id: 4, type: 'in', amount: 180_000, description: 'Refund Shopee', date: '3 hari lalu' },
    ];

    const handleLogout = () => {
        localStorage.removeItem('isLoggedIn'); // atau token apa pun yang kamu pakai
        navigate('/login', { replace: true });
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-24 font-sans relative">
            {/* Header */}
            <header className="bg-linear-to-b from-blue-700 via-blue-600 to-indigo-600 text-white pt-safe">
                <div className="px-5 pt-10 pb-24 relative">
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h1 className="text-2xl font-bold tracking-tight">MiniBank</h1>
                            <p className="text-blue-100 text-sm mt-1">Halo, Sigit! 👋</p>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="p-2 rounded-full bg-white/20 backdrop-blur-md hover:bg-white/30 transition"
                            aria-label="Logout"
                        >
                            <LogOut size={22} />
                        </button>
                    </div>

                    {/* Balance Card */}
                    <div className="absolute left-4 right-4 -bottom-30 z-10">
                        <div className="bg-white rounded-3xl shadow-2xl p-6 text-gray-800 border border-gray-100">
                            <div className="flex justify-between items-start mb-5">
                                <div>
                                    <p className="text-sm text-gray-500 font-medium">Saldo Tersedia</p>
                                    <p className="text-3xl md:text-4xl font-bold mt-1 font-mono tracking-tight">
                                        {showBalance
                                            ? `Rp ${balance.toLocaleString('id-ID')}`
                                            : 'Rp •••••••••••'}
                                    </p>
                                </div>
                                <button
                                    onClick={() => setShowBalance(!showBalance)}
                                    className="text-blue-600 hover:text-blue-800 text-sm font-medium mt-1"
                                >
                                    {showBalance ? 'Sembunyikan' : 'Tampilkan'}
                                </button>
                            </div>

                            <div className="grid grid-cols-2 gap-4 mt-6">
                                <button className="bg-blue-600 text-white py-4 rounded-2xl font-semibold flex items-center justify-center gap-2 shadow-md active:scale-95 transition transform">
                                    <ArrowUpRight size={20} />
                                    Top Up
                                </button>
                                <button className="bg-gray-100 text-gray-800 py-4 rounded-2xl font-semibold flex items-center justify-center gap-2 shadow-md active:scale-95 transition transform">
                                    <ArrowDownRight size={20} />
                                    Transfer
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Quick Actions */}
            <div className="mt-35 px-5 grid grid-cols-4 gap-4">
                {[
                    { icon: Wallet, label: 'Pulsa', color: 'text-green-600' },
                    { icon: QrCode, label: 'Scan QR', color: 'text-purple-600' },
                    { icon: CreditCard, label: 'Bayar', color: 'text-orange-600' },
                    { icon: History, label: 'Riwayat', color: 'text-blue-600' },
                ].map((item, i) => (
                    <button
                        key={i}
                        className="flex flex-col items-center gap-2 py-3 hover:bg-gray-100 rounded-xl active:bg-gray-200 transition"
                    >
                        <div className={`p-3 rounded-full bg-gray-100 ${item.color}`}>
                            <item.icon size={24} />
                        </div>
                        <span className="text-xs text-gray-700">{item.label}</span>
                    </button>
                ))}
            </div>

            {/* Recent Transactions */}
            <section className="mt-10 px-5">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="font-semibold text-lg">Transaksi Terakhir</h2>
                    <button className="text-blue-600 text-sm font-medium">Lihat Semua</button>
                </div>

                <div className="space-y-4">
                    {transactions.map((tx) => (
                        <div
                            key={tx.id}
                            className="flex items-center justify-between bg-white p-4 rounded-xl shadow-sm"
                        >
                            <div className="flex items-center gap-4">
                                <div
                                    className={`p-3 rounded-full ${tx.type === 'in' ? 'bg-green-100' : 'bg-red-100'
                                        }`}
                                >
                                    {tx.type === 'in' ? (
                                        <ArrowDownRight className="text-green-600" size={20} />
                                    ) : (
                                        <ArrowUpRight className="text-red-600" size={20} />
                                    )}
                                </div>
                                <div>
                                    <p className="font-medium">{tx.description}</p>
                                    <p className="text-sm text-gray-500">{tx.date}</p>
                                </div>
                            </div>
                            <p
                                className={`font-medium ${tx.type === 'in' ? 'text-green-600' : 'text-red-600'
                                    }`}
                            >
                                {tx.type === 'in' ? '+' : '-'} Rp {tx.amount.toLocaleString('id-ID')}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Bottom Navigation */}
            <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 pb-safe">
                <div className="max-w-md mx-auto px-6 py-3 flex justify-around">
                    {[
                        { label: 'Home', Icon: House },
                        { label: 'Transaksi', Icon: History },
                        { label: 'Portofolio', Icon: Wallet },
                        { label: 'Profile', Icon: User },
                    ].map(({ label, Icon }, i) => (
                        <button
                            key={label}
                            className={`flex flex-col items-center gap-1 ${i === 0 ? 'text-blue-600' : 'text-gray-500'
                                }`}
                        >
                            <Icon size={24} strokeWidth={2} />
                            <span className="text-xs font-medium">{label}</span>
                        </button>
                    ))}
                </div>
            </nav>
        </div>
    );
}
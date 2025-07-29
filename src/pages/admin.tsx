import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";

export default function Admin() {
  const [, setLocation] = useLocation();
  const [adminKey, setAdminKey] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const { data: stats, isLoading, error } = useQuery({
    queryKey: ["/api/admin/stats"],
    enabled: isAuthenticated,
    queryFn: async () => {
      const response = await fetch("/api/admin/stats", {
        headers: {
          Authorization: `Bearer ${adminKey}`,
        },
      });
      
      if (!response.ok) {
        throw new Error("Unauthorized");
      }
      
      return response.json();
    },
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminKey === "admin-key-2024") {
      setIsAuthenticated(true);
    } else {
      alert("Invalid admin key");
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-charcoal flex items-center justify-center">
        <div className="bg-midnight/80 p-8 rounded-lg border border-gold/30 max-w-md w-full">
          <h1 className="font-gothic text-2xl text-gold mb-6 text-center">Admin Access</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block font-crimson text-warm-gray mb-2">Admin Key:</label>
              <input
                type="password"
                value={adminKey}
                onChange={(e) => setAdminKey(e.target.value)}
                className="w-full p-3 bg-charcoal border border-warm-gray/30 rounded font-crimson text-warm-gray"
                placeholder="Enter admin key"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-gold/20 hover:bg-gold/30 border border-gold/50 hover:border-gold p-3 rounded font-crimson transition-all duration-300"
            >
              Access Admin Panel
            </button>
          </form>
          <button
            onClick={() => setLocation("/")}
            className="w-full mt-4 bg-transparent border border-warm-gray/30 hover:border-warm-gray p-3 rounded font-crimson transition-all duration-300"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-charcoal flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold mx-auto mb-4"></div>
          <p className="font-crimson text-warm-gray">Loading statistics...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-charcoal flex items-center justify-center">
        <div className="text-center">
          <p className="font-crimson text-red-400 mb-4">Error loading statistics</p>
          <button
            onClick={() => setIsAuthenticated(false)}
            className="bg-gold/20 hover:bg-gold/30 border border-gold/50 hover:border-gold px-6 py-2 rounded font-crimson transition-all duration-300"
          >
            Back to Login
          </button>
        </div>
      </div>
    );
  }

  const totalResponses = stats?.reduce((sum: number, stat: any) => sum + stat.yesCount + stat.noCount, 0) || 0;

  return (
    <div className="min-h-screen bg-charcoal p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="font-gothic text-3xl text-gold">Admin Dashboard</h1>
          <div className="space-x-4">
            <button
              onClick={() => setLocation("/")}
              className="bg-transparent border border-warm-gray/30 hover:border-warm-gray px-4 py-2 rounded font-crimson transition-all duration-300"
            >
              Back to Home
            </button>
            <button
              onClick={() => setIsAuthenticated(false)}
              className="bg-red-600/20 hover:bg-red-600/30 border border-red-600/50 hover:border-red-600 px-4 py-2 rounded font-crimson transition-all duration-300"
            >
              Logout
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-midnight/80 p-6 rounded-lg border border-gold/30">
            <h2 className="font-pirata text-xl text-gold mb-4">Overall Statistics</h2>
            <div className="space-y-2">
              <p className="font-crimson text-warm-gray">
                <span className="text-gold">Total Responses:</span> {totalResponses}
              </p>
              <p className="font-crimson text-warm-gray">
                <span className="text-gold">Unique Archetypes:</span> {stats?.length || 0}
              </p>
            </div>
          </div>

          <div className="bg-midnight/80 p-6 rounded-lg border border-gold/30">
            <h2 className="font-pirata text-xl text-gold mb-4">Response Breakdown</h2>
            <div className="space-y-4">
              {stats?.map((stat: any) => {
                const total = stat.yesCount + stat.noCount;
                const yesPercentage = total > 0 ? ((stat.yesCount / total) * 100).toFixed(1) : 0;
                
                return (
                  <div key={stat.archetype} className="border-b border-warm-gray/20 pb-3">
                    <h3 className="font-crimson text-warm-gray font-semibold mb-2">{stat.archetype}</h3>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-green-400">Yes:</span> {stat.yesCount}
                      </div>
                      <div>
                        <span className="text-red-400">No:</span> {stat.noCount}
                      </div>
                      <div>
                        <span className="text-gold">Agreement Rate:</span> {yesPercentage}%
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {stats && stats.length > 0 && (
          <div className="mt-8 bg-midnight/80 p-6 rounded-lg border border-gold/30">
            <h2 className="font-pirata text-xl text-gold mb-4">Detailed Analytics</h2>
            <div className="overflow-x-auto">
              <table className="w-full font-crimson text-warm-gray">
                <thead>
                  <tr className="border-b border-warm-gray/30">
                    <th className="text-left py-2 text-gold">Archetype</th>
                    <th className="text-center py-2 text-green-400">Yes</th>
                    <th className="text-center py-2 text-red-400">No</th>
                    <th className="text-center py-2 text-gold">Total</th>
                    <th className="text-center py-2 text-gold">Agreement %</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.map((stat: any) => {
                    const total = stat.yesCount + stat.noCount;
                    const agreementRate = total > 0 ? ((stat.yesCount / total) * 100).toFixed(1) : 0;
                    
                    return (
                      <tr key={stat.archetype} className="border-b border-warm-gray/10">
                        <td className="py-3">{stat.archetype}</td>
                        <td className="text-center py-3 text-green-400">{stat.yesCount}</td>
                        <td className="text-center py-3 text-red-400">{stat.noCount}</td>
                        <td className="text-center py-3">{total}</td>
                        <td className="text-center py-3 text-gold">{agreementRate}%</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
import React, { useState } from 'react';
import { Building2, Plus, Edit2, Trash2, CheckCircle2, MapPin, Users, Stethoscope, Layers } from 'lucide-react';

interface Department {
  id: string;
  name: string;
  type: 'SMF' | 'Poli' | 'Ruangan' | 'UGD';
  headName: string;
  location: string;
  activeDoctorsCount: number;
  status: 'Aktif' | 'Nonaktif';
}

const INITIAL_DEPARTMENTS: Department[] = [
  { id: 'dept-1', name: 'SMF Bedah Umum & Laparoskopi', type: 'SMF', headName: 'Kolonel Ckm dr. Hendra Setiawan, Sp.B', location: 'Gedung Bedah Sentral Lt. 2', activeDoctorsCount: 6, status: 'Aktif' },
  { id: 'dept-2', name: 'SMF Penyakit Dalam & Hematologi', type: 'SMF', headName: 'Letkol Ckm dr. Rahmad Hidayat, Sp.PD, K-HOM', location: 'Gedung Rawat Jalan Flamboyan', activeDoctorsCount: 8, status: 'Aktif' },
  { id: 'dept-3', name: 'Poli Penyakit Dalam', type: 'Poli', headName: 'Letkol Ckm dr. Rahmad Hidayat, Sp.PD', location: 'Gedung Poliklinik Lt. 1', activeDoctorsCount: 4, status: 'Aktif' },
  { id: 'dept-4', name: 'Poli Bedah & Traumatologi', type: 'Poli', headName: 'Kolonel Ckm dr. Hendra Setiawan, Sp.B', location: 'Gedung Poliklinik Lt. 1', activeDoctorsCount: 3, status: 'Aktif' },
  { id: 'dept-5', name: 'Unit Gawat Darurat (UGD 24 Jam)', type: 'UGD', headName: 'Mayor Ckm dr. Agus Triyono, Sp.An-TI', location: 'Gedung Utama UGD Lt. 1', activeDoctorsCount: 12, status: 'Aktif' },
  { id: 'dept-6', name: 'Kamar Operasi (Central OR / OK)', type: 'Ruangan', headName: 'Mayor Ckm dr. Agus Triyono, Sp.An-TI', location: 'Gedung Bedah Lt. 2', activeDoctorsCount: 5, status: 'Aktif' },
  { id: 'dept-7', name: 'Intensive Care Unit (ICU & HCU)', type: 'Ruangan', headName: 'Mayor Ckm dr. Agus Triyono, Sp.An-TI', location: 'Gedung Rawat Intensif Lt. 2', activeDoctorsCount: 4, status: 'Aktif' }
];

export const DepartmentManager: React.FC = () => {
  const [departments, setDepartments] = useState<Department[]>(INITIAL_DEPARTMENTS);
  const [filterType, setFilterType] = useState<string>('semua');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDept, setEditingDept] = useState<Department | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    type: 'SMF' as Department['type'],
    headName: '',
    location: '',
    activeDoctorsCount: 1,
    status: 'Aktif' as Department['status']
  });

  const filtered = departments.filter(d => filterType === 'semua' || d.type === filterType);

  const handleOpenAdd = () => {
    setEditingDept(null);
    setFormData({
      name: '',
      type: 'SMF',
      headName: '',
      location: '',
      activeDoctorsCount: 1,
      status: 'Aktif'
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (dept: Department) => {
    setEditingDept(dept);
    setFormData({
      name: dept.name,
      type: dept.type,
      headName: dept.headName,
      location: dept.location,
      activeDoctorsCount: dept.activeDoctorsCount,
      status: dept.status
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingDept) {
      setDepartments(departments.map(d => d.id === editingDept.id ? { ...d, ...formData } : d));
    } else {
      setDepartments([...departments, { id: `dept-${Date.now()}`, ...formData }]);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus data departemen/poli ini?')) {
      setDepartments(departments.filter(d => d.id !== id));
    }
  };

  return (
    <div className="space-y-6 font-sans">
      
      {/* Banner */}
      <div className="bg-gradient-to-r from-[#0B2D5C] to-[#008080] text-white p-6 rounded-2xl shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-amber-400 font-bold text-xs uppercase tracking-wider mb-1">
            <Building2 className="w-4 h-4" />
            <span>Master Data Rumah Sakit</span>
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight">
            Departemen, SMF, Poli & Ruangan
          </h1>
          <p className="text-xs text-slate-200 mt-1">
            Pengelolaan Struktur Kelompok Staf Medis (KSM/SMF), Poliklinik Rawat Jalan, UGD, dan Ruangan Tindakan Medis RST Pematang Siantar.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="flex items-center space-x-2 px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold text-xs rounded-xl shadow-md transition-all shrink-0"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>Tambah Master Data</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 flex items-center justify-between text-xs">
        <div className="flex items-center space-x-1 bg-slate-100 p-1 rounded-xl">
          <button
            onClick={() => setFilterType('semua')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all ${filterType === 'semua' ? 'bg-white text-[#0B2D5C] shadow-xs' : 'text-slate-600'}`}
          >
            Semua ({departments.length})
          </button>
          <button
            onClick={() => setFilterType('SMF')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all ${filterType === 'SMF' ? 'bg-white text-[#0B2D5C] shadow-xs' : 'text-slate-600'}`}
          >
            SMF / KSM ({departments.filter(d => d.type === 'SMF').length})
          </button>
          <button
            onClick={() => setFilterType('Poli')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all ${filterType === 'Poli' ? 'bg-white text-[#0B2D5C] shadow-xs' : 'text-slate-600'}`}
          >
            Poliklinik ({departments.filter(d => d.type === 'Poli').length})
          </button>
          <button
            onClick={() => setFilterType('Ruangan')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all ${filterType === 'Ruangan' ? 'bg-white text-[#0B2D5C] shadow-xs' : 'text-slate-600'}`}
          >
            Ruangan & OK ({departments.filter(d => d.type === 'Ruangan').length})
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs text-slate-700">
            <thead>
              <tr className="bg-[#0B2D5C] text-white font-bold uppercase tracking-wider text-[11px]">
                <th className="py-3.5 px-4">Nama Unit / SMF</th>
                <th className="py-3.5 px-4">Jenis Unit</th>
                <th className="py-3.5 px-4">Kepala / Penanggung Jawab</th>
                <th className="py-3.5 px-4">Lokasi Gedung</th>
                <th className="py-3.5 px-4">Jumlah Dokter</th>
                <th className="py-3.5 px-4 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filtered.map((d) => (
                <tr key={d.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3.5 px-4 font-extrabold text-slate-900">{d.name}</td>
                  <td className="py-3.5 px-4">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-300">
                      {d.type}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-slate-800">{d.headName}</td>
                  <td className="py-3.5 px-4 text-slate-600 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#008080]" />
                    <span>{d.location}</span>
                  </td>
                  <td className="py-3.5 px-4 font-bold text-emerald-700">{d.activeDoctorsCount} Dokter</td>
                  <td className="py-3.5 px-4 text-center">
                    <div className="flex items-center justify-center space-x-2">
                      <button onClick={() => handleOpenEdit(d)} className="p-1.5 text-slate-600 hover:text-[#008080]">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleDelete(d.id)} className="p-1.5 text-slate-600 hover:text-rose-600">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full border border-slate-200 overflow-hidden shadow-2xl">
            <div className="bg-[#0B2D5C] text-white p-4 flex justify-between items-center">
              <h3 className="font-bold text-sm">{editingDept ? 'Edit Master Unit' : 'Tambah Unit Baru'}</h3>
              <button onClick={() => setIsModalOpen(false)}>✕</button>
            </div>
            <form onSubmit={handleSubmit} className="p-5 space-y-3 text-xs">
              <div>
                <label className="font-bold block mb-1">Nama Unit / SMF / Poli *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl"
                  placeholder="SMF Paru / Poli Paru"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold block mb-1">Kategori *</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-bold"
                  >
                    <option value="SMF">SMF / KSM</option>
                    <option value="Poli">Poli Rawat Jalan</option>
                    <option value="UGD">UGD 24 Jam</option>
                    <option value="Ruangan">Ruangan / OK</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold block mb-1">Jumlah Dokter</label>
                  <input
                    type="number"
                    value={formData.activeDoctorsCount}
                    onChange={(e) => setFormData({ ...formData, activeDoctorsCount: parseInt(e.target.value) || 1 })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold block mb-1">Kepala / PJ Unit</label>
                <input
                  type="text"
                  value={formData.headName}
                  onChange={(e) => setFormData({ ...formData, headName: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl"
                  placeholder="Nama Penanggung Jawab"
                />
              </div>

              <div>
                <label className="font-bold block mb-1">Lokasi Gedung / Ruang</label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl"
                  placeholder="Gedung Poliklinik Lt. 1"
                />
              </div>

              <div className="pt-3 border-t flex justify-end space-x-2">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 bg-slate-200 rounded-xl font-bold">Batal</button>
                <button type="submit" className="px-5 py-2 bg-[#008080] text-white font-bold rounded-xl">Simpan Unit</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

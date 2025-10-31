import { useEffect, useMemo, useState } from 'react'

const STORAGE_KEY = 'app.vendors'

function loadVendors() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw)
  } catch {}
  return [
    { id: crypto.randomUUID(), name: 'Acme Corp', contact: 'acme@example.com', status: 'Active' },
    { id: crypto.randomUUID(), name: 'Globex', contact: 'contact@globex.com', status: 'Active' },
    { id: crypto.randomUUID(), name: 'Initech', contact: 'support@initech.io', status: 'Inactive' },
  ]
}

function saveVendors(vendors) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(vendors))
}

export default function Vendors() {
  const [vendors, setVendors] = useState(() => loadVendors())
  const [query, setQuery] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [form, setForm] = useState({ name: '', contact: '', status: 'Active' })

  useEffect(() => {
    saveVendors(vendors)
  }, [vendors])

  const filtered = useMemo(() => {
    const q = query.toLowerCase()
    return vendors.filter(v => v.name.toLowerCase().includes(q) || v.contact.toLowerCase().includes(q) || v.status.toLowerCase().includes(q))
  }, [vendors, query])

  const resetForm = () => setForm({ name: '', contact: '', status: 'Active' })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.name.trim() || !form.contact.trim()) return
    if (editingId) {
      setVendors(prev => prev.map(v => v.id === editingId ? { ...v, ...form } : v))
      setEditingId(null)
    } else {
      setVendors(prev => [{ id: crypto.randomUUID(), ...form }, ...prev])
    }
    resetForm()
  }

  const handleEdit = (vendor) => {
    setEditingId(vendor.id)
    setForm({ name: vendor.name, contact: vendor.contact, status: vendor.status })
  }

  const handleDelete = (id) => {
    setVendors(prev => prev.filter(v => v.id !== id))
    if (editingId === id) {
      setEditingId(null)
      resetForm()
    }
  }

  return (
    <div className="page">
      <div className="page-header">
        <h2>Vendors</h2>
        <input className="input" placeholder="Search vendors..." value={query} onChange={(e) => setQuery(e.target.value)} />
      </div>

      <form className="card form-grid" onSubmit={handleSubmit}>
        <h3 style={{ gridColumn: '1 / -1' }}>{editingId ? 'Edit Vendor' : 'Add Vendor'}</h3>
        <label>Name</label>
        <input className="input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
        <label>Contact</label>
        <input className="input" value={form.contact} onChange={(e) => setForm({ ...form, contact: e.target.value })} required />
        <label>Status</label>
        <select className="input" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
          <option>Active</option>
          <option>Inactive</option>
        </select>
        <div style={{ gridColumn: '1 / -1', display: 'flex', gap: 8 }}>
          <button className="btn" type="submit">{editingId ? 'Update' : 'Add'}</button>
          {editingId && (
            <button className="btn" type="button" onClick={() => { setEditingId(null); resetForm() }}>Cancel</button>
          )}
        </div>
      </form>

      <div className="card">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Contact</th>
              <th>Status</th>
              <th style={{ width: 140 }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(v => (
              <tr key={v.id}>
                <td>{v.name}</td>
                <td>{v.contact}</td>
                <td>
                  <span className={`badge ${v.status === 'Active' ? 'success' : 'danger'}`}>{v.status}</span>
                </td>
                <td>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button className="btn" onClick={() => handleEdit(v)}>Edit</button>
                    <button className="btn" onClick={() => handleDelete(v.id)}>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}


